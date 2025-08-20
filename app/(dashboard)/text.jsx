// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata = {
  title: 'SawaFlix Dashboard',
  description: 'Your entertainment dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}

// app/dashboard/layout.js
import DashboardWrapper from '../../components/Dashboard/DashboardWrapper';

export const metadata = {
  title: 'Dashboard | SawaFlix',
  description: 'SawaFlix entertainment dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <DashboardWrapper>
      {children}
    </DashboardWrapper>
  );
}

// components/Dashboard/DashboardWrapper.js

// components/Dashboard/Header.js
'use client';
import React, { useState } from 'react';
import { Menu, X, Search, Bell, User, Settings, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const Header = ({ sidebarOpen, toggleSidebar }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      // Implement search functionality
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors focus-ring"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                SawaFlix
              </h1>
              <span className="hidden sm:block text-xs text-gray-400">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search movies, music, artists..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800/80 border border-gray-700 rounded-xl 
                         text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 
                         focus:ring-red-500 focus:border-transparent transition-all duration-200
                         hover:bg-gray-800"
            />
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Mobile search button */}
          <button className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors focus-ring">
            <Search size={18} />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors focus-ring">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
              3
            </span>
          </button>

          {/* Settings */}
          <button className="hidden sm:block p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors focus-ring">
            <Settings size={18} />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors focus-ring"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium">John Bless</span>
              <ChevronDown size={14} className={`hidden sm:block transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl border border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">John Bless</p>
                  <p className="text-xs text-gray-400">@johnbless</p>
                </div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                  Profile Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                  Preferences
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                  Billing
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                  Help & Support
                </a>
                <hr className="my-2 border-gray-700" />
                <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors">
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;


// components/Dashboard/RightSidebar.js (Updated for Next.js 15)

// app/dashboard/page.js



























// components/Dashboard/MusicPage.js
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, RotateCcw, Volume2, Download, Shuffle, Repeat } from 'lucide-react';
import Image from 'next/image';

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // off, one, all
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

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes = ['off', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioSrc;
    link.download = 'Bollo_Cest_Bollo_Ko-c.mp3';
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
      trending: "up",
      plays: "2.4M"
    },
    {
      id: 2,
      rank: 2,
      title: "Sokoto",
      artist: "Magasco",
      image: "/music3.jpg",
      trending: "down",
      plays: "1.8M"
    },
    {
      id: 3,
      rank: 3,
      title: "Bollo C'est Bollo",
      artist: "Ko-c",
      image: "/music4.jpg",
      trending: "up",
      plays: "3.2M"
    }
  ];

  const recentlyPlayed = [
    { title: "Midnights (3am Edition)", artist: "Taylor Swift", image: "/pic4.jpeg", duration: "3:42" },
    { title: "Barbie The Album", artist: "Various Artists", image: "/music5.jpg", duration: "2:58" },
    { title: "LET ME GO", artist: "Benylee x Juvani", image: "/music.jpg", duration: "4:15" },
    { title: "1989 (Deluxe)", artist: "Taylor Swift", image: "/music8.jpg", duration: "3:28" },
    { title: "SOS", artist: "SZA", image: "/music7.jpg", duration: "3:52" },
    { title: "Starboy", artist: "The Weeknd", image: "/music6.jpg", duration: "3:20" }
  ];
 
  return (
    <div className="min-h-full bg-gray-900 text-white">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
      />

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Music</h1>
            <p className="text-gray-400">Discover and enjoy your favorite tracks</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleShuffle}
              className={`p-2 rounded-lg transition-colors ${isShuffled ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'}`}
            >
              <Shuffle size={20} />
            </button>
            <button 
              onClick={toggleRepeat}
              className={`p-2 rounded-lg transition-colors ${
                repeatMode !== 'off' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'
              }`}
            >
              <Repeat size={20} />
              {repeatMode === 'one' && <span className="absolute -top-1 -right-1 text-xs">1</span>}
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Now Playing Section */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl p-6 mb-8 border border-red-800/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Album Art */}
              <div className="relative w-48 h-48 flex-shrink-0">
                <Image 
                  src="/music4.jpg" 
                  alt="Album cover" 
                  fill
                  sizes="192px"
                  className="object-cover rounded-xl shadow-2xl"
                  priority
                />
              </div>
              
              {/* Song Info & Controls */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-orange-400 text-sm mb-2 font-medium">Now Playing</p>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Bollo C'est Bollo</h2>
                <p className="text-lg text-gray-300 mb-6">Ko-c</p>
                
                {/* Controls */}
                <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <RotateCcw size={20} />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <SkipBack size={20} />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition-colors shadow-lg"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <SkipForward size={20} />
                  </button>
                  <button 
                    onClick={toggleFavorite}
                    className={`p-2 hover:bg-white/10 rounded-full transition-colors ${
                      isFavorite ? 'text-red-500' : 'text-white'
                    }`}
                  >
                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    title="Download"
                  >
                    <Download size={20} />
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="max-w-md">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs text-gray-300">{formatTime(currentTime)}</span>
                    <div 
                      className="flex-1 bg-gray-700 rounded-full h-2 cursor-pointer"
                      onClick={handleProgressClick}
                    >
                      <div 
                        className="bg-orange-500 h-full rounded-full transition-all duration-100" 
                        style={{width: duration ? `${(currentTime / duration) * 100}%` : '0%'}}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-300">{formatTime(duration)}</span>
                  </div>
                  
                  {/* Volume Control */}
                  <div className="flex items-center gap-3">
                    <Volume2 size={16} />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Visualizer */}
            <div className="flex items-end justify-center gap-1 h-16 mt-6">
              {Array.from({length: 50}, (_, i) => (
                <div 
                  key={i}
                  className={`rounded-sm transition-all duration-300 ${
                    isPlaying ? 'bg-orange-500' : 'bg-gray-600'
                  }`}
                  style={{
                    width: '2px',
                    height: isPlaying ? `${Math.random() * 40 + 10}px` : '10px',
                    animation: isPlaying ? `pulse 0.5s ease-in-out infinite alternate` : 'none',
                    animationDelay: `${i * 0.05}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Popular Albums Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Trending Now</h3>
              <button className="text-orange-500 hover:text-orange-400 transition-colors">See All →</button>
            </div>
            
            <div className="space-y-4">
              {popularAlbums.map((album) => (
                <div key={album.id} className="flex items-center gap-4 p-4 hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 w-16">
                    <span className={`text-lg font-bold ${album.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {album.rank}
                    </span>
                    <span className={album.trending === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {album.trending === 'up' ? '▲' : '▼'}
                    </span>
                  </div>
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image 
                      src={album.image} 
                      alt={album.title}
                      fill
                      sizes="64px"
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold group-hover:text-orange-400 transition-colors">{album.title}</h4>
                    <p className="text-gray-400 text-sm">{album.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-300">{album.plays} plays</p>
                    <p className="text-xs text-gray-500">This week</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded-full transition-all">
                    <Play size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Recently Played */}
          <div>
            <h3 className="text-xl font-bold mb-4">Recently Played</h3>
            <div className="space-y-3">
              {recentlyPlayed.map((track, index) => (
                <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer group">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image 
                      src={track.image} 
                      alt={track.title}
                      fill
                      sizes="48px"
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm group-hover:text-orange-400 transition-colors">{track.title}</p>
                    <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{track.duration}</span>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full transition-all">
                      <Play size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4">
            <h3 className="font-semibold mb-3">Your Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Songs played</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Hours listened</span>
                <span className="font-semibold">83.2h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Favorite genre</span>
                <span className="font-semibold text-orange-400">Afrobeat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(1.5); }
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #f// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata = {
  title: 'SawaFlix Dashboard',
  description: 'Your entertainment dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}

// app/dashboard/layout.js
import DashboardWrapper from '../../components/Dashboard/DashboardWrapper';

export const metadata = {
  title: 'Dashboard | SawaFlix',
  description: 'SawaFlix entertainment dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <DashboardWrapper>
      {children}
    </DashboardWrapper>
  );
}

// components/Dashboard/DashboardWrapper.js
'use client';
import React, { useState, useCallback } from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

const DashboardWrapper = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex pt-16"> {/* pt-16 to account for fixed header */}
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={closeSidebar}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Escape') closeSidebar();
            }}
            aria-label="Close sidebar"
          />
        )}

        {/* Left Sidebar */}
        <aside 
          className={`
            fixed lg:sticky top-16 left-0 z-50 lg:z-auto
            w-64 h-[calc(100vh-4rem)] bg-gray-900
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:block
            overflow-y-auto scrollbar-none
            border-r border-gray-800
          `}
        >
          <LeftSidebar onNavigate={closeSidebar} />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-full">
            {children}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-80 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto scrollbar-none border-l border-gray-800">
          <RightSidebar />
        </aside>
      </div>

      <style jsx global>{`
        /* Hide scrollbars */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Custom focus styles */
        .focus-ring:focus-visible {
          outline: 2px solid rgb(239 68 68);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default DashboardWrapper;

// components/Dashboard/Header.js
'use client';
import React, { useState } from 'react';
import { Menu, X, Search, Bell, User, Settings, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const Header = ({ sidebarOpen, toggleSidebar }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      // Implement search functionality
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors focus-ring"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                SawaFlix
              </h1>
              <span className="hidden sm:block text-xs text-gray-400">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search movies, music, artists..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800/80 border border-gray-700 rounded-xl 
                         text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 
                         focus:ring-red-500 focus:border-transparent transition-all duration-200
                         hover:bg-gray-800"
            />
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Mobile search button */}
          <button className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors focus-ring">
            <Search size={18} />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors focus-ring">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
              3
            </span>
          </button>

          {/* Settings */}
          <button className="hidden sm:block p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors focus-ring">
            <Settings size={18} />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors focus-ring"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium">John Bless</span>
              <ChevronDown size={14} className={`hidden sm:block transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl border border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">John Bless</p>
                  <p className="text-xs text-gray-400">@johnbless</p>
                </div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                  Profile Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                  Preferences
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                  Billing
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                  Help & Support
                </a>
                <hr className="my-2 border-gray-700" />
                <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors">
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;

// components/Dashboard/LeftSidebar.js
'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Film,
  Music,
  User,
  LifeBuoy,
  Sparkles,
  Download,
  Clock,
  TrendingUp,
} from 'lucide-react';

export default function LeftSidebar({ onNavigate }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Get active item from current pathname
  const getActiveFromPath = (path) => {
    if (path === '/dashboard') return 'movies';
    if (path === '/dashboard/music') return 'music';
    if (path === '/dashboard/artists') return 'artists';
    if (path === '/dashboard/trending') return 'trending';
    if (path === '/dashboard/downloads') return 'downloads';
    if (path === '/dashboard/recent') return 'recent';
    if (path === '/dashboard/support') return 'support';
    if (path === '/dashboard/sawasmart') return 'sawasmart';
    return 'movies';
  };

  const [active, setActive] = useState(getActiveFromPath(pathname));

  const menuItems = [
    { name: 'Movies', icon: Film, id: 'movies', path: '/dashboard', badge: null },
    { name: 'Music', icon: Music, id: 'music', path: '/dashboard/music', badge: 'New' },
    { name: 'Artists', icon: User, id: 'artists', path: '/dashboard/artists', badge: null },
    { name: 'Trending', icon: TrendingUp, id: 'trending', path: '/dashboard/trending', badge: '5' },
    { name: 'Downloads', icon: Download, id: 'downloads', path: '/dashboard/downloads', badge: null },
    { name: 'Recent', icon: Clock, id: 'recent', path: '/dashboard/recent', badge: null },
    { name: 'Support', icon: LifeBuoy, id: 'support', path: '/dashboard/support', badge: null },
    { name: 'SawaSmart', icon: Sparkles, id: 'sawasmart', path: '/dashboard/sawasmart', badge: 'AI' },
  ];

  const handleItemClick = (item) => {
    setActive(item.id);
    router.push(item.path);
    onNavigate?.();
  };

  // Update active state when pathname changes
  React.useEffect(() => {
    setActive(getActiveFromPath(pathname));
  }, [pathname]);

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Navigation Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
          Navigation
        </h2>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/20'
                  : 'hover:bg-gray-800 text-gray-300 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  size={20} 
                  className={`transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} 
                />
                <span className="font-medium">{item.name}</span>
              </div>
              
              {item.badge && (
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-750 hover:from-gray-750 hover:to-gray-700 transition-all cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-white truncate">John Bless</p>
            <p className="text-xs text-gray-400 truncate">@johnbless</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-800/50 rounded-lg p-2 text-center">
            <div className="text-red-400 font-bold">128</div>
            <div className="text-gray-400">Movies</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-2 text-center">
            <div className="text-red-400 font-bold">64</div>
            <div className="text-gray-400">Songs</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// components/Dashboard/RightSidebar.js (Updated for Next.js 15)
'use client';
import React from 'react';
import Image from 'next/image';

const RightSidebar = () => {
  const trendingMusic = {
    title: 'Top Trending Music of the Week',
    image: '/mfy1.jpg',
    likes: 2300,
    views: 5400,
    comments: 120,
  };

  const aiRecommendations = [
    { id: 1, title: 'AI Mix 1', image: '/music1.jpg' },
    { id: 2, title: 'AI Mix 2', image: '/music2.jpg' },
    { id: 3, title: 'AI Mix 3', image: '/music3.jpg' },
    { id: 4, title: 'AI Mix 4', image: '/music4.jpg' },
    { id: 5, title: 'AI Mix 5', image: '/music5.jpg' },
    { id: 6, title: 'AI Mix 6', image: '/music6.jpg' },
  ];

  return (
    <div className="w-full h-full p-6 flex flex-col space-y-6 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 overflow-y-auto scrollbar-none">
      {/* Trending Music Section */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group">
        <h2 className="text-lg font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          {trendingMusic.title}
        </h2>
        <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-inner">
          <Image
            src={trendingMusic.image}
            alt="Trending Music"
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-200">
          <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-600 to-red-600 rounded-lg hover:from-pink-700 hover:to-red-700 shadow-md transition-all duration-200 hover:scale-105">
            <span>❤️</span>
            <span>{trendingMusic.likes.toLocaleString()}</span>
          </button>
          <span className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg">
            <span>👁</span>
            <span>{trendingMusic.views.toLocaleString()}</span>
          </span>
          <span className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg">
            <span>💬</span>
            <span>{trendingMusic.comments}</span>
          </span>
        </div>
        <button className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
          ➕ Follow Artist
        </button>
      </div>

      {/* AI Recommended Versions */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          AI Recommended Versions
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {aiRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative w-full h-24">
                <Image
                  src={rec.image}
                  alt={rec.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 160px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-xs text-center p-3 text-gray-200 font-medium group-hover:text-white transition-colors">
                {rec.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
        <h3 className="text-md font-semibold mb-3 text-gray-200">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            🎵 Create Playlist
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            📥 Import Music
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            🔄 Shuffle All
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;

// app/dashboard/page.js
import SawaFlix from '../home/page';

export const metadata = {
  title: 'Dashboard - SawaFlix',
  description: 'Your entertainment dashboard',
};

export default function DashboardPage() {
  return (
    <div className="min-h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, John!</h1>
        <p className="text-gray-400">Here's what's trending in your entertainment world.</p>
      </div>
      <SawaFlix />
    </div>
  );
}

// app/dashboard/music/page.js
import MusicPage from '../../../components/Dashboard/MusicPage';

export const metadata = {
  title: 'Music - SawaFlix Dashboard',
  description: 'Listen to your favorite music and discover new tracks',
};

export default function DashboardMusicPage() {
  return <MusicPage />;
}