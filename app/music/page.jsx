'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, RotateCcw, Volume2 } from 'lucide-react';


export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
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
          <div className="relative flex-1 flex flex-col justify-center items-center px-4 py-8">
            {/* Album Art */}
            <div className="w-40 h-40 mb-6 shadow-2xl">
              <img 
                src="/music4.jpg" 
                alt="Album cover" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            
            {/* Song Info */}
            <div className="text-center mb-8 px-4">
              <p className="text-orange-500 text-sm mb-2 font-medium">Trending Music #1</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-1 leading-tight">Bollo C'est Bollo</h2>
              <p className="text-lg text-gray-300 font-medium">Ko-c</p>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <RotateCcw size={22} />
              </button>
              <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <SkipBack size={22} />
              </button>
              <button 
                onClick={togglePlay}
                className="bg-white text-black rounded-full p-4 hover:bg-gray-200 transition-colors shadow-lg"
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>
              <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <SkipForward size={22} />
              </button>
              <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <Heart size={22} />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full max-w-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-gray-300 w-10">{formatTime(currentTime)}</span>
                <div 
                  className="flex-1 bg-gray-700 rounded-full h-2 cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="bg-orange-500 h-full rounded-full transition-all duration-100" 
                    style={{width: duration ? `${(currentTime / duration) * 100}%` : '0%'}}
                  ></div>
                </div>
                <span className="text-xs text-gray-300 w-10 text-right">{formatTime(duration)}</span>
              </div>
              
              {/* Audio Visualizer */}
              <div className="flex items-end justify-center gap-1 h-16 mb-4">
                {Array.from({length: 40}, (_, i) => (
                  <div 
                    key={i}
                    className={`rounded-sm transition-all duration-300 ${
                      isPlaying ? 'bg-orange-500 animate-pulse' : 'bg-gray-600'
                    }`}
                    style={{
                      width: '3px',
                      height: isPlaying ? `${Math.random() * 50 + 10}px` : '10px',
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">Show Lyrics</span>
              <button className="bg-orange-500 px-6 py-2 rounded-full text-black font-medium hover:bg-orange-600 transition-colors">
                SHOW
              </button>
            </div>
          </div>
          
          {/* Volume Slider */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="flex flex-col items-center bg-black/20 backdrop-blur-sm rounded-full p-2">
              <Volume2 size={16} className="mb-2 text-gray-300" />
              <div className="w-1 h-20 bg-gray-700 rounded-full relative">
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
        <div className="px-4 py-8 bg-black">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Popular Albums & Singles</h3>
            <button className="text-orange-500 text-sm hover:text-orange-400">See All →</button>
          </div>
          
          <div className="space-y-4 mb-8">
            {popularAlbums.map((album) => (
              <div key={album.id} className="flex items-center gap-4 p-3 hover:bg-gray-900 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-bold ${album.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {album.rank}
                  </span>
                  <span className={album.trending === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {album.trending === 'up' ? '▲' : '▼'}
                  </span>
                </div>
                <img 
                  src={album.image} 
                  alt={album.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{album.title}</h4>
                  <p className="text-gray-400 text-sm truncate">{album.artist}</p>
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
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{album.title}</p>
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
            <button className="p-3 hover:bg-gray-800 rounded-full transition-colors">
              <Heart size={24} />
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
            <div className="flex items-end justify-center gap-1 h-20 mb-6 ">
              {Array.from({length: 80}, (_, i) => (
                <div 
                  key={i}
                  className={`rounded-sm transition-all duration-300 ${
                    isPlaying ? 'bg-orange-500 animate-pulse' : 'bg-gray-600'
                  }`}
                  style={{
                    width: '3px',
                    height: isPlaying ? `${Math.random() * 60 + 15}px` : '15px',
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
    </div>
  );
}