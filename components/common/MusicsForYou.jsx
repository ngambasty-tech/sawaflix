import Image from 'next/image';

export default function MusicSection({ 
  title = "Music For You",
  music
}) {
  // Default music if none provided
  const defaultMusic = [
    {
      id: 1,
      imageSrc: "/music1.jpg",
      imageAlt: "Hit Singles 2024",
      title: "Hit Singles 2024",
      artist: "Various Artists",
      genre: "Pop",
      duration: "3:45",
      rating: 4.2
    },
    {
      id: 2,
      imageSrc: "/music1.jpg",
      imageAlt: "Midnight Vibes",
      title: "Midnight Vibes",
      artist: "The Weeknd",
      genre: "R&B",
      duration: "4:12",
      rating: 4.5
    },
    {
      id: 3,
      imageSrc: "/music1.jpg",
      imageAlt: "Electronic Dreams",
      title: "Electronic Dreams",
      artist: "Daft Punk",
      genre: "Electronic",
      duration: "5:23",
      rating: 4.8
    },
    {
      id: 4,
      imageSrc: "/music1.jpg",
      imageAlt: "Acoustic Sessions",
      title: "Acoustic Sessions",
      artist: "Ed Sheeran",
      genre: "Acoustic",
      duration: "3:28",
      rating: 4.0
    }
  ];

  const musicList = music || defaultMusic;

  const PlayIcon = () => (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-purple-500 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="ml-1 sm:w-6 sm:h-6">
        <polygon points="5,3 19,12 5,21" fill="white" />
      </svg>
    </div>
  );

  const MusicWaveIcon = () => (
    <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-pink-500/80 to-purple-500/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
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
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" className="sm:w-4 sm:h-4">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        ))}
        
        {/* Half Star */}
        {hasHalfStar && (
          <div className="relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#d1d5db" className="sm:w-4 sm:h-4">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" className="absolute inset-0 sm:w-4 sm:h-4" style={{clipPath: 'inset(0 50% 0 0)'}}>
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
    <div className="w-full max-w-7xl mx-auto px-4 mb-30 sm:px-6 lg:px-8 py-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mr-3"></div>
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

      {/* Music Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {musicList.map((track) => (
          <div key={track.id} className="group cursor-pointer">
            <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              {/* Album Cover */}
              <div className="relative aspect-square">
                <Image
                  src={track.imageSrc}
                  alt={track.imageAlt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Music Wave Icon */}
                <MusicWaveIcon />
                
                {/* Play Button */}
                <PlayIcon />

                {/* Duration Badge */}
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-white text-xs font-medium">{track.duration}</span>
                </div>
              </div>
              
              {/* Music Info */}
              <div className="bg-gradient-to-b from-gray-800/95 to-gray-900/95 backdrop-blur-sm p-3 sm:p-4">
                <h3 className="text-white font-semibold text-sm sm:text-base mb-1 leading-tight line-clamp-1">
                  {track.title}
                </h3>
                <p className="text-pink-300 text-xs sm:text-sm mb-1 font-medium">
                  {track.artist}
                </p>
                <p className="text-gray-400 text-xs mb-2">
                  {track.genre}
                </p>
                <StarRating rating={track.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Music Visualizer Effect */}
      <div className="absolute -z-10 top-0 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}