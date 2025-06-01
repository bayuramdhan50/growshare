import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { securityHeaders } from './app/lib/security';

// IP-based rate limiting for enhanced security
const ipRateLimits = new Map();
const API_RATE_LIMIT = 100; // requests
const API_TIME_WINDOW = 60 * 1000; // 1 minute

export function middleware(request: NextRequest) {
  // Get response for chaining
  const response = NextResponse.next();
  
  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value.value);
  });
  
  // Comprehensive security headers
  // Prevent clickjacking attacks
  response.headers.set('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Apply XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Apply strong Content Security Policy
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Consider removing unsafe-inline/eval for better security
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://api.example.com",
    "media-src 'self'",
    "frame-src 'self'",
    "frame-ancestors 'none'",  // Prevents your site from being embedded in iframes
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'"
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', cspDirectives);
  
  // HTTP Strict Transport Security - force HTTPS
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  
  // Referrer Policy - limit information sent in referer header
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy - limit browser features
  response.headers.set(
    'Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=(), sync-xhr=()'
  );
  
  // Cache control - prevent caching sensitive data
  if (request.nextUrl.pathname.startsWith('/api') || 
      request.nextUrl.pathname.startsWith('/dashboard')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0');
  }    // IP-based API rate limiting
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Get client IP from headers or use a fallback
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    const now = Date.now();
    
    if (!ipRateLimits.has(ip)) {
      ipRateLimits.set(ip, [now]);
    } else {
      const requests = ipRateLimits.get(ip);
      const windowStart = now - API_TIME_WINDOW;
      
      // Filter out requests outside the time window
      const recentRequests = requests.filter((time: number) => time > windowStart);
      recentRequests.push(now);
      ipRateLimits.set(ip, recentRequests);
      
      // Check if limit exceeded
      if (recentRequests.length > API_RATE_LIMIT) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            message: 'Too many requests. Please try again later.'
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '60'
            }
          }
        );
      }
    }
  }
  
  // Validate request body size to prevent DoS
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > 2 * 1024 * 1024) { // 2MB limit
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Request entity too large'
      }),
      { status: 413, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return response;
}

// Only run middleware on specific routes, excluding static resources
export const config = {
  matcher: [
    /*
     * Match all request paths except for the following:
     * - api routes that might need to be excluded 
     * - static files and images
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|api/webhook).*)',
  ],
}
