// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });

//       if (res.error) {
//         setError("Invalid Credentials");
//         return;
//       }

//       router.replace("tool");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="grid place-items-center h-screen">
//       <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
//         <h1 className="text-xl font-bold my-4">Login</h1>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
//             Login
//           </button>
//           {error && (
//             <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
//               {error}
//             </div>
//           )}

//           <Link className="text-sm mt-3 text-right" href={"/register"}>
//             Don't have an account? <span className="underline">Register</span>
//           </Link>
//         </form>
//       </div>
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
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(to bottom right, #1f1c2c, #928dab)",
      }}
    >

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            padding: "50px",
            borderRadius: "15px",
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            width: "450px",
            boxShadow: "0 20px 30px rgba(0, 0, 0, 0.6)",
            color: "#fff",
          }}
        >
          <h1 style={{ fontSize: "34px", fontWeight: "bold", textAlign: "center", marginBottom: "30px" }}>
            Login
          </h1>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              style={{
                padding: "15px",
                border: "2px solid transparent",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                fontSize: "16px",
                transition: "border 0.3s ease-in-out",
              }}
              onFocus={(e) => (e.target.style.border = "2px solid #48bb78")}
              onBlur={(e) => (e.target.style.border = "2px solid transparent")}
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              style={{
                padding: "15px",
                border: "2px solid transparent",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                fontSize: "16px",
                transition: "border 0.3s ease-in-out",
              }}
              onFocus={(e) => (e.target.style.border = "2px solid #48bb78")}
              onBlur={(e) => (e.target.style.border = "2px solid transparent")}
            />
            <button
              style={{
                padding: "16px",
                border: "none",
                borderRadius: "10px",
                background: "linear-gradient(45deg, #38a169, #48bb78)",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div className="loader"></div>
                  <span style={{ marginLeft: "10px" }}>Loading...</span>
                </span>
              ) : (
                "Login"
              )}
            </button>
            {error && (
              <div
                style={{
                  backgroundColor: "#e53e3e",
                  color: "#fff",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <Link href={"/register"} style={{ color: "#81e6d9", textAlign: "center", marginTop: "20px", textDecoration: "underline" }}>
              Don't have an account? Register here
            </Link>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 4px solid #fff;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
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
