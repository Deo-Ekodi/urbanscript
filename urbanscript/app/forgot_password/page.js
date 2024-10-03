'use client';
import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    setMessage(''); // Clear previous success messages
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch('/api/auth/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send password reset email');
      }

      // Handle successful response (e.g., show a success message)
      setMessage('Password reset email sent successfully! Please check your inbox (and your spam folder).');
      setEmail(''); // Clear email field after success
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <div className="bg-cosmic-doodle min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-white text-3xl mb-6">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="text-white">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <span className="loading-container">
              <div className="loader"></div>
              <span>Sending...</span>
            </span>
          ) : (
            "Send Password Reset Email"
          )}
        </button>

        {/* Display messages inside the form card */}
        {message && <p className="text-green-400 mt-4">{message}</p>}
        {errorMessage && <p className="text-red-400 mt-4">{errorMessage}</p>}
      </form>
      
      <style jsx>{`
        .bg-cosmic-doodle {
          background-image: url('data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
              <rect width="100%" height="100%" fill="#000" />
              <circle cx="100" cy="50" r="2" fill="white" />
              <circle cx="200" cy="150" r="1.5" fill="yellow" />
              <circle cx="300" cy="100" r="3" fill="lightblue" />
              <circle cx="400" cy="300" r="1.8" fill="pink" />
              <circle cx="500" cy="200" r="2.5" fill="orange" />
              <circle cx="600" cy="400" r="1.2" fill="cyan" />
              <circle cx="700" cy="350" r="3" fill="white" />
              <circle cx="150" cy="400" r="2.5" fill="lightgreen" />
              <circle cx="250" cy="50" r="1.8" fill="violet" />
              <circle cx="350" cy="250" r="2" fill="lightcoral" />
              <circle cx="450" cy="150" r="2.5" fill="gold" />
              <circle cx="550" cy="450" r="1.5" fill="lime" />
              <circle cx="650" cy="300" r="3" fill="deepskyblue" />
              <circle cx="750" cy="200" r="2" fill="magenta" />
              <path d="M150 400 C150 380, 180 380, 180 400 C180 420, 150 420, 150 400 Z" fill="rgba(255, 255, 255, 0.2)" />
              <path d="M300 500 Q320 480, 340 500 T360 500" fill="none" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2" />
              <path d="M450 100 Q470 80, 490 100 T510 100" fill="none" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2" />
              <text x="50%" y="50%" text-anchor="middle" fill="rgba(255, 255, 255, 0.1)" font-size="80" font-family="Arial">✨</text>
            </svg>
          `)}');
          background-size: cover;
          background-repeat: no-repeat;
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
          margin-right: 8px; /* Space between loader and text */
        }
      `}</style>
    </div>
  );
}

export default ForgotPassword;
