"use client";

import { useEffect, useState } from "react";

export default function CameroonReelsPage() {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function loadVideos() {
      const res = await fetch("/api/youtube/cameroon");
      const data = await res.json();
      setVideos(data.items || []);
    }
    loadVideos();
  }, []);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black">
      {videos.map((video, index) => (
        <div
          key={video.id?.videoId || index}
          className="h-screen w-full snap-start flex items-center justify-center relative"
        >
          {/* YouTube iframe */}
          <iframe
            src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=${
              index === activeIndex ? 1 : 0
            }&mute=1&controls=0&playsinline=1`}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
          />

          {/* Overlay info */}
          <div className="absolute bottom-20 left-4 text-white">
            <h2 className="text-lg font-semibold">{video.snippet.title}</h2>
            <p className="text-sm opacity-80">{video.snippet.channelTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
