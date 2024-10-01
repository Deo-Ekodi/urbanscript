"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        e.target.reset();
        router.push("/login");
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      setError("Error during registration.");
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-title">Register</h1>

        <form onSubmit={handleSubmit} className="form-content">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="form-input"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="form-input"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="form-input"
          />
          <button className="form-button">Register</button>
          {error && <div className="error-message">{error}</div>}
          <Link href="/login" className="form-link">
            Already have an account? <span className="highlight">Login</span>
          </Link>
        </form>
      </div>
      <style jsx>{`
        .form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to bottom right, #0f2027, #203a43, #2c5364);
        }
        .form-box {
          padding: 40px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          width: 450px;
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5);
        }
        .form-title {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          text-align: center;
        }
        .form-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 20px;
        }
        .form-input {
          padding: 12px;
          border: 2px solid transparent;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          transition: border 0.3s ease-in-out;
        }
        .form-input:focus {
          border: 2px solid #38b2ac;
          outline: none;
        }
        .form-button {
          padding: 14px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(45deg, #38a169, #48bb78);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .form-button:hover {
          transform: scale(1.05);
        }
        .error-message {
          background-color: #e53e3e;
          color: #fff;
          padding: 8px 16px;
          border-radius: 8px;
          text-align: center;
          margin-top: 10px;
        }
        .form-link {
          color: #a0aec0;
          text-align: center;
          margin-top: 12px;
        }
        .highlight {
          color: #81e6d9;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}


// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function RegisterForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [profilePic, setProfilePic] = useState(null);
//   const [error, setError] = useState("");
//   const [termsAccepted, setTermsAccepted] = useState(false);

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password || !termsAccepted) {
//       setError("Please fill all fields and accept the terms.");
//       return;
//     }

//     // Profile picture validation (optional)
//     if (profilePic && profilePic.size > 5 * 1024 * 1024) {
//       setError("Profile picture size should be less than 5MB.");
//       return;
//     }

//     try {
//       const resUserExists = await fetch("/api/userExists", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const { user } = await resUserExists.json();

//       if (user) {
//         setError("User already exists.");
//         return;
//       }

//       const res = await fetch("/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (res.ok) {
//         e.target.reset();
//         router.push("/login");
//       } else {
//         setError("User registration failed.");
//       }
//     } catch (error) {
//       setError("Error during registration.");
//       console.log("Error during registration: ", error);
//     }
//   };

//   return (
//     <div className="form-container">
//       <div className="form-box">
//         <h1 className="form-title">Create an Account</h1>

//         {/* Profile Picture Upload */}
//         {/* <div className="profile-upload">
//           <label htmlFor="profilePic" className="profile-label">
//             {profilePic ? (
//               <img
//                 src={URL.createObjectURL(profilePic)}
//                 alt="Profile"
//                 className="profile-preview"
//               />
//             ) : (
//               <span className="profile-placeholder">+</span>
//             )}
//           </label>
//           <input
//             id="profilePic"
//             type="file"
//             accept="image/*"
//             className="profile-input"
//             onChange={(e) => setProfilePic(e.target.files[0])}
//           />
//           <span className="upload-text">Upload Profile Picture (optional)</span>
//         </div> */}

//         <form onSubmit={handleSubmit} className="form-content">
//           <input
//             onChange={(e) => setName(e.target.value)}
//             type="text"
//             placeholder="Full Name"
//             className="form-input"
//           />
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="Email"
//             className="form-input"
//           />
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Password"
//             className="form-input"
//           />

//           {/* Terms and Conditions */}
//           <label className="terms-container">
//             <input
//               type="checkbox"
//               checked={termsAccepted}
//               onChange={() => setTermsAccepted(!termsAccepted)}
//             />
//             I agree to the{" "}
//             <Link href="/terms" className="terms-link">
//               Terms and Conditions
//             </Link>
//           </label>

//           <button className="form-button">Register</button>
//           {error && <div className="error-message">{error}</div>}
//           <Link href="/login" className="form-link">
//             Already have an account? <span className="highlight">Login</span>
//           </Link>
//         </form>
//       </div>

//       <style jsx>{`
//         .form-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 100vh;
//           background: linear-gradient(to bottom right, #0f2027, #203a43, #2c5364);
//         }
//         .form-box {
//           padding: 40px;
//           border-radius: 15px;
//           background: rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           width: 500px;
//           box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5);
//           animation: fadeIn 0.7s ease-in-out;
//         }
//         .form-title {
//           font-size: 32px;
//           font-weight: bold;
//           color: #fff;
//           text-align: center;
//           margin-bottom: 30px;
//         }
//         .profile-upload {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           margin-bottom: 20px;
//         }
//         .profile-label {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           width: 100px;
//           height: 100px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.2);
//           color: #fff;
//           font-size: 40px;
//           cursor: pointer;
//         }
//         .profile-placeholder {
//           display: block;
//         }
//         .profile-preview {
//           width: 100%;
//           height: 100%;
//           border-radius: 50%;
//           object-fit: cover;
//         }
//         .upload-text {
//           color: #81e6d9;
//           margin-top: 10px;
//         }
//         .form-content {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//         }
//         .form-input {
//           padding: 12px;
//           border: 2px solid transparent;
//           border-radius: 8px;
//           background: rgba(255, 255, 255, 0.2);
//           color: #fff;
//           transition: border 0.3s ease-in-out;
//         }
//         .form-input:focus {
//           border: 2px solid #38b2ac;
//           outline: none;
//         }
//         .terms-container {
//           display: flex;
//           align-items: center;
//           color: #a0aec0;
//         }
//         .terms-link {
//           color: #81e6d9;
//           text-decoration: underline;
//           margin-left: 4px;
//         }
//         .form-button {
//           padding: 14px;
//           border: none;
//           border-radius: 8px;
//           background: linear-gradient(45deg, #38a169, #48bb78);
//           color: white;
//           font-weight: bold;
//           cursor: pointer;
//           transition: transform 0.3s ease;
//         }
//         .form-button:hover {
//           transform: scale(1.05);
//         }
//         .error-message {
//           background-color: #e53e3e;
//           color: #fff;
//           padding: 8px 16px;
//           border-radius: 8px;
//           text-align: center;
//           margin-top: 10px;
//         }
//         .form-link {
//           color: #a0aec0;
//           text-align: center;
//           margin-top: 12px;
//         }
//         .highlight {
//           color: #81e6d9;
//           text-decoration: underline;
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
