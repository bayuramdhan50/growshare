'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

export default function CreateProjectPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect if not logged in
  if (!session) {
    router.push('/signin?callbackUrl=/projects/create');
    return null;
  }

  // Form validation schema
  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .min(5, 'Title must be at least 5 characters')
      .max(100, 'Title cannot exceed 100 characters'),
    description: Yup.string()
      .required('Description is required')
      .min(100, 'Description must be at least 100 characters')
      .max(5000, 'Description cannot exceed 5000 characters'),
    goal: Yup.number()
      .required('Goal amount is required')
      .min(100, 'Goal must be at least $100')
      .max(1000000, 'Goal cannot exceed $1,000,000'),
    category: Yup.string()
      .required('Category is required'),
    imageUrl: Yup.string()
      .url('Must be a valid URL')
      .nullable(),
  });

  // Project categories
  const projectCategories = [
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'education', name: 'Education' },
    { id: 'technology', name: 'Technology' },
    { id: 'community', name: 'Community Development' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'food-distribution', name: 'Food Distribution' },
    { id: 'research', name: 'Research & Innovation' },
  ];

  // Form initialization
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      goal: 1000,
      category: '',
      imageUrl: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            goal: Number(values.goal),
            image: values.imageUrl || undefined
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create project');
        }
        
        // Redirect to projects page on success
        router.push('/projects');
      } catch (err) {
        console.error('Error creating project:', err);
        setError(`Failed to create project: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  });
  
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/projects" className="text-green-600 hover:underline inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Projects
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h1>
        
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
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Project Title<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                touched.title && errors.title 
                  ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
              }`}
              placeholder="E.g., Community Garden Initiative"
            />
            {touched.title && errors.title && (
              <p className="mt-2 text-sm text-red-600">{errors.title}</p>
            )}
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category<span className="text-red-600">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full pl-3 pr-10 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                touched.category && errors.category 
                  ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
              }`}
            >
              <option value="" disabled>Select a category</option>
              {projectCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {touched.category && errors.category && (
              <p className="mt-2 text-sm text-red-600">{errors.category}</p>
            )}
          </div>
          
          {/* Funding Goal */}
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
              Funding Goal (USD)<span className="text-red-600">*</span>
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="goal"
                name="goal"
                value={values.goal}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`appearance-none block w-full pl-7 pr-12 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                  touched.goal && errors.goal 
                    ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                }`}
                placeholder="1000"
                min="100"
                step="100"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">USD</span>
              </div>
            </div>
            {touched.goal && errors.goal && (
              <p className="mt-2 text-sm text-red-600">{errors.goal}</p>
            )}
          </div>
          
          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image URL (Optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={values.imageUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                touched.imageUrl && errors.imageUrl 
                  ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {touched.imageUrl && errors.imageUrl && (
              <p className="mt-2 text-sm text-red-600">{errors.imageUrl}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              For security, we recommend using images from trusted sources like Unsplash or similar services.
            </p>
          </div>
          
          {/* Project Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Project Description<span className="text-red-600">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={10}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                touched.description && errors.description 
                  ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
              }`}
              placeholder="Describe your project in detail. Explain how it addresses hunger or food security, who it will help, and how the funds will be used."
            ></textarea>
            {touched.description && errors.description && (
              <p className="mt-2 text-sm text-red-600">{errors.description}</p>
            )}
            <div className="mt-1 text-xs text-gray-500 flex justify-between">
              <span>Min 100 characters</span>
              <span>{values.description.length}/5000 characters</span>
            </div>
          </div>
          
          {/* SDG 2 Alignment */}
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="font-medium text-green-800 mb-2">SDG 2: Zero Hunger Alignment</h3>
            <p className="text-sm text-green-700">
              Your project should align with at least one of these SDG 2 targets:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-green-700 space-y-1">
              <li>End hunger and ensure access to safe, nutritious food</li>
              <li>End all forms of malnutrition</li>
              <li>Double agricultural productivity and incomes of small-scale food producers</li>
              <li>Ensure sustainable food production systems</li>
              <li>Maintain genetic diversity of seeds, plants, and animals</li>
            </ul>
          </div>
          
          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Link
              href="/projects"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Project Guidelines</h3>
        <ul className="list-disc pl-5 text-xs text-blue-700 space-y-1">
          <li>All projects must align with SDG 2: Zero Hunger goals</li>
          <li>Projects will be reviewed within 2-3 business days before becoming public</li>
          <li>Include clear, specific details about how funds will be used</li>
          <li>Set realistic funding goals based on project needs</li>
          <li>Be prepared to provide regular updates on project progress</li>
        </ul>
      </div>
    </div>
  );
}
