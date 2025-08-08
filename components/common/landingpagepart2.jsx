'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// Main App component to render the carousel
export default function App() {
  return <MovieCarousel />;
}

// Movie Carousel Component
function MovieCarousel() {
  const slides = [
    {
      id: 1,
      title: "AVATAR",
      image: "/movie.jpg",
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
      image: "/movie.jpg",
      alt: "Ballerina movie poster"
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Start at index 0

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

  // Function to get dynamic styles for each slide based on its role (current/neighbor)
  const getSlideRoleStyles = useCallback((relativePosition) => {
    let scale = 1;
    let opacity = 0.7;
    let zIndex = 5;
    let transform = '';

    if (relativePosition === 0) { // Current (center) slide
      scale = 1.15; // Slightly larger for the active slide
      opacity = 1;
      zIndex = 10;
      transform = 'translateZ(100px) rotateY(0deg)'; // Bring forward, no rotation
    } else if (relativePosition === -1) { // Left neighbor (previous)
      scale = 0.9;
      opacity = 0.7;
      zIndex = 7;
      // Adjust translateX to move it left and slightly compensate for perspective
      transform = 'translateX(-30%) translateZ(-100px) rotateY(20deg)'; // Push left, back, rotate outwards
    } else if (relativePosition === 1) { // Right neighbor (next)
      scale = 0.9;
      opacity = 0.7;
      zIndex = 7;
      // Adjust translateX to move it right and slightly compensate for perspective
      transform = 'translateX(30%) translateZ(-100px) rotateY(-20deg)'; // Push right, back, rotate outwards
    } else { // Far off-screen slides (invisible)
      opacity = 0;
      zIndex = 1;
      transform = 'translateZ(-200px) scale(0.7)'; // Push far back, small
    }
    return { scale, opacity, zIndex, transform };
  }, []);

  // Determine the three slides to display (previous, current, next) and their relative positions
  const getDisplayedSlides = useCallback(() => {
    const total = slides.length;
    const prevIndex = (currentSlideIndex - 1 + total) % total;
    const nextIndex = (currentSlideIndex + 1) % total;

    // Return the slides with their intended relative visual position for styling
    return [
      { ...slides[prevIndex], relativePosition: -1 },
      { ...slides[currentSlideIndex], relativePosition: 0 },
      { ...slides[nextIndex], relativePosition: 1 },
    ];
  }, [currentSlideIndex, slides]);

  const displayedSlideData = getDisplayedSlides();

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background.png"
          alt="Cosmic background"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        {/* Overlay to enhance readability and visual depth */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      </div>

      {/* Control Icons - Top */}
      <div className="absolute top-8 md:top-12 flex items-center space-x-4 z-20">
        {/* Music Icon */}
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300/40 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300/30 transition-all duration-300 shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-pink-400">
            <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
            <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        
        {/* Play Icon */}
        <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-300/100 rounded-full flex items-center justify-center cursor-pointer shadow-lg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black ml-1">
            <polygon points="5,3 19,12 5,21" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Movie Posters Carousel */}
      {/* Container with perspective for 3D effect */}
      <div className="relative w-full max-w-lg md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 mt-20 md:mt-24 lg:mt-32">
        <div 
          className="relative h-[28rem] sm:h-[38rem] md:h-[46rem] lg:h-[50rem]" // Fixed height to contain absolute children
          style={{ perspective: '1000px' }} // Apply perspective for 3D
        >
          {displayedSlideData.map((slideData) => {
            const { scale, opacity, zIndex, transform } = getSlideRoleStyles(slideData.relativePosition);
            
            return (
              <div
                key={slideData.id + '-' + slideData.relativePosition} // Unique key based on ID and relative position
                className={`
                  absolute flex flex-col items-center justify-center p-2
                  transition-all duration-700 ease-in-out transform-gpu // Apply transition to all transforms
                  w-[30%] sm:w-[25%] // Base width for all slide slots
                `}
                style={{
                  transform: `${transform} scale(${scale}) translateX(-50%)`, // Combined transforms, translateX for centering after rotation
                  opacity: opacity,
                  zIndex: zIndex,
                  transformOrigin: 'center bottom', // Rotate and scale from the bottom center
                  bottom: '0', // Align to the bottom
                  left: slideData.relativePosition === -1 ? '20%' : // Position left neighbor
                        slideData.relativePosition === 0 ? '50%' : // Position current slide
                        '80%', // Position right neighbor
                }}
              >
                {/* Image Container to maintain aspect ratio with `fill` */}
                <div className="relative w-full rounded-lg shadow-xl overflow-hidden" style={{paddingBottom: '150%' /* 2:3 aspect ratio */}}>
                  <Image
                    src={slideData.image}
                    alt={slideData.alt}
                    fill
                    className="object-cover rounded-lg border-2 border-transparent hover:border-pink-500 transition-all duration-300"
                  />
                </div>
                <h3 className={`
                  mt-3 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white text-center drop-shadow-lg
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
        className="absolute bottom-[20%] md:bottom-[25%] left-2 md:left-4 transform -translate-y-1/2 bg-gray-700/60 hover:bg-gray-700/80 text-white p-2.5 md:p-3.5 rounded-full shadow-lg transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute bottom-[20%] md:bottom-[25%] right-2 md:right-4 transform -translate-y-1/2 bg-gray-700/60 hover:bg-gray-700/80 text-white p-2.5 md:p-3.5 rounded-full shadow-lg transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-2 mt-8 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlideIndex === index ? 'bg-pink-500 scale-125' : 'bg-gray-400 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
