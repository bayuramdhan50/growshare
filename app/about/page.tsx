import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About SDG 2: Zero Hunger | GrowShare',
  description: 'Learn about Sustainable Development Goal 2 (Zero Hunger) and how GrowShare is working to achieve it.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero section with parallax effect */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Sustainable farming landscape"
            fill
            style={{ objectFit: 'cover' }}
            className="filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent"></div>
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
              Sustainable Development Goal 2:
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200">
                Zero Hunger
              </span>
            </h1>
            <p className="mt-4 text-white/90 text-xl max-w-2xl">
              Working together to end hunger, achieve food security, improve nutrition, and promote sustainable agriculture.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl space-y-16">
        {/* What is SDG 2 section */}
        <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md transform md:rotate-1 hover:rotate-0 transition-transform duration-300">
                <Image 
                  src="https://source.unsplash.com/random/600x400/?farming,agriculture" 
                  alt="Sustainable agriculture"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-4">
                    <span className="text-white/80 text-sm font-medium">Sustainable farming practices</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="inline-flex items-center bg-primary-light text-primary-dark px-4 py-1 rounded-full text-sm font-medium mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
                Global Initiative
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What is SDG 2?</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                The Sustainable Development Goal 2 (Zero Hunger) aims to end hunger, achieve food security and improved nutrition, 
                and promote sustainable agriculture. It is one of the 17 Sustainable Development Goals established by the 
                United Nations in 2015.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Despite progress in recent decades, more than 690 million people still go hungry, and the COVID-19 pandemic 
                is exacerbating food insecurity globally. SDG 2 addresses these challenges by working to ensure that everyone, 
                everywhere has enough good-quality food to lead a healthy life.
              </p>
            </div>
          </div>
        </section>

        {/* Key targets and challenges section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 -mt-8 -mr-8 bg-primary-light opacity-50 rounded-full"></div>
            <div className="relative">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                Key Targets
              </h2>
              <ul className="space-y-3">
                {[
                  "End hunger and ensure access to safe, nutritious, and sufficient food all year round for all people",
                  "End all forms of malnutrition, including stunting and wasting in children under 5",
                  "Double agricultural productivity and incomes of small-scale food producers",
                  "Ensure sustainable food production systems and resilient agricultural practices",
                  "Maintain genetic diversity of seeds, cultivated plants, and farmed animals",
                  "Increase investment in rural infrastructure, agricultural research, and technology",
                  "Prevent agricultural trade restrictions and market distortions",
                  "Ensure proper functioning of food commodity markets to limit extreme food price volatility"
                ].map((target, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-light text-primary font-bold text-xs mr-3 mt-0.5 flex-shrink-0">{index + 1}</span>
                    <span className="text-gray-700">{target}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-24 w-24 -mt-8 -ml-8 bg-red-100 opacity-50 rounded-full"></div>
            <div className="relative">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Current Challenges
              </h2>
              <ul className="space-y-3">
                {[
                  "Globally, one in nine people are undernourished",
                  "Agricultural systems are increasingly affected by climate change",
                  "Small-scale farmers face persistent obstacles to improve productivity",
                  "Food waste accounts for approximately 1/3 of all food produced globally",
                  "Conflict and political instability disrupt food production and distribution",
                  "COVID-19 pandemic has worsened food security in vulnerable regions",
                  "Sustainable farming practices face economic barriers to adoption"
                ].map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How GrowShare contributes section */}
        <section className="bg-gradient-to-br from-primary-light to-white p-8 rounded-xl shadow-sm border border-green-100">
          <h2 className="text-2xl font-bold text-primary-dark mb-8 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
            </svg>
            How GrowShare Contributes to SDG 2
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Funding Projects</h3>
              <p className="text-gray-700">
                We connect donors with impactful agricultural and food security projects around the world, 
                providing necessary funding for communities in need.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/projects" className="text-primary font-medium hover:text-primary-dark transition-colors inline-flex items-center">
                  Explore projects
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Knowledge Sharing</h3>
              <p className="text-gray-700">
                We facilitate the exchange of sustainable farming techniques, helping communities adopt more 
                efficient and resilient agricultural practices.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/projects" className="text-blue-500 font-medium hover:text-blue-700 transition-colors inline-flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-300 to-purple-500 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community Building</h3>
              <p className="text-gray-700">
                We build networks of farmers, donors, and experts who collaborate on solutions to 
                local and global food security challenges.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/signup" className="text-purple-500 font-medium hover:text-purple-700 transition-colors inline-flex items-center">
                  Join our community
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Success stories section */}
        <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border border-green-100">
              <div className="mb-4 relative">
                <Image
                  src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
                  alt="Community Gardens"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover h-40 w-full"
                />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary">
                  North America
                </div>
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Community Gardens in Urban Food Deserts</h3>
              <p className="text-gray-700 mt-3">
                Our funding helped establish 15 community gardens in urban food deserts across North America, 
                providing fresh produce to over 2,000 families who previously had limited access to nutritious food.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border border-green-100">
              <div className="mb-4 relative">
                <Image
                  src="https://images.unsplash.com/photo-1596443686812-2f45229eebc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
                  alt="Farming in East Africa"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover h-40 w-full"
                />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary">
                  East Africa
                </div>
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Sustainable Farming Technologies</h3>
              <p className="text-gray-700 mt-3">
                GrowShare projects introduced drought-resistant crops and water-efficient irrigation systems to 
                farmers in East Africa, increasing crop yields by 40% while reducing water usage by 30%.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border border-green-100">
              <div className="mb-4 relative">
                <Image
                  src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
                  alt="School Meal Program"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover h-40 w-full"
                />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary">
                  Southeast Asia
                </div>
              </div>
              <h3 className="font-semibold text-lg text-gray-900">School Meal Programs</h3>
              <p className="text-gray-700 mt-3">
                Through community-supported agriculture initiatives, GrowShare has helped provide nutritious meals to 
                over 5,000 school children in Southeast Asia, improving attendance rates and academic performance.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white p-10 rounded-xl shadow-md transform rotate-0 hover:rotate-0">
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Join Us in the Fight Against Hunger</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Together, we can make Zero Hunger a reality by 2030
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <Link 
                href="/signup" 
                className="px-8 py-3 bg-white text-primary rounded-full font-medium hover:bg-yellow-100 transition-colors shadow-md hover:shadow-lg"
              >
                Create Account
              </Link>
              <Link 
                href="/projects" 
                className="px-8 py-3 bg-transparent border-2 border-white rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Explore Projects
              </Link>
            </div>
          </div>
          <div className="absolute right-6 bottom-6 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
        </section>
      </div>
    </>
  );
}
