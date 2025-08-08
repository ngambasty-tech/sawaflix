'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MovieCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
  const repeatedSlides = [ ];
  const repeatTimes = 4

  for (let i = 0; i < repeatTimes; i++)
    {
      slides.forEach((slide) => {
        repeatedSlides.push({ ...slide, uniqueId: `${slide.id}-${i}` });
      });
    }
    
    
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
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
        {/* Overlay to enhance readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      </div>

      {/* Control Icons - Top */}
      <div className="absolute top-30 left-1/2 transform -translate-x-1/4 flex items-center space-x-0 z-10">
        {/* Music Icon */}
        <div className="w-12 h-12 bg-gray-300/40 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300/30 transition-all duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-pink-400">
            <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
            <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        
        {/* Play Icon */}
        <div className="w-13 h-12 bg-gray-300/100 rounded-full flex items-center justify-center cursor-pointer ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black ml-1">
            <polygon points="5,3 19,12 5,21" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Movie Posters Carousel */}
      <div className="relative w-full max-w-4xl mx-auto px-4">
        <div className="flex justify-center items-center space-x-8">
          {repeatedSlides.map((slide) => (
            <div
              key={slide.uniqueId}
              className="slide">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  width={450} // set your preffered size
                  height={600} //set your preffered size
                  />
                  <h3>{slide.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}