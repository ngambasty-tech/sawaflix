'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Heart, MoreHorizontal } from 'lucide-react';

const MusicProfilePage = () => {
  const playlists = [
    { id: 1, name: 'My Favorites', songs: 25, cover: '/avenge.jpg' },
    { id: 2, name: 'Workout Mix', songs: 18, cover: '/r3.jpg' },
    { id: 3, name: 'Chill Vibes', songs: 32, cover: '/music.jpg' },
    { id: 4, name: 'Road Trip', songs: 28, cover: '/mfy4.jpg' }
  ];

  const recommendedSongs = [
    { id: 1, title: 'Avengers', artist: 'Luna Valley', duration: '3:42', cover: '/avenge.jpg' },
    { id: 2, title: 'Black Panther', artist: 'Neon Waves', duration: '4:15', cover: '/black.jpg' },
    { id: 3, title: 'Doctor Strange', artist: 'Coastal Drift', duration: '3:28', cover: '/docstrange.jpg' },
    { id: 4, title: 'Green Light', artist: 'Benylee', duration: '3:56', cover: '/Greenlight.jpg' }
  ];

  const favoriteSongs = [
    { id: 1, title: 'Golden Hour', artist: 'Magasco', duration: '4:22', cover: '/magasco.jpg' },
    { id: 2, title: 'You are you', artist: 'Dejavu', duration: '3:33', cover: '/mfy1.jpg' },
    { id: 3, title: 'Mountain High', artist: 'Valley Echo', duration: '4:01', cover: '/john.jpg' },
    { id: 4, title: 'Ocean Waves', artist: 'Benylee', duration: '3:47', cover: '/Gene.jpg' }
  ];

  // Track liked songs
  const [liked, setLiked] = useState({});

  const toggleLike = (songId) => {
    setLiked((prev) => ({
      ...prev,
      [songId]: !prev[songId]
    }));
  };

  return (
    <div className="min-h-screen bg-[#0f172a]"> {/* dark blue background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Section with Background */}
        <div className="relative mb-20">
          <div
            className="relative rounded-lg shadow-lg overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg.png')" }}
          >
            <div className="absolute inset-0 bg-opacity-40"></div>
            <div className="relative z-10 p-6 md:p-8 pb-16 md:pb-20 text-white absolute top-16 left-160">
              <button className=" bg-red-500 px-3 py-1 rounded-full text-xs cursor-pointer">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="absolute bottom-0 left-6 md:left-8 transform translate-y-1/2">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image 
                src="/music3.jpg" 
                alt="Profile" 
                width={160} 
                height={160} 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
   
             <h2 className="text-3xl md:text-xl font-bold mb-2 pl-15">Nana Favour</h2>
              <p className="text-purple-50 max-w-2xl pl-15 ">
                Passionate about discovering new music and sharing great vibes.
                Love everything from indie rock to electronic beats.
              </p>
        {/* Playlists Section */}
        <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-sm p-6 mb-8 translate-y-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-red-500">Playlists</h3>
            <button className="text-purple-600 hover:text-purple-700 font-medium">View all</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="group cursor-pointer">
                <div className="relative mb-3 rounded-lg overflow-hidden">
                  <Image 
                    src={playlist.cover} 
                    alt={playlist.name} 
                    width={300} 
                    height={300} 
                    className="object-cover w-full aspect-square"
                  />
                  <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/30 transition-all duration-200 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <h4 className="font-medium text-white mb-1">{playlist.name}</h4>
                <p className="text-sm text-gray-300">{playlist.songs} songs</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Songs Section */}
        <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-red-500">Recommended Songs</h3>
            <button className="text-purple-600 hover:text-purple-700 font-medium">View all</button>
          </div>

          <div className="space-y-4 mb-8">
            {recommendedSongs.map((song) => (
              <div 
                key={song.id} 
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-orange-500/20 cursor-pointer group transition-colors"
              >
                <Image 
                  src={song.cover} 
                  alt={song.title} 
                  width={60} 
                  height={60} 
                  className="rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white truncate">{song.title}</h4>
                  <p className="text-sm text-gray-300 truncate">{song.artist}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">{song.duration}</span>
                  <button 
                    onClick={() => toggleLike(song.id)}
                    className="p-2 transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${liked[song.id] ? "text-red-500 fill-red-500" : "text-gray-400"} `}
                    />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Songs Section */}
        <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-red-500">Favorite</h3>
            <button className="text-purple-600 hover:text-purple-700 font-medium">View all</button>
          </div>

          <div className="space-y-4 mb-8">
            {favoriteSongs.map((song) => (
              <div 
                key={song.id} 
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-orange-500/20 cursor-pointer group transition-colors"
              >
                <Image 
                  src={song.cover} 
                  alt={song.title} 
                  width={60} 
                  height={60} 
                  className="rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white truncate">{song.title}</h4>
                  <p className="text-sm text-gray-300 truncate">{song.artist}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">{song.duration}</span>
                  <button 
                    onClick={() => toggleLike(song.id)}
                    className="p-2 transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${liked[song.id] ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                    />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MusicProfilePage;
