'use client';
import Link from 'next/link';
import Image from 'next/image';
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

  const handleInputChange = (e) => { // Removed TypeScript type annotation
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignIn = async (e) => { // Removed TypeScript type annotation
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Sign in attempt:', formData);
      router.push('/');
    }, 1500); // Increased timeout for better spinner visibility
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
    // Simulate Google sign-in
    router.push('/dashboard'); // Example redirect
  };

  const handleFacebookSignIn = () => {
    console.log('Facebook sign in clicked');
    // Simulate Facebook sign-in
    router.push('/dashboard'); // Example redirect
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-inter">
      {/* Background Image with Dark Overlay */}
      <Image
        src="/bg-image.jpg" // Assuming bg-image.jpg is in your public folder
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/1920x1080/000000/FFFFFF?text=Error+Loading+Image";
          e.currentTarget.srcset = "";
        }}
      />
      <div className="absolute inset-0 bg-black opacity-20 z-10"></div> {/* Dark overlay */}

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        {/* Form Card Wrapper for Animated Border */}
        <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl shadow-red-500/50">
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 z-0 animate-spin-border-gradient" style={{
            background: 'conic-gradient(from var(--angle), #000000 0%, #ff0000 10%, #8b0000 20%, #000000 30%, #000000 100%)',
            borderRadius: '1.5rem', // Match rounded-3xl
            padding: '2px', // Border thickness
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'exclude' // For Safari
          }}></div>

          {/* Actual Form Card Content */}
          <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 md:p-12 w-full border border-gray-800">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-8 tracking-wide drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]">
              Sign In
            </h1>
            <form onSubmit={handleSignIn} className="space-y-6 sm:space-y-8">
              <div>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email or phone number"
                  className="w-full px-5 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 shadow-inner shadow-gray-950"
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
                  className="w-full px-5 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 shadow-inner shadow-gray-950"
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base">
                <label className="flex items-center text-gray-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-5 h-5 mr-2 appearance-none border border-gray-600 rounded-md bg-gray-800 checked:bg-red-600 checked:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
                >
                  Need help?
                </button>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-red-700 hover:bg-red-600 disabled:bg-red-900 text-white font-bold py-3 sm:py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/70 active:scale-95"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black/85 text-gray-400 font-medium">or</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-5 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-xl text-white hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-red-500/30"
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
                className="w-full flex items-center justify-center px-5 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-xl text-white hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-red-500/30"
              >
                <div className="w-6 h-6 mr-3 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-base">f</span>
                </div>
                Login with Facebook
              </button>
            </div>

            <div className="text-gray-400 text-center mt-8 text-sm sm:text-base">
              Are you new to Streamverse?{' '}
              <Link href="/sign-up" className="text-red-500 hover:underline hover:text-red-400 transition-colors">
                Sign up
              </Link>
            </div>

            <div className="mt-6 text-xs text-gray-600 text-center leading-relaxed">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
              <button className="text-blue-400 hover:text-blue-300 transition-colors hover:underline">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animated border and font */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotate-gradient {
          to {
            --angle: 360deg;
          }
        }

        .animate-spin-border-gradient {
          animation: rotate-gradient 8s linear infinite;
        }

        /* Custom checkbox styling */
        input[type="checkbox"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          display: inline-block;
          position: relative;
          vertical-align: middle;
          cursor: pointer;
        }

        input[type="checkbox"]:checked:after {
          content: '✔';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.8rem;
          color: white;
        }
      `}</style>
    </div>
  );
}
