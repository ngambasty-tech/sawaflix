'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Sign up attempt:', formData);
      // Redirect to login page after successful signup
      router.push('/login');
    }, 1000);
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Musical Elements - Left Side */}
        <div className="absolute left-0 top-1/4 w-64 h-64 opacity-20">
          <div className="relative">
            <div className="absolute left-8 top-8 w-32 h-32 border-2 border-orange-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute left-12 top-12 w-24 h-24 border-2 border-blue-400 rounded-full opacity-60 animate-pulse delay-1000"></div>
            <div className="absolute left-16 top-4 text-orange-400 text-4xl opacity-80 animate-bounce">
              ♪
            </div>
          </div>
        </div>

        {/* Film Elements - Right Side */}
        <div className="absolute right-0 top-1/3 w-64 h-64 opacity-20">
          <div className="relative">
            <div className="absolute right-8 top-8 w-32 h-32 border-2 border-orange-400 rounded-full opacity-60 animate-spin"></div>
            <div className="absolute right-12 top-12 w-24 h-24 border-2 border-blue-400 rounded-full opacity-60 animate-spin delay-500"></div>
            <div className="absolute right-16 top-4 text-orange-400 text-4xl opacity-80">
              🎬
            </div>
          </div>
        </div>

        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Sign Up Form */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
            <h1 className="text-3xl font-bold text-white text-center mb-8">
              Sign Up
            </h1>

            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Email Input */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />

              {/* Password Input */}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />

              {/* Confirm Password Input */}
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />

              {/* Terms Agreement */}
              <label className="flex items-start text-sm text-white cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 mr-2 mt-1 text-red-500 bg-gray-700 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                  required
                />
                <span>
                  I agree to the{' '}
                  <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Privacy Policy
                  </button>
                </span>
              </label>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center text-gray-400">
              <span>Already have an account? </span>
              <button
                onClick={handleBackToLogin}
                className="text-white hover:text-blue-400 transition-colors font-semibold"
              >
                Sign In
              </button>
            </div>

            {/* reCAPTCHA Disclaimer */}
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
