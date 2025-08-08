
'use client';
import NavbarTop from "../components/common/NavbarTop";
import NavbarBottom from "../components/common/NavbarBottom";
import MoviesSection from "../components/common/moviesForYou";
import MusicSection from "../components/common/MusicsForYou";

import Image from 'next/image';
import Link from 'next/link';


export default function Home(
  { 
  imageSrc = "/bg-image.jpg",
  backgroundImage = "/bg-image.jpg", 
  overlayOpacity = 0.4,
  imageAlt = "StreamVerse Hero Image",
  title = "StreamVerse",
  subtitle = "The Ultimate Music And Movies",
  watchButtonText = "Watch now",
  listenButtonText = "Listen now"
,
 
  items = [
    {
      id: 1,
      imageSrc: "/vid.jpg",
      imageAlt: "Arcadian Movie",
      title: "ARCADIAN",
      subtitle: "NICOLAS CAGE",
      type: "movie", // movie, music, or series
      hasPlayIcon: true,
      featured: true // This will be the large card
    },
    {
      id: 2,
      imageSrc: "/disc.jpg",
      imageAlt: "Music Album",
      title: "Latest Hits",
      subtitle: "Top Charts",
      type: "music",
      hasPlayIcon: true,
      featured: false
    }
  ]}
) {
  const PlayIcon = () => (
    <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 cursor-pointer">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-0.5">
        <polygon points="5,3 19,12 5,21" fill="#ef4444" />
      </svg>
    </div>
  );

  const MusicIcon = () => (
    <div className="absolute bottom-3 right-3 w-8 h-8 bg-pink-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-pink-500 hover:scale-110 transition-all duration-200 cursor-pointer">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
    </div>
  );

  const featuredItem = items.find(item => item.featured);
  const regularItems = items.filter(item => !item.featured);

  return (
    <>
    <div className="relative min-h-screen w-full overflow-x-hidden">
       <div className="fixed inset-0 -z-20">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={85}
        />
      </div>
      
      {/* Optional Dark Overlay for better readability */}
      <div 
        className="fixed inset-0 -z-10 bg-black"
        style={{ opacity: overlayOpacity }}
      ></div>
      
      {/* Gradient Overlay for Entertainment Feel */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      

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
                <Link href='/login'>
                <button className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">
                  {watchButtonText}
                </button>
                </Link>
                
                {/* Listen Now Button */}
                <Link href='/login'>
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50">
                  {listenButtonText}
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-3xl blur-xl opacity-30 -z-10"></div>
    </div>

     <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Section Header */}
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-pink-500 rounded-full mr-3"></div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Trending Now
        </h2>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Featured Large Card */}
        {featuredItem && (
          <div className="lg:col-span-2 lg:row-span-2">
            <div className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="relative aspect-[4/3] lg:aspect-[16/10]">
                <Image
                  src={featuredItem.imageSrc}
                  alt={featuredItem.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 tracking-wide">
                    {featuredItem.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base font-medium">
                    {featuredItem.subtitle}
                  </p>
                </div>

                {/* Play Icon */}
                {featuredItem.hasPlayIcon && featuredItem.type === 'movie' && <PlayIcon />}
                {featuredItem.type === 'music' && <MusicIcon />}
              </div>
              
            </div>
          </div>
        )}

        {/* Regular Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {regularItems.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <h4 className="text-white font-bold text-sm sm:text-base mb-1 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Icons */}
                  {item.hasPlayIcon && item.type === 'movie' && <PlayIcon />}
                  {item.type === 'music' && <MusicIcon />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <MoviesSection/>
    <MusicSection/>

    <NavbarBottom/>
    </div>

    </>

  );
}

//body here
