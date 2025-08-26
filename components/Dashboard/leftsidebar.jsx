'use client';
import { useState } from 'react';
import Link from 'next/link'; // Import the Link component
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

export default function LeftSidebar() { // Removed onNavigate prop since Link handles navigation
  const [active, setActive] = useState('movies');

  const menuItems = [
    { name: 'Movies', icon: Film, id: 'movies', route: '/dashboard/movie', badge: null },
    { name: 'Music', icon: Music, id: 'music', route: '/dashboard/music', badge: 'New' },
    { name: 'Artists', icon: User, id: 'artists', route: '/dashboard/artistPage', badge: null },
    { name: 'Downloads', icon: Download, id: 'downloads', route: '/dashboard/downloads', badge: null },
    { name: 'SawaSmart', icon: Sparkles, id: 'sawasmart', route: '/dashboard/sawaSmart', badge: 'AI' },
  ];

  // The handleItemClick function is now simplified, as Link handles the navigation
  const handleItemClick = (itemId) => {
    setActive(itemId);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <Link
              key={item.id}
              href={item.route} // Use the route for the Link's href
              onClick={() => handleItemClick(item.id)}
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
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link href="/dashboard/profile">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-750 hover:from-gray-750 hover:to-gray-700 transition-all cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-white truncate">John Bless</p>
            <p className="text-xs text-gray-400 truncate">@johnbless </p>
          </div>

        </div>
        </Link>
        
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