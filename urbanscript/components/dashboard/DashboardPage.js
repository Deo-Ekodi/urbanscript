'use client';

import { useState } from "react";
import NavBar from "@/components/Navbar/NavBar";
import Footer from "@/components/Footer";
import UserInfo from "@/components/UserInfo";
import Tool from "@/components/tool/ToolPage";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function Dashboard() {
  // State to manage which component is shown in the main content area
  const [activeComponent, setActiveComponent] = useState("UserInfo");

  return (
    <>
      {/* Navbar Section */}
      <NavBar />

      {/* Container below the Navbar */}
      <div className="flex mt-20"> {/* Apply margin-top to push below NavBar */}
        {/* Sidebar */}
        <div className="w-1/5 bg-gray-800 text-white p-6 h-screen">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer ${
                activeComponent === "UserInfo" ? "font-bold text-blue-300" : ""
              }`}
              onClick={() => setActiveComponent("UserInfo")}
            >
              User Info
            </li>
            <li
              className={`cursor-pointer ${
                activeComponent === "Tool" ? "font-bold text-blue-300" : ""
              }`}
              onClick={() => setActiveComponent("Tool")}
            >
              Image Tool
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="w-4/5 p-6">
          <DashboardHeader />
          {activeComponent === "UserInfo" && <UserInfo />}
          {activeComponent === "Tool" && <Tool />}
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </>
  );
}
