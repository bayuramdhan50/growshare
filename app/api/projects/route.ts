import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, protectRoute, UserRole } from '@/app/lib/auth';
import { prisma, secureDbOperation } from '@/app/lib/db';
import { validateInput, projectSchema } from '@/app/lib/validations';

// GET - List all projects with pagination and security measures
export async function GET(req: NextRequest) {
  // Get pagination parameters and sanitize them
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  
  // Validate and cap pagination parameters to prevent DoS
  const safePage = isNaN(page) || page < 1 ? 1 : Math.min(page, 100);
  const safeLimit = isNaN(limit) || limit < 1 ? 10 : Math.min(limit, 50);
  const skip = (safePage - 1) * safeLimit;
  
  try {
    // Execute secure database query
    const [projects, countError] = await secureDbOperation(async () => {
      return await prisma.project.findMany({
        skip,
        take: safeLimit,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          title: true,
          description: true,
          goal: true,
          currentAmount: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          user: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      });
    });
    
    // Check for database errors
    if (countError) {
      console.error('Database error:', countError);
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
    
    // Get total count for pagination
    const [totalCount, totalCountError] = await secureDbOperation(async () => {
      return await prisma.project.count();
    });
    
    if (totalCountError) {
      console.error('Database error:', totalCountError);
      return NextResponse.json({ error: 'Failed to fetch projects count' }, { status: 500 });
    }
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / safeLimit);
    
    // Return secure response
    return NextResponse.json(
      { 
        projects,
        pagination: {
          page: safePage,
          limit: safeLimit,
          totalItems: totalCount,
          totalPages
        }
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Content-Type': 'application/json',
        }
      }
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST - Create a new project (secure, authenticated endpoint)
export async function POST(req: NextRequest) {
  // Check if user is authenticated
  const authCheck = await protectRoute(req, [UserRole.USER, UserRole.ADMIN]);
  if (authCheck) {
    return authCheck; // Returns 401 or 403 responses
  }
  
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse and validate request body - prevents injection and validates data
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
    }
    
    // Validate input against schema
    const validation = validateInput(projectSchema, body);
    if (!validation.success) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }
    
    // Extract validated data
    const { title, description, goal, image } = validation.data;
      // Create project with secure DB operation
    const [project, error] = await secureDbOperation(async () => {
      return await prisma.project.create({
        data: {
          title,
          description,
          goal,
          image,
          // @ts-ignore - user.id is added in auth.ts
          userId: user.id,
        }
      });
    });
    
    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
    
    // Return success
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
