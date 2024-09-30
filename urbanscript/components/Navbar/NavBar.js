// components/navbar/Navbar.js

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import NavLinks from './NavLinks'; // Adjust path to NavLinks if necessary

const NavBar = () => {
    const [top, setTop] = useState(true); // Initialize top to true
    const [isOpen, setIsOpen] = useState(false); // Fix capitalization for state variable

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const scrollHandler = () => {
            if (typeof window !== 'undefined') {
                // Only access window if it is defined
                window.pageYOffset > 10 ? setTop(false) : setTop(true);
            }
        };

        // Initialize scroll position
        scrollHandler(); // Call once on mount

        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-30 transition duration-300 ease-in-out mb-16 ${!top ? 'bg-white shadow-lg' : 'bg-transparent'} h-16`}>
            <div className="flex flex-row justify-between items-center h-full px-4 relative">
                <div className="absolute inset-0 z-0">
                    <style jsx>{`
                        .bg-doodle {
                            background-image: url('data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
                                    <defs>
                                        <pattern id="grey-doodle" patternUnits="userSpaceOnUse" width="100" height="100">
                                            <rect width="100" height="100" fill="#f5f5f5" />
                                            <circle cx="30" cy="30" r="5" fill="#aaaaaa" opacity="0.2"/>
                                            <circle cx="70" cy="70" r="5" fill="#aaaaaa" opacity="0.2"/>
                                            <path d="M50 0 L50 100" stroke="#cccccc" stroke-width="1" opacity="0.2"/>
                                            <path d="M0 50 L100 50" stroke="#cccccc" stroke-width="1" opacity="0.2"/>
                                            <path d="M25,25 C35,10 65,10 75,25" stroke="#888888" stroke-width="1" fill="transparent" opacity="0.5"/>
                                            <path d="M25,75 C35,90 65,90 75,75" stroke="#888888" stroke-width="1" fill="transparent" opacity="0.5"/>
                                            <circle cx="50" cy="50" r="10" fill="none" stroke="#aaaaaa" stroke-width="1" opacity="0.3"/>
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grey-doodle)" />
                                </svg>
                            `)}');
                            background-size: cover;
                            background-repeat: no-repeat;
                            z-index: -1;
                        }
                    `}</style>
                    <div className="bg-doodle h-full"></div>
                </div>
                <div className="flex flex-row justify-center items-center text-center font-semibold z-10">
                    <Link href="/#hero" passHref>
                        <h1 className="font-extrabold text-4xl text-blue-900">UrbanScript</h1>
                    </Link>
                </div>
                <div className="group flex flex-col items-center z-10">
                    <button className="p-2 rounded-lg lg:hidden text-blue-900" onClick={handleClick}>
                        <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                            ) : (
                                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                            )}
                        </svg>
                    </button>
                    <div className='hidden space-x-6 lg:inline-block p-5'>
                        <NavLinks />
                    </div>

                    <div className={`fixed transition-transform duration-300 ease-in-out flex justify-center left-0 w-full h-auto rounded-md p-24 bg-white lg:hidden shadow-xl top-14 ${isOpen ? "block" : "hidden"}`}>
                        <div className='flex flex-col space-y-6'>
                            <NavLinks />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link'; // Import Link from Next.js
// import NavLinks from './NavLinks'; // Adjust path to NavLinks if necessary

// const NavBar = () => {
//     const [top, setTop] = useState(true); // Initialize top to true
//     const [isOpen, setIsOpen] = useState(false); // Fix capitalization for state variable

//     const handleClick = () => {
//         setIsOpen(!isOpen);
//     };

//     useEffect(() => {
//         const scrollHandler = () => {
//             if (typeof window !== 'undefined') {
//                 // Only access window if it is defined
//                 window.pageYOffset > 10 ? setTop(false) : setTop(true);
//             }
//         };

//         // Initialize scroll position
//         scrollHandler(); // Call once on mount

//         window.addEventListener('scroll', scrollHandler);
//         return () => window.removeEventListener('scroll', scrollHandler);
//     }, []);

//     return (
//         <nav className={`fixed top-0 w-full z-30 transition duration-300 ease-in-out mb-16 ${!top ? 'bg-white shadow-lg' : 'bg-transparent'} h-16`}>
//             <div className="flex flex-row justify-between items-center h-full px-4">
//                 <div className="flex flex-row justify-center items-center text-center font-semibold">
//                     <Link href="/#hero" passHref>
//                         <h1 className="font-extrabold text-4xl text-blue-900">UrbanScript</h1>
//                     </Link>
//                 </div>
//                 <div className="group flex flex-col items-center">
//                     <button className="p-2 rounded-lg lg:hidden text-blue-900" onClick={handleClick}>
//                         <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                             {isOpen ? (
//                                 <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
//                             ) : (
//                                 <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
//                             )}
//                         </svg>
//                     </button>
//                     <div className='hidden space-x-6 lg:inline-block p-5'>
//                         <NavLinks />
//                     </div>

//                     <div className={`fixed transition-transform duration-300 ease-in-out flex justify-center left-0 w-full h-auto rounded-md p-24 bg-white lg:hidden shadow-xl top-14 ${isOpen ? "block" : "hidden"}`}>
//                         <div className='flex flex-col space-y-6'>
//                             <NavLinks />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default NavBar;
