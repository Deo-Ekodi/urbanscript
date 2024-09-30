// // components/DashboardHeader.js

// 'use client';
// import { useSession } from "next-auth/react";
// import NavBar from "../Navbar/NavBar";

// const DashboardHeader = () => {
//   const { data: session } = useSession();

//   return (
//     <div className="bg-gray-100 shadow-md p-4 flex justify-between items-center">
//       <h2 className="text-xl font-bold">Dashboard</h2>
//       {session?.user && (
//         <div className="flex items-center space-x-4">
//           <span className="font-medium">Welcome, {session.user.name}</span>

//         </div>
//       )}
//     </div>
//   );
// };

// export default DashboardHeader;


// 'use client';
// import { useSession } from "next-auth/react";
// import NavBar from "../Navbar/NavBar";

// const DashboardHeader = () => {
//   const { data: session } = useSession();

//   return (
//     <div className="relative bg-darcula-doodle p-6 rounded-lg shadow-lg flex justify-between items-center">
//       <h2 className="text-2xl font-bold text-white">Dashboard</h2>
//       {session?.user && (
//         <div className="flex items-center space-x-4 text-white">
//           <span className="font-medium">Welcome, {session.user.name}</span>
//         </div>
//       )}

//       {/* Tailwind Custom Styles for Darcula Doodle Background */}
//       <style jsx>{`
//         .bg-darcula-doodle {
//           background-image: url('data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
//             <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
//               <defs>
//                 <pattern id="darcula-doodle" patternUnits="userSpaceOnUse" width="100" height="100">
//                   <rect width="100" height="100" fill="#1e1e1e" />
//                   <circle cx="30" cy="30" r="5" fill="#ffffff" opacity="0.2"/>
//                   <circle cx="70" cy="70" r="5" fill="#ffffff" opacity="0.2"/>
//                   <path d="M50 0 L50 100" stroke="#3f3f3f" stroke-width="1" opacity="0.2"/>
//                   <path d="M0 50 L100 50" stroke="#3f3f3f" stroke-width="1" opacity="0.2"/>
//                   <path d="M25,25 C35,10 65,10 75,25" stroke="#6a0dad" stroke-width="1" fill="transparent" opacity="0.5"/>
//                   <path d="M25,75 C35,90 65,90 75,75" stroke="#6a0dad" stroke-width="1" fill="transparent" opacity="0.5"/>
//                   <circle cx="50" cy="50" r="10" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
//                 </pattern>
//               </defs>
//               <rect width="100%" height="100%" fill="url(#darcula-doodle)" />
//             </svg>
//           `)}');
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DashboardHeader;


// 'use client';
// import { useSession } from "next-auth/react";

// const DashboardHeader = () => {
//   const { data: session } = useSession();

//   return (
//     <div className="relative bg-cosmic-doodle p-6 rounded-lg shadow-lg flex justify-between items-center">
//       <h2 className="text-2xl font-bold text-white">Dashboard</h2>
//       {session?.user && (
//         <div className="flex items-center space-x-4 text-white">
//           <span className="font-medium">Welcome, {session.user.name}</span>
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

const DashboardHeader = () => {
  const { data: session } = useSession();

  return (
    <div className="relative bg-cosmic-doodle p-6 rounded-lg shadow-lg flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">Dashboard</h2>
      {session?.user && (
        <div className="flex items-center space-x-4 text-white">
          <span className="font-medium">Welcome, {session.user.name}</span>
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
