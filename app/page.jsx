'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Loader2, Play, Star, Users, Film, Music } from 'lucide-react';

const LandingPage = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoginLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setIsLoginLoading(false);
      // Navigate to login page
      window.location.href = '/login';
    }, 2000);
  };

  const handleSignup = async () => {
    setIsSignupLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setIsSignupLoading(false);
      // Navigate to sign-in page
      window.location.href = '/sign-up';
    }, 2000);
  };

  return (
    <div className="min-h-screen lg:flex">
      
      {/* Left Side - Only for Desktop */}
      <div className="hidden lg:flex w-1/2 h-screen relative">
        <Image
          src="/cam1.jpg"
          alt="Cameroon Entertainment - Music and Movies"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
      </div>

      {/* Right Side - Mobile + Desktop */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center relative">
        
        {/* Background Image with Better Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt="Background"
            fill
            className="object-cover"
          />
          {/* Improved gradient overlay for better blending */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 lg:bg-gradient-to-l lg:from-black/80 lg:via-black/60 lg:to-transparent"></div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden min-h-screen relative z-10">
          
          {/* Mobile Header */}
          <div className="px-4 sm:px-6 pt-8 sm:pt-12 pb-4">
            <div className="flex items-center justify-between mb-4">
              {/* Logo Space */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-600 rounded-lg mr-3 flex items-center justify-center overflow-hidden">
                  {/* Replace this div with your logo image */}
                  <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
                  
                  <Image
                    src="/headset.jpg"
                    alt="SawaFlix Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                 
                </div>
                <div>
                  <h1 className="text-white text-xl sm:text-2xl font-bold tracking-wide">SawaFlix</h1>
                  <div className="text-yellow-400 text-xs">✨ Premium Entertainment</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
                Cameroon's Premier 
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Stream unlimited content and stay connected.
              </p>
            </div>

            {/* Mobile Buttons */}
            <div className="space-y-3 mb-8">
              <button 
                onClick={handleLogin}
                disabled={isLoginLoading || isSignupLoading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoginLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
              
              <button 
                onClick={handleSignup}
                disabled={isLoginLoading || isSignupLoading}
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm disabled:bg-white/5 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border border-white/20 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSignupLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Signing up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-red-400 mb-1"><Film className="w-6 h-6 mx-auto" /></div>
                <div className="text-white font-bold text-lg">1000+</div>
                <div className="text-gray-300 text-xs">Movies</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 mb-1"><Music className="w-6 h-6 mx-auto" /></div>
                <div className="text-white font-bold text-lg">5000+</div>
                <div className="text-gray-300 text-xs">Songs</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 mb-1"><Users className="w-6 h-6 mx-auto" /></div>
                <div className="text-white font-bold text-lg">50K+</div>
                <div className="text-gray-300 text-xs">Users</div>
              </div>
            </div>
          </div>

          {/* Mobile Content Area - Trending */}
          <div className="px-4 sm:px-6 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl font-bold">Trending Now</h2>
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            
            {/* Movie Grid - Responsive */}
            <div className="space-y-3">
              {/* First Row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="aspect-[2/3] bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 rounded-lg overflow-hidden relative group">
                  <Image
                    src="/cameroon4.jpg"
                    alt="The Beekeeper"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-white text-xs font-bold">THE BEEKEEPER</h3>
                  </div>
                </div>
                
                <div className="aspect-[2/3] rounded-lg overflow-hidden relative group">
                  <Image
                    src="/pic1.jpeg"
                    alt="Breaking Bad"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="aspect-[2/3] rounded-lg overflow-hidden relative group">
                  <Image
                    src="/wed-image 1.jpg"
                    alt="Anime"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/60 to-transparent group-hover:from-purple-600/40 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="text-xs font-semibold text-white bg-purple-600/80 px-2 py-1 rounded">ANIME</span>
                  </div>
                </div>
              </div>

              {/* Additional Rows with Same Pattern */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="aspect-[2/3] rounded-lg overflow-hidden relative group">
                  <Image
                    src="/CeCe Winans.jpeg"
                    alt="CeCe Winans"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="aspect-[2/3] rounded-lg overflow-hidden relative group">
                  <Image
                    src="/cameroon2.jpg"
                    alt="Cameroon Content"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="aspect-[2/3] rounded-lg overflow-hidden relative group">
                  <Image
                    src="/pic4.jpeg"
                    alt="Featured Content"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden lg:block relative z-10 px-8 xl:px-12">
          <div className="max-w-lg mx-auto w-full">
            
            {/* Desktop Logo */}
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-red-600 rounded-xl mr-4 flex items-center justify-center overflow-hidden">
                {/* Replace this div with your logo image */}
                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                
                <Image
                  src="/headset.jpg"
                  alt="SawaFlix Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
               
              </div>
              <div>
                <h1 className="text-white text-3xl font-bold tracking-wide">SawaFlix</h1>
                <div className="text-yellow-400 text-sm">✨ Premium Entertainment</div>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                Cameroon's Premier
              </h2>
              
              <p className="text-gray-300 leading-relaxed text-lg xl:text-xl mb-8">
                Stream unlimited content and stay connected.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <Film className="w-5 h-5 text-red-400 mr-2" />
                  <span>1,000+ Movies</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Music className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>5,000+ Songs</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-5 h-5 text-green-400 mr-2" />
                  <span>50K+ Users</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-purple-400 mr-2" />
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={handleLogin}
                disabled={isLoginLoading || isSignupLoading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 text-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoginLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin mr-3" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
              
              <button 
                onClick={handleSignup}
                disabled={isLoginLoading || isSignupLoading}
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm disabled:bg-white/5 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 text-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] border border-white/20 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSignupLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin mr-3" />
                    Signing up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
            
            {/* Stats Card */}
            <div className="mt-12">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="grid grid-cols-1 gap-3 text-center">
                  <p className="text-white text-sm flex items-center justify-center">
                    <Film className="w-4 h-4 mr-2 text-red-400" />
                    Over 1,000+ Cameroonian Movies & Shows
                  </p>
                  <p className="text-white text-sm flex items-center justify-center">
                    <Music className="w-4 h-4 mr-2 text-yellow-400" />
                    Unlimited Access to Local Music
                  </p>
                  <p className="text-white text-sm flex items-center justify-center">
                    <Users className="w-4 h-4 mr-2 text-green-400" />
                    Join 50,000+ users enjoying premium content
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
