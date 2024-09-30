// 'use client';

// import { useState, useEffect, useContext } from "react";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/app/providers/providers';
// import NavBar from "@/components/Navbar/NavBar";
// import Footer from "@/components/Footer";
// import UserInfo from "@/components/UserInfo";
// import Tool from "@/components/tool/ToolPage";
// import DashboardHeader from "@/components/dashboard/DashboardHeader";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext); // Get the user from the context
//   const router = useRouter(); // Use router for redirection

//   useEffect(() => {
//     if (!user) {
//         router.push('/login'); // Redirect to the login page if not authenticated
//     }
// }, [user, router]);
//   // State to manage which component is shown in the main content area
//   const [activeComponent, setActiveComponent] = useState("Tool");

//   return (
//     <>
//       {/* Navbar Section */}
//       <NavBar />

//       {/* Container below the Navbar */}
//       <div className="flex mt-20"> {/* Apply margin-top to push below NavBar */}
//         {/* Sidebar */}
//         <div className="w-1/5 bg-gray-800 text-white p-6 h-screen">
//           <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
//           <ul className="space-y-4">
//             <li
//               className={`cursor-pointer ${
//                 activeComponent === "UserInfo" ? "font-bold text-blue-300" : ""
//               }`}
//               onClick={() => setActiveComponent("UserInfo")}
//             >
//               User Info
//             </li>
//             <li
//               className={`cursor-pointer ${
//                 activeComponent === "Tool" ? "font-bold text-blue-300" : ""
//               }`}
//               onClick={() => setActiveComponent("Tool")}
//             >
//               Image Tool
//             </li>
//           </ul>
//         </div>

//         {/* Main Content Area */}
//         <div className="w-4/5 p-6">
//           <DashboardHeader />
//           {activeComponent === "UserInfo" && <UserInfo />}
//           {activeComponent === "Tool" && <Tool />}
//         </div>
//       </div>

//       {/* Footer Section */}
//       <Footer />
//     </>
//   );
// }


// 'use client';

// import { useState, useEffect, useContext } from "react";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/app/providers/providers';
// import NavBar from "@/components/Navbar/NavBar";
// import Footer from "@/components/Footer";
// import UserInfo from "@/components/UserInfo";
// import Tool from "@/components/tool/ToolPage";
// import DashboardHeader from "@/components/dashboard/DashboardHeader";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.push('/login');
//     }
//   }, [user, router]);

//   const [activeComponent, setActiveComponent] = useState("Tool");

//   return (
//     <>
//       {/* Navbar Section */}
//       <NavBar />

//       {/* SVG Background Wrapper */}
//       <div className="relative min-h-screen bg-darcula-doodle bg-cover bg-center">
//         {/* Container below the Navbar */}
//         <div className="flex mt-20"> {/* Apply margin-top to push below NavBar */}
//           {/* Sidebar */}
//           <div className="w-1/5 bg-gray-900 text-white p-6 h-screen">
//             <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
//             <ul className="space-y-4">
//               <li
//                 className={`cursor-pointer ${
//                   activeComponent === "UserInfo" ? "font-bold text-blue-300" : ""
//                 }`}
//                 onClick={() => setActiveComponent("UserInfo")}
//               >
//                 User Info
//               </li>
//               <li
//                 className={`cursor-pointer ${
//                   activeComponent === "Tool" ? "font-bold text-blue-300" : ""
//                 }`}
//                 onClick={() => setActiveComponent("Tool")}
//               >
//                 Image Tool
//               </li>
//             </ul>
//           </div>

//           {/* Main Content Area */}
//           <div className="w-4/5 p-6">
//             <DashboardHeader />
//             {activeComponent === "UserInfo" && <UserInfo />}
//             {activeComponent === "Tool" && <Tool />}
//           </div>
//         </div>
//       </div>

//       {/* Footer Section */}
//       <Footer />

//       {/* Tailwind Custom Styles for Darcula Doodle Background */}
//       <style jsx global>{`
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
//     </>
//   );
// }


// 'use client';

// import { useState, useEffect, useContext } from "react";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/app/providers/providers';
// import NavBar from "@/components/Navbar/NavBar";
// import Footer from "@/components/Footer";
// import UserInfo from "@/components/UserInfo";
// import Tool from "@/components/tool/ToolPage";
// import DashboardHeader from "@/components/dashboard/DashboardHeader";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//         router.push('/login');
//     }
//   }, [user, router]);

//   const [activeComponent, setActiveComponent] = useState("Tool");

//   return (
//     <>
//       <NavBar />
//       <div className="flex mt-20 relative">
//         <div className="w-1/5 bg-gray-800 text-white p-6 h-screen">
//           <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
//           <ul className="space-y-4">
//             <li className={`cursor-pointer ${activeComponent === "UserInfo" ? "font-bold text-blue-300" : ""}`} onClick={() => setActiveComponent("UserInfo")}>User Info</li>
//             <li className={`cursor-pointer ${activeComponent === "Tool" ? "font-bold text-blue-300" : ""}`} onClick={() => setActiveComponent("Tool")}>Image Tool</li>
//           </ul>
//         </div>
//         <div className="w-4/5 p-6 bg-cosmic-doodle">
//           <DashboardHeader />
//           {activeComponent === "UserInfo" && <UserInfo />}
//           {activeComponent === "Tool" && <Tool />}
//         </div>
//       </div>
//       {/* <Footer /> */}
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
//     </>
//   );
// }

'use client';

import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/providers/providers';
import NavBar from "@/components/Navbar/NavBar";
import UserInfo from "@/components/UserInfo";
import Tool from "@/components/tool/ToolPage";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Footer from "../Footer";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const [activeComponent, setActiveComponent] = useState("Tool");

  return (
    <>
      <NavBar />
      <div className="flex mt-20 relative">
        <div className="w-1/5 bg-gray-800 text-white p-6 h-screen">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <ul className="space-y-4">
            <li className={`cursor-pointer ${activeComponent === "UserInfo" ? "font-bold text-blue-300" : ""}`} onClick={() => setActiveComponent("UserInfo")}>User Info</li>
            <li className={`cursor-pointer ${activeComponent === "Tool" ? "font-bold text-blue-300" : ""}`} onClick={() => setActiveComponent("Tool")}>Image Tool</li>
          </ul>
        </div>
        <div className="w-4/5 p-6 bg-cosmic-doodle">
          <DashboardHeader />
          {activeComponent === "UserInfo" && <UserInfo />}
          {activeComponent === "Tool" && <Tool />}
        </div>
      </div>
      <Footer />
      
      {/* Tailwind Custom Styles for Cosmic Doodle Background */}
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
    </>
  );
}
