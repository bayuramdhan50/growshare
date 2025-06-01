import type { NextConfig } from "next";
import { securityHeaders } from "./app/lib/security";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false, // Remove the X-Powered-By header
  
  // Enable security headers
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  
  // Trusted hostnames (CORS)
  async rewrites() {
    return {
      beforeFiles: [
        // Example API proxy with rate limiting
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        }
      ]
    }
  },
  
  // Content Security Policy can be applied through security middleware
  
  // Images optimization
  images: {
    domains: ['localhost', 'source.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
