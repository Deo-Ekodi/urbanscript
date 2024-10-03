'use client';

import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import NavBar from './Navbar/NavBar';

const Hero = () => {
    const galleryImages = [
        { src: '/images/1.jpg', prompt: 'An elegant modern boardroom with a large conference table, official chairs.' },
        { src: '/images/2.jpg', prompt: 'A stylish dressing room with elegant lighting, and a variety of clothing displayed.' },
        { src: '/images/3.jpg', prompt: 'Modern study table with a sleek design, accompanied by a comfortable chair .' },
        { src: '/images/4.jpg', prompt: 'A stylish bedroom featuring a cozy bed, elegant decor, and soft lighting for a relaxing ambiance.' },
        { src: '/images/5.jpg', prompt: 'A modern coding room with a sleek desk, a large monitor, and organized tech gear.' },
        { src: '/images/6.jpg', prompt: 'Luxurious bathroom featuring a stylish bathtub, elegant fixtures.' },
        { src: '/images/7.jpg', prompt: 'A modern bathroom with a freestanding bathtub, sleek tiles.' },
        // { src: '/images/8.jpg', prompt: 'Modern office space with sleek furniture and natural lighting.' },
        // { src: '/images/9.jpg', prompt: 'A vibrant, colorful playroom for kids with lots of toys and books.' },
        // { src: '/images/10.jpg', prompt: 'Outdoor patio with rustic furniture and greenery all around.' }
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
                setIsFading(false);
            }, 1000);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextImage = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentImageIndex((currentImageIndex + 1) % galleryImages.length);
            setIsFading(false);
        }, 1000);
    };

    const prevImage = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentImageIndex((currentImageIndex - 1 + galleryImages.length) % galleryImages.length);
            setIsFading(false);
        }, 1000);
    };

    const goToImage = (index) => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentImageIndex(index);
            setIsFading(false);
        }, 1000);
    };

    return (
        <div className="relative min-h-screen pt-20" id="hero">
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

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-4 md:p-12 h-full">
                {/* Text Section */}
                <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left mb-8 lg:mb-0">
                    <h1 className="mb-5 md:text-5xl text-3xl font-bold text-blue-900">
                        Tailored software solutions designed to elevate your business and meet your design needs.
                    </h1>
                    <div className="text-xl font-semibold tracking-tight mb-5 text-gray-500">
                        Let UrbanScript be your creative partner in crafting exceptional room interiors that captivate and inspire.
                    </div>
                    <div className="mb-4">
                        <Link href="/login" passHref legacyBehavior>
                            <div className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-2xl sm:w-auto cursor-pointer">
                                Learn more
                                <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Image Slideshow Section */}
                <div className="w-full lg:w-1/2 relative">
                    {/* Header Above Images */}
                    <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-black bg-opacity-70 text-white text-center">
                        <h2 className="text-xl md:text-2xl font-semibold">
                            Sample interiors you can create with our tool
                        </h2>
                    </div>

                    <div className="relative w-full h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg mt-16 lg:mt-0">
                        <img
                            src={galleryImages[currentImageIndex].src}
                            alt="Gallery Slideshow"
                            className={`w-full h-full object-cover transition-opacity duration-1000 ${isFading ? 'fade-out' : 'fade-in'} rounded-lg shadow-md`}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 text-center">
                            {galleryImages[currentImageIndex].prompt}
                        </div>

                        {/* Navigation Buttons */}
                        <div
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full cursor-pointer"
                            onClick={prevImage}
                        >
                            <FaChevronLeft />
                        </div>

                        <div
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full cursor-pointer"
                            onClick={nextImage}
                        >
                            <FaChevronRight />
                        </div>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {galleryImages.map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    className={`w-3 h-3 rounded-full cursor-pointer ${currentImageIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
