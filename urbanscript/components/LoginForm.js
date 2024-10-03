'use client';

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
        setError(res.error);
        setLoading(false);
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="google-signin-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png"
            alt="Google Logo"
            className="google-logo"
          />
          <button
            type="button"
            onClick={() => signIn("google")}
            className="google-button"
          >
            Sign in with Google
          </button>
        </div>

        <div className="or-divider">or</div>

        {/* Login Form */}
        <h1 className="title">Login to Your Account</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="input"
            required
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="input"
            required
          />

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

          <button className="login-button" disabled={loading}>
            {loading ? (
              <span className="loading-container">
                <div className="loader"></div>
                <span>Loading...</span>
              </span>
            ) : (
              "Login"
            )}
          </button>

          {error && <div className="error-message">{error}</div>}

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
          padding: 20px; /* For small screens */
        }
        .login-card {
          padding: 40px;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          width: 100%;
          max-width: 400px; /* Limit card size for responsiveness */
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.6);
          color: #fff;
          animation: fadeIn 0.7s ease-in-out;
        }
        .title {
          text-align: center;
          font-size: 28px; /* Adjusted for responsiveness */
          font-weight: bold;
          margin-bottom: 20px; /* Adjusted spacing */
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 12px; /* Adjusted spacing for smaller screens */
        }
        .input {
          padding: 14px;
          border: 2px solid transparent;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          font-size: 14px; /* Adjusted for responsiveness */
          transition: border 0.3s ease-in-out;
          outline: none;
        }
        .input:focus {
          border-color: #48bb78;
        }
        .login-button {
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(45deg, #38a169, #48bb78);
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          font-size: 14px; /* Adjusted for responsiveness */
          transition: transform 0.3s ease;
        }
        .login-button:hover {
          transform: scale(1.05);
        }
        .login-button:disabled {
          background: #48bb78;
          cursor: not-allowed;
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
          font-size: 12px; /* Adjusted for smaller screens */
        }
        .forgot-password {
          color: #81e6d9;
          text-decoration: underline;
          font-size: 12px; /* Adjusted for smaller screens */
        }
        .error-message {
          background-color: #e53e3e;
          color: #fff;
          padding: 10px;
          border-radius: 8px;
          text-align: center;
          font-size: 14px; /* Adjusted for readability */
        }
        .register-link {
          color: #81e6d9;
          text-align: center;
          margin-top: 20px;
          text-decoration: underline;
          font-size: 14px; /* Adjusted for smaller screens */
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
        .google-button {
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: #4285F4;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          font-size: 14px;
          transition: transform 0.3s ease;
          margin-top: 10px;
        }
        .google-button:hover {
          transform: scale(1.05);
        }
        .google-signin-card {
          padding: 16px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%; /* Full width for smaller screens */
        }
        .google-logo {
          width: 35px;
          height: auto;
          margin-bottom: 10px;
        }
        .or-divider {
          color: #fff;
          font-size: 16px;
          margin: 16px 0;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
