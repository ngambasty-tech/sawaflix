import path from 'path';
import { promises as fs } from 'fs';
import VideoPlayer from './VideoPlayer';

async function getVideos() {
  const videosDir = path.join(process.cwd(), 'public', 'videos');

  try {
    const filenames = await fs.readdir(videosDir);
    const videoFiles = filenames.filter(file => file.endsWith('.mp4'));
    return videoFiles.map(file => `/videos/${file}`);
  } catch (error) {
    console.error('Failed to read videos directory:', error);
    return [];
  }
}

export default async function ReelsPage() {
  const videoUrls = await getVideos();

  return (
    <div>
      <div className="reels-container">
        {videoUrls.length > 0 ? (
          videoUrls.map((url) => (
            <VideoPlayer key={url} src={url} />
          ))
        ) : (
          <p>No videos found in the public/videos folder.</p>
        )}
      </div>
    </div>
  );
}