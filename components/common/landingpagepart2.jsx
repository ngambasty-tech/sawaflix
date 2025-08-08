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
      </div>
    </div>
  );
}

export default MovieCarousel;