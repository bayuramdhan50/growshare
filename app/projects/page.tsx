'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

// Project type definition
type Project = {
  id: string;
  title: string;
  description: string;
  goal: number;
  currentAmount: number;
  image?: string;
  createdAt: string;
};

export default function ProjectsPage() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'newest'
  });

  // Sample categories for filtering
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'education', name: 'Education' },
    { id: 'technology', name: 'Technology' },
    { id: 'community', name: 'Community' }
  ];
  // Fetch projects from API
  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      setError(null);

      try {
        // Build query parameters based on filters
        const queryParams = new URLSearchParams();
        
        if (filters.sortBy === 'newest') {
          queryParams.append('sort', 'createdAt:desc');
        } else if (filters.sortBy === 'oldest') {
          queryParams.append('sort', 'createdAt:asc');
        } else if (filters.sortBy === 'goal-high') {
          queryParams.append('sort', 'goal:desc');
        } else if (filters.sortBy === 'goal-low') {
          queryParams.append('sort', 'goal:asc');
        } else if (filters.sortBy === 'progress') {
          queryParams.append('sort', 'currentAmount:desc');
        }
        
        // Call the real API endpoint
        const response = await fetch(`/api/projects?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
          Projects Fighting Hunger
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore and support projects that are making an impact in addressing food insecurity, 
          sustainable agriculture, and nutrition worldwide.
        </p>
      </div>

      {/* Header image with SDG2 badge */}
      <div className="relative rounded-2xl overflow-hidden mb-12 shadow-lg">
        <div className="h-64 lg:h-80 relative">
          <Image
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=500&q=80"
            alt="Sustainable farming"
            fill
            style={{ objectFit: 'cover' }}
            className="brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-white max-w-xl">
          <div className="flex items-center mb-4">
            <div className="bg-white rounded-full h-14 w-14 flex items-center justify-center mr-4">
              <div className="text-primary font-bold text-xl">SDG2</div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Zero Hunger</h2>
              <p className="text-sm opacity-90">Sustainable Development Goal 2</p>
            </div>
          </div>
          <p className="hidden md:block text-white/90 text-lg font-light">
            Join us in the global effort to end hunger, improve nutrition, and promote sustainable agriculture.
          </p>
        </div>
      </div>

      {/* Filters section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleFilterChange('category', category.id)}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                filters.category === category.id
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-sm'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="goal-high">Highest Goal</option>
            <option value="goal-low">Lowest Goal</option>
            <option value="progress">Most Funded</option>
          </select>
        </div>
      </div>

      {/* Create project button (if authenticated) */}
      {session && (
        <div className="mb-10">
          <Link
            href="/projects/create"
            className="btn-primary inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create New Project
          </Link>
        </div>
      )}

      {/* Loading and error states */}
      {isLoading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-primary"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading projects...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-8 rounded-md">
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

      {/* Projects grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* No projects found */}
      {!isLoading && !error && projects.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <div className="text-gray-600 mb-4 text-xl font-medium">No projects found</div>
          <p className="text-gray-500">Try adjusting your filters or check back later for new projects.</p>
        </div>
      )}
    </div>
  );
}

// Project card component
function ProjectCard({ project }: { project: Project }) {
  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round((project.currentAmount / project.goal) * 100), 100);
  
  // Format numbers as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col">
      {/* Project image */}
      <div className="h-48 relative overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-2xl">{project.title.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-0 transition-opacity duration-300"></div>
      </div>
      
      {/* Project content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2 hover:text-primary transition-colors duration-200">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{project.description}</p>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-primary to-primary-dark h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-600">{formatCurrency(project.currentAmount)} raised</span>
            <span className="text-gray-600">{progressPercentage}% of {formatCurrency(project.goal)}</span>
          </div>
        </div>
        
        {/* Date and View button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            {new Date(project.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <Link 
            href={`/projects/${project.id}`}
            className="btn-primary-sm"
          >
            View Project
          </Link>
        </div>
      </div>
    </div>
  );
}


