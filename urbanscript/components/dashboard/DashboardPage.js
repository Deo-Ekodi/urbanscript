'use client';

import { useState, useContext, useEffect } from "react";
import { AuthContext } from '@/app/providers/providers';
import NavBar from "@/components/Navbar/NavBar";
import Tool from "@/components/tool/ToolPage";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Footer from "../Footer";
import Generator from "../prompt-generator/generator";
import Portfolio from "../potfolio/potforioPage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [activeComponent, setActiveComponent] = useState("Tool");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // useEffect(() => {
  //   // Initialize TIXAE Agents script for popup at bottom right
  //   window.VG_CONFIG = {
  //     ID: "lv1vwt6p48wo3b1q",
  //     region: 'na',
  //     render: 'popup', // Changes to popup for chat-like widget
  //     stylesheets: [
  //       "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
  //     ]
  //   };

  //   const VG_SCRIPT = document.createElement("script");
  //   VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
  //   VG_SCRIPT.defer = true;
  //   document.body.appendChild(VG_SCRIPT);
  // }, []);

  return (
    <>
      <NavBar />
      <div className="flex mt-20 relative h-screen">
        {/* Sidebar */}
        <div className={`w-1/5 relative text-white p-6 overflow-y-auto bg-gray-900 transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer p-2 rounded hover:bg-blue-700 transition-colors duration-200 ${activeComponent === "Tool" ? "bg-blue-600" : ""}`}
              onClick={() => setActiveComponent("Tool")}
            >
              Image Tool
            </li>
            <li
              className={`cursor-pointer p-2 rounded hover:bg-blue-700 transition-colors duration-200 ${activeComponent === "Generator" ? "bg-blue-600" : ""}`}
              onClick={() => setActiveComponent("Generator")}
            >
              Prompt Generator
            </li>
            <li
              className={`cursor-pointer p-2 rounded hover:bg-blue-700 transition-colors duration-200 ${activeComponent === "Portfolio" ? "bg-blue-600" : ""}`}
              onClick={() => setActiveComponent("Portfolio")}
            >
              Portfolio
            </li>
          </ul>
        </div>

        {/* Toggle sidebar button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-5 left-5 z-10 p-2 bg-blue-600 rounded-md text-white lg:hidden"
          aria-label="Toggle Sidebar"
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faBars} />
        </button>

        {/* Main content */}
        <div className={`flex-1 p-6 bg-cosmic-doodle overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-1/5' : 'ml-0'}`}>
          <DashboardHeader />
          
          {/* Conditional rendering of components */}
          {activeComponent === "Tool" && <Tool />}
          {activeComponent === "Generator" && <Generator />}
          {activeComponent === "Portfolio" && <Portfolio />}
        </div>
      </div>
      <Footer />

      {/* Tailwind Custom Styles for Cosmic Doodle Background */}
      <style jsx>{`
        .bg-cosmic-doodle {
          background-image: url('data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
              <rect width="100%" height="100%" fill="#000" />
              <!-- Stars and Cosmic Doodles -->
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
              <!-- Other cosmic shapes omitted for brevity -->
            </svg>
          `)}');
          background-size: cover;
          background-repeat: no-repeat;
        }
      `}</style>
    </>
  );
}


