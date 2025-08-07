//bottom navbar
'use client';

import { useState } from 'react';
import { Home, Film, Music2 } from 'lucide-react';
import Image from 'next/image';

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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex flex-col items-center justify-center transition-colors ${
                  isActive ? 'text-black' : 'text-gray-600'
                }`}
              >
                {item.isProfile ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden mb-1 border-2 border-gray-300">
                    <Image
                      src="/profile-avatar.jpg" // Replace with your profile image path
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Icon 
                    size={28} 
                    className={`mb-1 ${
                      isActive ? 'stroke-2 text-black' : 'stroke-[1.5] text-gray-600'
                    }`}
                    fill={item.name === 'Movies' ? 'currentColor' : 'none'}
                  />
                )}
                <span className={`text-sm font-medium ${
                  isActive ? 'text-black' : 'text-gray-600'
                }`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default DownNav;