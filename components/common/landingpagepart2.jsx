<<<<<<< Updated upstream
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// Movie Carousel Component
function MovieCarousel() {
  const slides = [
    {
      id: 1,
      title: "AVATAR",
      image: "/disc.jpg",
      alt: "Avatar movie poster"
    },
    {
      id: 2,
      title: "DIVERGENT",
      image: "/movie.jpg",
      alt: "Divergent movie poster"
    },
    {
      id: 3,
      title: "BALLERINA",
      image: "/music1.jpg",
      alt: "Ballerina movie poster"
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle manual navigation to the next slide
  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Handle manual navigation to the previous slide
  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Function to get dynamic styles for each slide based on its role
  const getSlideRoleStyles = useCallback((relativePosition) => {
    let scale = 1;
    let opacity = 0.7;
    let zIndex = 5;
    let transform = '';

    if (relativePosition === 0) { // Current (center) slide
      scale = 1.1;
      opacity = 1;
      zIndex = 10;
      transform = 'translateZ(50px) rotateY(0deg)';
    } else if (relativePosition === -1) { // Left neighbor (previous)
      scale = 0.85;
      opacity = 0.6;
      zIndex = 7;
      transform = 'translateX(-25%) translateZ(-50px) rotateY(15deg)';
    } else if (relativePosition === 1) { // Right neighbor (next)
      scale = 0.85;
      opacity = 0.6;
      zIndex = 7;
      transform = 'translateX(25%) translateZ(-50px) rotateY(-15deg)';
    } else { // Far off-screen slides
      opacity = 0;
      zIndex = 1;
      transform = 'translateZ(-100px) scale(0.6)';
    }
    return { scale, opacity, zIndex, transform };
  }, []);

  // Determine the three slides to display
  const getDisplayedSlides = useCallback(() => {
    const total = slides.length;
    const prevIndex = (currentSlideIndex - 1 + total) % total;
    const nextIndex = (currentSlideIndex + 1) % total;

    return [
      { ...slides[prevIndex], relativePosition: -1 },
      { ...slides[currentSlideIndex], relativePosition: 0 },
      { ...slides[nextIndex], relativePosition: 1 },
    ];
  }, [currentSlideIndex, slides]);

  const displayedSlideData = getDisplayedSlides();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Control Icons - Top */}
      <div className="flex items-center space-x-3 lg:space-x-4 mb-4 lg:mb-6 z-20">
        {/* Music Icon */}
        <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gray-300/40 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300/60 transition-all duration-300 shadow-lg">
          <svg width="16" height="16" className="lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V5l12-2v13" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="#ec4899" strokeWidth="2"/>
            <circle cx="18" cy="16" r="3" stroke="#ec4899" strokeWidth="2"/>
          </svg>
        </div>
        
        {/* Play Icon */}
        <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-xl hover:scale-105 transition-all duration-300">
          <svg width="20" height="20" className="lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none">
            <polygon points="8,5 19,12 8,19" fill="#000000"/>
          </svg>
        </div>
      </div>

      {/* Movie Posters Carousel */}
      <div className="relative w-full max-w-xs lg:max-w-lg xl:max-w-2xl mx-auto">
        <div 
          className="relative h-64 sm:h-80 lg:h-96 xl:h-[28rem]"
          style={{ perspective: '800px' }}
        >
          {displayedSlideData.map((slideData) => {
            const { scale, opacity, zIndex, transform } = getSlideRoleStyles(slideData.relativePosition);
            
            return (
              <div
                key={slideData.id + '-' + slideData.relativePosition}
                className="absolute flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform-gpu w-[35%] sm:w-[30%] lg:w-[25%]" // Adjusted width here
                style={{
                  transform: `${transform} scale(${scale}) translateX(-50%)`,
                  opacity: opacity,
                  zIndex: zIndex,
                  transformOrigin: 'center bottom',
                  bottom: '20%',
                  left: slideData.relativePosition === -1 ? '25%' : 
                          slideData.relativePosition === 0 ? '50%' : 
                          '75%',
                }}
              >
                {/* Image Container */}
                <div className="relative w-full rounded-lg shadow-xl overflow-hidden" style={{paddingBottom: '150%'}}> {/* Adjusted paddingBottom here */}
                  <Image
                    src={slideData.image}
                    alt={slideData.alt}
                    fill
                    className="object-cover rounded-lg border-2 border-transparent hover:border-pink-500 transition-all duration-300"
                  />
                </div>
                <h3 className={`
                  mt-2 lg:mt-3 text-xs lg:text-sm xl:text-base font-bold text-white text-center drop-shadow-lg
                  ${slideData.relativePosition === 0 ? 'opacity-100' : 'opacity-70'}
                `}>
                  {slideData.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel Navigation Buttons */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-1 lg:left-2 top-1/2 transform -translate-y-1/2 bg-gray-700/60 hover:bg-gray-700/80 text-white p-2 lg:p-3 rounded-full shadow-lg transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNextSlide}
        className="absolute right-1 lg:right-2 top-1/2 transform -translate-y-1/2 bg-gray-700/60 hover:bg-gray-700/80 text-white p-2 lg:p-3 rounded-full shadow-lg transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-2 mt-4 lg:mt-6 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
              currentSlideIndex === index ? 'bg-pink-500 scale-125' : 'bg-gray-400 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
=======
import React from 'react';
import { Play, Star, Clock, Calendar, Users, Heart, Share2, Download, Bookmark } from 'lucide-react';

export default function WednesdayDetailsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section with Background */}
      <div className="relative h-96 sm:h-[500px] lg:h-[600px] overflow-hidden">
        {/* Background Image/Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/40 to-blue-900/60"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-10 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Movie Poster */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-72 sm:w-56 sm:h-80 lg:w-64 lg:h-96 bg-gradient-to-b from-blue-800 to-purple-900 rounded-xl overflow-hidden shadow-2xl">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col justify-center items-center p-4">
                    {/* Character silhouette */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full mb-4 shadow-lg"></div>
                    
                    {/* Title */}
                    <div className="text-center mb-4">
                      <div className="text-white text-sm opacity-80 mb-2 leading-tight">
                        FROM THE IMAGINATION OF
                      </div>
                      <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider mb-2 leading-tight">
                        WEDNESDAY
                      </h1>
                      <div className="text-white text-lg font-semibold">
                        SEASON 2
                      </div>
                    </div>
                    
                    {/* Netflix logo */}
                    <div className="absolute top-3 right-3 w-8 h-4 bg-red-600 rounded flex items-center justify-center">
                      <span className="text-white text-sm font-bold">N</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Movie Info */}
              <div className="flex-1 text-white space-y-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Wednesday</h1>
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
                    Wednesday returns to Nevermore Academy to face glitching psychic powers, dark visions, and a deadly mystery. 
                    Haunted by a vision of Enid's death, she uncovers sinister experiments and long-buried family secrets.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>8.2/10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>45 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span>TV-14</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                    <Play className="w-5 h-5" />
                    Watch Now
                  </button>
                  <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                    <Bookmark className="w-5 h-5" />
                    Add to List
                  </button>
                  <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-red-500 inline-block pb-2">
                Synopsis
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Wednesday Addams returns to Nevermore Academy for her sophomore year, but this time she's not alone. 
                New faces join the eerie chaos, including a mysterious teacher played by Lady Gaga. As Wednesday grapples 
                with her glitching psychic powers and dark visions, she uncovers sinister experiments and long-buried 
                family secrets that threaten everything she holds dear.
              </p>
            </div>

            {/* Cast */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-red-500 inline-block pb-2">
                Cast & Crew
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-semibold">Jenna Ortega</h4>
                    <p className="text-gray-400 text-sm">Wednesday Addams</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-semibold">Emma Myers</h4>
                    <p className="text-gray-400 text-sm">Enid Sinclair</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-semibold">Lady Gaga</h4>
                    <p className="text-gray-400 text-sm">Mysterious Teacher</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-semibold">Hunter Doohan</h4>
                    <p className="text-gray-400 text-sm">Tyler Galpin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Episodes */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-red-500 inline-block pb-2">
                Episodes
              </h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((episode) => (
                  <div key={episode} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <div className="w-16 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">Episode {episode}</h4>
                      <p className="text-gray-400 text-sm">45 min</p>
                    </div>
                    <div className="text-gray-400 text-sm">New</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Ratings & Reviews */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-red-500 inline-block pb-2">
                Ratings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">IMDb</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-semibold">8.2/10</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Rotten Tomatoes</span>
                  <span className="text-white font-semibold">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Metacritic</span>
                  <span className="text-white font-semibold">85/100</span>
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-red-500 inline-block pb-2">
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Drama', 'Horror', 'Mystery', 'Supernatural', 'Teen'].map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm border border-red-500/30">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-red-500 inline-block pb-2">
                Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Release Date</span>
                  <span className="text-white">2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Runtime</span>
                  <span className="text-white">45 min per episode</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Seasons</span>
                  <span className="text-white">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Language</span>
                  <span className="text-white">English</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Country</span>
                  <span className="text-white">United States</span>
                </div>
              </div>
            </div>

            {/* Similar Shows */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-red-500 inline-block pb-2">
                Similar Shows
              </h3>
              <div className="space-y-3">
                {['Stranger Things', 'The Chilling Adventures of Sabrina', 'Locke & Key', 'The Umbrella Academy'].map((show) => (
                  <div key={show} className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded cursor-pointer transition-colors">
                    <div className="w-10 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded"></div>
                    <span className="text-white text-sm">{show}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative stars throughout */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-0.5 h-0.5 bg-white rounded-full opacity-80 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-60 left-20 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-10 w-0.5 h-0.5 bg-white rounded-full opacity-70 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-60 left-30 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-80 right-40 w-0.5 h-0.5 bg-white rounded-full opacity-60 animate-pulse" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute top-32 left-60 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-80 right-60 w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-pulse" style={{animationDelay: '1.2s'}}></div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
}

export default MovieCarousel;