import Image from 'next/image';

export default function MoviesSection({ 
  title = "Movies For You",
  movies
}) {
  // Default movies if none provided
  const defaultMovies = [
    {
      id: 1,
      imageSrc: "/movie.jpg",
      imageAlt: "The Uncharted II",
      title: "The Uncharted II",
      genre: "Action",
      rating: 3.5
    },
    {
      id: 2,
      imageSrc: "/movie.jpg",
      imageAlt: "Black Panther",
      title: "BLACK Panther",
      genre: "Action",
      rating: 3.5
    },
    {
      id: 3,
      imageSrc: "/movie.jpg",
      imageAlt: "Action Movie",
      title: "Action Movie",
      genre: "Action",
      rating: 4.0
    },
    {
      id: 4,
      imageSrc: "/movie.jpg",
      imageAlt: "Thriller Movie",
      title: "Thriller Movie",
      genre: "Thriller",
      rating: 4.2
    }
  ];

  const movieList = movies || defaultMovies;

  const PlayIcon = () => (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 cursor-pointer">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="ml-1 sm:w-6 sm:h-6">
        <polygon points="5,3 19,12 5,21" fill="#ef4444" />
      </svg>
    </div>
  );

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" className="sm:w-4 sm:h-4">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        ))}
        
        {/* Half Star */}
        {hasHalfStar && (
          <div className="relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#d1d5db" className="sm:w-4 sm:h-4">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" className="absolute inset-0 sm:w-4 sm:h-4" style={{clipPath: 'inset(0 50% 0 0)'}}>
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </div>
        )}
        
        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#d1d5db" className="sm:w-4 sm:h-4">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        ))}
        
        <span className="text-gray-300 text-xs sm:text-sm ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-pink-500 rounded-full mr-3"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {title}
          </h2>
        </div>
        
        {/* See All Button */}
        <button className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 group">
          <span className="text-sm sm:text-base font-medium mr-2">See All</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover:translate-x-1 transition-transform duration-200 sm:w-5 sm:h-5"
          >
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </button>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {movieList.map((movie) => (
          <div key={movie.id} className="group cursor-pointer">
            <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              {/* Movie Poster */}
              <div className="relative aspect-[2/3]">
                <Image
                  src={movie.imageSrc}
                  alt={movie.imageAlt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Play Button */}
                <PlayIcon />
              </div>
              
              {/* Movie Info */}
              <div className="bg-gray-900/95 backdrop-blur-sm p-3 sm:p-4">
                <h3 className="text-white font-semibold text-sm sm:text-base mb-1 leading-tight line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-2">
                  {movie.genre}
                </p>
                <StarRating rating={movie.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}