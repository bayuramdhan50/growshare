/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false, // Remove the X-Powered-By header
  
  // Security headers will be handled in the middleware.ts file
  
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

module.exports = nextConfig;
