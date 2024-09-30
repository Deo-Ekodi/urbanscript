'use client';

import React from 'react';
import Link from 'next/link';
import NavBar from './Navbar/NavBar'; // Adjust the path as needed
import heroImg from '@/public/images/web-dev.svg'; // Adjust the path based on your Next.js project structure

const Hero = () => {
    return (
        <div className="relative h-screen" id="hero"> {/* Make sure the Hero section takes the full height of the screen */}
            <NavBar />
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
                    }
                `}</style>
                <div className="bg-doodle h-full"></div>
            </div>
            <div className="m-auto overflow-hidden mx-4 p-2 md:p-12 h-full flex flex-col justify-center relative z-10" data-aos="zoom-in">
                <div className="flex flex-col lg:flex-row py-8 justify-between text-center lg:text-left h-full">
                    <div className="lg:w-1/2 flex flex-col justify-center" data-aos="zoom-in" data-aos-delay="200">
                        <h1 className="mb-5 md:text-5xl text-3xl font-bold text-blue-900">
                            Tailored software solutions designed to elevate your business and meet your design needs.
                        </h1>
                        <div className="text-xl font-semibold tracking-tight mb-5 text-gray-500">
                            Let UrbanScript be your creative partner in crafting exceptional room interiors that captivate and inspire.
                        </div>
                        <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                            <Link href="/login" passHref legacyBehavior>
                                <div className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0 cursor-pointer">
                                    Learn more
                                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="flex lg:justify-end w-full lg:w-1/2" data-aos="fade-up" data-aos-delay="700">
                        <img alt="card img" className="rounded-t float-right duration-1000 w-full" src={heroImg.src} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
