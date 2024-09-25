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

// v2
// ################################################

// 'use client';

// import { useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header className="w-full py-4 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md">
//       <nav className="container mx-auto flex justify-between items-center px-5">
//         {/* Company Name */}
//         <div className="text-white font-bold text-2xl">
//           <Link href="/">
//             UrbanScript
//           </Link>
//         </div>

//         {/* Hamburger Menu for smaller screens */}
//         <div className="md:hidden">
//           <button
//             onClick={toggleMenu}
//             aria-label="Toggle menu"
//             className="text-white focus:outline-none"
//           >
//             <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
//           </button>
//         </div>

//         {/* Full Menu for large screens */}
//         <div className="hidden md:flex space-x-4">
//           <Link href="/" className="text-white hover:text-blue-400 transition">
//             Home
//           </Link>
//           <Link href="/about" className="text-white hover:text-blue-400 transition">
//             About
//           </Link>
//           <Link href="/tool" className="text-white hover:text-blue-400 transition">
//             Tool
//           </Link>
//           <Link href="/coming_soon" className="text-white hover:text-blue-400 transition">
//             Pricing
//           </Link>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col items-center space-y-4 py-4 z-50 md:hidden">
//             <Link href="/" onClick={toggleMenu} className="hover:text-blue-400 transition">
//               Home
//             </Link>
//             <Link href="/about" onClick={toggleMenu} className="hover:text-blue-400 transition">
//               About
//             </Link>
//             <Link href="/tool" onClick={toggleMenu} className="hover:text-blue-400 transition">
//               Tool
//             </Link>
//             <Link href="/coming_soon" onClick={toggleMenu} className="hover:text-blue-400 transition">
//               Pricing
//             </Link>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }


'use client';

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="absolute top-16 left-0 w-full bg-gray-900 bg-opacity-90 text-white flex flex-col items-center space-y-4 py-4 z-50 md:hidden">
            <Link href="/" onClick={toggleMenu} className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="/about" onClick={toggleMenu} className="hover:text-blue-400 transition">
              About
            </Link>
            <Link href="/tool" onClick={toggleMenu} className="hover:text-blue-400 transition">
              Tool
            </Link>
            <Link href="/coming_soon" onClick={toggleMenu} className="hover:text-blue-400 transition">
              Pricing
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
