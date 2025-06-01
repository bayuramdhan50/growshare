import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Providers
import AuthProvider from './providers/AuthProvider';

// Components
import Navigation from './components/Navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GrowShare - Zero Hunger Initiative",
  description: "Join the mission to achieve Zero Hunger with GrowShare",
  keywords: ["zero hunger", "SDG2", "sustainability", "food security"],
  authors: [{ name: "GrowShare Team" }],
  viewport: "width=device-width, initial-scale=1.0",
  // Prevent XSS through metadata
  openGraph: {
    type: "website",
    url: "https://growshare.vercel.app",
    title: "GrowShare - Zero Hunger Initiative",
    description: "Join the mission to achieve Zero Hunger with GrowShare",
    siteName: "GrowShare",
    images: [{
      url: "https://growshare.vercel.app/og-image.jpg",
      width: 1200,
      height: 630,
    }],
  },
  // Additional security headers
  // These help prevent clickjacking, XSS, and other attacks
  robots: "index, follow",
  themeColor: "#10b981", // Green color for theme
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Security: Add Content Security Policy meta tag */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;"
        />
        {/* Add additional security headers */}
        <meta
          httpEquiv="X-Content-Type-Options"
          content="nosniff"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <AuthProvider>
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-green-800 text-white py-8 mt-auto">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">GrowShare</h3>
                  <p className="text-sm">
                    Working together to achieve Zero Hunger by 2030.
                    Join our mission to create a world where everyone has access to nutritious food.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="/" className="text-sm hover:underline">Home</a></li>
                    <li><a href="/projects" className="text-sm hover:underline">Projects</a></li>
                    <li><a href="/about" className="text-sm hover:underline">About SDG 2</a></li>
                    <li><a href="/signin" className="text-sm hover:underline">Sign In</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Contact</h3>
                  <p className="text-sm">Email: contact@growshare.org</p>
                  <p className="text-sm">Phone: +1234567890</p>
                  <p className="text-sm">Address: 123 Sustainability St, Eco City</p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-green-700 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} GrowShare. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
