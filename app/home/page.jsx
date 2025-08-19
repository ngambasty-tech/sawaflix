'use client'
import React, { useState } from 'react';
import { Search, User, Home, Film, Music, Play, Star, Clock, Bookmark, Menu, X, Users } from 'lucide-react';

const SawaFlix = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  // Sample data
  const trendingContent = [
    { id: 1, title: "ARCADIAN", type: "movie", rating: 8.5, image: "/api/placeholder/300/400", genre: "Sci-Fi" },
    { id: 2, title: "Lunar Hits", type: "music", rating: 9.2, image: "/api/placeholder/300/400", genre: "Electronic" },
    { id: 3, title: "Dune: Part Two", type: "movie", rating: 9.1, image: "/api/placeholder/300/400", genre: "Action" },
    { id: 4, title: "Midnight Jazz", type: "music", rating: 8.8, image: "/api/placeholder/300/400", genre: "Jazz" },
    { id: 5, title: "Avatar 3", type: "movie", rating: 9.3, image: "/api/placeholder/300/400", genre: "Adventure" },
    { id: 6, title: "Summer Beats", type: "music", rating: 8.7, image: "/api/placeholder/300/400", genre: "Pop" }
  ];

  const movieRecommendations = [
    { id: 1, title: "The Ultimatum 4", rating: 4.5, image: "/api/placeholder/200/300", year: "2024" },
    { id: 2, title: "Black Panther", rating: 4.8, image: "/api/placeholder/200/300", year: "2023" },
    { id: 3, title: "Action Movie", rating: 4.2, image: "/api/placeholder/200/300", year: "2024" },
    { id: 4, title: "Thriller Movie", rating: 4.6, image: "/api/placeholder/200/300", year: "2024" }
  ];

  const musicRecommendations = [
    { id: 1, title: "Hit Songs 2024", artist: "Various Artists", image: "/api/placeholder/200/200", plays: "1.2M" },
    { id: 2, title: "Midnight Vibes", artist: "DJ Shadow", image: "/api/placeholder/200/200", plays: "890K" },
    { id: 3, title: "Pop Classics", artist: "Top Artists", image: "/api/placeholder/200/200", plays: "2.1M" },
    { id: 4, title: "Rock Anthems", artist: "Rock Legends", image: "/api/placeholder/200/200", plays: "1.5M" }
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  const NavLink = ({ icon: Icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-all duration-200 cursor-pointer ${
        active 
          ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' 
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <Icon size={20} className="mr-3" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const ContentCard = ({ item, type }) => (
    <div className="group relative bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-48 sm:h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-700 cursor-pointer">
          <Play size={20} className="text-white fill-current" />
        </button>
        <div className="absolute top-3 right-3 bg-black/60 rounded-full px-2 py-1">
          <div className="flex items-center text-yellow-400 text-sm">
            <Star size={14} className="mr-1 fill-current" />
            <span>{type === 'movie' ? item.rating : '★★★★★'}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm sm:text-base mb-1 truncate">{item.title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm">
          {type === 'movie' ? `${item.year} • ${item.genre || 'Movie'}` : `${item.artist} • ${item.plays || 'Music'}`}
        </p>
      </div>
    </div>
  );

  const HeroSection = () => (
    <div className="relative h-64 sm:h-80 lg:h-[500px] xl:h-[600px] rounded-2xl overflow-hidden mb-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1489599849323-2429c9b59ec8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
            Sawa<span className="text-red-500">Flix</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-6 max-w-2xl">
            The Ultimate Music And Movies Experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 cursor-pointer">
              Watch Now
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold transition-all duration-200 cursor-pointer">
              Listen Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Desktop Top Navigation */}
      <div className="hidden lg:flex items-center justify-between p-4 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 fixed top-0 left-0 right-0 z-50">
        {/* Left - Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg mr-3" />
          <span className="text-2xl font-bold text-white">
            Sawa<span className="text-red-500">Flix</span>
          </span>
        </div>

        {/* Center - Search Bar (Prominent on Desktop) */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search movies, music, and more..."
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500/20"
            />
          </div>
        </div>

        {/* Right - Login Button */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleLogin}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
              isLoggedIn 
                ? 'text-green-400 bg-green-900/20 hover:bg-green-900/30 border border-green-600/30' 
                : 'text-white bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-red-600/25'
            }`}
          >
            <User size={20} className="mr-2" />
            {isLoggedIn ? 'Sign Out' : 'Login'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 fixed top-0 left-0 right-0 z-50">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg mr-3" />
            <span className="text-xl font-bold text-white">
              Sawa<span className="text-red-500">Flix</span>
            </span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300 cursor-pointer"
            
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 pt-20 lg:pt-24">
          {/* Hero Section */}
          <HeroSection />

          {/* Trending Now */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                <span className="w-1 h-8 bg-red-600 mr-3 rounded-full"></span>
                Trending Now
              </h2>
              <button className="text-red-500 hover:text-red-400 font-medium cursor-pointer">
                See All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trendingContent.map((item) => (
                <div key={item.id} className="relative group bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex flex-col sm:flex-row h-full">
                    <div className="sm:w-1/2 relative">
                      <img src={item.image} alt={item.title} className="w-full h-48 sm:h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="sm:w-1/2 p-6 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 mb-4 capitalize">{item.type} • {item.genre}</p>
                      <div className="flex items-center mb-4">
                        <Star className="text-yellow-400 fill-current mr-1" size={16} />
                        <span className="text-yellow-400 font-medium">{item.rating}</span>
                      </div>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 w-fit cursor-pointer">
                        {item.type === 'movie' ? 'Watch Now' : 'Play Now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Movies For You */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
                Movies For You
              </h2>
              <button className="text-blue-500 hover:text-blue-400 font-medium cursor-pointer">
                See All
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {movieRecommendations.map((movie) => (
                <ContentCard key={movie.id} item={movie} type="movie" />
              ))}
            </div>
          </section>

          {/* Music For You */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                <span className="w-1 h-8 bg-purple-600 mr-3 rounded-full"></span>
                Music For You
              </h2>
              <button className="text-purple-500 hover:text-purple-400 font-medium cursor-pointer">
                See All
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {musicRecommendations.map((music) => (
                <ContentCard key={music.id} item={music} type="music" />
              ))}
            </div>
          </section>
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 px-4 py-3 lg:py-4 z-50">
          <div className="max-w-md lg:max-w-2xl mx-auto">
            <div className="flex justify-center items-center space-x-8 lg:space-x-16">
              <button 
                onClick={() => setActiveSection('Home')}
                className={`flex flex-col items-center py-2 px-3 lg:py-4 lg:px-6 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeSection === 'Home' ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <Home size={22} className="mb-1 lg:mb-2 lg:w-7 lg:h-7" strokeWidth={2.5} />
                <span className="text-xs lg:text-sm font-bold">Home</span>
              </button>
              <button 
                onClick={() => setActiveSection('Movies')}
                className={`flex flex-col items-center py-2 px-3 lg:py-4 lg:px-6 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeSection === 'Movies' ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <Film size={22} className="mb-1 lg:mb-2 lg:w-7 lg:h-7" strokeWidth={2.5} />
                <span className="text-xs lg:text-sm font-bold">Movies</span>
              </button>
              <button 
                onClick={() => setActiveSection('Music')}
                className={`flex flex-col items-center py-2 px-3 lg:py-4 lg:px-6 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeSection === 'Music' ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <Music size={22} className="mb-1 lg:mb-2 lg:w-7 lg:h-7" strokeWidth={2.5} />
                <span className="text-xs lg:text-sm font-bold">Music</span>
              </button>
              <button 
                onClick={() => setActiveSection('For You')}
                className={`flex flex-col items-center py-2 px-3 lg:py-4 lg:px-6 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeSection === 'For You' ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <Users size={22} className="mb-1 lg:mb-2 lg:w-7 lg:h-7" strokeWidth={2.5} />
                <span className="text-xs lg:text-sm font-bold">For You</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed right-0 top-0 z-50 h-full w-64 bg-gray-900 border-l border-gray-800 transform transition-transform duration-300 lg:hidden">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between p-6">
              <button 
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={24} />
              </button>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white">
                  Sawa<span className="text-red-500">Flix</span>
                </span>
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg ml-3" />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
              <NavLink 
                icon={Home} 
                label="Home" 
                active={activeSection === 'Home'}
                onClick={() => {
                  setActiveSection('Home');
                  setIsSidebarOpen(false);
                }}
              />
              <NavLink 
                icon={Film} 
                label="Movies" 
                active={activeSection === 'Movies'}
                onClick={() => {
                  setActiveSection('Movies');
                  setIsSidebarOpen(false);
                }}
              />
              <NavLink 
                icon={Music} 
                label="Music" 
                active={activeSection === 'Music'}
                onClick={() => {
                  setActiveSection('Music');
                  setIsSidebarOpen(false);
                }}
              />
              <NavLink 
                icon={Users} 
                label="For You" 
                active={activeSection === 'For You'}
                onClick={() => {
                  setActiveSection('For You');
                  setIsSidebarOpen(false);
                }}
              />
            </nav>

            {/* Bottom Section */}
            <div className="p-4 space-y-2">
              <button className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200 cursor-pointer">
                <Search size={20} className="mr-3" />
                <span>Search</span>
              </button>
              
              <button 
                onClick={toggleLogin}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 cursor-pointer ${
                  isLoggedIn 
                    ? 'text-green-400 bg-green-900/20 hover:bg-green-900/30' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <User size={20} className="mr-3" />
                <span>{isLoggedIn ? 'Sign Out' : 'Login'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SawaFlix;