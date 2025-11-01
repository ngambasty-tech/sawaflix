
import Link from 'next/link';
import React from 'react';

// Data for the sections
const recentlyPlayedData = [
  { artist: 'Tasha Cobbs', album: 'Power', image: '/img1.jpg' },
  { artist: 'Tye Tribbett', album: 'Greater Than', image: '/img2.jpg' },
  { artist: 'Annatatoria', album: 'The Divide', image: '/img3.jpg' },
  { artist: 'Koryn Hawthorne', album: 'Unstoppable', image: '/img4.jpg' },
  { artist: 'Mercy Chinwo', album: 'Yes Sir', image: '/mfy1.jpg' },
];

const madeForYouData = [
  { artist: 'Magasco', title: 'The Divide', duration: '3:50', album: 'The Divide', image: '/Magasco.jpg' },
  { artist: ' Mercy ogors', title: 'Greater Than', duration: '2:31', album: 'Greater Than', image: '/CeCe Winans.jpeg' },
  { artist: 'Benylee x Juvinal', title: 'Power', duration: '3:13', album: 'Power', image: '/music.jpg' },
  { artist: 'Teni', title: 'Unstoppable', duration: '3:45', album: 'Unstoppable', image: '/Teni1.jpg' },
];

const MusicPage = () => {
  return (
    <div className="bg-[#120025] min-h-screen text-white p-6 md:p-12 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-red-700">Discover</h1>

      {/* Recently Played Section */}
      <div className="mb-12">
        <Link href='/dashboard/music'>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recently Played</h2>
          <div className="flex items-center space-x-2 cursor-pointer text-purple-300 hover:text-white transition-colors">
            <span className="text-sm text-red-700">View All</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
        </Link>
        <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-hide">
          {recentlyPlayedData.map((item, index) => (
        <Link href='/dashboard/music'>
            <div key={index} className="flex-none w-32 text-center cursor-pointer transform hover:scale-105 transition-transform">
              <img
                src={item.image}
                alt={item.artist}
                className="w-24 h-24 md:w-28 md:h-28 rounded-lg object-cover mx-auto mb-2"
              />
              <p className="text-sm font-medium truncate">{item.artist}</p>
              <p className="text-xs text-gray-400 truncate">{item.album}</p>
            </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Made For You Section */}
      <div>
        <h2 className="text-xl font-semibold mb- text-red-700">Made For You</h2>
        <div className="space-y-4">
          {madeForYouData.map((song, index) => (
        <Link href='/dashboard/music'>
            
            <div key={index} className="flex items-center p-3 rounded-lg hover:bg-red-800 transition-colors cursor-pointer">
              
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-4">
                <img src={song.image} alt={song.artist} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-sm">{song.artist}</p>
                <p className="text-xs text-gray-400">{song.album}</p>
              </div>
              <div className="flex-grow text-center text-sm text-gray-400 hidden sm:block truncate">
                {song.title}
              </div>
              <div className="flex items-center space-x-4 ml-auto">
                <span className="text-sm text-gray-400">{song.duration}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.835 3 8.25c0 7.218 9 12 9 12s9-4.782 9-12z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-white transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;