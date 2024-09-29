// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// export const fetchCache = 'force-no-store';


// const images = [
//   { src: '/images/7.jpg', caption: 'modern office' },
//   { src: '/images/2.jpg', caption: 'modern office' },
//   { src: '/images/3.jpg', caption: 'modern office' },
//   { src: '/images/4.jpg', caption: 'modern office' },
//   { src: '/images/5.jpg', caption: 'futuristic office' },
//   { src: '/images/6.jpg', caption: 'awesome space' }
// ];

// export default function Home() {

//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Change slide every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleDotClick = (index) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <div className="container">
//       <div className="hero">
//         <h1>Welcome to UrbanScript</h1>
//         <p>Revolutionize your interior design process with AI-generated layout suggestions.</p>
//         <div className="slideshow">
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className={`slide ${index === currentSlide ? 'active' : ''}`}
//             >
//               <Image
//                 src={image.src}
//                 alt={image.caption}
//                 layout="fill"
//                 objectFit="cover"
//               />
//               <div className="caption">{image.caption}</div>
//             </div>
//           ))}
//         </div>
//         {/* Navigation Dots */}
//         <div className="dots">
//           {images.map((_, index) => (
//             <span
//               key={index}
//               className={`dot ${index === currentSlide ? 'active' : ''}`}
//               onClick={() => handleDotClick(index)}
//             ></span>
//           ))}
//         </div>
//       </div>

//       <div className="how-to-use">
//         <h2>How to Use UrbanScript</h2>
//         <ol>
//           <li>Enter the dimensions of your room or choose from predefined layouts.</li>
//           <li>Select the style or theme you prefer for your room design.</li>
//           <li>Click 'Generate' to get multiple design suggestions instantly.</li>
//           <li>Download and share your favorite designs!</li>
//         </ol>
//       </div>
//     </div>
//   );
// }


// app/page.js

import React from 'react';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
// import Clients from './components/Clients';
import Services from '@/components/Services';
import Potforlio from '@/components/Potforlio';

const Home = () => {
    return (
        <>
            <Hero />
            <Intro />
            <Services/>
            <Potforlio/>
            <Cta />
            <Footer />
        </>
    );
};

export default Home;
