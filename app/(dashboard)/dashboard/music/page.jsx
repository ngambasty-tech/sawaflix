'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, RotateCcw, Volume2, Download, Shuffle, Repeat } from 'lucide-react';


const playlistData = [
  {
    id: 1,
    title: "Bollo C'est Bollo",
    artist: "Ko-c",
    image: "/music4.jpg",
    src: "/music.mp3", 
    plays: "3.2M",
    trending: "up",
    rank: 3,
  },
  {
    id: 2,
    title: "Génesis",
    artist: "Peso Plumo",
    image: "/music2.jpg",
    src: "/music2.mp3", 
    plays: "2.4M",
    trending: "up",
    rank: 1,
  },
  {
    id: 3,
    title: "Sokoto",
    artist: "Magasco",
    image: "/music3.jpg",
    src: "/music3.mp3", 
    plays: "1.8M",
    trending: "down",
    rank: 2,
  },
  {
    id: 4,
    title: "Midnights (3am Edition)",
    artist: "Taylor Swift",
    image: "/pic4.jpeg",
    src: "/music4.mp3", 
    duration: "3:42"
  },
  {
    id: 5,
    title: "Barbie The Album",
    artist: "Various Artists",
    image: "/music5.jpg",
    src: "/music5.mp3", 
    duration: "2:58"
  },
  {
    id: 6,
    title: "Starboy",
    artist: "The Weeknd",
    image: "/music6.jpg",
    src: "/music6.mp3", 
    duration: "3:20"
  },
];


