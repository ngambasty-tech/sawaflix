'use client'; // only if you're in the `app/` directory

import { useEffect, useState } from 'react';

const YOUTUBE_API_KEY = 'AIzaSyAWLd6RyLRt2LYRfJYv1mPY9vpXlUUacWY';

export default function YouTubeSearch() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=cameroon+music&type=video&maxResults=7&key=${YOUTUBE_API_KEY}`
      );
      const data = await res.json();
      console.log(data)
      setVideos(data.items || []);
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Cameroon Music Videos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-8">
          {videos.map((video) => (
            <li key={video.id.videoId} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">
                {video.snippet.title}
              </h2>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
