// components/VideoUpload.tsx
'use client';

import { useState, useRef } from 'react';
import { createClient } from '../../../../utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export default function VideoUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const supabase = createClient();

  // Custom progress tracking simulation
  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90; // Stop at 90% until upload completes
        }
        return prev + 10;
      });
    }, 500);
    return interval;
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    
    const formData = new FormData(event.currentTarget);
    const file = fileInputRef.current?.files?.[0];
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const release_date = formData.get('release_date') as string;
    const producer_name = formData.get('producer_name') as string;
    const is_featured = formData.get('is_featured') === 'on';
    const featured_actors = formData.get('featured_actors') as string;

    // Required fields validation
    if (!file) {
      setError('Please select a video file');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file');
      return;
    }

    // Validate file size 
    if (file.size > 100 * 1024 * 1024) {
      setError('File size must be less than 100MB');
      return;
    }

    setUploading(true);
    setProgress(0);

    // Start progress simulation
    const progressInterval = simulateProgress();

    try {
      // Generate unique UUIDs for movie and producer
      const movieId = uuidv4();
      const producerId = uuidv4();
      
      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${movieId}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload video to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, file);

      // Clear the progress simulation
      clearInterval(progressInterval);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Set progress to 100% when upload completes
      setProgress(100);

      // Get public URL for the video
      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      // Insert video metadata into movies table with UUIDs
      const { error: dbError } = await supabase
        .from('movies')
        .insert({
          id: movieId,
          title: title.trim(),
          description: description.trim(),
          release_date: release_date || null,
          producer_id: producerId,
          producer_name: producer_name.trim() || null,
          is_featured,
          featured_actors: featured_actors.trim() || null,
          file_path: filePath,
          video_url: urlData.publicUrl,
          file_size: file.size,
          mime_type: file.type,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id,
        });

      if (dbError) {
        // Clean up uploaded file if database insert fails
        await supabase.storage.from('videos').remove([filePath]);
        throw new Error(`Database error: ${dbError.message}`);
      }

      setSuccess(true);
      // Reset form safely using the ref
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Keep success state for a moment before resetting progress
      setTimeout(() => {
        setProgress(0);
      }, 2000);
    } catch (err) {
      clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : 'Upload failed');
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full h-full bg-navy-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Upload Video</h2>
      
      <form ref={formRef} onSubmit={handleUpload} className="space-y-4">
        {/* Required Fields */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-navy-800 text-white placeholder-gray-400"
            placeholder="Enter video title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            required
            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-navy-800 text-white placeholder-gray-400"
            placeholder="Enter video description"
          />
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="release_date" className="block text-sm font-medium text-white mb-1">
              Release Date
            </label>
            <input
              type="date"
              id="release_date"
              name="release_date"
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-navy-800 text-white"
            />
          </div>

          <div>
            <label htmlFor="producer_name" className="block text-sm font-medium text-white mb-1">
              Producer Name
            </label>
            <input
              type="text"
              id="producer_name"
              name="producer_name"
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-navy-800 text-white placeholder-gray-400"
              placeholder="Enter producer name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="featured_actors" className="block text-sm font-medium text-white mb-1">
            Featured Actors
          </label>
          <input
            type="text"
            id="featured_actors"
            name="featured_actors"
            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-navy-800 text-white placeholder-gray-400"
            placeholder="Enter featured actors (comma separated)"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_featured"
            name="is_featured"
            className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-600 bg-navy-800 rounded"
          />
          <label htmlFor="is_featured" className="ml-2 block text-sm text-white">
            Mark as Featured
          </label>
        </div>

        <div>
          <label htmlFor="video" className="block text-sm font-medium text-white mb-1">
            Video File *
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="video"
            name="video"
            accept="video/*"
            required
            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600 bg-navy-800 text-white"
          />
        </div>

        {uploading && (
          <div className="space-y-2">
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-pink-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-white">
              {progress < 100 ? `Uploading... ${progress}%` : 'Processing...'}
            </p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-900 border border-red-700 rounded-md">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-900 border border-green-700 rounded-md">
            <p className="text-green-200 text-sm">Video uploaded successfully!</p>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-navy-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
}