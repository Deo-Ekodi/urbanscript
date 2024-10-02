// components/Navbar/NavLinks.js

import React from 'react';
import Link from 'next/link';

const NavLinks = () => {
    return (
        <>
            <Link href="/#about" className="px-4 font-extrabold text-gray-500 hover:text-blue-900">
                About
            </Link>
            {/* <Link href="/#services" className="px-4 font-extrabold text-gray-500 hover:text-blue-900">
                Services
            </Link> */}
            <Link href="/contact" className="px-4 font-extrabold text-gray-500 hover:text-blue-900">
                Contact Us
            </Link>
            <Link href="/pricing" className="px-4 font-extrabold text-gray-500 hover:text-blue-900">
                Pricing
            </Link>
            <Link href="/dashboard" className="px-4 font-extrabold text-gray-500 hover:text-blue-900">
                Dashboard
            </Link>
            <Link href="/register" className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl">
                Register
            </Link>
        </>
    );
}

export default NavLinks;
