import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="min-h-screen lg:flex">
      
      {/* Left Side - Only for Desktop */}
      <div className="hidden lg:flex w-1/2 h-[100vh] relative">
        <Image
          src="/cameroon.jpg"
          alt="Cameroon Entertainment - Music and Movies"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Mobile + Desktop */}
      <div
        className="w-full lg:w-1/2 h-[100vh] flex flex-col justify-center relative"
        style={{
          backgroundImage: "url('/bg-image.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Mobile View */}
        <div className="lg:hidden min-h-screen relative overflow-hidden">
          
          {/* Movie Posters */}
          <div className="px-4 pt-16 pb-32">
            {/* First Row */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="aspect-[2/3] bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 rounded-lg overflow-hidden relative">
              
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                 <Image
                  src="/cameroon4.jpg"
                  alt="The Beekeeper"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white text-xs font-bold">THE BEEKEEPER</h3>
                </div>
              </div>
              <div className="aspect-[2/3] bg-green-800 rounded-lg overflow-hidden relative flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-lg font-bold mb-1">Breaking</div>

          <Image
          src="/pic1.jpeg" // ensure correct file name and extension in /public
          alt="Breaking Bad"
          layout="fill"
          objectFit="cover"
        />
                  
                  <div className="text-white text-lg font-bold">Bad</div>
                  
                </div>
              </div>
              <div className="aspect-[2/3] bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg overflow-hidden relative">
                  <Image
          src="/cameroon.jpg" // ensure correct file name and extension in /public
          alt="Breaking Bad"
          layout="fill"
          objectFit="cover"
        />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-xs font-semibold">ANIME</div>
                <Image
          src="/wed-image 1.jpg" // ensure correct file name and extension in /public
          alt="Breaking Bad"
          layout="fill"
          objectFit="cover"
        />
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="aspect-[2/3] bg-gradient-to-br from-green-600 to-teal-700 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                 <Image
                  src="/CeCe Winans.jpeg"
                  alt="The Beekeeper"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-[2/3] bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                 <Image
                  src="/cameroon.jpg"
                  alt="The Beekeeper"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-1 bg-blue-400 transform rotate-45"></div>
                  <div className="w-8 h-1 bg-red-500 transform -rotate-45"></div>
                </div>
              </div>
              <div className="aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                 <Image
                  src="/cameroon2.jpg"
                  alt="The Beekeeper"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-[2/3] bg-gradient-to-br from-red-800 to-black rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-red-900 bg-opacity-60"></div>
                 <Image
                  src="/cameroon3.jpg"
                  alt="The Beekeeper"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-[2/3] bg-gradient-to-br from-blue-800 to-teal-900 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-900 bg-opacity-40"></div>
                 <Image
                  src="/pic2.jpeg"
                  alt="The Beekeeper"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-[2/3] bg-gradient-to-br from-green-700 to-yellow-600 rounded-lg overflow-hidden relative">
               <Image
                  src="/pic4.jpeg"
                  alt="The Beekeeper"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 right-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Overlay with Login Section */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 bg-opacity-40 backdrop-blur-sm px-6 py-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-yellow-400 rounded mr-3 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-black border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
                </div>
                <h1 className="text-white text-2xl font-bold tracking-wide">SAWAFLIX</h1>
              </div>
              <p className="text-gray-300 text-sm font-medium">Entertainment has never been this easy</p>
            </div>
            <div className="space-y-4">
              <Link href='/login'>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg">
                Login
              </button>
              </Link>
              <Link href='/sign-up'>
              <button className="w-full bg-red-500 mt-5 hover:bg-red-600 text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg">
                Create an account
              </button>
              </Link>

            </div>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden lg:block relative z-10 px-4">
          <div className="lg:max-w-lg lg:mx-auto lg:w-full">
            <div className="text-center mb-12">
              <h1 className="text-white text-5xl font-bold tracking-wide">SAWAFLIX</h1>
            </div>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Welcome to Cameroon's Premier Entertainment Hub
              </h2>
              <div className="space-y-4 text-gray-200 leading-relaxed text-lg">
                <p>
                  Discover the rich tapestry of Cameroonian cinema and music all in one place. SAWAFLIX is your 
                  gateway to authentic local content, featuring blockbuster movies and chart-topping hits from 
                  your favorite Cameroonian artists.
                </p>
                
                <p className="font-semibold text-white">
                  Stream unlimited content and stay connected with Cameroon's dynamic entertainment scene.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <Link href='/login'>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 text-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                Login
              </button>
              </Link>
              <Link href='/sign-up'>
              <button className="w-full bg-red-500 mt-4 hover:bg-red-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 text-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                Sign Up
              </button>
              </Link>
            </div>
            <div className="mt-12 text-center">
              <div className="bg-white bg-opacity-90 border border-white rounded-xl p-6">
                <p className="text-sm text-gray-700 mb-2">
                  🎬 Over 1,000+ Cameroonian Movies & Shows
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  🎵 Unlimited Access to Local Music
                </p>
                <p className="text-sm text-gray-700">
                  🌟 Join 50,000+ users enjoying premium content
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
