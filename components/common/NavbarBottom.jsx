//bottom navbar
'use client';

import { useState } from 'react';
import { Home, Film, Music2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const DownNav = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    {
      name: 'Home',
      icon: Home,
      href: '/'
    },
    {
      name: 'Movies',
      icon: Film,
      href: '/movies'
    },
    {
      name: 'Music',
      icon: Music2,
      href: '/music'
    },
    {
      name: 'You',
      icon: null,
      href: '/profile',
      isProfile: true
    }
  ];

return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:px-0">
      {/* Gradient Background Container */}
      <nav className="bg-gradient-to-r from-red-600 via-red-600 to-red-600 rounded-full px-4 py-1 sm:px-6 sm:py-3 shadow-2xl border border-red-400/30 backdrop-blur-sm w-full sm:w-auto">
        <div className="flex items-center justify-around sm:justify-center sm:space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex flex-col items-center justify-center transition-all duration-200 transform hover:scale-110 ${
                  isActive 
                    ? 'text-white drop-shadow-lg' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.isProfile ? (
                  <Link href="/"> 
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden mb-0.5 sm:mb-1 border-2 transition-all duration-200 ${
                    isActive 
                      ? 'border-yellow-300 shadow-lg ring-2 ring-yellow-300/50' 
                      : 'border-white/50 hover:border-white'
                  }`}>
                    <Image
                      src="/dummy-profile-image-female.jpg" // Replace with your profile image path
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  </Link> 
                ) : (
                  <Icon 
                    size={20} 
                    className={`mb-0.5 sm:mb-1 transition-all duration-200 sm:w-7 sm:h-7 ${
                      isActive 
                        ? 'stroke-2 drop-shadow-lg' 
                        : 'stroke-[1.5] group-hover:stroke-2'
                    }`}
                    fill={item.name === 'Movies' && isActive ? 'currentColor' : 'none'}
                  />
                )}
                <Link href="/">
                <span className={`text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'text-white drop-shadow-sm' 
                    : 'text-white/70'
                }`}>
                  {item.name}
                </span>
                </Link>

                {/* Active Indicator Dot */}
                {isActive && (
                  <div className="absolute -top-1 w-2 h-2 bg-yellow-300 rounded-full shadow-lg animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Subtle Glow Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 via-red-500/20 to-pink-500/20 rounded-full blur-xl -z-10"></div>
    </div>
  );
};

export default DownNav;