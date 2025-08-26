// app/(auth)/update-password/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // Extract the access token from the URL fragment
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    
    if (accessToken) {
      // Set the session using the tokens from the URL
      const setSession = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        
        if (error) {
          console.error('Session setting error:', error.message);
          setError('Invalid or expired reset link. Please request a new password reset.');
        }
        setIsLoading(false);
      };
      
      setSession();
    } else {
      setError('Invalid reset link. Please request a new password reset.');
      setIsLoading(false);
    }
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({ 
      password: password 
    });

    if (error) {
      console.error('Password update error:', error.message);
      setError('Password update failed. ' + error.message);
    } else {
      console.log('Password updated successfully:', data);
      setMessage('Your password has been updated successfully.');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/40 backdrop-blur-md rounded-3xl text-white border border-gray-800">
          <h1 className="text-3xl font-bold text-center">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-black/40 backdrop-blur-md rounded-3xl text-white border border-gray-800">
        <h1 className="text-3xl font-bold text-center">Update Password</h1>
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="sr-only" htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-5 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full px-5 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50"
            disabled={isLoading}
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}