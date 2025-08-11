import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SawaFlxHeroBanner = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="filter blur-sm"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 grid grid-cols-1 gap-8 items-center max-w-6xl mx-auto px-4">
        
        {/* Left Side: Text Content */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-red-500 mb-4">
            SawaFlx
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-6">
            The Ultimate Music And Movies
          </p>
          <p className="text-gray-300 mb-8">
            Discover, stream, and enjoy a curated collection of the best films and tracks. Your next favorite is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/movie">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 w-full sm:w-auto">
                Watch Now
              </button>
            </Link>
            <Link href="/music">
              <button className="border-2 border-red-600 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 w-full sm:w-auto">
                Listen Now
              </button>
            </Link>
          </div>
        </div>

        

      </div>
    </div>
  );
};

export default SawaFlxHeroBanner;
