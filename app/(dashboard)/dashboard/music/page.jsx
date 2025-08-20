'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, RotateCcw, Volume2, Download, Shuffle, Repeat } from 'lucide-react';
import Image from 'next/image';

// --- Mock Data with audio sources ---
const playlistData = [
  {
    id: 1,
    title: "Bollo C'est Bollo",
    artist: "Ko-c",
    image: "/music4.jpg",
    src: "/music.mp3", // Add your audio file to the public folder
    plays: "3.2M",
    trending: "up",
    rank: 3,
  },
  {
    id: 2,
    title: "Génesis",
    artist: "Peso Plumo",
    image: "/music2.jpg",
    src: "/music2.mp3", // Replace with actual audio file
    plays: "2.4M",
    trending: "up",
    rank: 1,
  },
  {
    id: 3,
    title: "Sokoto",
    artist: "Magasco",
    image: "/music3.jpg",
    src: "/music3.mp3", // Replace with actual audio file
    plays: "1.8M",
    trending: "down",
    rank: 2,
  },
  {
    id: 4,
    title: "Midnights (3am Edition)",
    artist: "Taylor Swift",
    image: "/pic4.jpeg",
    src: "/music4.mp3", // Replace with actual audio file
    duration: "3:42"
  },
  {
    id: 5,
    title: "Barbie The Album",
    artist: "Various Artists",
    image: "/music5.jpg",
    src: "/music5.mp3", // Replace with actual audio file
    duration: "2:58"
  },
  {
    id: 6,
    title: "Starboy",
    artist: "The Weeknd",
    image: "/music6.jpg",
    src: "/music6.mp3", // Replace with actual audio file
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
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'one', 'all'
  
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
  }, [isPlaying, currentTrackIndex]); // Re-run effect when track changes or play state changes

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
    <div className="min-h-full bg-gray-900 text-white p-4 sm:p-8">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        onCanPlay={() => { if (isPlaying) audioRef.current.play(); }}
      />

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Music</h1>
            <p className="text-gray-400">Discover and enjoy your favorite tracks</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleShuffle}
              className={`p-2 rounded-lg transition-colors ${isShuffled ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'}`}
              title="Shuffle"
            >
              <Shuffle size={20} />
            </button>
            <button 
              onClick={toggleRepeat}
              className={`relative p-2 rounded-lg transition-colors ${repeatMode !== 'off' ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'}`}
              title={`Repeat: ${repeatMode}`}
            >
              <Repeat size={20} />
              {repeatMode === 'one' && <span className="absolute top-0 right-0 text-xs font-bold">1</span>}
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl p-6 mb-8 border border-red-800/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-48 h-48 flex-shrink-0">
                <Image 
                  src={currentTrack.image} 
                  alt="Album cover" 
                  fill
                  sizes="192px"
                  className="object-cover rounded-xl shadow-2xl"
                  priority
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <p className="text-orange-400 text-sm mb-2 font-medium">Now Playing</p>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 truncate">{currentTrack.title}</h2>
                <p className="text-lg text-gray-300 mb-6">{currentTrack.artist}</p>
                
                <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                  <button onClick={handleReplay} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Replay">
                    <RotateCcw size={20} />
                  </button>
                  <button onClick={handlePrevTrack} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Previous">
                    <SkipBack size={20} />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition-colors shadow-lg"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button onClick={handleNextTrack} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Next">
                    <SkipForward size={20} />
                  </button>
                  <button 
                    onClick={toggleFavorite}
                    className={`p-2 hover:bg-white/10 rounded-full transition-colors ${
                      isFavorite ? 'text-red-500' : 'text-white'
                    }`}
                  >
                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    title="Download"
                  >
                    <Download size={20} />
                  </button>
                </div>
                
                <div className="max-w-md w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs text-gray-300 w-10 text-center">{formatTime(currentTime)}</span>
                    <div 
                      className="flex-1 bg-gray-700 rounded-full h-2 cursor-pointer group"
                      onClick={handleSeek}
                    >
                      <div 
                        className="bg-orange-500 h-full rounded-full relative transition-all duration-100" 
                        style={{width: duration ? `${(currentTime / duration) * 100}%` : '0%'}}
                      >
                         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-300 w-10 text-center">{formatTime(duration)}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Volume2 size={16} />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
            
             <div className="flex items-end justify-center gap-1 h-16 mt-6">
              {Array.from({ length: 50 }, (_, i) => (
                <div 
                  key={i}
                  className={`rounded-sm transition-all duration-300 ${isPlaying ? 'bg-orange-500' : 'bg-gray-600'}`}
                  style={{
                    width: '3px',
                    height: isPlaying ? `${Math.random() * 40 + 10}px` : '10px'
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Trending Now</h3>
              <button className="text-orange-500 hover:text-orange-400 transition-colors">See All →</button>
            </div>
            <div className="space-y-4">
              {popularAlbums.map((album, index) => (
                <div key={album.id} onClick={() => selectTrack(index)} className="flex items-center gap-4 p-4 hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer group">
                   <div className="flex items-center gap-3 w-16">
                    <span className={`text-lg font-bold ${album.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {album.rank}
                    </span>
                    <span className={album.trending === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {album.trending === 'up' ? '▲' : '▼'}
                    </span>
                  </div>
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image src={album.image} alt={album.title} fill sizes="64px" className="object-cover rounded-lg" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold group-hover:text-orange-400 transition-colors">{album.title}</h4>
                    <p className="text-gray-400 text-sm">{album.artist}</p>
                  </div>
                   <div className="text-right">
                    <p className="text-sm text-gray-300">{album.plays} plays</p>
                    <p className="text-xs text-gray-500">This week</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded-full transition-all">
                    {isPlaying && currentTrack.id === album.id ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Recently Played</h3>
            <div className="space-y-3">
              {recentlyPlayed.map((track, index) => (
                <div key={track.id} onClick={() => selectTrack(playlist.findIndex(p => p.id === track.id))} className="flex items-center gap-3 p-3 hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer group">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image src={track.image} alt={track.title} fill sizes="48px" className="object-cover rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm group-hover:text-orange-400 transition-colors">{track.title}</p>
                    <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{track.duration}</span>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full transition-all">
                       {isPlaying && currentTrack.id === track.id ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4">
            <h3 className="font-semibold mb-3">Your Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-gray-400 text-sm">Songs played</span><span className="font-semibold">1,247</span></div>
              <div className="flex justify-between"><span className="text-gray-400 text-sm">Hours listened</span><span className="font-semibold">83.2h</span></div>
              <div className="flex justify-between"><span className="text-gray-400 text-sm">Favorite genre</span><span className="font-semibold text-orange-400">Afrobeat</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}