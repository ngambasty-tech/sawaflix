"use client"

import React, { useState, useEffect } from 'react';
import { Play, Search, Menu, Star, ChevronLeft, ChevronRight, Plus, Info, X, Home, Film, Tv, Clock, List } from 'lucide-react';
import mockData from '../data/mockdata.json';

const MovieCard = ({ movie, isLarge = false, onPlay, onAddToWatchlist, onMoreInfo }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative group cursor-pointer transition-transform duration-300 hover:scale-105 ${
        isLarge ? 'min-w-[200px] md:min-w-[320px]' : 'min-w-[120px] md:min-w-[192px]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlay(movie)}
    >
      <div className="relative">
        <img 
          src={movie.image} 
          alt={movie.title}
          className={`w-full object-cover rounded-lg ${
            isLarge ? 'h-[112px] md:h-[180px]' : 'h-[168px] md:h-[288px]'
          }`}
          loading="lazy"
        />
        {movie.isNew && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300 rounded-lg flex items-center justify-center ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2 md:space-x-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onPlay(movie);
              }}
              className="bg-white text-black p-2 md:p-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Play size={16} className="md:w-5 md:h-5" fill="currentColor" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToWatchlist(movie);
              }}
              className="bg-gray-800 text-white p-2 md:p-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              <Plus size={16} className="md:w-5 md:h-5" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onMoreInfo(movie);
              }}
              className="bg-gray-800 text-white p-2 md:p-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              <Info size={16} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 md:p-4 rounded-b-lg">
          <h3 className="text-white font-semibold text-xs md:text-sm mb-1 truncate">{movie.title}</h3>
          <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-300">
            <span>{movie.release_date}</span>
            <div className="flex items-center">
              <Star className="w-2 h-2 md:w-3 md:h-3 text-yellow-400 fill-current mr-1" />
              <span>{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollableRow = ({ title, movies, isLarge = false, onPlay, onAddToWatchlist, onMoreInfo }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const scrollContainerId = `scroll-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  const scroll = (direction) => {
    const container = document.getElementById(scrollContainerId);
    if (!container) return;
    
    const scrollAmount = isLarge ? 320 : 200;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  return (
    <div className="mb-6 md:mb-8" onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>
      <div className="flex items-center justify-between mb-2 md:mb-4 px-2 md:px-0">
        <h2 className="text-white text-lg md:text-xl font-semibold">{title}</h2>
        {(showControls || window.innerWidth < 768) && (
          <div className="flex space-x-1 md:space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-1 md:p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
            >
              <ChevronLeft className="text-white" size={14} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-1 md:p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
            >
              <ChevronRight className="text-white" size={14} />
            </button>
          </div>
        )}
      </div>
      <div 
        id={scrollContainerId}
        className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide px-2 md:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies?.map((movie, index) => (
          <MovieCard 
            key={index} 
            movie={movie} 
            isLarge={isLarge}
            onPlay={onPlay}
            onAddToWatchlist={onAddToWatchlist}
            onMoreInfo={onMoreInfo}
          />
        ))}
      </div>
    </div>
  );
};

const Header = ({ onSearch, onMenuClick, currentPage, onPageChange }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', icon: Home, page: 'home' },
    { name: 'Series', icon: Tv, page: 'series' },
    { name: 'Movies', icon: Film, page: 'movies' },
    { name: 'Latest', icon: Clock, page: 'latest' },
    { name: 'My List', icon: List, page: 'mylist' }
  ];

  return (
    <header className="flex items-center justify-between p-4 md:p-6 bg-black bg-opacity-50 backdrop-blur-sm fixed w-full z-40">
      <div className="flex items-center space-x-4 md:space-x-8">
        <button 
          onClick={() => {
            onPageChange('home');
            setMobileMenuOpen(false);
          }}
          className="text-red-600 font-bold text-xl md:text-2xl hover:text-red-500 transition-colors"
        >
          SawaFlix
        </button>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white" 
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            if (searchOpen) setSearchOpen(false);
          }}
        >
          <Menu size={24} />
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.page}
                onClick={() => onPageChange(item.page)}
                className={`flex items-center space-x-1 transition-colors ${
                  currentPage === item.page 
                    ? 'text-red-500' 
                    : 'text-white hover:text-red-500'
                }`}
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        {searchOpen ? (
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-gray-800 text-white px-2 py-1 md:px-3 md:py-1 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-32 md:w-auto"
              autoFocus
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-2 py-1 md:px-3 md:py-1 rounded-r-lg transition-colors"
            >
              <Search size={16} className="text-white" />
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
              }}
              className="ml-1 md:ml-2 text-white hover:text-red-500"
            >
              <X size={16} />
            </button>
          </form>
        ) : (
          <button 
            onClick={() => {
              setSearchOpen(true);
              setMobileMenuOpen(false);
            }}
            className="text-white cursor-pointer hover:text-red-500 transition-colors"
          >
            <Search size={20} />
          </button>
        )}
        <button 
          onClick={() => onPageChange('profile')}
          className="w-6 h-6 md:w-8 md:h-8 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
        ></button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-gray-900 z-30 p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.page}
                  onClick={() => {
                    onPageChange(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 transition-colors ${
                    currentPage === item.page 
                      ? 'text-red-500' 
                      : 'text-white hover:text-red-500'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-lg">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

const HeroSection = ({ movie, onPlay, onMoreInfo, onAddToWatchlist }) => {
  if (!movie) return null;

  return (
    <div className="relative h-[40vh] md:h-screen pt-16">
      <img 
        src={movie.image} 
        alt={movie.title}
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent">
        <div className="absolute bottom-8 left-4 md:bottom-32 md:left-6 max-w-md md:max-w-2xl">
          <h1 className="text-white text-2xl md:text-5xl font-bold mb-2 md:mb-4 line-clamp-2">{movie.title}</h1>
          <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
            {movie.plot_summary}
          </p>
          <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6 text-xs md:text-base">
            <div className="flex items-center">
              <Star className="w-3 h-3 md:w-5 md:h-5 text-yellow-400 fill-current mr-1 md:mr-2" />
              <span className="text-white font-semibold">{movie.rating}</span>
            </div>
            <span className="text-gray-300">{movie.release_date}</span>
            {movie.duration_minutes && (
              <span className="text-gray-300">{movie.duration_minutes} min</span>
            )}
          </div>
          <div className="flex space-x-2 md:space-x-4 flex-wrap gap-2">
            <button 
              onClick={() => onPlay(movie)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 md:px-8 md:py-3 rounded-lg flex items-center space-x-1 md:space-x-2 transition-colors text-sm md:text-base"
            >
              <Play size={16} className="md:w-5 md:h-5" fill="currentColor" />
              <span>Watch Now</span>
            </button>
            <button 
              onClick={() => onMoreInfo(movie)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 md:px-8 md:py-3 rounded-lg transition-colors text-sm md:text-base"
            >
              <Info size={16} className="md:w-5 md:h-5 mr-1 md:mr-2 inline" />
              More Info
            </button>
            <button 
              onClick={() => onAddToWatchlist(movie)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 md:px-8 md:py-3 rounded-lg flex items-center space-x-1 md:space-x-2 transition-colors text-sm md:text-base"
            >
              <Plus size={16} className="md:w-5 md:h-5" />
              <span>My List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, movie, type = 'info' }) => {
  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={movie.image} 
            alt={movie.title}
            className="w-full h-40 md:h-48 object-cover rounded-t-lg"
          />
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 bg-black bg-opacity-50 text-white p-1 md:p-2 rounded-full hover:bg-opacity-75"
          >
            <X size={16} className="md:w-5 md:h-5" />
          </button>
        </div>
        <div className="p-4 md:p-6">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-2">{movie.title}</h2>
          <div className="flex items-center space-x-2 md:space-x-4 mb-3 md:mb-4 text-xs md:text-base text-gray-300">
            <div className="flex items-center">
              <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current mr-1" />
              <span>{movie.rating}</span>
            </div>
            <span>{movie.release_date}</span>
            {movie.duration_minutes && <span>{movie.duration_minutes} min</span>}
          </div>
          <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">{movie.plot_summary}</p>
          <div className="flex space-x-2 md:space-x-4 flex-wrap gap-2">
            {type === 'play' ? (
              <div className="text-center w-full">
                <div className="bg-red-600 text-white p-3 md:p-4 rounded-lg mb-3 md:mb-4">
                  <Play size={24} className="mx-auto mb-1 md:mb-2" fill="currentColor" />
                  <p className="text-sm md:text-base">Playing: {movie.title}</p>
                </div>
                <p className="text-gray-400 text-xs md:text-sm">Video player would be implemented here</p>
              </div>
            ) : (
              <>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 md:px-6 md:py-2 rounded-lg flex items-center space-x-1 md:space-x-2 transition-colors text-sm md:text-base">
                  <Play size={14} className="md:w-4 md:h-4" fill="currentColor" />
                  <span>Play</span>
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 md:px-6 md:py-2 rounded-lg flex items-center space-x-1 md:space-x-2 transition-colors text-sm md:text-base">
                  <Plus size={14} className="md:w-4 md:h-4" />
                  <span>Add to List</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-green-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 text-sm md:text-base">
      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      <span>{message}</span>
    </div>
  );
};

const Footer = ({ onGetStarted }) => {
  const footerSections = [
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Blog']
    },
    {
      title: 'Support', 
      links: ['Help Center', 'Contact Us', 'Terms of Service', 'Privacy Policy']
    },
    {
      title: 'Browse',
      links: ['Movies', 'TV Shows', 'Documentaries', 'Kids']
    },
    {
      title: 'Account',
      links: ['My Account', 'Watchlist', 'Settings', 'Sign Out']
    }
  ];

  return (
    <footer className="bg-black text-gray-400 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-2 md:mb-4 text-sm md:text-base">{section.title}</h3>
              <ul className="space-y-1 md:space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <button className="hover:text-white transition-colors text-left text-xs md:text-sm">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <div className="text-red-600 font-bold text-xl md:text-2xl mb-2 md:mb-4">MovieFlix</div>
          <p className="text-xs md:text-sm mb-3 md:mb-4">Start your free trial today!</p>
          <button 
            onClick={onGetStarted}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg transition-colors text-sm md:text-base"
          >
            Get Started
          </button>
        </div>
      </div>
    </footer>
  );
};

export default function MovieStreamingSite() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [modalState, setModalState] = useState({ isOpen: false, movie: null, type: 'info' });
  const [toast, setToast] = useState({ message: '', isVisible: false });
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Process the mock data to match expected structure
    const processedData = {
      featuredMovie: mockData[0], // Use first movie as featured
      ourSeries: mockData.slice(0, 5),
      popularMovies: mockData.slice(5, 10),
      trendingNow: mockData.slice(10, 15),
      newReleases: mockData.slice(15, 20),
      mustWatch: mockData.slice(20, 25)
    };
    setData(processedData);
  }, []);

  const showToast = (message) => {
    setToast({ message, isVisible: true });
  };

  const hideToast = () => {
    setToast({ message: '', isVisible: false });
  };

  const handlePlay = (movie) => {
    setModalState({ isOpen: true, movie, type: 'play' });
    showToast(`Playing: ${movie.title}`);
  };

  const handleMoreInfo = (movie) => {
    setModalState({ isOpen: true, movie, type: 'info' });
  };

  const handleAddToWatchlist = (movie) => {
    if (!watchlist.find(item => item.title === movie.title)) {
      setWatchlist([...watchlist, movie]);
      showToast(`Added "${movie.title}" to your watchlist`);
    } else {
      showToast(`"${movie.title}" is already in your watchlist`);
    }
  };

  const handleSearch = (query) => {
    showToast(`Searching for: ${query}`);
  };

  const handleMenuClick = () => {
    showToast('Mobile menu opened');
  };

  const handleGetStarted = () => {
    showToast('Redirecting to sign up page...');
  };

  const closeModal = () => {
    setModalState({ isOpen: false, movie: null, type: 'info' });
  };

  if (!data) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading MovieFlix...</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Header 
        onSearch={handleSearch}
        onMenuClick={handleMenuClick}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      <main className="pt-16">
        <HeroSection 
          movie={data.featuredMovie}
          onPlay={handlePlay}
          onMoreInfo={handleMoreInfo}
          onAddToWatchlist={handleAddToWatchlist}
        />
        
        <div className="max-w-7xl mx-auto px-2 md:px-6 py-8 md:py-12 space-y-8 md:space-y-12">
          <ScrollableRow 
            title="Our Series" 
            movies={data.ourSeries}
            onPlay={handlePlay}
            onMoreInfo={handleMoreInfo}
            onAddToWatchlist={handleAddToWatchlist}
          />
          <ScrollableRow 
            title="Popular Top 10 in Games" 
            movies={data.popularMovies}
            onPlay={handlePlay}
            onMoreInfo={handleMoreInfo}
            onAddToWatchlist={handleAddToWatchlist}
          />
          <ScrollableRow 
            title="Trending Now" 
            movies={data.trendingNow}
            onPlay={handlePlay}
            onMoreInfo={handleMoreInfo}
            onAddToWatchlist={handleAddToWatchlist}
          />
          <ScrollableRow 
            title="New Releases" 
            movies={data.newReleases}
            onPlay={handlePlay}
            onMoreInfo={handleMoreInfo}
            onAddToWatchlist={handleAddToWatchlist}
          />
          <ScrollableRow 
            title="Must - Watch Movies" 
            movies={data.mustWatch}
            onPlay={handlePlay}
            onMoreInfo={handleMoreInfo}
            onAddToWatchlist={handleAddToWatchlist}
          />
          
          {watchlist.length > 0 && (
            <ScrollableRow 
              title="My Watchlist" 
              movies={watchlist}
              onPlay={handlePlay}
              onMoreInfo={handleMoreInfo}
              onAddToWatchlist={handleAddToWatchlist}
            />
          )}
          
          {/* Repeat sections */}
          <ScrollableRow 
            title="Our Series" 
            movies={data.ourSeries}
            onPlay={handlePlay}
            onMoreInfo={handleMoreInfo}
            onAddToWatchlist={handleAddToWatchlist}
          />
          <ScrollableRow 
            title="Popular Top 10 in Games" 
            movies={data.popularMovies}
            onPlay={handlePlay}
            onMoreInfo={handleMoreInfo}
            onAddToWatchlist={handleAddToWatchlist}
          />
          <ScrollableRow 
            title="Trending Shows Now" 
            movies={data.trendingNow}
            onPlay={handlePlay}
            onMoreInfo={handleMoreInfo}
            onAddToWatchlist={handleAddToWatchlist}
          />
          <ScrollableRow 
            title="New Released Shows" 
            movies={data.newReleases}
            onPlay={handlePlay}
            onMoreInfo={handleMoreInfo}
            onAddToWatchlist={handleAddToWatchlist}
          />
          <ScrollableRow 
            title="Must - Watch Shows" 
            movies={data.mustWatch}
            onPlay={handlePlay}
            onMoreInfo={handleMoreInfo}
            onAddToWatchlist={handleAddToWatchlist}
          />
        </div>
      </main>
      
      <Footer onGetStarted={handleGetStarted} />
      
      <Modal 
        isOpen={modalState.isOpen}
        onClose={closeModal}
        movie={modalState.movie}
        type={modalState.type}
      />
      
      <Toast 
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}