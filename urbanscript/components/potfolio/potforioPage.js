'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Dummy data (replace with real image URLs)
const images = [
  '/images/1.jpg', 
  '/images/2.jpg', 
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/7.jpg',
  '/images/8.jpg',
  '/images/9.jpg',
  '/images/10.jpg', 
  '/images/11.jpg', 
  '/images/12.jpg', 
  '/images/13.jpg',
  '/images/14.jpg',
  '/images/15.jpg',
  '/images/16.jpg',
  '/images/17.jpg',
  '/images/18.jpg',
  '/images/19.jpg',
  '/images/20.jpg',
  '/images/21.jpg', 
  '/images/22.jpg', 
  '/images/23.jpg',
  '/images/24.jpg',
  '/images/25.jpg',
  '/images/26.jpg',
  '/images/27.jpg',
  '/images/28.jpg',
  '/images/29.jpg',
  '/images/30.jpg',
  '/images/31.jpg', 
  '/images/32.jpg', 
  '/images/33.jpg',
  '/images/34.jpg',
  '/images/35.jpg',
  '/images/36.jpg',
];

export default function Portfolio() {
  const [imageList, setImageList] = useState(images);

  // Simulate loading more images when scrolling
  const loadMoreImages = () => {
    setTimeout(() => {
      setImageList([...imageList, ...images]); // Load more images (can be dynamic)
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMoreImages(); // Load more when user scrolls to bottom
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [imageList]);

  return (
    <div className="bg-cosmic overflow-hidden min-h-screen">
      <div className="text-center text-white pt-10">
        <h1 className="text-4xl font-bold">Our AI Model's Amazing Creations</h1>
        <p className="mt-4 text-lg">Scroll down to explore more!</p>
      </div>
      <div className="grid-container mt-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          {imageList.map((image, index) => (
            <div key={index} className="relative overflow-hidden group">
              <Image
                src={image}
                alt={`Generated image ${index + 1}`}
                width={500}
                height={500}
                className="portfolio-image transition-transform duration-300 group-hover:scale-105"
              />
              <div className="aura"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Cosmic background with stars */}
      <style jsx>{`
        .bg-cosmic {
          background-image: url('data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
              <rect width="100%" height="100%" fill="#000" />
              <!-- Stars -->
              <circle cx="100" cy="50" r="2" fill="white" />
              <circle cx="200" cy="150" r="1.5" fill="yellow" />
              <circle cx="300" cy="100" r="3" fill="lightblue" />
              <circle cx="400" cy="300" r="1.8" fill="pink" />
              <circle cx="500" cy="200" r="2.5" fill="orange" />
              <circle cx="600" cy="400" r="1.2" fill="cyan" />
              <circle cx="700" cy="350" r="3" fill="white" />
              <circle cx="150" cy="400" r="2.5" fill="lightgreen" />
              <circle cx="250" cy="50" r="1.8" fill="violet" />
              <circle cx="350" cy="250" r="2" fill="lightcoral" />
              <circle cx="450" cy="150" r="2.5" fill="gold" />
              <circle cx="550" cy="450" r="1.5" fill="lime" />
              <circle cx="650" cy="300" r="3" fill="deepskyblue" />
              <circle cx="750" cy="200" r="2" fill="magenta" />
              <!-- Cosmic Doodles -->
              <path d="M150 400 C150 380, 180 380, 180 400 C180 420, 150 420, 150 400 Z" fill="rgba(255, 255, 255, 0.2)" />
              <path d="M300 500 Q320 480, 340 500 T360 500" fill="none" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2" />
              <path d="M450 100 Q470 80, 490 100 T510 100" fill="none" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2" />
              <text x="50%" y="50%" text-anchor="middle" fill="rgba(255, 255, 255, 0.1)" font-size="80" font-family="Arial">✨</text>
            </svg>
          `)}');
          background-size: cover;
          background-attachment: fixed;
        }

        .portfolio-image {
          border-radius: 10px;
          cursor: pointer;
        }

        .aura {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.2);
          filter: blur(10px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .group:hover .aura {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
