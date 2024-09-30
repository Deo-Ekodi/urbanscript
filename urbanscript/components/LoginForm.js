// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });

//       if (res.error) {
//         setError("Invalid Credentials");
//         setLoading(false);
//         return;
//       }

//       router.replace("/dashboard");
//     } catch (error) {
//       setError("Something went wrong");
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "100vh",
//         background: "linear-gradient(to bottom right, #1f1c2c, #928dab)",
//       }}
//     >

//       <div
//         style={{
//           flex: 1,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "40px",
//         }}
//       >
//         <div
//           style={{
//             padding: "50px",
//             borderRadius: "15px",
//             background: "rgba(0, 0, 0, 0.7)",
//             backdropFilter: "blur(10px)",
//             border: "1px solid rgba(255, 255, 255, 0.3)",
//             width: "450px",
//             boxShadow: "0 20px 30px rgba(0, 0, 0, 0.6)",
//             color: "#fff",
//           }}
//         >
//           <h1 style={{ fontSize: "34px", fontWeight: "bold", textAlign: "center", marginBottom: "30px" }}>
//             Login
//           </h1>

//           <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               type="text"
//               placeholder="Email"
//               style={{
//                 padding: "15px",
//                 border: "2px solid transparent",
//                 borderRadius: "10px",
//                 background: "rgba(255, 255, 255, 0.2)",
//                 color: "#fff",
//                 fontSize: "16px",
//                 transition: "border 0.3s ease-in-out",
//               }}
//               onFocus={(e) => (e.target.style.border = "2px solid #48bb78")}
//               onBlur={(e) => (e.target.style.border = "2px solid transparent")}
//             />
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               placeholder="Password"
//               style={{
//                 padding: "15px",
//                 border: "2px solid transparent",
//                 borderRadius: "10px",
//                 background: "rgba(255, 255, 255, 0.2)",
//                 color: "#fff",
//                 fontSize: "16px",
//                 transition: "border 0.3s ease-in-out",
//               }}
//               onFocus={(e) => (e.target.style.border = "2px solid #48bb78")}
//               onBlur={(e) => (e.target.style.border = "2px solid transparent")}
//             />
//             <button
//               style={{
//                 padding: "16px",
//                 border: "none",
//                 borderRadius: "10px",
//                 background: "linear-gradient(45deg, #38a169, #48bb78)",
//                 color: "#fff",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//                 fontSize: "16px",
//                 transition: "transform 0.3s ease",
//               }}
//               onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
//               onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
//             >
//               {loading ? (
//                 <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <div className="loader"></div>
//                   <span style={{ marginLeft: "10px" }}>Loading...</span>
//                 </span>
//               ) : (
//                 "Login"
//               )}
//             </button>
//             {error && (
//               <div
//                 style={{
//                   backgroundColor: "#e53e3e",
//                   color: "#fff",
//                   padding: "10px 16px",
//                   borderRadius: "8px",
//                   textAlign: "center",
//                 }}
//               >
//                 {error}
//               </div>
//             )}

//             <Link href={"/register"} style={{ color: "#81e6d9", textAlign: "center", marginTop: "20px", textDecoration: "underline" }}>
//               Don't have an account? Register here
//             </Link>
//           </form>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//           100% {
//             transform: translateY(0);
//           }
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//         .loader {
//           border: 4px solid rgba(255, 255, 255, 0.3);
//           border-radius: 50%;
//           border-top: 4px solid #fff;
//           width: 16px;
//           height: 16px;
//           animation: spin 1s linear infinite;
//         }
//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        setLoading(false);
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* Login Form */}
        <h1 className="title">Login to Your Account</h1>
        <form onSubmit={handleSubmit} className="form">
          {/* Email Input */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="input"
            onFocus={(e) => (e.target.style.border = "2px solid #48bb78")}
            onBlur={(e) => (e.target.style.border = "2px solid transparent")}
          />

          {/* Password Input */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="input"
            onFocus={(e) => (e.target.style.border = "2px solid #48bb78")}
            onBlur={(e) => (e.target.style.border = "2px solid transparent")}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <Link href="/forgot_password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button className="login-button">
            {loading ? (
              <span className="loading-container">
                <div className="loader"></div>
                <span>Loading...</span>
              </span>
            ) : (
              "Login"
            )}
          </button>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Register Link */}
          <Link href={"/register"} className="register-link">
            Don't have an account? Register here
          </Link>
        </form>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .login-container {
          display: flex;
          height: 100vh;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to bottom right, #1f1c2c, #928dab);
        }
        .login-card {
          padding: 50px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          width: 450px;
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.6);
          color: #fff;
          animation: fadeIn 0.7s ease-in-out;
        }
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }
        .logo {
          width: 100px;
        }
        .title {
          text-align: center;
          font-size: 34px;
          font-weight: bold;
          margin-bottom: 30px;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .input {
          padding: 15px;
          border: 2px solid transparent;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          font-size: 16px;
          transition: border 0.3s ease-in-out;
        }
        .login-button {
          padding: 16px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(45deg, #38a169, #48bb78);
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          font-size: 16px;
          transition: transform 0.3s ease;
        }
        .login-button:hover {
          transform: scale(1.05);
        }
        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 4px solid #fff;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
        }
        .flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .remember-me {
          display: flex;
          align-items: center;
          font-size: 14px;
        }
        .forgot-password {
          color: #81e6d9;
          text-decoration: underline;
        }
        .error-message {
          background-color: #e53e3e;
          color: #fff;
          padding: 10px 16px;
          border-radius: 8px;
          text-align: center;
        }
        .register-link {
          color: #81e6d9;
          text-align: center;
          margin-top: 20px;
          text-decoration: underline;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
