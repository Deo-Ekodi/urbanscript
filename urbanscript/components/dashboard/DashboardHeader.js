// components/DashboardHeader.js

'use client';
import { useSession } from "next-auth/react";
import NavBar from "../Navbar/NavBar";

const DashboardHeader = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-gray-100 shadow-md p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Dashboard</h2>
      {session?.user && (
        <div className="flex items-center space-x-4">
          <span className="font-medium">Welcome, {session.user.name}</span>
          {/* <img
            src={session.user.image || "/default-avatar.png"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          /> */}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