export default function MusicPage() {
  const [playlist, setPlaylist] = useState(playlistData);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); 
  
  const audioRef = useRef(null);
  const currentTrack = playlist[currentTrackIndex];

  const handleNextTrack = useCallback(() => {
    if (isShuffled) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (playlist.length > 1 && nextIndex === currentTrackIndex);
      setCurrentTrackIndex(nextIndex);
    } else {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }
  }, [isShuffled, playlist.length, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTrackEnd = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === 'all') {
        handleNextTrack();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleTrackEnd);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleTrackEnd);
    };
  }, [repeatMode, handleNextTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
        audio.volume = volume;
    }
  }, [volume]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.play().catch(error => console.error("Error attempting to play audio:", error));
    } else if (audio && !isPlaying) {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current.src) {
        audioRef.current.src = currentTrack.src;
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      (prevIndex - 1 + playlist.length) % playlist.length
    );
  };
  
  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const progressContainer = e.currentTarget;
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const selectTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleShuffle = () => setIsShuffled(!isShuffled);
  const toggleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    setRepeatMode(prev => modes[(modes.indexOf(prev) + 1) % modes.length]);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentTrack.src;
    link.download = `${currentTrack.title}_${currentTrack.artist}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Separate lists for UI rendering
  const popularAlbums = playlist.slice(0, 3);
  const recentlyPlayed = playlist.slice(3, 9);
  
  return (
    // General container with mobile-first padding
    <div className="min-h-full bg-gray-900 text-white p-2 xs:p-3 sm:p-6 lg:p-8">
      <audio ref={audioRef} />

      {/* Header section with responsive layout */}
      <div className="mb-4 sm:mb-8">
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-0.5 xs:mb-1 sm:mb-2 truncate">Music</h1>
            <p className="text-xs xs:text-sm sm:text-base text-gray-400 truncate">Discover and enjoy your favorite tracks</p>
          </div>
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 flex-shrink-0">
            <button 
              onClick={toggleShuffle}
              className={`p-1.5 xs:p-2 rounded-lg transition-colors ${isShuffled ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'}`}
              title="Shuffle"
            >
              <Shuffle size={16} className="xs:w-5 xs:h-5" />
            </button>
            <button 
              onClick={toggleRepeat}
              className={`relative p-1.5 xs:p-2 rounded-lg transition-colors ${repeatMode !== 'off' ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'}`}
              title={`Repeat: ${repeatMode}`}
            >
              <Repeat size={16} className="xs:w-5 xs:h-5" />
              {repeatMode === 'one' && <span className="absolute -top-1 -right-1 xs:top-0 xs:right-0 text-xs font-bold">1</span>}
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 mb-4 sm:mb-8 border border-red-800/20">
            <div className="flex flex-col md:flex-row items-center gap-3 xs:gap-4 sm:gap-6">
              
              <div className="relative w-24 h-24 xs:w-32 xs:h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex-shrink-0">
                <div 
                  className="w-full h-full bg-gray-700 rounded-lg xs:rounded-xl shadow-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentTrack.image})` }}
                />
              </div>
              
              {/* Track Info & Controls */}
              <div className="flex-1 text-center md:text-left w-full min-w-0">
                <p className="text-orange-400 text-xs xs:text-sm sm:text-base mb-0.5 xs:mb-1 font-medium">Now Playing</p>
                <h2 className="text-base xs:text-lg sm:text-2xl md:text-3xl font-bold mb-0.5 xs:mb-1 sm:mb-2 truncate">{currentTrack.title}</h2>
                <p className="text-xs xs:text-sm sm:text-lg text-gray-300 mb-2 xs:mb-3 sm:mb-6 truncate">{currentTrack.artist}</p>
                
                {/* Control buttons with a more responsive gap */}
                <div className="flex items-center justify-center md:justify-start gap-1.5 xs:gap-2 sm:gap-4 mb-3 xs:mb-4 sm:mb-6">
                  <button onClick={handleReplay} className="p-1.5 xs:p-2 hover:bg-white/10 rounded-full transition-colors" title="Replay">
                    <RotateCcw size={16} className="xs:w-5 xs:h-5" />
                  </button>
                  <button onClick={handlePrevTrack} className="p-1.5 xs:p-2 hover:bg-white/10 rounded-full transition-colors" title="Previous">
                    <SkipBack size={16} className="xs:w-5 xs:h-5" />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="bg-white text-black rounded-full p-2 xs:p-2.5 sm:p-3 hover:bg-gray-200 transition-colors shadow-lg"
                  >
                    {isPlaying ? <Pause size={20} className="xs:w-6 xs:h-6" /> : <Play size={20} className="xs:w-6 xs:h-6" />}
                  </button>
                  <button onClick={handleNextTrack} className="p-1.5 xs:p-2 hover:bg-white/10 rounded-full transition-colors" title="Next">
                    <SkipForward size={16} className="xs:w-5 xs:h-5" />
                  </button>
                  <button 
                    onClick={toggleFavorite}
                    className={`p-1.5 xs:p-2 hover:bg-white/10 rounded-full transition-colors ${
                      isFavorite ? 'text-red-500' : 'text-white'
                    }`}
                  >
                    <Heart size={16} className="xs:w-5 xs:h-5" fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="p-1.5 xs:p-2 hover:bg-white/10 rounded-full transition-colors hidden xs:block" 
                    title="Download"
                  >
                    <Download size={16} className="xs:w-5 xs:h-5" />
                  </button>
                </div>
                
                {/* Progress bar and volume controls */}
                <div className="max-w-xl w-full mx-auto md:mx-0">
                  <div className="flex items-center gap-1.5 xs:gap-2 mb-2 xs:mb-3">
                    <span className="text-xs text-gray-300 w-6 xs:w-8 text-right">{formatTime(currentTime)}</span>
                    <div 
                      className="flex-1 bg-gray-700 rounded-full h-1 xs:h-1.5 cursor-pointer group"
                      onClick={handleSeek}
                    >
                      <div 
                        className="bg-orange-500 h-full rounded-full relative transition-all duration-100" 
                        style={{width: duration ? `${(currentTime / duration) * 100}%` : '0%'}}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 xs:w-3 xs:h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-300 w-6 xs:w-8 text-left">{formatTime(duration)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 xs:gap-2">
                    <Volume2 size={14} className="xs:w-4 xs:h-4" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="flex-1 h-0.5 xs:h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visualizer bars */}
            <div className="flex items-end justify-center gap-0.5 xs:gap-1 h-8 xs:h-10 sm:h-16 mt-3 xs:mt-4 sm:mt-6 overflow-hidden">
              {Array.from({ length: 30 }, (_, i) => (
                <div 
                  key={i}
                  className={`rounded-sm transition-all duration-300 ${isPlaying ? 'bg-orange-500' : 'bg-gray-600'}`}
                  style={{
                    width: '2px',
                    height: isPlaying ? `${Math.random() * 20 + 8}px` : '8px'
                  }}
                />
              ))}
            </div>
          </div>
          
<<<<<<< HEAD
          {/* Trending Now section */}
          <div className="mb-4 sm:mb-8">
            <div className="flex justify-between items-center mb-3 xs:mb-4">
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold">Trending Now</h3>
              <button className="text-orange-500 hover:text-orange-400 transition-colors text-xs xs:text-sm sm:text-base">See All →</button>
=======
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Trending Now</h3>
              <button className="text-orange-500 hover:text-orange-400 transition-colors">See All →</button>
>>>>>>> ed5be7eaa3f1ff9a67960f9b03e15bebf8f732ed
            </div>
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              {popularAlbums.map((album, index) => (
                <div key={album.id} onClick={() => selectTrack(index)} className="flex items-center gap-2 xs:gap-3 sm:gap-4 p-2 xs:p-3 sm:p-4 hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer group">
                  <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 w-8 xs:w-10 sm:w-16 flex-shrink-0">
                    <span className={`text-xs xs:text-sm sm:text-lg font-bold ${album.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {album.rank}
                    </span>
                    <span className={`text-xs xs:text-sm ${album.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {album.trending === 'up' ? '▲' : '▼'}
                    </span>
                  </div>
                  <div className="relative w-8 h-8 xs:w-10 xs:h-10 sm:w-16 sm:h-16 flex-shrink-0">
                    <div 
                      className="w-full h-full bg-gray-700 rounded-md xs:rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${album.image})` }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate text-xs xs:text-sm sm:text-base group-hover:text-orange-400 transition-colors">{album.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">{album.artist}</p>
                  </div>
                  <div className="text-right hidden sm:block"> 
                    <p className="text-sm text-gray-300">{album.plays} plays</p>
                    <p className="text-xs text-gray-500">This week</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-1.5 xs:p-2 hover:bg-white/10 rounded-full transition-all flex-shrink-0">
                    {isPlaying && currentTrack.id === album.id ? <Pause size={14} className="xs:w-4 xs:h-4" /> : <Play size={14} className="xs:w-4 xs:h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column for smaller screens */}
        <div className="space-y-4 xs:space-y-5 sm:space-y-6 lg:space-y-8">
          {/* Recently Played section */}
          <div>
            <h3 className="text-lg xs:text-xl font-bold mb-2 xs:mb-3">Recently Played</h3>
            <div className="space-y-2 xs:space-y-3">
              {recentlyPlayed.map((track, index) => (
                <div key={track.id} onClick={() => selectTrack(playlist.findIndex(p => p.id === track.id))} className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer group">
                  <div className="relative w-8 h-8 xs:w-10 xs:h-10 flex-shrink-0">
                    <div 
                      className="w-full h-full bg-gray-700 rounded-md xs:rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${track.image})` }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-xs xs:text-sm group-hover:text-orange-400 transition-colors">{track.title}</p>
                    <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                  </div>
                  <div className="flex items-center gap-1.5 xs:gap-2 text-xs text-gray-500 flex-shrink-0">
                    <span className="hidden xs:inline">{track.duration}</span>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full transition-all">
                       {isPlaying && currentTrack.id === track.id ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3 xs:p-4">
            <h3 className="font-semibold mb-2 xs:mb-3 text-sm xs:text-base">Your Stats</h3>
            <div className="space-y-2 xs:space-y-3">
              <div className="flex justify-between text-xs xs:text-sm"><span className="text-gray-400">Songs played</span><span className="font-semibold">1,247</span></div>
              <div className="flex justify-between text-xs xs:text-sm"><span className="text-gray-400">Hours listened</span><span className="font-semibold">83.2h</span></div>
              <div className="flex justify-between text-xs xs:text-sm"><span className="text-gray-400">Favorite genre</span><span className="font-semibold text-orange-400">Afrobeat</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}