// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function RegisterForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       setError("All fields are necessary.");
//       return;
//     }

//     try {
//       const resUserExists = await fetch("api/userExists", {
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

//       const res = await fetch("api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });

//       if (res.ok) {
//         const form = e.target;
//         form.reset();
//         router.push("/");
//       } else {
//         console.log("User registration failed.");
//       }
//     } catch (error) {
//       console.log("Error during registration: ", error);
//     }
//   };

//   return (
//     <div className="grid place-items-center h-screen">
//       <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
//         <h1 className="text-xl font-bold my-4">Register</h1>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//           <input
//             onChange={(e) => setName(e.target.value)}
//             type="text"
//             placeholder="Full Name"
//           />
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             type="text"
//             placeholder="Email"
//           />
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Password"
//           />
//           <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
//             Register
//           </button>

//           {error && (
//             <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
//               {error}
//             </div>
//           )}

//           <Link className="text-sm mt-3 text-right" href={"/login"}>
//             Already have an account? <span className="underline">Login</span>
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// }

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
