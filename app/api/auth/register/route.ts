import { NextRequest, NextResponse } from 'next/server';
import { prisma, hashPassword, secureDbOperation, checkDbConnection } from '@/app/lib/db';
import { validateInput, userRegistrationSchema } from '@/app/lib/validations';
import { securityPatterns } from '@/app/lib/security';

// Rate limiting implementation
const ipThrottle = new Map();
const EMAIL_THROTTLE = new Map();

// Rate limiting function
const isRateLimited = (identifier: string, limit: number, windowMs: number) => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!ipThrottle.has(identifier)) {
    ipThrottle.set(identifier, [now]);
    return false;
  }
  
  const requests = ipThrottle.get(identifier).filter((time: number) => time > windowStart);
  requests.push(now);
  ipThrottle.set(identifier, requests);
  
  return requests.length > limit;
};

export async function POST(req: NextRequest) {
  // Get client IP for rate limiting
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
  
  console.log("Registration request received from IP:", ip);
  
  // Check database connection before proceeding
  const isDbConnected = await checkDbConnection();
  if (!isDbConnected) {
    console.error("Database connection failed, cannot process registration");
    return NextResponse.json(
      { error: "Database connection error. Please try again later." },
      { status: 503 }
    );
  }
  
  console.log("Database connection verified");
  
  // Implement rate limiting - 5 requests per minute
  if (isRateLimited(ip, 5, 60 * 1000)) {
    console.log("Rate limit exceeded for IP:", ip);
    return NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { status: 429 }
    );
  }
  
  try {
    // Parse and validate request body
    let body;
    try {
      body = await req.json();
      console.log("Request body parsed successfully");
    } catch (error) {
      console.error("Failed to parse JSON data:", error);
      return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
    }
    
    console.log("Validating input with schema");
    // Validate input using validation schema
    const validation = validateInput(userRegistrationSchema, body);
    if (!validation.success) {
      console.error("Validation errors:", validation.errors);
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }
    
    const { name, email, password } = validation.data;
    console.log("Input validation successful for email:", email);
    
    // Additional security validations
    if (!securityPatterns.email.test(email)) {
      console.error("Invalid email format:", email);
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    
    if (!securityPatterns.password.test(password)) {
      console.error("Password does not meet security requirements");
      return NextResponse.json(
        { error: 'Password does not meet security requirements' },
        { status: 400 }
      );
    }
    
    // Email throttling to prevent user enumeration - allow only 3 registration attempts per email per hour
    const emailKey = email.toLowerCase();
    const EMAIL_LIMIT = 3;
    const EMAIL_WINDOW = 60 * 60 * 1000; // 1 hour
    
    if (isRateLimited(emailKey, EMAIL_LIMIT, EMAIL_WINDOW)) {
      console.log("Email rate limit exceeded for:", emailKey);
      // Use generic error to prevent user enumeration
      return NextResponse.json(
        { error: 'Registration failed. Please try again later.' },
        { status: 429 }
      );
    }
    
    console.log("Proceeding with registration for email:", email);
      // Check if user already exists
    console.log("Checking if user already exists");
    const [existingUser, userError] = await secureDbOperation(async () => {
      return await prisma.user.findUnique({
        where: { email }
      });
    });
    
    if (userError) {
      console.error('Database error when checking existing user:', userError);
      return NextResponse.json(
        { error: 'An error occurred during registration. Database operation failed.' },
        { status: 500 }
      );
    }
    
    if (existingUser) {
      console.log("User already exists with email:", email);
      // Generic error to prevent user enumeration
      return NextResponse.json(
        { error: 'Registration failed. Please try again with a different email.' },
        { status: 400 }
      );
    }
    
    console.log("Hashing password");
    // Hash password securely
    let hashedPassword;
    try {
      hashedPassword = await hashPassword(password);
    } catch (error) {
      console.error("Password hashing error:", error);
      return NextResponse.json(
        { error: 'Error processing your request. Please try again.' },
        { status: 500 }
      );
    }
    
    console.log("Creating new user");
    // Create user
    const [user, createError] = await secureDbOperation(async () => {
      return await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'USER',
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
    });
    
    if (createError) {
      console.error('Database error when creating user:', createError);
      return NextResponse.json(
        { error: 'Failed to create user account. Please check your database connection.' },
        { status: 500 }
      );
    }
    
    console.log("User created successfully:", user.id);
    // Return success (without sensitive data)
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
      { status: 201 }
    );  } catch (error) {
    console.error('Unhandled registration error:', error);
    
    // Provide more detailed error message in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`
      : 'An unexpected error occurred during registration. Please try again later.';
      
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
