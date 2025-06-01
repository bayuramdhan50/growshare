import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma, verifyPassword } from "@/app/lib/db";
import { securityPatterns } from "@/app/lib/security";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        
        const { email, password } = credentials;
        
        // Validate input
        if (!email || !password) {
          throw new Error("Invalid credentials");
        }
        
        // Email format validation
        if (!securityPatterns.email.test(email)) {
          throw new Error("Invalid email format");
        }
        
        try {
          // Find user in database
          const user = await prisma.user.findUnique({ 
            where: { email } 
          });
          
          // Check if user exists
          if (!user) {
            throw new Error("No user found with this email");
          }
          
          // Verify password - using constant-time comparison
          const isValid = await verifyPassword(password, user.password);
          
          if (!isValid) {
            throw new Error("Invalid password");
          }
          
          // Return user without sensitive information
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          // Use generic error message to prevent information leakage
          throw new Error("Authentication failed");
        }
      }
    })
  ],
  // Secure session configuration
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  // Secure cookies configuration
  cookies: {
    sessionToken: {
      name: "secure-session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      }
    }
  },
  // Security callbacks with type assertions
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  // Enable debug only in development
  debug: process.env.NODE_ENV === "development",
};
