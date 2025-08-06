import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-red-600 bg-opacity-70 backdrop-blur-md text-white shadow-lg z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Brand Name */}
        <div className="text-2xl font-bold">
          <Link href="/">
            MySite
          </Link>
        </div>
        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link href="/" className="hover:text-red-200 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-red-200 transition-colors duration-200">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-red-200 transition-colors duration-200">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}