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
      {/* Header */}
      <div className="mb-8 flex items-center">
        <Link href="/projects" className="text-primary hover:text-primary-dark inline-flex items-center transition-colors mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
          Create New Project
        </h1>
      </div>

      <div className="bg-white shadow-sm rounded-xl p-6 sm:p-8 border border-gray-100">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
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
        
        <p className="text-gray-600 mb-6">
          Create a new project to tackle hunger and improve food security. Your project will be reviewed by our team before being published.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Project Title<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-primary pl-10 ${
                  touched.title && errors.title ? 'input-error' : ''
                }`}
                placeholder="E.g., Community Garden Initiative"
              />
            </div>
            {touched.title && errors.title && (
              <p className="mt-2 text-sm text-red-600">{errors.title}</p>
            )}
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <select
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-primary pl-10 ${
                  touched.category && errors.category ? 'input-error' : ''
                }`}
              >
                <option value="" disabled>Select a category</option>
                {projectCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {touched.category && errors.category && (
              <p className="mt-2 text-sm text-red-600">{errors.category}</p>
            )}
          </div>
          
          {/* Funding Goal */}
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
              Funding Goal (USD)<span className="text-red-600">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
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
                className={`input-primary pl-7 pr-12 ${
                  touched.goal && errors.goal ? 'input-error' : ''
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
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={values.imageUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-primary pl-10 ${
                  touched.imageUrl && errors.imageUrl ? 'input-error' : ''
                }`}
                placeholder="https://example.com/image.jpg"
              />
            </div>
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
              className={`input-primary ${
                touched.description && errors.description ? 'input-error' : ''
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
          <div className="bg-gradient-to-br from-green-50 to-primary-light p-6 rounded-lg shadow-sm border border-green-100">
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-3 shadow-sm">
                <span className="text-primary font-bold text-sm">SDG2</span>
              </div>
              <h3 className="font-medium text-primary-dark">Zero Hunger Alignment</h3>
            </div>
            <p className="text-sm text-green-800">
              Your project should align with at least one of these SDG 2 targets:
            </p>
            <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-800">End hunger and ensure access to safe, nutritious food</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-800">End all forms of malnutrition</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-800">Double agricultural productivity and incomes of small-scale food producers</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-800">Ensure sustainable food production systems</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-800">Maintain genetic diversity of seeds, plants, and animals</span>
              </li>
            </ul>
          </div>
          
          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Link
              href="/projects"
              className="btn-outline"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
        <h3 className="text-sm font-medium text-blue-800 flex items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Project Guidelines
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-5">
          <li className="text-xs text-blue-700 flex items-start">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 mr-2 mt-1.5"></span>
            All projects must align with SDG 2: Zero Hunger goals
          </li>
          <li className="text-xs text-blue-700 flex items-start">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 mr-2 mt-1.5"></span>
            Projects will be reviewed within 2-3 business days before becoming public
          </li>
          <li className="text-xs text-blue-700 flex items-start">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 mr-2 mt-1.5"></span>
            Include clear, specific details about how funds will be used
          </li>
          <li className="text-xs text-blue-700 flex items-start">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 mr-2 mt-1.5"></span>
            Set realistic funding goals based on project needs
          </li>
          <li className="text-xs text-blue-700 flex items-start col-span-1 md:col-span-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 mr-2 mt-1.5"></span>
            Be prepared to provide regular updates on project progress
          </li>
        </ul>
      </div>
    </div>
  );
}
