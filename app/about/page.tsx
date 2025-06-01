import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About SDG 2: Zero Hunger | GrowShare',
  description: 'Learn about Sustainable Development Goal 2 (Zero Hunger) and how GrowShare is working to achieve it.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Sustainable Development Goal 2: Zero Hunger</h1>
        <p className="text-xl text-gray-600">
          Working together to end hunger, achieve food security, improve nutrition, and promote sustainable agriculture by 2030.
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image 
                src="https://source.unsplash.com/random/600x400/?farming,agriculture" 
                alt="Sustainable agriculture"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-green-700 mb-4">What is SDG 2?</h2>
            <p className="mb-4">
              The Sustainable Development Goal 2 (Zero Hunger) aims to end hunger, achieve food security and improved nutrition, 
              and promote sustainable agriculture. It is one of the 17 Sustainable Development Goals established by the 
              United Nations in 2015.
            </p>
            <p>
              Despite progress in recent decades, more than 690 million people still go hungry, and the COVID-19 pandemic 
              is exacerbating food insecurity globally. SDG 2 addresses these challenges by working to ensure that everyone, 
              everywhere has enough good-quality food to lead a healthy life.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Key Targets</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>End hunger and ensure access to safe, nutritious, and sufficient food all year round for all people</li>
            <li>End all forms of malnutrition, including stunting and wasting in children under 5</li>
            <li>Double agricultural productivity and incomes of small-scale food producers</li>
            <li>Ensure sustainable food production systems and resilient agricultural practices</li>
            <li>Maintain genetic diversity of seeds, cultivated plants, and farmed animals</li>
            <li>Increase investment in rural infrastructure, agricultural research, and technology</li>
            <li>Prevent agricultural trade restrictions and market distortions</li>
            <li>Ensure proper functioning of food commodity markets to limit extreme food price volatility</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Current Challenges</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>Globally, one in nine people are undernourished</li>
            <li>Agricultural systems are increasingly affected by climate change</li>
            <li>Small-scale farmers face persistent obstacles to improve productivity</li>
            <li>Food waste accounts for approximately 1/3 of all food produced globally</li>
            <li>Conflict and political instability disrupt food production and distribution</li>
            <li>COVID-19 pandemic has worsened food security in vulnerable regions</li>
            <li>Sustainable farming practices face economic barriers to adoption</li>
          </ul>
        </div>
      </section>

      <section className="bg-green-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-6">How GrowShare Contributes to SDG 2</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Funding Projects</h3>
            <p className="text-gray-600">
              We connect donors with impactful agricultural and food security projects around the world, 
              providing necessary funding for communities in need.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Knowledge Sharing</h3>
            <p className="text-gray-600">
              We facilitate the exchange of sustainable farming techniques, helping communities adopt more 
              efficient and resilient agricultural practices.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Building</h3>
            <p className="text-gray-600">
              We build networks of farmers, donors, and experts who collaborate on solutions to 
              local and global food security challenges.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Success Stories</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-lg">Community Gardens in Urban Food Deserts</h3>
            <p className="text-gray-600">
              Our funding helped establish 15 community gardens in urban food deserts across North America, 
              providing fresh produce to over 2,000 families who previously had limited access to nutritious food.
            </p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-lg">Sustainable Farming Technologies in East Africa</h3>
            <p className="text-gray-600">
              GrowShare projects introduced drought-resistant crops and water-efficient irrigation systems to 
              farmers in East Africa, increasing crop yields by 40% while reducing water usage by 30%.
            </p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-lg">School Meal Programs in Southeast Asia</h3>
            <p className="text-gray-600">
              Through community-supported agriculture initiatives, GrowShare has helped provide nutritious meals to 
              over 5,000 school children in Southeast Asia, improving attendance rates and academic performance.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-green-700 text-white p-8 rounded-lg">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Join Us in the Fight Against Hunger</h2>
          <p className="text-xl">
            Together, we can make Zero Hunger a reality by 2030
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Link 
              href="/signup" 
              className="px-6 py-3 bg-white text-green-700 rounded-full font-medium hover:bg-yellow-100 transition"
            >
              Create Account
            </Link>
            <Link 
              href="/projects" 
              className="px-6 py-3 bg-transparent border-2 border-white rounded-full font-medium hover:bg-white hover:text-green-700 transition"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
