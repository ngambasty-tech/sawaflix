'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, RotateCcw, Volume2, Download } from 'lucide-react';
import NavbarTop from '@/components/common/NavbarTop';
import DownNav from '@/components/common/NavbarBottom';

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isFavorite, setIsFavorite] = useState(false);
  const audioRef = useRef(null);

  // Sample audio URL - replace with your actual audio file
  const audioSrc = "/music.mp3"; // Add your audio file to public folder

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioSrc;
    link.download = 'Bollo_Cest_Bollo_Ko-c.mp3'; // You can customize the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const popularAlbums = [
    {
      id: 1,
      rank: 1,
      title: "Génesis",
      artist: "Peso Plumo",
      image: "/music2.jpg",
      trending: "up"
    },
    {
      id: 2,
      rank: 2,
      title: "Sokoto",
      artist: "Magasco",
      image: "/music3.jpg",
      trending: "down"
    }
  ];

  const sidebarAlbums = [
    { title: "Midnights (3am Edition)", artist: "Taylor Swift", image: "/pic4.jpeg" },
    { title: "Barbie The Album", artist: "Various Artists", image: "/music5.jpg" },
    { title: "LET ME GO", artist: "Benylee x Juvani", image: "/music.jpg" },
    { title: "1989 (Deluxe)", artist: "Taylor Swift", image: "/music8.jpg" },
    { title: "SOS", artist: "SZA", image: "/music7.jpg" },
    { title: "Starboy", artist: "The Weeknd", image: "/music6.jpg" }
  ];
 
  return (
    <>
    <NavbarTop/>
    <div className="bg-black text-white min-h-screen">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
      
      />

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Hero Section - Mobile */}
        <div className="relative min-h-screen bg-gradient-to-b from-gray-800 to-black flex flex-col">
          <img 
            src="/music4.jpg" 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative flex-1 flex flex-col justify-center items-center px-4 py-6 sm:py-8">
            {/* Album Art */}
            <div className="w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 mb-4 sm:mb-6 shadow-2xl">
              <img 
                src="/music4.jpg" 
                alt="Album cover" 
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
              />
            </div>
            
            {/* Song Info */}
            <div className="text-center mb-6 sm:mb-8 px-2 sm:px-4">
              <p className="text-orange-500 text-xs sm:text-sm mb-1 sm:mb-2 font-medium">Trending Music #1</p>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-1 leading-tight px-2">Bollo C'est Bollo</h2>
              <p className="text-base sm:text-lg text-gray-300 font-medium">Ko-c</p>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center gap-3 xs:gap-4 sm:gap-6 mb-6 sm:mb-8 flex-wrap">
              <button className="p-2 xs:p-2.5 sm:p-3 hover:bg-white/10 rounded-full transition-colors">
                <RotateCcw size={18} className="xs:hidden" />
                <RotateCcw size={20} className="hidden xs:block sm:hidden" />
                <RotateCcw size={22} className="hidden sm:block" />
              </button>
              <button className="p-2 xs:p-2.5 sm:p-3 hover:bg-white/10 rounded-full transition-colors">
                <SkipBack size={18} className="xs:hidden" />
                <SkipBack size={20} className="hidden xs:block sm:hidden" />
                <SkipBack size={22} className="hidden sm:block" />
              </button>
              <button 
                onClick={togglePlay}
                className="bg-white text-black rounded-full p-3 xs:p-3.5 sm:p-4 hover:bg-gray-200 transition-colors shadow-lg"
              >
                {isPlaying ? (
                  <>
                    <Pause size={24} className="xs:hidden" />
                    <Pause size={26} className="hidden xs:block sm:hidden" />
                    <Pause size={28} className="hidden sm:block" />
                  </>
                ) : (
                  <>
                    <Play size={24} className="xs:hidden" />
                    <Play size={26} className="hidden xs:block sm:hidden" />
                    <Play size={28} className="hidden sm:block" />
                  </>
                )}
              </button>
              <button className="p-2 xs:p-2.5 sm:p-3 hover:bg-white/10 rounded-full transition-colors">
                <SkipForward size={18} className="xs:hidden" />
                <SkipForward size={20} className="hidden xs:block sm:hidden" />
                <SkipForward size={22} className="hidden sm:block" />
              </button>
              <button 
                onClick={toggleFavorite}
                className={`p-2 xs:p-2.5 sm:p-3 hover:bg-white/10 rounded-full transition-colors ${
                  isFavorite ? 'text-red-500' : 'text-white'
                }`}
              >
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} className="xs:hidden" />
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} className="hidden xs:block sm:hidden" />
                <Heart size={22} fill={isFavorite ? 'currentColor' : 'none'} className="hidden sm:block" />
              </button>
              <button 
                onClick={handleDownload}
                className="p-2 xs:p-2.5 sm:p-3 hover:bg-white/10 rounded-full transition-colors"
                title="Download"
              >
                <Download size={18} className="xs:hidden" />
                <Download size={20} className="hidden xs:block sm:hidden" />
                <Download size={22} className="hidden sm:block" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full max-w-xs xs:max-w-sm mb-4 sm:mb-6 px-2">
              <div className="flex items-center gap-2 xs:gap-3 mb-3 sm:mb-4">
                <span className="text-xs text-gray-300 w-8 xs:w-10">{formatTime(currentTime)}</span>
                <div 
                  className="flex-1 bg-gray-700 rounded-full h-1.5 xs:h-2 cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="bg-orange-500 h-full rounded-full transition-all duration-100" 
                    style={{width: duration ? `${(currentTime / duration) * 100}%` : '0%'}}
                  ></div>
                </div>
                <span className="text-xs text-gray-300 w-8 xs:w-10 text-right">{formatTime(duration)}</span>
              </div>
              
              {/* Audio Visualizer */}
              <div className="flex items-end justify-center gap-0.5 xs:gap-1 h-12 xs:h-14 sm:h-16 mb-3 sm:mb-4">
                {Array.from({length: window.innerWidth < 320 ? 25 : window.innerWidth < 375 ? 30 : 40}, (_, i) => (
                  <div 
                    key={i}
                    className={`rounded-sm transition-all duration-300 ${
                      isPlaying ? 'bg-orange-500' : 'bg-gray-600'
                    }`}
                    style={{
                      width: '2.5px',
                      height: isPlaying ? `${Math.random() * (window.innerWidth < 375 ? 35 : 50) + 8}px` : '8px',
                      animation: isPlaying ? `pulse 0.5s ease-in-out infinite alternate` : 'none',
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-3 xs:gap-4 px-4">
              <span className="text-xs xs:text-sm text-gray-300">Show Lyrics</span>
              <button className="bg-orange-500 px-4 xs:px-6 py-1.5 xs:py-2 rounded-full text-black text-xs xs:text-sm font-medium hover:bg-orange-600 transition-colors">
                SHOW
              </button>
            </div>
          </div>
          
          {/* Volume Slider */}
          <div className="absolute right-2 xs:right-3 sm:right-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm rounded-full p-1.5 xs:p-2">
              <Volume2 size={12} className="mb-1.5 text-gray-300 xs:hidden" />
              <Volume2 size={14} className="mb-2 text-gray-300 hidden xs:block sm:hidden" />
              <Volume2 size={16} className="mb-2 text-gray-300 hidden sm:block" />
              <div className="w-0.5 xs:w-1 h-16 xs:h-18 sm:h-20 bg-gray-700 rounded-full relative">
                <div 
                  className="w-full bg-orange-500 rounded-full absolute bottom-0"
                  style={{height: `${volume * 100}%`}}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer transform -rotate-90 origin-center"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Popular Albums Section - Mobile */}
        <div className="px-3 xs:px-4 py-6 xs:py-8 bg-black">
          <div className="flex justify-between items-center mb-4 xs:mb-6">
            <h3 className="text-lg xs:text-xl font-bold">Popular Albums & Singles</h3>
            <button className="text-orange-500 text-xs xs:text-sm hover:text-orange-400">See All →</button>
          </div>
          
          <div className="space-y-3 xs:space-y-4 mb-6 xs:mb-8">
            {popularAlbums.map((album) => (
              <div key={album.id} className="flex items-center gap-3 xs:gap-4 p-2 xs:p-3 hover:bg-gray-900 rounded-lg transition-colors">
                <div className="flex items-center gap-2 xs:gap-3 min-w-0 flex-shrink-0">
                  <span className={`text-base xs:text-lg font-bold ${album.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {album.rank}
                  </span>
                  <span className={`text-sm xs:text-base ${album.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {album.trending === 'up' ? '▲' : '▼'}
                  </span>
                </div>
                <img 
                  src={album.image} 
                  alt={album.title}
                  className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm xs:text-base truncate">{album.title}</h4>
                  <p className="text-gray-400 text-xs xs:text-sm truncate">{album.artist}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 gap-2 xs:gap-3">
            {sidebarAlbums.map((album, index) => (
              <div key={index} className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 hover:bg-gray-900 rounded-lg transition-colors">
                <img 
                  src={album.image} 
                  alt={album.title}
                  className="w-10 xs:w-12 h-10 xs:h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs xs:text-sm truncate">{album.title}</p>
                  <p className="text-gray-400 text-xs truncate">{album.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side - Hero Image (Fixed) */}
        <div className="w-1/2 fixed left-0 top-0 h-screen">
          <img 
            src="/music4.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40"></div>
        </div>
        
        {/* Right Side - Scrollable Content */}
        <div className="w-1/2 ml-[50%] p-12 min-h-screen">
          {/* Song Info */}
          <div className="mb-8">
            <p className="text-orange-500 text-sm mb-2 font-medium">Trending Music #1</p>
            <h2 className="text-4xl font-bold mb-2 leading-tight">Bollo C'est Bollo</h2>
            <p className="text-xl text-gray-300">Ko-c</p>
          </div>
          
          {/* Album Art */}
          <div className="w-48 h-48 mb-8 shadow-2xl">
            <img 
              src="/music4.jpg" 
              alt="Album cover" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-6 mb-8">
            <button className="p-3 hover:bg-gray-800 rounded-full transition-colors">
              <RotateCcw size={24} />
            </button>
            <button className="p-3 hover:bg-gray-800 rounded-full transition-colors">
              <SkipBack size={24} />
            </button>
            <button 
              onClick={togglePlay}
              className="bg-white text-black rounded-full p-4 hover:bg-gray-200 transition-colors shadow-lg"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <button className="p-3 hover:bg-gray-800 rounded-full transition-colors">
              <SkipForward size={24} />
            </button>
            <button 
              onClick={toggleFavorite}
              className={`p-3 hover:bg-gray-800 rounded-full transition-colors ${
                isFavorite ? 'text-red-500' : 'text-white'
              }`}
            >
              <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button 
              onClick={handleDownload}
              className="p-3 hover:bg-gray-800 rounded-full transition-colors"
              title="Download"
            >
              <Download size={24} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-gray-300">{formatTime(currentTime)}</span>
              <div 
                className="flex-1 bg-gray-700 rounded-full h-2 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  className="bg-orange-500 h-full rounded-full transition-all duration-100" 
                  style={{width: duration ? `${(currentTime / duration) * 100}%` : '0%'}}
                ></div>
              </div>
              <span className="text-sm text-gray-300">{formatTime(duration)}</span>
            </div>
            
            {/* Audio Visualizer */}
            <div className="flex items-end justify-center gap-1 h-20 mb-6">
              {Array.from({length: 80}, (_, i) => (
                <div 
                  key={i}
                  className={`rounded-sm transition-all duration-300 ${
                    isPlaying ? 'bg-orange-500' : 'bg-gray-600'
                  }`}
                  style={{
                    width: '3px',
                    height: isPlaying ? `${Math.random() * 60 + 15}px` : '15px',
                    animation: isPlaying ? `pulse 0.5s ease-in-out infinite alternate` : 'none',
                    animationDelay: `${i * 0.05}s`
                  }}
                ></div>
              ))}
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-300">Show Lyrics</span>
              <button className="bg-orange-500 px-6 py-2 rounded-full text-black font-medium hover:bg-orange-600 transition-colors">
                SHOW
              </button>
            </div>
          </div>
          
          {/* Popular Albums Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Popular Albums & Singles</h3>
              <button className="text-orange-500 hover:text-orange-400 transition-colors">See All →</button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-8">
              {popularAlbums.map((album) => (
                <div key={album.id} className="flex items-center gap-4 p-4 hover:bg-gray-900 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`text-xl font-bold ${album.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {album.rank}
                    </span>
                    <span className={album.trending === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {album.trending === 'up' ? '▲' : '▼'}
                    </span>
                  </div>
                  <img 
                    src={album.image} 
                    alt={album.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{album.title}</h4>
                    <p className="text-gray-400">{album.artist}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {sidebarAlbums.map((album, index) => (
                <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-900 rounded-lg transition-colors">
                  <img 
                    src={album.image} 
                    alt={album.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{album.title}</p>
                    <p className="text-gray-400 text-sm">{album.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Volume Slider - Desktop (Fixed) */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-10">
          <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm rounded-full p-3">
            <Volume2 size={20} className="mb-3 text-gray-300" />
            <div className="w-1 h-32 bg-gray-700 rounded-full relative">
              <div 
                className="w-full bg-orange-500 rounded-full absolute bottom-0 transition-all duration-200"
                style={{height: `${volume * 100}%`}}
              ></div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer transform -rotate-90 origin-center"
              />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(1.5); }
        }
        
        /* Custom breakpoint for extra small screens */
        @media (min-width: 360px) {
          .xs\\:block { display: block !important; }
          .xs\\:hidden { display: none !important; }
          .xs\\:w-36 { width: 9rem !important; }
          .xs\\:h-36 { height: 9rem !important; }
          .xs\\:w-12 { width: 3rem !important; }
          .xs\\:h-12 { height: 3rem !important; }
          .xs\\:w-14 { width: 3.5rem !important; }
          .xs\\:h-14 { height: 3.5rem !important; }
          .xs\\:w-10 { width: 2.5rem !important; }
          .xs\\:h-10 { height: 2.5rem !important; }
          .xs\\:text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
          .xs\\:text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
          .xs\\:text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
          .xs\\:text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
          .xs\\:text-xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
          .xs\\:gap-3 { gap: 0.75rem !important; }
          .xs\\:gap-4 { gap: 1rem !important; }
          .xs\\:p-2\\.5 { padding: 0.625rem !important; }
          .xs\\:p-3 { padding: 0.75rem !important; }
          .xs\\:p-3\\.5 { padding: 0.875rem !important; }
          .xs\\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
          .xs\\:px-6 { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .xs\\:py-2 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
          .xs\\:py-8 { padding-top: 2rem !important; padding-bottom: 2rem !important; }
          .xs\\:mb-2 { margin-bottom: 0.5rem !important; }
          .xs\\:mb-6 { margin-bottom: 1.5rem !important; }
          .xs\\:mb-8 { margin-bottom: 2rem !important; }
          .xs\\:right-3 { right: 0.75rem !important; }
          .xs\\:max-w-sm { max-width: 24rem !important; }
          .xs\\:h-14 { height: 3.5rem !important; }
          .xs\\:h-18 { height: 4.5rem !important; }
          .xs\\:w-1 { width: 0.25rem !important; }
          .xs\\:space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem !important; }
          .xs\\:gap-1 { gap: 0.25rem !important; }
        }
        
        /* Ensure proper spacing for very small screens */
        @media (max-width: 359px) {
          .min-h-screen { min-height: 100vh; }
          .flex-wrap { flex-wrap: wrap; }
        }
      `}</style>
    </div>
    <DownNav />
    </>
  );
}
