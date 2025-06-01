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
        // In a real implementation, you would call your actual API endpoint
        // and include filters in the request
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        
        // For demo purposes, set sample projects if API fails
        setProjects(sampleProjects);
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Projects Fighting Hunger
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore and support projects that are making an impact in addressing food insecurity, 
          sustainable agriculture, and nutrition worldwide.
        </p>
      </div>

      {/* Filters section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleFilterChange('category', category.id)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filters.category === category.id
                  ? 'bg-green-600 text-white'
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
            className="px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
        <div className="mb-8">
          <Link
            href="/projects/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-green-600"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-8">
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
        <div className="text-center py-12">
          <div className="text-gray-600 mb-4 text-xl">No projects found</div>
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
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg">
      {/* Project image */}
      <div className="h-48 relative overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">{project.title.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>
      
      {/* Project content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-600">{formatCurrency(project.currentAmount)} raised</span>
            <span className="text-gray-600">{formatCurrency(project.goal)} goal</span>
          </div>
        </div>
        
        {/* Date and View button */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-gray-500">
            {new Date(project.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <Link 
            href={`/projects/${project.id}`}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
          >
            View Project
          </Link>
        </div>
      </div>
    </div>
  );
}

// Sample projects data for demonstration
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Community Garden Initiative',
    description: 'Building sustainable community gardens in urban food deserts to provide fresh produce to local residents.',
    goal: 10000,
    currentAmount: 7000,
    image: 'https://source.unsplash.com/random/800x600/?garden,community',
    createdAt: '2025-04-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'School Nutrition Program',
    description: 'Providing nutritious meals and education to children in schools located in disadvantaged communities.',
    goal: 15000,
    currentAmount: 9500,
    image: 'https://source.unsplash.com/random/800x600/?school,food',
    createdAt: '2025-05-03T14:45:00Z'
  },
  {
    id: '3',
    title: 'Smart Irrigation System',
    description: 'Deploying water-efficient irrigation technology to drought-prone agricultural regions to improve crop yields.',
    goal: 25000,
    currentAmount: 22500,
    image: 'https://source.unsplash.com/random/800x600/?irrigation,farm',
    createdAt: '2025-05-10T09:15:00Z'
  },
  {
    id: '4',
    title: 'Food Waste Reduction Initiative',
    description: 'Creating a network for distributing surplus food from restaurants and supermarkets to homeless shelters.',
    goal: 8000,
    currentAmount: 3200,
    image: 'https://source.unsplash.com/random/800x600/?food,waste',
    createdAt: '2025-05-22T11:20:00Z'
  },
  {
    id: '5',
    title: 'Sustainable Farming Workshop',
    description: 'Teaching sustainable farming techniques to rural communities to improve crop yields and reduce environmental impact.',
    goal: 12000,
    currentAmount: 5400,
    image: 'https://source.unsplash.com/random/800x600/?farming,education',
    createdAt: '2025-05-18T16:10:00Z'
  },
  {
    id: '6',
    title: 'Mobile Food Delivery for Elderly',
    description: 'Providing meal delivery service for elderly people who cannot leave their homes due to health issues.',
    goal: 18000,
    currentAmount: 12600,
    image: 'https://source.unsplash.com/random/800x600/?elderly,food',
    createdAt: '2025-05-25T13:40:00Z'
  }
];
