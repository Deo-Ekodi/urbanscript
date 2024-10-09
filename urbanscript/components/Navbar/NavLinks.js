"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavLinks = () => {
    const { data: session } = useSession();

    return (
        <>
            {/* <Link href="/#about" className="px-4 font-extrabold text-gray-500 hover:text-blue-900">
                About
            </Link> */}
            <Link href="/" className="px-4 font-extrabold text-gray-500 hover:text-blue-900">
                Home
            </Link>
            <Link href="/contact" className="px-4 font-extrabold text-gray-500 hover:text-blue-900">
                Contact Us
            </Link>
            {/* <Link href="/pricing" className="px-4 font-extrabold text-gray-500 hover:text-blue-900">
                Pricing
            </Link>
            {session ? (
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-white bg-orange-500 hover:bg-red-600 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl"
                >
                    Log Out
                </button>
            ) : (
                <Link href="/login" className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl">
                    Get Started
                </Link>
            )} */}
        </>
    );
}

export default NavLinks;
