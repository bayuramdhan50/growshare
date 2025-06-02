import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-700 to-green-900 text-white rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-yellow-400 rounded-full filter blur-[150px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-400 rounded-full filter blur-[100px] opacity-20 transform -translate-x-1/3 translate-y-1/3"></div>
        <div className="relative z-20 py-20 px-8 md:px-16 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-900 bg-opacity-50 border border-green-600 text-xs font-medium text-yellow-300 mb-2">
                <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></span>
                Sustainable Development Goal 2
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Join the Mission for <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">Zero Hunger</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-100">
                Support sustainable agriculture projects, reduce food waste,
                and help communities achieve food security around the world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/projects" 
                  className="px-6 py-3 bg-white text-green-700 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:bg-yellow-100 transition transform hover:-translate-y-1 focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Explore Projects
                </Link>
                <Link 
                  href="/signup" 
                  className="px-6 py-3 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-green-800 transition transform hover:-translate-y-1 focus:ring-2 focus:ring-white focus:ring-opacity-50 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Join GrowShare
                </Link>
              </div>
              <div className="flex space-x-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-green-700 bg-green-${i*100 + 100}`}></div>
                  ))}
                </div>
                <p className="text-sm text-gray-200 self-center">Join <span className="font-bold">2,346+</span> people fighting hunger globally</p>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-green-500 rounded-2xl opacity-20 blur-2xl transform rotate-6 scale-105"></div>
              <Image
                src="https://source.unsplash.com/random/700x500/?agriculture,farming,sustainable"
                width={700}
                height={500}
                alt="Sustainable Agriculture"
                className="rounded-2xl shadow-2xl object-cover z-10 relative transform hover:scale-[1.02] transition-all duration-500"
              />
              <div className="absolute -right-6 -bottom-6 bg-white p-4 rounded-xl shadow-xl z-20">
                <div className="text-green-800 font-bold text-3xl">$2.4M</div>
                <div className="text-gray-600 text-sm">Raised for zero hunger projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDG 2 Info Section */}
      <section className="py-20 px-4 bg-gray-50 rounded-3xl my-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-100 rounded-full filter blur-3xl opacity-70"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-yellow-100 rounded-full filter blur-3xl opacity-70"></div>
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-2">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span className="text-green-800 font-medium">United Nations Goal</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">Sustainable Development Goal 2: Zero Hunger</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SDG 2 aims to end hunger, achieve food security, improve nutrition, and promote sustainable agriculture by 2030.
            Today, 690 million people are hungry and 2 billion suffer from malnutrition.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-red-600 text-4xl font-bold mb-4">690M</div>
              <p className="text-gray-700">People suffer from hunger globally, affecting health, productivity, and development</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <div className="text-amber-600 text-4xl font-bold mb-4">2B</div>
              <p className="text-gray-700">People lack regular access to safe, nutritious food, impacting growth and cognitive development</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div className="text-blue-600 text-4xl font-bold mb-4">1/3</div>
              <p className="text-gray-700">Of all food produced is lost or wasted globally, representing missed opportunities to improve food security</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-green-800 font-medium">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">How GrowShare Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Join our community and make a real impact in fighting hunger through these simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines (only visible on md screens and up) */}
            <div className="hidden md:block absolute top-1/3 left-1/4 w-1/2 border-t-2 border-dashed border-green-300 z-0"></div>
            
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative z-10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute -top-6 -right-6 bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white">1</div>
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">Create Projects</h3>
              <p className="text-gray-600">
                Start sustainable food projects in your community or anywhere in the world.
                Share your vision, set funding goals, and describe how you'll make an impact.
              </p>
              <div className="mt-6 text-center">
                <Link href="/projects/create" className="text-green-600 font-medium hover:text-green-700 flex items-center justify-center">
                  Start a project
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative z-10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl md:mt-8">
              <div className="absolute -top-6 -right-6 bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white">2</div>
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">Fund Initiatives</h3>
              <p className="text-gray-600">
                Contribute to projects that align with your values.
                100% of donations go directly to the communities in need, with full transparency on impact.
              </p>
              <div className="mt-6 text-center">
                <Link href="/projects" className="text-green-600 font-medium hover:text-green-700 flex items-center justify-center">
                  Find projects
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative z-10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute -top-6 -right-6 bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white">3</div>
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">Track Impact</h3>
              <p className="text-gray-600">
                Watch your contributions make a real difference. Get updates on project milestones, 
                see the impact metrics, and connect with the communities you're helping.
              </p>
              <div className="mt-6 text-center">
                <Link href="/dashboard" className="text-green-600 font-medium hover:text-green-700 flex items-center justify-center">
                  View your impact
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Track Impact</h3>
              <p className="text-gray-600">
                See the real-world difference your contributions make with transparent 
                project updates and impact metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project cards would be dynamically generated from the database */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-green-200 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Agriculture
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Community Garden Initiative</h3>
                <p className="text-gray-600 mb-4">
                  Building sustainable community gardens in urban food deserts to provide fresh produce.
                </p>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">$7,000 raised</span>
                    <span className="text-gray-600">$10,000 goal</span>
                  </div>
                </div>
                <Link 
                  href="/projects/community-garden" 
                  className="block text-center py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  View Project
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-yellow-100 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Education
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Farming Skills Workshop</h3>
                <p className="text-gray-600 mb-4">
                  Teaching sustainable farming techniques to rural communities to improve crop yields.
                </p>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">$2,250 raised</span>
                    <span className="text-gray-600">$5,000 goal</span>
                  </div>
                </div>
                <Link 
                  href="/projects/farming-skills" 
                  className="block text-center py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  View Project
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-blue-100 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Technology
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Smart Irrigation System</h3>
                <p className="text-gray-600 mb-4">
                  Deploying water-efficient irrigation technology to drought-prone agricultural regions.
                </p>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">$13,500 raised</span>
                    <span className="text-gray-600">$15,000 goal</span>
                  </div>
                </div>
                <Link 
                  href="/projects/smart-irrigation" 
                  className="block text-center py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  View Project
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link 
              href="/projects" 
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-green-700 text-white py-16 px-4 rounded-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Impact So Far</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">120+</div>
              <p className="text-green-100">Projects Funded</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">$2.5M</div>
              <p className="text-green-100">Funds Raised</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">82K</div>
              <p className="text-green-100">People Impacted</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">45</div>
              <p className="text-green-100">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Ready to Make a Difference?</h2>
          <p className="text-lg text-gray-600">
            Join GrowShare today and be part of the global movement to achieve Zero Hunger.
            Create or support projects that align with your vision for a sustainable future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/signup" 
              className="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition"
            >
              Create Account
            </Link>
            <Link 
              href="/about" 
              className="px-6 py-3 bg-transparent border-2 border-green-600 text-green-600 rounded-full font-medium hover:bg-green-50 transition"
            >
              Learn More About SDG 2
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
