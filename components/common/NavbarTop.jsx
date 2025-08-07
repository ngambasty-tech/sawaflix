import Link from 'next/link';

export default function NavbarTop() {
  return (
    <nav className="bg-gradient-to-r  from-red-600 via-red-500 to-pink-500 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between shadow-xl">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
        <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200">
          <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-white rounded-sm transform rotate-45 shadow-sm"></div>
        </div>
        <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold tracking-wide drop-shadow-sm">
          <Link href="/" className="hidden sm:inline">StreamVerse</Link>
          <Link href="/" className="sm:hidden">SV</Link>
        </span>
      </div>

      {/* Search Section */}
      <div className="relative flex-1 max-w-xs sm:max-w-md lg:max-w-lg mx-4 sm:mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies, shows..."
            className="w-full bg-white/95 backdrop-blur-sm rounded-full py-2 sm:py-2.5 lg:py-3 pl-4 sm:pl-5 pr-10 sm:pr-12 text-gray-800 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-70 focus:bg-white transition-all duration-200 shadow-lg"
          />
          <button className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-red-500 transition-colors duration-200 p-1">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="sm:w-5 sm:h-5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>

   
    </nav>
  );
}