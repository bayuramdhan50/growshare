'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Project and Donation types
type Project = {
  id: string;
  title: string;
  description: string;
  goal: number;
  currentAmount: number;
  image?: string;
  createdAt: string;
  userId: string;
  user: {
    name: string;
    id: string;
  };
};

type Donation = {
  id: string;
  amount: number;
  message?: string;
  createdAt: string;
  user: {
    name: string;
  };
};

export default function ProjectPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  
  const [project, setProject] = useState<Project | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(10);
  const [donationMessage, setDonationMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
  // Fetch project data
  useEffect(() => {
    async function fetchProjectData() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/projects/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to load project');
        }
        
        const data = await response.json();
        setProject(data.project);
        setDonations(data.donations);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchProjectData();
    }
  }, [id]);
  // Handle donation submission
  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      router.push('/signin?callbackUrl=' + encodeURIComponent(`/projects/${id}`));
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: id,
          amount: donationAmount,
          message: donationMessage || undefined
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process donation');
      }
      
      setDonationSuccess(true);
      setDonationAmount(10);
      setDonationMessage('');
      
      // Refresh project data to get updated amount and donations
      const projectResponse = await fetch(`/api/projects/${id}`);
      if (projectResponse.ok) {
        const data = await projectResponse.json();
        setProject(data.project);
        setDonations(data.donations);
      }
    } catch (err) {
      console.error('Error processing donation:', err);
      setError(`Failed to process donation: ${err instanceof Error ? err.message : 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate progress percentage
  const progressPercentage = project
    ? Math.min(Math.round((project.currentAmount / project.goal) * 100), 100)
    : 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600"></div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error || 'Project not found'}</p>
            </div>
          </div>
        </div>
        <Link href="/projects" className="text-green-600 hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back navigation */}
      <div className="mb-6">
        <Link href="/projects" className="text-green-600 hover:underline inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Donation success message */}
      {donationSuccess && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">Thank you for your donation! Your support makes a difference.</p>
            </div>
            <div className="ml-auto">
              <button 
                type="button"
                onClick={() => setDonationSuccess(false)}
                className="text-green-700"
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Project details */}
        <div className="lg:col-span-2">
          {/* Project image */}
          <div className="rounded-lg overflow-hidden shadow-md mb-8 relative h-96">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-4xl">{project.title.charAt(0)}</span>
              </div>
            )}
          </div>
          
          {/* Project information */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
          
          <div className="flex items-center mb-6">
            <div className="text-sm text-gray-500">
              Created by {project.user.name} • {new Date(project.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-600 h-3 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <div>
                <span className="text-2xl font-bold text-green-600">{formatCurrency(project.currentAmount)}</span>
                <span className="text-gray-600 ml-1">raised of {formatCurrency(project.goal)} goal</span>
              </div>
              <div className="text-gray-700 font-medium">{progressPercentage}%</div>
            </div>
          </div>
          
          {/* Project description */}
          <div className="prose prose-green max-w-none mt-6">
            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
            {/* In a real app, you'd render HTML or markdown content safely here */}
            <p className="whitespace-pre-line">{project.description}</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Impact</h2>
            <p>By supporting this project, you're directly contributing to Sustainable Development Goal 2: Zero Hunger. Your donation helps ensure food security, promote sustainable agriculture, and improve nutrition for those who need it most.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Timeline</h2>
            <p>This project has a scheduled implementation period of 6 months, with regular updates provided to all supporters. The funds will be used for:</p>
            <ul className="list-disc pl-5">
              <li>Purchasing seeds, tools, and equipment</li>
              <li>Training community members in sustainable farming practices</li>
              <li>Building necessary infrastructure</li>
              <li>Creating educational materials on nutrition</li>
            </ul>
          </div>
          
          {/* Donations list */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recent Supporters</h2>
            
            {donations.length === 0 ? (
              <p className="text-gray-600 italic">Be the first to support this project!</p>
            ) : (
              <div className="space-y-4">
                {donations.map((donation) => (
                  <div key={donation.id} className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between">
                      <div className="font-medium">{donation.user.name}</div>
                      <div className="text-green-600 font-medium">{formatCurrency(donation.amount)}</div>
                    </div>
                    {donation.message && (
                      <p className="text-gray-600 mt-1 text-sm">{donation.message}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(donation.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Donation sidebar */}
        <div className="lg:col-start-3">
          <div className="sticky top-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Support This Project</h3>
              <p className="text-gray-600 mb-6">Your donation will help fight hunger and improve food security for communities in need.</p>
              
              <form onSubmit={handleDonation}>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Donation Amount (USD)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      min="1"
                      step="1"
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex space-x-2">
                    {[10, 25, 50, 100].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={`flex-1 py-2 px-3 border rounded-md text-sm ${
                          donationAmount === amount
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setDonationAmount(amount)}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Add a message of support..."
                    value={donationMessage}
                    onChange={(e) => setDonationMessage(e.target.value)}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || donationAmount <= 0}
                  className={`w-full py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                    (isSubmitting || donationAmount <= 0) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Processing...' : `Donate ${formatCurrency(donationAmount)}`}
                </button>
                
                {!session && (
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    You'll need to sign in to complete your donation.
                  </p>
                )}
              </form>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="text-sm text-gray-500">
                  <p className="mb-2">Your donation is secure and will go directly to supporting this project.</p>
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure donation</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Share buttons */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Share this project</h3>
              <div className="flex space-x-4">
                <button className="text-gray-500 hover:text-gray-800">
                  <span className="sr-only">Share on Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-800">
                  <span className="sr-only">Share on Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-800">
                  <span className="sr-only">Share via Email</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


