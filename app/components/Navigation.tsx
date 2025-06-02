'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Navigation() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center transition transform hover:scale-105">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 2a8 8 0 0 1 7 12h-4a4 4 0 0 0-3-3 4 4 0 0 0-3 3H5a8 8 0 0 1 7-12z"></path>
                </svg>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">GrowShare</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-6">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-700 transition duration-200 hover:scale-105">
              Home
            </Link>
            <Link href="/projects" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-700 transition duration-200 hover:scale-105">
              Projects
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-700 transition duration-200 hover:scale-105">
              About Zero Hunger
            </Link>
            
            {/* Authentication links */}
            {status === 'authenticated' ? (
              <>
                <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-700 relative group transition duration-200 hover:scale-105">
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/signin"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 shadow-sm hover:shadow-md transition duration-200"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium border-2 border-green-600 text-green-600 hover:bg-green-50 shadow-sm hover:shadow-md transition duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 focus:outline-none"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700">
            Home
          </Link>
          <Link href="/projects" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700">
            Projects
          </Link>
          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700">
            About Zero Hunger
          </Link>
          
          {/* Authentication links */}
          {status === 'authenticated' ? (
            <>
              <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700">
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/signin"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Sign In
              </Link>
              <Link 
                href="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium border border-green-600 text-green-600 hover:bg-green-50"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
