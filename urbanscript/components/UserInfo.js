"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function UserInfo() {
  const { data: session } = useSession();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 flex flex-col gap-4">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <img
            src={session?.user?.image || "/default-profile.png"}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full shadow-md border-2 border-gray-200"
          />
          <h1 className="text-2xl font-semibold mt-4">Welcome, {session?.user?.name}!</h1>
          <p className="text-gray-500">Here's a summary of your account details.</p>
        </div>

        {/* Account Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium">Name:</h2>
            <p className="text-gray-600">{session?.user?.name || "N/A"}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium">Email:</h2>
            <p className="text-gray-600">{session?.user?.email || "N/A"}</p>
          </div>
        </div>

        {/* Toggle Account Settings */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
        >
          {showSettings ? "Hide Account Settings" : "Show Account Settings"}
        </button>

        {/* Account Settings */}
        {showSettings && (
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm mt-4">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <button className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                Edit Profile (coming son)
              </button>
              <button className="w-full py-2 px-4 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors">
                Change Password (coming soon)
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        )}

        {/* Recent Activity Section */}
        {/* <div className="p-4 bg-gray-50 rounded-lg shadow-sm mt-4">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center text-gray-600">
              <span>Logged in from a new device</span>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </li>
            <li className="flex justify-between items-center text-gray-600">
              <span>Password updated successfully</span>
              <span className="text-xs text-gray-400">3 days ago</span>
            </li>
            <li className="flex justify-between items-center text-gray-600">
              <span>Email verified</span>
              <span className="text-xs text-gray-400">1 week ago</span>
            </li>
          </ul>
        </div> */}

        {/* Contact Support Section */}
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm mt-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Need help?</h2>
            <p className="text-gray-500">Contact our support team for assistance.</p>
          </div>
          <Link href="/contact" passHref legacyBehavior>
            <button className="py-2 px-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-colors">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
