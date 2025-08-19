"use client";
import React from "react";
import Image from "next/image";

const RightSidebar = () => {
  const trendingMusic = {
    title: "Top Trending Music of the Week",
    image: "/mfy1.jpg",
    likes: 2300,
    views: 5400,
    comments: 120,
  };

  const aiRecommendations = [
    { id: 1, title: "AI Mix 1", image: "/music1.jpg" },
    { id: 2, title: "AI Mix 2", image: "/music2.jpg" },
    { id: 3, title: "AI Mix 3", image: "/music3.jpg" },
    { id: 4, title: "AI Mix 4", image: "/music4.jpg" },
    { id: 5, title: "AI Mix 5", image: "/music5.jpg" },
    { id: 6, title: "AI Mix 6", image: "/music6.jpg" },
  ];

  return (
    <aside className="w-full lg:w-80 h-screen p-6 flex flex-col space-y-8
                      bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900
                      rounded-2xl shadow-2xl
                      overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      
      {/* Trending Music Section */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <h2 className="text-xl font-bold mb-4 text-red-500 drop-shadow-lg">
          {trendingMusic.title}
        </h2>
        <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-inner">
          <Image
            src={trendingMusic.image}
            alt="Trending Music"
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-200">
          <button className="flex items-center gap-1 px-4 py-1 bg-pink-600/80 rounded-lg hover:bg-pink-700/90 shadow-md transition-colors">
            ❤️ {trendingMusic.likes}
          </button>
          <span className="flex items-center gap-1">👁 {trendingMusic.views}</span>
          <span className="flex items-center gap-1">💬 {trendingMusic.comments}</span>
        </div>
        <button className="mt-4 w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-md transition-colors">
          ➕ Follow Artist
        </button>
      </div>

      {/* AI Recommended Versions */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-4 text-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
          AI Recommended Versions
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {aiRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="relative w-full h-24">
                <Image
                  src={rec.image}
                  alt={rec.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <p className="text-xs text-center p-2 text-gray-200 font-medium">
                {rec.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
