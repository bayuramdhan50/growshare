'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Type definitions
type Project = {
  id: string;
  title: string;
  goal: number;
  currentAmount: number;
  image?: string;
  createdAt: string;
};

type Donation = {
  id: string;
  amount: number;
  projectId: string;
  projectTitle: string;
  createdAt: string;
};

type Contribution = {
  id: string;
  description: string;
  type: string;
  projectId: string;
  projectTitle: string;
  createdAt: string;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [userDonations, setUserDonations] = useState<Donation[]>([]);
  const [userContributions, setUserContributions] = useState<Contribution[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin?callbackUrl=/dashboard');
    }
  }, [status, router]);
  // Fetch user data
  useEffect(() => {
    async function fetchUserData() {
      if (status !== 'authenticated') return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const [projectsRes, donationsRes, contributionsRes] = await Promise.all([
          fetch('/api/user/projects'),
          fetch('/api/user/donations'),
          fetch('/api/user/contributions')
        ]);
        
        let projectsData = [];
        let donationsData = [];
        let contributionsData = [];
        
        if (projectsRes.ok) {
          const data = await projectsRes.json();
          projectsData = data.projects;
        } else {
          throw new Error('Failed to fetch projects');
        }
        
        if (donationsRes.ok) {
          const data = await donationsRes.json();
          donationsData = data.donations;
        } else {
          throw new Error('Failed to fetch donations');
        }
        
        if (contributionsRes.ok) {
          const data = await contributionsRes.json();
          contributionsData = data.contributions;
        } else {
          throw new Error('Failed to fetch contributions');
        }
        
        setUserProjects(projectsData);
        setUserDonations(donationsData);
        setUserContributions(contributionsData);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load your data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchUserData();
  }, [status]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Calculate total donated
  const totalDonated = userDonations.reduce((sum, donation) => sum + donation.amount, 0);
  
  // Loading state
  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Not authenticated
  if (status === 'unauthenticated') {
    return null; // Router will redirect
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800 inline-block">
              Your Dashboard
            </h1>
            <p className="text-gray-600 mt-1 text-lg">
              Welcome back, <span className="font-medium text-green-700">{session?.user?.name || 'User'}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">Track your contributions to Zero Hunger and manage your projects</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-800 text-sm font-medium border border-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          <div className="bg-gradient-to-r from-green-400 to-green-600 h-1.5"></div>
          <div className="p-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm uppercase tracking-wider font-medium text-gray-500">Your Projects</h2>
                <p className="text-2xl font-bold text-gray-900">{userProjects.length}</p>
                <p className="text-xs mt-1 text-green-600">{userProjects.length > 0 ? 'Active initiatives towards SDG 2' : 'Start your first project today'}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5"></div>
          <div className="p-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm uppercase tracking-wider font-medium text-gray-500">Total Donated</h2>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalDonated)}</p>
                <p className="text-xs mt-1 text-blue-600">{userDonations.length} {userDonations.length === 1 ? 'donation' : 'donations'} made</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-1.5"></div>
          <div className="p-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm uppercase tracking-wider font-medium text-gray-500">Contributions</h2>
                <p className="text-2xl font-bold text-gray-900">{userContributions.length}</p>
                <p className="text-xs mt-1 text-purple-600">Non-monetary support provided</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mb-10">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/projects/create"
              className="relative inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 transition-all duration-300 group overflow-hidden"
            >
              <span className="absolute inset-0 bg-green-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New Project
            </Link>
            <Link 
              href="/projects"
              className="relative inline-flex items-center px-6 py-3 border-2 border-green-600 text-sm font-medium rounded-lg shadow-sm text-green-600 bg-white hover:bg-green-50 transition-all duration-300 group"
            >
              <span className="absolute inset-0 bg-green-600 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity duration-300"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              Explore Projects
            </Link>
            <Link 
              href="/about"
              className="relative inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Learn About SDG 2
            </Link>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        <nav className="flex space-x-2">
          {['overview', 'projects', 'donations', 'contributions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${activeTab === tab
                  ? 'text-white bg-gradient-to-r from-green-600 to-green-700 shadow-sm'
                  : 'text-gray-700 hover:text-green-700 hover:bg-green-50'}
              `}
            >
              <span className="capitalize">{tab}</span>
              {activeTab === tab && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"></span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Projects */}
              <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Your Recent Projects</h2>
                </div>
                {userProjects.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {userProjects.slice(0, 3).map(project => (
                      <li key={project.id}>
                        <Link href={`/projects/${project.id}`} className="block hover:bg-gray-50 transition-colors duration-150">
                          <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-primary truncate">{project.title}</p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <span className="badge badge-success">
                                  {Math.round((project.currentAmount / project.goal) * 100)}% funded
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 flex justify-between">
                              <div className="text-sm text-gray-500">
                                {formatCurrency(project.currentAmount)} of {formatCurrency(project.goal)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {formatDate(project.createdAt)}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-gray-500 italic">
                    You haven't created any projects yet.
                  </div>
                )}
                {userProjects.length > 0 && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <Link href="#" className="text-sm font-medium text-primary hover:text-primary-dark" onClick={() => setActiveTab('projects')}>
                      View all projects
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Recent Donations */}
              <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Your Recent Donations</h2>
                </div>
                {userDonations.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {userDonations.slice(0, 3).map(donation => (
                      <li key={donation.id}>
                        <Link href={`/projects/${donation.projectId}`} className="block hover:bg-gray-50 transition-colors duration-150">
                          <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">{donation.projectTitle}</p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p className="text-sm font-medium text-primary">{formatCurrency(donation.amount)}</p>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <p className="text-sm text-gray-500">Donation</p>
                              <p className="mt-1 text-sm text-gray-500 sm:mt-0">
                                {formatDate(donation.createdAt)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-gray-500 italic">
                    You haven't made any donations yet.
                  </div>
                )}
                {userDonations.length > 0 && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <Link href="#" className="text-sm font-medium text-primary hover:text-primary-dark" onClick={() => setActiveTab('donations')}>
                      View all donations
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Impact Summary */}
            <div className="mt-8 bg-gradient-to-br from-green-50 to-primary-light rounded-xl p-8 shadow-sm border border-green-100">
              <h2 className="text-lg font-medium text-primary-dark mb-4">Your Impact on SDG 2: Zero Hunger</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                  <p className="text-sm font-medium uppercase tracking-wider text-gray-500">Total Donated</p>
                  <p className="text-2xl font-bold text-primary-dark">{formatCurrency(totalDonated)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                  <p className="text-sm font-medium uppercase tracking-wider text-gray-500">Projects Supported</p>
                  <p className="text-2xl font-bold text-primary-dark">{userDonations.length}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                  <p className="text-sm font-medium uppercase tracking-wider text-gray-500">Contributions Made</p>
                  <p className="text-2xl font-bold text-primary-dark">{userContributions.length}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-primary-dark">
                Thank you for your contribution to achieving Zero Hunger! Your support helps build sustainable food systems and improve nutrition worldwide.
              </p>
            </div>
          </div>
        )}
        
        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-900">Your Projects</h2>
              <Link 
                href="/projects/create"
                className="btn-primary-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Project
              </Link>
            </div>
            
            {userProjects.length > 0 ? (
              <div className="bg-white shadow-sm overflow-hidden rounded-xl border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Goal
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              {project.image ? (
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-md bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
                                  <span className="text-white font-medium">{project.title.charAt(0)}</span>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                <Link href={`/projects/${project.id}`} className="hover:text-primary">
                                  {project.title}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(project.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(project.goal)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">
                              {formatCurrency(project.currentAmount)} ({Math.round((project.currentAmount / project.goal) * 100)}%)
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${Math.min(Math.round((project.currentAmount / project.goal) * 100), 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/projects/${project.id}`} className="text-primary hover:text-primary-dark">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white shadow-sm rounded-xl p-8 text-center border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No projects yet</h3>
                <p className="text-gray-500 mb-6">Get started by creating your first project to fight hunger.</p>
                <Link 
                  href="/projects/create"
                  className="btn-primary"
                >
                  Create Your First Project
                </Link>
              </div>
            )}
          </div>
        )}
        
        {/* Donations Tab */}
        {activeTab === 'donations' && (
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-6">Your Donations</h2>
            
            {userDonations.length > 0 ? (
              <div className="bg-white shadow-sm overflow-hidden rounded-xl border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userDonations.map((donation) => (
                      <tr key={donation.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {donation.projectTitle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(donation.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(donation.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/projects/${donation.projectId}`} className="text-primary hover:text-primary-dark">
                            View Project
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white shadow-sm rounded-xl p-8 text-center border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No donations yet</h3>
                <p className="text-gray-500 mb-6">Support a project to help fight hunger around the world.</p>
                <Link 
                  href="/projects"
                  className="btn-primary"
                >
                  Explore Projects
                </Link>
              </div>
            )}
          </div>
        )}
        
        {/* Contributions Tab */}
        {activeTab === 'contributions' && (
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-6">Your Contributions</h2>
            
            {userContributions.length > 0 ? (
              <div className="bg-white shadow-sm overflow-hidden rounded-xl border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userContributions.map((contribution) => (
                      <tr key={contribution.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {contribution.projectTitle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(contribution.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="badge badge-success">
                            {contribution.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {contribution.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/projects/${contribution.projectId}`} className="text-primary hover:text-primary-dark">
                            View Project
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white shadow-sm rounded-xl p-8 text-center border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No contributions yet</h3>
                <p className="text-gray-500 mb-6">Contribute your time, knowledge or resources to support projects.</p>
                <Link 
                  href="/projects"
                  className="btn-primary"
                >
                  Find Projects to Support
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


