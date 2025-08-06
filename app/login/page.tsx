'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Sign in attempt:', formData);
      router.push('/');
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
  };

  const handleFacebookSignIn = () => {
    console.log('Facebook sign in clicked');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/background.png"
          alt="Login background"
          className="object-cover w-full h-full"
          style={{ filter: 'brightness(1.0)' }}
        />
        {/* <div className="absolute inset-0 bg-black/10" /> */}
      </div>
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
            <h1 className="text-3xl font-bold text-white text-center mb-8">
              Sign In
            </h1>
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email or phone number"
                  className="w-full  px-4 py-3 bg-grey-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-grey-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-white cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 mr-2 text-red-500 bg-black border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Need help?
                </button>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">or</span>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-3 bg-black border border-gray-600 rounded-lg text-white hover:bg-gray-800 transition-all duration-200"
              >
                <div className="w-6 h-6 mr-3">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                Continue with Google
              </button>
              <button
                onClick={handleFacebookSignIn}
                className="w-full flex items-center justify-center px-4 py-3 bg-black border border-gray-600 rounded-lg text-white hover:bg-gray-800 transition-all duration-200"
              >
                <div className="w-6 h-6 mr-3 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">f</span>
                </div>
                Login with Facebook
              </button>
            </div>
        <div className="text-gray-400 text-center mt-6">
          Are you new to streamverse{' '}
          <Link href="/sign-up" className="text-red-500 hover:underline">
            Sign up
          </Link>
        </div>
            <div className="mt-6 text-xs text-gray-500 text-center">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
