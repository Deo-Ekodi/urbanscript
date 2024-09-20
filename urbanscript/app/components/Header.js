// components/Header.js
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-5">
        <div className="text-white font-bold text-xl">
          <Link href="/">UrbanScript</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/" className="text-white hover:text-blue-400 transition">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-blue-400 transition">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
