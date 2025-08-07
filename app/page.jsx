'use client';
import NavbarTop from "../components/common/NavbarTop";
import Image from 'next/image';

export default function Home({ 
  imageSrc = "/bg-image.jpg", 
  imageAlt = "StreamVerse Hero Image",
  title = "StreamVerse",
  subtitle = "The Ultimate Music And Movies",
  watchButtonText = "Watch now",
  listenButtonText = "Listen now"
},
{ 
  items = [
    {
      id: 1,
      imageSrc: "/arcadian-poster.jpg",
      imageAlt: "Arcadian Movie",
      title: "ARCADIAN",
      subtitle: "NICOLAS CAGE",
      type: "movie", // movie, music, or series
      hasPlayIcon: true,
      featured: true // This will be the large card
    },
    {
      id: 2,
      imageSrc: "/music-album.jpg",
      imageAlt: "Music Album",
      title: "Latest Hits",
      subtitle: "Top Charts",
      type: "music",
      hasPlayIcon: true,
      featured: false
    },
    {
      id: 3,
      imageSrc: "/yellow-series.jpg",
      imageAlt: "TV Series",
      title: "SERIES NAME",
      subtitle: "Season 1",
      type: "series",
      hasPlayIcon: false,
      featured: false
    },
    {
      id: 4,
      imageSrc: "/credit-alert.jpg",
      imageAlt: "Credit Alert",
      title: "CREDIT ALERT",
      subtitle: "New Episode",
      type: "series",
      hasPlayIcon: false,
      featured: false
    }
  ]
}
) {

  return (
    <>
    <NavbarTop />

<div className="relative w-full max-w-2xl mx-auto mt-6 mb-8 px-4">
      {/* Main Container with Gradient Border */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-1">
        {/* Content Container */}
        <div className="relative rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm">
          {/* Background Image */}
          <div className="relative h-64 sm:h-80 lg:h-96 w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-8 lg:px-12">
              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-2 sm:mb-4 drop-shadow-2xl">
                {title}
              </h1>
              
              {/* Subtitle */}
              <p className="text-white text-lg sm:text-xl lg:text-2xl font-medium mb-6 sm:mb-8 drop-shadow-xl max-w-md">
                {subtitle}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm">
                {/* Watch Now Button */}
                <button className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">
                  {watchButtonText}
                </button>
                
                {/* Listen Now Button */}
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50">
                  {listenButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-3xl blur-xl opacity-30 -z-10"></div>
    </div>

    </>

  );
}

//body here
