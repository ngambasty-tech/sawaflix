import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/background.png"
          alt="Home background"
          layout="fill"
          objectFit="cover"
          className="object-cover w-full h-full"
          style={{ filter: 'brightness(1.0)' }}
        />
      </div>
      {/* Main Content */}
 <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-center">
      <h1 className="text-white text-5xl font-extrabold mb-8 md:text-6xl">Welcome to Movie Music</h1>
      <p className="text-gray-300 text-lg max-w-xl mb-10">Discover and enjoy the perfect soundtracks from your favorite movies and shows.</p>
      
      <div className="flex space-x-4">
        <Link 
          href="/login" 
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
        >
          Sign In
        </Link>
        <Link 
          href="/sign-up" 
          className="px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-lg shadow-lg hover:bg-red-600 hover:text-white transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
    </div>
  );
}
