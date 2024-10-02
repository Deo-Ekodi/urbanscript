// 'use client';
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { FaInfoCircle } from 'react-icons/fa'; // Importing an icon from react-icons

// const DashboardHeader = () => {
//   const { data: session } = useSession();
//   const [credits, setCredits] = useState(0);
//   const [showInfo, setShowInfo] = useState(false);

//   // Function to fetch user credits
//   const fetchUserCredits = async () => {
//     if (session?.user?.email) {
//       const response = await fetch('/api/get-credits', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: session.user.email }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setCredits(data.credits);
//       } else {
//         console.error("Failed to fetch credits");
//       }
//     }
//   };

//   useEffect(() => {
//     if (session?.user) {
//       fetchUserCredits(); // Fetch user credits on mount
//     }
//   }, [session]);

//   // Optional: Polling for credits every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (session?.user) {
//         fetchUserCredits();
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [session]);

//   return (
//     <div className="relative bg-cosmic-doodle p-6 rounded-lg shadow-lg flex justify-between items-center">
//       <h2 className="text-2xl font-bold text-white">Your design assistant</h2>
//       {session?.user && (
//         <div className="flex items-center space-x-4 text-white">
//           <span className="font-medium">Welcome, {session.user.name}</span>
//           <div className="relative flex items-center">
//             <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg flex items-center shadow-md">
//               <span className="font-medium text-lg">Credits: {credits}</span>
//               <FaInfoCircle 
//                 className="ml-2 cursor-pointer hover:text-blue-400"
//                 onClick={() => setShowInfo(!showInfo)} 
//                 aria-label="More information about credits" 
//               />
//             </div>
//             {showInfo && (
//               <div className="absolute top-full left-0 mt-2 bg-white rounded-lg p-4 shadow-lg text-black">
//                 <h3 className="font-semibold">Credits Info</h3>
//                 <p>You have {credits} credits available for generating images.</p>
//                 <p>Each image generation will deduct one credit from your total.</p>
//                 <button 
//                   className="mt-2 text-blue-500 hover:underline" 
//                   onClick={() => setShowInfo(false)}
//                 >
//                   Close
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       <style jsx>{`
//         .bg-cosmic-doodle {
//           background-image: url('data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
//               <rect width="100%" height="100%" fill="#000" />
//               <!-- Stars -->
//               <circle cx="100" cy="50" r="2" fill="white" />
//               <circle cx="200" cy="150" r="1.5" fill="yellow" />
//               <circle cx="300" cy="100" r="3" fill="lightblue" />
//               <circle cx="400" cy="300" r="1.8" fill="pink" />
//               <circle cx="500" cy="200" r="2.5" fill="orange" />
//               <circle cx="600" cy="400" r="1.2" fill="cyan" />
//               <circle cx="700" cy="350" r="3" fill="white" />
//               <circle cx="150" cy="400" r="2.5" fill="lightgreen" />
//               <circle cx="250" cy="50" r="1.8" fill="violet" />
//               <circle cx="350" cy="250" r="2" fill="lightcoral" />
//               <circle cx="450" cy="150" r="2.5" fill="gold" />
//               <circle cx="550" cy="450" r="1.5" fill="lime" />
//               <circle cx="650" cy="300" r="3" fill="deepskyblue" />
//               <circle cx="750" cy="200" r="2" fill="magenta" />
//               <!-- Cosmic Doodles -->
//               <path d="M150 400 C150 380, 180 380, 180 400 C180 420, 150 420, 150 400 Z" fill="rgba(255, 255, 255, 0.2)" />
//               <path d="M300 500 Q320 480, 340 500 T360 500" fill="none" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2" />
//               <path d="M450 100 Q470 80, 490 100 T510 100" fill="none" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2" />
//               <text x="50%" y="50%" text-anchor="middle" fill="rgba(255, 255, 255, 0.1)" font-size="80" font-family="Arial">✨</text>
//             </svg>
//           `)}');
//           background-size: cover;
//           background-repeat: no-repeat;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DashboardHeader;

'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaInfoCircle } from 'react-icons/fa'; // Importing an icon from react-icons

const DashboardHeader = () => {
  const { data: session } = useSession();
  const [credits, setCredits] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  // Function to fetch user credits
  const fetchUserCredits = async () => {
    if (session?.user?.email) {
      const response = await fetch('/api/get-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email }),
      });

      if (response.ok) {
        const data = await response.json();
        setCredits(data.credits);
      } else {
        console.error("Failed to fetch credits");
      }
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchUserCredits(); // Fetch user credits on mount
    }
  }, [session]);

  return (
    <div className="relative bg-cosmic-doodle p-6 rounded-lg shadow-lg flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">Your design assistant</h2>
      {session?.user && (
        <div className="flex items-center space-x-4 text-white">
          <span className="font-medium">Welcome, {session.user.name}</span>
          <div className="relative flex items-center">
            <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg flex items-center shadow-md">
              <span className="font-medium text-lg">Credits: {credits}</span>
              <FaInfoCircle 
                className="ml-2 cursor-pointer hover:text-blue-400"
                onClick={() => setShowInfo(!showInfo)} 
                aria-label="More information about credits" 
              />
            </div>
            {showInfo && (
              <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowInfo(false)}></div>
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg p-4 shadow-lg text-black z-50">
                  <h3 className="font-semibold">Credits Info</h3>
                  <p>You have {credits} credits available for generating images.</p>
                  <p>Each image generation will deduct one credit from your total.</p>
                  <button 
                    className="mt-2 text-blue-500 hover:underline" 
                    onClick={() => setShowInfo(false)}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        .bg-cosmic-doodle {
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
          background-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
};

export default DashboardHeader;
