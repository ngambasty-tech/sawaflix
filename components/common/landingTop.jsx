import React from 'react';
import Image from 'next/image';

const LandingTop = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-8">
        <div className="bg-black/80 backdrop-blur-md border border-red-500/50 rounded-3xl shadow-2xl max-w-md w-full mx-auto overflow-hidden">
          
          {/* Header Section */}
          <div className="p-6 md:p-8 text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 tracking-wide">
              Sawaflixx
            </h1>
            <p className="text-white/90 text-sm md:text-base font-light tracking-wider">
              -The Ultimate Music And Movies
            </p>
          </div>

          {/* Circle with Headset Image */}
          <div className="px-6 md:px-8 mb-6 flex justify-end">
            <div className="relative w-48 h-48 md:w-56 md:h-70 ">
              {/* Circle border */}
              <div className="absolute inset-0 rounded-[50%] border-2 border-red-500/30 overflow-hidden">
                {/* Headset image */}
                <Image
                  src="/headset.jpg"
                  alt="Premium Headset"
                  width={200}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="px-6 md:px-8 pb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
                <span>Sign In</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
              
              <button className="flex-1 bg-black hover:bg-gray-900 text-white font-semibold py-4 px-6 rounded-full border border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
                <span>Sign Up</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingTop;