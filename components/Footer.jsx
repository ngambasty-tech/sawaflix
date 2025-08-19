import React from "react";

const Footer = ({ onExplore, onNavigate }) => {
  const quickLinks = ["Movies", "Series", "Trending"];

  return (
    <footer className="bg-black text-gray-400 py-6 md:py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center space-y-4">
        
        {/* Logo */}
        <div className="text-red-600 font-bold text-xl md:text-2xl">SawaFlix</div>
        
        {/* Quick Links */}
        <div className="flex justify-center space-x-6 md:space-x-10 text-sm md:text-base">
          {quickLinks.map((link) => (
            <button
              key={link}
              onClick={() => onNavigate(link)}
              className="hover:text-white transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
        
        {/* Explore Button */}
        <button
          onClick={onExplore}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg transition-colors text-sm md:text-base font-semibold"
        >
          Explore More
        </button>
        
        {/* Copyright */}
        <p className="text-xs md:text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} SawaFlix. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
