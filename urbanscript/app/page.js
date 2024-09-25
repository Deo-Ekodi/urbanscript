// 'use client';

// import { useState } from "react";
// import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDownload } from '@fortawesome/free-solid-svg-icons';

// export const fetchCache = 'force-no-store';

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// export default function Home() {
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
    
//     const response = await fetch("/api/predictions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt: e.target.prompt.value,
//       }),
//     });
//     let prediction = await response.json();
//     if (response.status !== 201) {
//       setError(prediction.detail);
//       setLoading(false);
//       return;
//     }
//     setPrediction(prediction);

//     while (
//       prediction.status !== "succeeded" &&
//       prediction.status !== "failed"
//     ) {
//       await sleep(1000);
//       const response = await fetch("/api/predictions/" + prediction.id);
//       prediction = await response.json();
//       if (response.status !== 200) {
//         setError(prediction.detail);
//         setLoading(false);
//         return;
//       }
//       setPrediction(prediction);
//     }

//     setLoading(false);
//   };


//   const handleDownload = async () => {
//     const imageUrl = prediction.output[prediction.output.length - 1];
    
//     // Fetch the image and convert it to a Blob
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();
  
//     // Create a link element and trigger the download
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'urban-script.png'; // Set a default file name
//     document.body.appendChild(link);
//     link.click();
    
//     // Clean up
//     document.body.removeChild(link);
//     URL.revokeObjectURL(link.href); // Free up memory
//   };
  

//   return (
//     <div className="container max-w-2xl mx-auto p-5">
//       <h1 className="py-6 text-center font-bold text-2xl">
//         Dream something with UrbanScript
//       </h1>

//       <form className="w-full flex" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           className="flex-grow"
//           name="prompt"
//           placeholder="Enter a prompt to generate"
//         />
//         <button className="button" type="submit">
//           Go!
//         </button>
//       </form>

//       {error && <div>{error}</div>}
      
//       {loading && (
//         <div className="loader-wrapper">
//           <div className="loader"></div>
//           <p>Processing...</p>
//         </div>
//       )}

//       {prediction && prediction.output && (
//         <div className="image-wrapper mt-5 relative">
//           <Image
//             src={prediction.output[prediction.output.length - 1]}
//             alt="output"
//             sizes="100vw"
//             height={768}
//             width={768}
//           />
//           <button
//             onClick={handleDownload}
//             className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white shadow hover:bg-blue-700 transition"
//             aria-label="Download image"
//           >
//             <FontAwesomeIcon icon={faDownload} size="lg" />
//           </button>
//         </div>
//       )}
      
//       {prediction && (
//         <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
//       )}
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
export const fetchCache = 'force-no-store';

const images = [
  { src: '/images/1.jpg', caption: 'modern office' },
  { src: '/images/2.jpg', caption: 'modern office' },
  { src: '/images/3.jpg', caption: 'modern office' },
  { src: '/images/4.jpg', caption: 'modern office' },
  { src: '/images/5.jpg', caption: 'futuristic office' },
  { src: '/images/6.jpg', caption: 'awesome space' }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container">
      <div className="hero">
        <h1>Welcome to UrbanScript</h1>
        <p>Revolutionize your interior design process with AI-generated layout suggestions.</p>
        <div className="slideshow">
          {images.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <Image
                src={image.src}
                alt={image.caption}
                layout="fill"
                objectFit="cover"
              />
              <div className="caption">{image.caption}</div>
            </div>
          ))}
        </div>
        {/* Navigation Dots */}
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="how-to-use">
        <h2>How to Use UrbanScript</h2>
        <ol>
          <li>Enter the dimensions of your room or choose from predefined layouts.</li>
          <li>Select the style or theme you prefer for your room design.</li>
          <li>Click 'Generate' to get multiple design suggestions instantly.</li>
          <li>Download and share your favorite designs!</li>
        </ol>
      </div>
    </div>
  );
}
