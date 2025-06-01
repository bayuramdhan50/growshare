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
        // In a real implementation, fetch from your API
        // const [projectsRes, donationsRes, contributionsRes] = await Promise.all([
        //   fetch('/api/user/projects'),
        //   fetch('/api/user/donations'),
        //   fetch('/api/user/contributions')
        // ]);
        
        // const projectsData = await projectsRes.json();
        // const donationsData = await donationsRes.json();
        // const contributionsData = await contributionsRes.json();
        
        // For demo, use sample data
        setUserProjects(sampleUserProjects);
        setUserDonations(sampleUserDonations);
        setUserContributions(sampleUserContributions);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
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
        <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {session?.user?.name || 'User'}
        </p>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Your Projects</h2>
              <p className="text-2xl font-semibold text-gray-900">{userProjects.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Donated</h2>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalDonated)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Contributions</h2>
              <p className="text-2xl font-semibold text-gray-900">{userContributions.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mb-8 flex flex-wrap gap-4">
        <Link 
          href="/projects/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create New Project
        </Link>
        <Link 
          href="/projects"
          className="inline-flex items-center px-4 py-2 border border-green-500 text-sm font-medium rounded-md shadow-sm text-green-600 bg-white hover:bg-green-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
          Explore Projects
        </Link>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'projects', 'donations', 'contributions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize
                ${activeTab === tab
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab}
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
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Your Recent Projects</h2>
                </div>
                {userProjects.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {userProjects.slice(0, 3).map(project => (
                      <li key={project.id}>
                        <Link href={`/projects/${project.id}`} className="block hover:bg-gray-50">
                          <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-green-600 truncate">{project.title}</p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {Math.round((project.currentAmount / project.goal) * 100)}% funded
                                </p>
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
                    <Link href="#" className="text-sm font-medium text-green-600 hover:text-green-500" onClick={() => setActiveTab('projects')}>
                      View all projects
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Recent Donations */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Your Recent Donations</h2>
                </div>
                {userDonations.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {userDonations.slice(0, 3).map(donation => (
                      <li key={donation.id}>
                        <Link href={`/projects/${donation.projectId}`} className="block hover:bg-gray-50">
                          <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">{donation.projectTitle}</p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p className="text-sm font-medium text-green-600">{formatCurrency(donation.amount)}</p>
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
                    <Link href="#" className="text-sm font-medium text-green-600 hover:text-green-500" onClick={() => setActiveTab('donations')}>
                      View all donations
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Impact Summary */}
            <div className="mt-8 bg-green-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-green-800 mb-4">Your Impact on SDG 2: Zero Hunger</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-md p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Total Donated</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalDonated)}</p>
                </div>
                <div className="bg-white rounded-md p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Projects Supported</p>
                  <p className="text-2xl font-bold text-green-600">{userDonations.length}</p>
                </div>
                <div className="bg-white rounded-md p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Contributions Made</p>
                  <p className="text-2xl font-bold text-green-600">{userContributions.length}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-green-700">
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
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Project
              </Link>
            </div>
            
            {userProjects.length > 0 ? (
              <div className="bg-white shadow overflow-hidden rounded-lg">
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
                      <tr key={project.id}>
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
                                <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                                  <span className="text-green-700 font-medium">{project.title.charAt(0)}</span>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                <Link href={`/projects/${project.id}`} className="hover:text-green-600">
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
                                className="bg-green-600 h-1.5 rounded-full" 
                                style={{ width: `${Math.min(Math.round((project.currentAmount / project.goal) * 100), 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/projects/${project.id}`} className="text-green-600 hover:text-green-900">
                            View
                          </Link>
                          {/* In a real app, you'd have edit functionality */}
                          {/* <Link href={`/projects/edit/${project.id}`} className="text-indigo-600 hover:text-indigo-900 ml-4">
                            Edit
                          </Link> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No projects yet</h3>
                <p className="text-gray-500 mb-6">Get started by creating your first project to fight hunger.</p>
                <Link 
                  href="/projects/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
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
              <div className="bg-white shadow overflow-hidden rounded-lg">
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
                      <tr key={donation.id}>
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
                          <Link href={`/projects/${donation.projectId}`} className="text-green-600 hover:text-green-900">
                            View Project
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No donations yet</h3>
                <p className="text-gray-500 mb-6">Support a project to help fight hunger around the world.</p>
                <Link 
                  href="/projects"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
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
              <div className="bg-white shadow overflow-hidden rounded-lg">
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
                      <tr key={contribution.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {contribution.projectTitle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(contribution.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {contribution.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {contribution.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/projects/${contribution.projectId}`} className="text-green-600 hover:text-green-900">
                            View Project
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No contributions yet</h3>
                <p className="text-gray-500 mb-6">Contribute your time, knowledge or resources to support projects.</p>
                <Link 
                  href="/projects"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
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

// Sample data for demonstration
const sampleUserProjects: Project[] = [
  {
    id: '1',
    title: 'Community Garden Initiative',
    goal: 10000,
    currentAmount: 7000,
    image: 'https://source.unsplash.com/random/800x600/?garden,community',
    createdAt: '2025-04-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'School Nutrition Program',
    goal: 15000,
    currentAmount: 3500,
    image: 'https://source.unsplash.com/random/800x600/?school,food',
    createdAt: '2025-05-03T14:45:00Z'
  }
];

const sampleUserDonations: Donation[] = [
  {
    id: 'donate1',
    amount: 100,
    projectId: '3',
    projectTitle: 'Smart Irrigation System',
    createdAt: '2025-05-20T09:15:00Z'
  },
  {
    id: 'donate2',
    amount: 50,
    projectId: '4',
    projectTitle: 'Food Waste Reduction Initiative',
    createdAt: '2025-05-10T16:30:00Z'
  },
  {
    id: 'donate3',
    amount: 75,
    projectId: '5',
    projectTitle: 'Sustainable Farming Workshop',
    createdAt: '2025-04-28T11:45:00Z'
  },
  {
    id: 'donate4',
    amount: 200,
    projectId: '6',
    projectTitle: 'Mobile Food Delivery for Elderly',
    createdAt: '2025-04-15T14:20:00Z'
  }
];

const sampleUserContributions: Contribution[] = [
  {
    id: 'contrib1',
    description: 'Volunteered 10 hours to help set up the community garden',
    type: 'VOLUNTEER',
    projectId: '1',
    projectTitle: 'Community Garden Initiative',
    createdAt: '2025-05-15T16:00:00Z'
  },
  {
    id: 'contrib2',
    description: 'Shared knowledge about sustainable gardening practices',
    type: 'KNOWLEDGE',
    projectId: '1',
    projectTitle: 'Community Garden Initiative',
    createdAt: '2025-05-05T10:30:00Z'
  }
];
