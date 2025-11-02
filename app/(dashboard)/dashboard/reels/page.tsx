// app/reels/page.tsx
import { createClient } from '../../../../utils/supabase/server';
import ReelsFeed from '../../../../components/reelsFeed';

export default async function ReelsPage() {
  const supabase = await createClient();
  
  try {
    // First, let's check what columns exist in the movies table
    const { data: sampleVideo, error: sampleError } = await supabase
      .from('movies')
      .select('*')
      .limit(1)
      .single();

    if (sampleError) {
      throw new Error(`Error accessing movies table: ${sampleError.message}`);
    }

    console.log('Available columns:', Object.keys(sampleVideo || {}));

    // Determine the correct timestamp column to use for ordering
    const timestampColumns = ['created_at', 'created', 'uploaded_at', 'timestamp', 'date_created'];
    let orderColumn = 'id'; // fallback to ID if no timestamp column exists
    
    for (const col of timestampColumns) {
      if (sampleVideo && col in sampleVideo) {
        orderColumn = col;
        break;
      }
    }

    console.log('Using order column:', orderColumn);

    // Fetch videos without the problematic join and with correct ordering
    const { data: videos, error } = await supabase
      .from('movies')
      .select('*')
      .order(orderColumn, { ascending: false });

    if (error) {
      throw new Error(`Error loading videos: ${error.message}`);
    }

    // Transform the data to include producer info
    const transformedVideos = videos?.map(video => ({
      ...video,
      producers: video.producer_name ? { name: video.producer_name } : null
    })) || [];

    return <ReelsFeed videos={transformedVideos} />;

  } catch (error) {
    console.error('Error fetching videos:', error);
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-red-500">Error loading videos: {(error as Error).message}</p>
          <p className="text-gray-400 mt-2">Please check your database schema</p>
        </div>
      </div>
    );
  }
}