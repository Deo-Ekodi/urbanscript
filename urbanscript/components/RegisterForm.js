"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [accountExists, setAccountExists] = useState(false);

  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn("google", { redirect: false });
      if (result.error) {
        setError(result.error);
      } else {
        setIsRedirecting(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 5000);
      }
    } catch (error) {
      setError("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    setLoading(true);
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
        setLoading(false);
        setAccountExists(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 5000);
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
        }, 3000);
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      setError("Error during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <div className="google-signin-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png"
            alt="Google Logo"
            className="google-logo"
          />
          <button onClick={handleGoogleSignIn} className="google-signin-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Sign in with Google"}
          </button>
        </div>

        <div className="or-divider">or</div>

        {isRedirecting && <div className="redirecting-animation">Redirecting to your dashboard...</div>}
        {accountExists && <div className="account-exists-animation">Account exists. Redirecting...</div>}

        {!isRedirecting && !accountExists && (
          <>
            <h1 className="form-title">Register</h1>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit} className="form-content">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name"
                className="form-input"
                disabled={loading}
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                className="form-input"
                disabled={loading}
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="form-input"
                disabled={loading}
              />
              <button className="form-button" disabled={loading}>
                {loading ? <div className="spinner"></div> : "Register"}
              </button>
              {error && <div className="error-message">{error}</div>}

              <Link href={"/login"} className="login-link">
                You have an active account? Login here
              </Link>
            </form>
          </>
        )}
      </div>

      <style jsx>{`
        .form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to bottom right, #0f2027, #203a43, #2c5364);
          padding: 20px;
        }
        .form-box {
          max-width: 450px;
          width: 100%;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .google-signin-card {
          width: 100%;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .google-logo {
          width: 40px;
          height: auto;
          margin-bottom: 10px;
        }
        .google-signin-button {
          width: 100%;
          padding: 12px;
          background: #4285f4;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .google-signin-button:hover {
          background: #357ae8;
        }
        .or-divider {
          color: #fff;
          font-size: 18px;
          margin: 20px 0;
          text-align: center;
        }
        .form-title {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          text-align: center;
        }
        .form-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-input {
          width: 100%;
          padding: 12px;
          border: 2px solid transparent;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          transition: border 0.3s ease-in-out;
        }
        .form-input:focus {
          border: 2px solid #38b2ac;
        }
        .form-button {
          width: 100%;
          padding: 14px;
          background: linear-gradient(45deg, #38a169, #48bb78);
          border: none;
          border-radius: 8px;
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
        }
        .success-message {
          background-color: #48bb78;
          color: #fff;
          padding: 8px 16px;
          border-radius: 8px;
          text-align: center;
        }
        .spinner {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #3498db;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        .login-link {
          color: #81e6d9;
          text-align: center;
          margin-top: 20px;
          text-decoration: underline;
          font-size: 14px; /* Adjusted for smaller screens */
        }

        @media (max-width: 768px) {
          .form-box {
            width: 100%;
            padding: 20px;
          }
          .form-input,
          .form-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
