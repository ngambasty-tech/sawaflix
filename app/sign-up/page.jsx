'use client'; // This directive makes it a client component

import { useState } from 'react';
import Link from 'next/link';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation and submission logic
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    
    // In a real application, you would send this data to your API route (e.g., /api/submit)
    console.log({ name, email, password, agreedToTerms });
    alert('Sign Up Successful! (Check console for data)');
    // Reset form
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAgreedToTerms(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background Image Holder */}
      {/* You can replace this div with an <img> tag or a background-image style */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50" 
        style={{ backgroundImage: "url('/bg-image.jpg')" }}
        aria-hidden="true"
      ></div>
      {/* End Background Image Holder */}

      <div className="relative bg-black bg-opacity-75 p-10 rounded-lg shadow-xl max-w-md w-full z-10">
        <h1 className="text-white text-4xl font-bold mb-8 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email or phone number"
              className="w-full p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="form-checkbox h-5 w-5 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="ml-2 text-gray-300 text-sm">
              I agree to the <a href="#" className="text-red-500 hover:underline">terms and conditions</a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="text-gray-400 text-center mt-6">
          Already have an account?{' '}
          <Link href="/signin" className="text-red-500 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
