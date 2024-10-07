// "use client";

// import { signOut } from "next-auth/react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useState } from "react";

// export default function UserInfo() {
//   const { data: session } = useSession();
//   const [showSettings, setShowSettings] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 flex flex-col gap-4">
//         {/* Profile Section */}
//         <div className="flex flex-col items-center">
//           <img
//             src={session?.user?.image || "/default-profile.png"}
//             alt="Profile Picture"
//             className="w-24 h-24 rounded-full shadow-md border-2 border-gray-200"
//           />
//           <h1 className="text-2xl font-semibold mt-4">Welcome, {session?.user?.name}!</h1>
//           <p className="text-gray-500">Here's a summary of your account details.</p>
//         </div>

//         {/* Account Info Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
//             <h2 className="text-lg font-medium">Name:</h2>
//             <p className="text-gray-600">{session?.user?.name || "N/A"}</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
//             <h2 className="text-lg font-medium">Email:</h2>
//             <p className="text-gray-600">{session?.user?.email || "N/A"}</p>
//           </div>
//         </div>

//         {/* Toggle Account Settings */}
//         <button
//           onClick={() => setShowSettings(!showSettings)}
//           className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           {showSettings ? "Hide Account Settings" : "Show Account Settings"}
//         </button>

//         {/* Account Settings */}
//         {showSettings && (
//           <div className="p-4 bg-gray-50 rounded-lg shadow-sm mt-4">
//             <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
//             <div className="space-y-4">
//               <button className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
//                 Edit Profile (coming son)
//               </button>
//               <button className="w-full py-2 px-4 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors">
//                 Change Password (coming soon)
//               </button>
//               <button
//                 onClick={() => signOut({ callbackUrl: "/" })}
//                 className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
//               >
//                 Log Out
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Recent Activity Section */}
//         {/* <div className="p-4 bg-gray-50 rounded-lg shadow-sm mt-4">
//           <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
//           <ul className="space-y-2">
//             <li className="flex justify-between items-center text-gray-600">
//               <span>Logged in from a new device</span>
//               <span className="text-xs text-gray-400">2 hours ago</span>
//             </li>
//             <li className="flex justify-between items-center text-gray-600">
//               <span>Password updated successfully</span>
//               <span className="text-xs text-gray-400">3 days ago</span>
//             </li>
//             <li className="flex justify-between items-center text-gray-600">
//               <span>Email verified</span>
//               <span className="text-xs text-gray-400">1 week ago</span>
//             </li>
//           </ul>
//         </div> */}

//         {/* Contact Support Section */}
//         <div className="p-4 bg-gray-50 rounded-lg shadow-sm mt-4 flex justify-between items-center">
//           <div>
//             <h2 className="text-lg font-medium">Need help?</h2>
//             <p className="text-gray-500">Contact our support team for assistance.</p>
//           </div>
//           <Link href="/contact" passHref legacyBehavior>
//             <button className="py-2 px-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-colors">
//               Contact Support
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

// Styled Components for enhanced aura
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6b73ff, #000dff);
  padding: 2rem;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #6b73ff;
  box-shadow: 0 0 20px rgba(107, 115, 255, 0.6);
  animation: glow 1.5s ease-in-out infinite alternate;
  @keyframes glow {
    0% {
      box-shadow: 0 0 10px rgba(107, 115, 255, 0.4);
    }
    100% {
      box-shadow: 0 0 20px rgba(107, 115, 255, 0.8);
    }
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
  background: linear-gradient(to right, #ff4d00, #ff8a00);
  -webkit-background-clip: text;
  color: transparent;
`;

const InfoCard = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  text-align: left;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${(props) => props.color || "#6b73ff"};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) => props.hoverColor || "#4d57ff"};
  }
`;

const ContactSection = styled.div`
  background-color: #f1f1f1;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;

// Main Component
export default function UserInfo() {
  const { data: session } = useSession();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <Container>
      <Card>
        {/* Profile Section */}
        <ProfileImage
          src={session?.user?.image || "/default-profile.png"}
          alt="Profile Picture"
        />
        <Title>Welcome, {session?.user?.name}!</Title>
        <p className="text-gray-500">Here's a summary of your account details.</p>

        {/* Account Info Section */}
        <InfoCard>
          <h2 className="text-lg font-medium">Name:</h2>
          <p>{session?.user?.name || "N/A"}</p>
        </InfoCard>
        <InfoCard>
          <h2 className="text-lg font-medium">Email:</h2>
          <p>{session?.user?.email || "N/A"}</p>
        </InfoCard>

        {/* Toggle Account Settings */}
        <Button
          onClick={() => setShowSettings(!showSettings)}
          color="#007BFF"
          hoverColor="#0056b3"
        >
          {showSettings ? "Hide Account Settings" : "Show Account Settings"}
        </Button>

        {/* Account Settings */}
        {showSettings && (
          <div>
            <Button color="#28A745" hoverColor="#218838">
              Edit Profile (coming soon)
            </Button>
            <Button color="#FFC107" hoverColor="#e0a800">
              Change Password (coming soon)
            </Button>
            <Button
              color="#DC3545"
              hoverColor="#c82333"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Log Out
            </Button>
          </div>
        )}

        {/* Contact Support Section */}
        <ContactSection>
          <div>
            <h2 className="text-lg font-medium">Need help?</h2>
            <p className="text-gray-500">
              Contact our support team for assistance.
            </p>
          </div>
          <Link href="/contact" passHref legacyBehavior>
            <Button color="#6f42c1" hoverColor="#5936b3">
              Contact Support
            </Button>
          </Link>
        </ContactSection>
      </Card>
    </Container>
  );
}
