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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-8 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error || 'Project not found'}</p>
            </div>
          </div>
        </div>
        <Link href="/projects" className="btn-primary-sm">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Back navigation */}
      <div className="mb-6">
        <Link href="/projects" className="text-primary hover:text-primary-dark inline-flex items-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Donation success message */}
      {donationSuccess && (
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 p-4 mb-8 rounded-md shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-green-800">Thank you for your donation! Your support makes a difference.</p>
              <p className="mt-1 text-sm text-green-700">Together, we're making progress toward Zero Hunger.</p>
            </div>
            <button 
              type="button"
              onClick={() => setDonationSuccess(false)}
              className="ml-auto pl-3 text-green-500 hover:text-green-800 transition-colors"
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Project details */}
        <div className="lg:col-span-2">
          {/* Project image */}
          <div className="rounded-xl overflow-hidden shadow-md mb-8 relative h-96">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-5xl">{project.title.charAt(0)}</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent h-32 flex items-end">
              <div className="p-6">
                <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm text-white font-medium">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                  SDG 2: Zero Hunger
                </div>
              </div>
            </div>
          </div>
          
          {/* Project information */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
            {project.title}
          </h1>
          
          <div className="flex items-center mb-6">
            <div className="h-10 w-10 bg-gradient-to-br from-primary-light to-primary rounded-full flex items-center justify-center text-white font-medium">
              {project.user.name.charAt(0)}
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">{project.user.name}</div>
              <div className="text-xs text-gray-500">
                {new Date(project.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-full bg-gray-200 rounded-full h-3.5">
              <div 
                className="bg-gradient-to-r from-primary to-primary-dark h-3.5 rounded-full relative overflow-hidden"
                style={{ width: `${progressPercentage}%` }}
              >
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 w-full">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4 items-center">
              <div>
                <span className="text-2xl font-bold text-primary">{formatCurrency(project.currentAmount)}</span>
                <span className="text-gray-600 ml-1">raised of {formatCurrency(project.goal)} goal</span>
              </div>
              <div className="bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full text-sm">
                {progressPercentage}% funded
              </div>
            </div>
          </div>
          
          {/* Project description */}
          <div className="prose prose-green prose-lg max-w-none mt-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About This Project
              </h2>
              <div className="text-gray-700 whitespace-pre-line">{project.description}</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-primary-light p-6 rounded-xl shadow-sm border border-green-100 mb-8">
              <h2 className="text-2xl font-bold text-primary-dark mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Impact
              </h2>
              <p className="text-primary-dark">By supporting this project, you're directly contributing to Sustainable Development Goal 2: Zero Hunger. Your donation helps ensure food security, promote sustainable agriculture, and improve nutrition for those who need it most.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Timeline
              </h2>
              <p className="text-gray-700 mb-4">This project has a scheduled implementation period of 6 months, with regular updates provided to all supporters. The funds will be used for:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Purchasing seeds, tools, and equipment</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Training community members in sustainable farming practices</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Building necessary infrastructure</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Creating educational materials on nutrition</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Donations list */}
          <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Supporters
            </h2>
            
            {donations.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Be the first to support this project!</p>
                <p className="text-gray-500 text-sm mt-1">Your contribution will help make this project a reality.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {donations.map((donation) => (
                  <div key={donation.id} className="bg-gray-50 rounded-lg p-4 transition-all hover:bg-gray-100">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gradient-to-br from-primary-light to-primary rounded-full flex items-center justify-center text-white font-medium">
                          {donation.user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{donation.user.name}</div>
                          <div className="text-gray-500 text-xs">
                            {new Date(donation.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="text-primary font-medium">
                        {formatCurrency(donation.amount)}
                      </div>
                    </div>
                    {donation.message && (
                      <blockquote className="mt-3 text-gray-600 text-sm border-l-2 border-gray-200 pl-3 italic">
                        {donation.message}
                      </blockquote>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Donation sidebar */}
        <div className="lg:col-start-3">
          <div className="sticky top-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Support This Project</h3>
              <p className="text-gray-600 mb-6">Your donation will help fight hunger and improve food security for communities in need.</p>
              
              <form onSubmit={handleDonation}>
                <div className="mb-6">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="input-primary pl-7"
                      placeholder="0"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {[10, 25, 50, 100].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={`py-2 px-4 rounded-full text-sm transition-all ${
                          donationAmount === amount
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setDonationAmount(amount)}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="input-primary"
                    placeholder="Add a message of support..."
                    value={donationMessage}
                    onChange={(e) => setDonationMessage(e.target.value)}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || donationAmount <= 0}
                  className={`btn-primary w-full ${
                    (isSubmitting || donationAmount <= 0) ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : `Donate ${formatCurrency(donationAmount)}`}
                </button>
                
                {!session && (
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    You'll need to sign in to complete your donation.
                  </p>
                )}
              </form>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="text-sm text-gray-600">
                  <div className="mb-3 flex items-center text-center justify-center">
                    <svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Secure donation</span>
                  </div>
                  <p className="text-center text-gray-500 text-xs">
                    Your donation is secure and will go directly to supporting this project. GrowShare takes no fees from your donation.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Share buttons */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share this project
              </h3>
              <div className="flex space-x-4 items-center justify-center">
                <button className="h-10 w-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors">
                  <span className="sr-only">Share on Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="h-10 w-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center text-white transition-colors">
                  <span className="sr-only">Share on Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="h-10 w-10 bg-gray-500 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors">
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


