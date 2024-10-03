"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [successMessage, setSuccessMessage] = useState(""); // Track success message

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    setLoading(true); // Start loading spinner
    setError("");

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
        setLoading(false); // Stop loading spinner
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
        setSuccessMessage("Check your inbox for the account verification email.");
        setTimeout(() => {
          router.push("/login");
        }, 3000); // Redirect after 3 seconds
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      setError("Error during registration.");
      // console.log("Error during registration: ", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="form-title">Register</h1>

        {successMessage && <div className="success-message">{successMessage}</div>} {/* Show success message */}

        <form onSubmit={handleSubmit} className="form-content">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="form-input"
            disabled={loading} // Disable input during loading
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="form-input"
            disabled={loading} // Disable input during loading
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="form-input"
            disabled={loading} // Disable input during loading
          />
          <button className="form-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Register"} {/* Show spinner if loading */}
          </button>
          {error && <div className="error-message">{error}</div>}
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
        .form-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .error-message {
          background-color: #e53e3e;
          color: #fff;
          padding: 8px 16px;
          border-radius: 8px;
          text-align: center;
          margin-top: 10px;
        }
        .success-message {
          background-color: #48bb78;
          color: #fff;
          padding: 8px 16px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 20px;
        }
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #fff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
