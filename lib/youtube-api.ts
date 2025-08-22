import { Movie, MoviesFilter } from '@/types/app';

// YouTube API configuration
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Map YouTube API response to our Movie interface
function mapYouTubeVideoToMovie(video: any, contentDetails: any, statistics: any): Movie {
  return {
    id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    thumbnailUrl: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default.url,
    videoUrl: `https://www.youtube.com/embed/${video.id}`,
    duration: formatDuration(contentDetails.duration),
    genre: video.snippet.categoryId || 'Unknown', // You might want to map categoryId to genre names
    rating: calculateRating(statistics),
    views: parseInt(statistics.viewCount) || 0,
    uploadDate: video.snippet.publishedAt
  };
}

// Helper function to format ISO 8601 duration
function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
  if (!match) return 'Unknown';
  
  const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
  const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;
  const seconds = match[3] ? parseInt(match[3].replace('S', '')) : 0;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

// Helper function to calculate rating from statistics
function calculateRating(statistics: any): number {
  const likes = parseInt(statistics.likeCount) || 0;
  const dislikes = parseInt(statistics.dislikeCount) || 0;
  const total = likes + dislikes;
  
  if (total === 0) return 0;
  
  // Return a rating from 0 to 5 based on like percentage
  return Math.round((likes / total) * 5 * 10) / 10;
}

// Fetch movies from YouTube API
export async function fetchMovies(filters?: MoviesFilter): Promise<Movie[]> {
  try {
    // Build query parameters
    const params = new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      videoCategoryId: '10', // Films category
      maxResults: filters?.limit?.toString() || '20',
      key: YOUTUBE_API_KEY!
    });

    // Add optional filters
    if (filters?.genre) {
      // You might need to map genre names to YouTube category IDs
      params.set('videoCategoryId', mapGenreToCategoryId(filters.genre));
    }

    const response = await fetch(`${YOUTUBE_API_BASE}/videos?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return [];
    }
    
    // Transform YouTube API response to our Movie format
    return data.items.map((item: any) => 
      mapYouTubeVideoToMovie(item, item.contentDetails, item.statistics)
    );
  } catch (error) {
    console.error('Error fetching movies from YouTube API:', error);
    throw new Error('Failed to fetch movies from YouTube API');
  }
}

// Fetch a single movie by ID
export async function fetchMovieById(id: string): Promise<Movie> {
  try {
    const params = new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      id: id,
      key: YOUTUBE_API_KEY!
    });

    const response = await fetch(`${YOUTUBE_API_BASE}/videos?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Movie not found');
    }
    
    const video = data.items[0];
    return mapYouTubeVideoToMovie(video, video.contentDetails, video.statistics);
  } catch (error) {
    console.error('Error fetching movie from YouTube API:', error);
    throw new Error('Failed to fetch movie from YouTube API');
  }
}

// Search movies by query
export async function searchMovies(query: string, maxResults: number = 20): Promise<Movie[]> {
  try {
    // First, search for videos
    const searchParams = new URLSearchParams({
      part: 'snippet',
      q: query,
      type: 'video',
      videoCategoryId: '10', // Films category
      maxResults: maxResults.toString(),
      key: YOUTUBE_API_KEY!
    });

    const searchResponse = await fetch(`${YOUTUBE_API_BASE}/search?${searchParams.toString()}`);
    
    if (!searchResponse.ok) {
      throw new Error(`YouTube API error: ${searchResponse.status} ${searchResponse.statusText}`);
    }
    
    const searchData = await searchResponse.json();
    
    if (!searchData.items || searchData.items.length === 0) {
      return [];
    }
    
    // Get video IDs from search results
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    
    // Now get details for these videos
    const videoParams = new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      id: videoIds,
      key: YOUTUBE_API_KEY!
    });

    const videoResponse = await fetch(`${YOUTUBE_API_BASE}/videos?${videoParams.toString()}`);
    
    if (!videoResponse.ok) {
      throw new Error(`YouTube API error: ${videoResponse.status} ${videoResponse.statusText}`);
    }
    
    const videoData = await videoResponse.json();
    
    if (!videoData.items || videoData.items.length === 0) {
      return [];
    }
    
    // Transform YouTube API response to our Movie format
    return videoData.items.map((item: any) => 
      mapYouTubeVideoToMovie(item, item.contentDetails, item.statistics)
    );
  } catch (error) {
    console.error('Error searching movies from YouTube API:', error);
    throw new Error('Failed to search movies from YouTube API');
  }
}

// Map genre names to YouTube category IDs
function mapGenreToCategoryId(genre: string): string {
  // This is a simplified mapping - you might need to expand this
  const genreMap: Record<string, string> = {
    'Film & Animation': '1',
    'Autos & Vehicles': '2',
    'Music': '10',
    'Pets & Animals': '15',
    'Sports': '17',
    'Travel & Events': '19',
    'Gaming': '20',
    'People & Blogs': '22',
    'Comedy': '23',
    'Entertainment': '24',
    'News & Politics': '25',
    'Howto & Style': '26',
    'Education': '27',
    'Science & Technology': '28',
    'Nonprofits & Activism': '29'
  };
  
  return genreMap[genre] || '10'; // Default to Films category
}

// Get available categories (genres) from YouTube
export async function getCategories(): Promise<{id: string, title: string}[]> {
  try {
    const params = new URLSearchParams({
      part: 'snippet',
      regionCode: 'US', // You can change this based on your target region
      key: YOUTUBE_API_KEY!
    });

    const response = await fetch(`${YOUTUBE_API_BASE}/videoCategories?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return [];
    }
    
    return data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title
    }));
  } catch (error) {
    console.error('Error fetching categories from YouTube API:', error);
    throw new Error('Failed to fetch categories from YouTube API');
  }
}