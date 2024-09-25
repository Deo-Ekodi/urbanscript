// // components/Header.js
// import Link from "next/link";

// export default function Header() {
//   return (
//     <header className="w-full py-4 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md">
//       <nav className="container mx-auto flex justify-between items-center px-5">
//         <div className="text-white font-bold text-xl">
//           <Link href="/">UrbanScript</Link>
//         </div>
//         <div className="flex space-x-4">
//           <Link href="/" className="text-white hover:text-blue-400 transition">
//             Home
//           </Link>
//           <Link href="/about" className="text-white hover:text-blue-400 transition">
//             About
//           </Link>
//           <Link href="/tool" className="text-white hover:text-blue-400 transition">
//             Tool
//           </Link>
//           <Link href="/" className="text-white hover:text-blue-400 transition">
//             Pricing
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// }

'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu if clicking outside of the menu area
  useEffect(() => {
    const closeMenuOnOutsideClick = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu-card')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', closeMenuOnOutsideClick);
    return () => document.removeEventListener('click', closeMenuOnOutsideClick);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-4 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md relative z-50">
      <nav className="container mx-auto flex justify-between items-center px-5">
        {/* Company Name */}
        <div className="text-white font-bold text-2xl">
          <Link href="/">
            UrbanScript
          </Link>
        </div>

        {/* Hamburger Menu for smaller screens */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* Full Menu for large screens */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-white hover:text-blue-400 transition">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-blue-400 transition">
            About
          </Link>
          <Link href="/tool" className="text-white hover:text-blue-400 transition">
            Tool
          </Link>
          <Link href="/coming_soon" className="text-white hover:text-blue-400 transition">
            Pricing
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed top-16 right-5 w-72 bg-gray-800 text-white rounded-lg shadow-lg p-6 z-50 mobile-menu-card">
            <div className="flex flex-col space-y-4">
              <Link href="/" onClick={toggleMenu} className="text-xl p-4 bg-gray-700 hover:bg-gray-600 transition rounded-md text-center">
                Home
              </Link>
              <Link href="/about" onClick={toggleMenu} className="text-xl p-4 bg-gray-700 hover:bg-gray-600 transition rounded-md text-center">
                About
              </Link>
              <Link href="/tool" onClick={toggleMenu} className="text-xl p-4 bg-gray-700 hover:bg-gray-600 transition rounded-md text-center">
                Tool
              </Link>
              <Link href="/coming_soon" onClick={toggleMenu} className="text-xl p-4 bg-gray-700 hover:bg-gray-600 transition rounded-md text-center">
                Pricing
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
