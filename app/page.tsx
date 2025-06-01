import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-transparent opacity-90 z-10"></div>
        <div className="relative z-20 py-16 px-8 md:px-16 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Join the Mission for <span className="text-yellow-300">Zero Hunger</span>
              </h1>
              <p className="text-lg">
                Support sustainable agriculture projects, reduce food waste,
                and help communities achieve food security around the world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/projects" 
                  className="px-6 py-3 bg-white text-green-700 rounded-full font-medium hover:bg-yellow-100 transition"
                >
                  Explore Projects
                </Link>
                <Link 
                  href="/signup" 
                  className="px-6 py-3 bg-transparent border-2 border-white rounded-full font-medium hover:bg-white hover:text-green-700 transition"
                >
                  Join GrowShare
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="https://source.unsplash.com/random/600x400/?agriculture,farming"
                width={600}
                height={400}
                alt="Sustainable Agriculture"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SDG 2 Info Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Sustainable Development Goal 2: Zero Hunger</h2>
          <p className="text-lg text-gray-600">
            SDG 2 aims to end hunger, achieve food security, improve nutrition, and promote sustainable agriculture by 2030.
            Today, 690 million people are hungry and 2 billion suffer from malnutrition.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-600 text-4xl mb-4">690M</div>
              <p className="text-gray-700">People suffer from hunger globally</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-600 text-4xl mb-4">2B</div>
              <p className="text-gray-700">People lack regular access to safe, nutritious food</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-600 text-4xl mb-4">1/3</div>
              <p className="text-gray-700">Of all food produced is lost or wasted globally</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-green-50 py-16 px-4 rounded-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How GrowShare Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Create Projects</h3>
              <p className="text-gray-600">
                Start sustainable food projects in your community or anywhere in the world.
                Share your vision and set funding goals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Fund Initiatives</h3>
              <p className="text-gray-600">
                Contribute to projects that align with your values.
                100% of donations go directly to the communities in need.
              </p>
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
