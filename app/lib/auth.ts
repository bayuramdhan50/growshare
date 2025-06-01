import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth-options";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Types for session roles
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}

// Get the current server session
export async function getSession() {
  return await getServerSession(authOptions);
}

// Check if user is authenticated in server component
export async function getCurrentUser() {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return null;
    }

    return session.user;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

// Protect API routes with role-based access control
export async function protectRoute(
  req: NextRequest,
  allowedRoles: UserRole[] = [UserRole.ADMIN, UserRole.USER]
) {
  try {
    const session = await getSession();
    
    if (!session || !session.user) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      );
    }
    
    // @ts-ignore - role is added in NextAuth callbacks
    const userRole = session.user.role as UserRole;
    
    if (!allowedRoles.includes(userRole)) {
      return new NextResponse(
        JSON.stringify({ error: "Forbidden" }),
        { status: 403 }
      );
    }
    
    // User is authorized
    return null;
  } catch (error) {
    console.error("Auth error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

// Generate secure tokens for CSRF/one-time use
export function generateSecureToken() {
  return uuidv4();
}
