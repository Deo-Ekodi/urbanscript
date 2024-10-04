'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    setMessage(''); // Clear previous messages

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Password reset successful. Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setErrorMessage(data.message || 'Password reset failed.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setErrorMessage('An error occurred while resetting the password.');
    }
  };

  return (
    <div className="bg-cosmic-doodle min-h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-white text-2xl mb-6 text-center">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="text-white">New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmNewPassword" className="text-white">Confirm New Password</label>
            <input
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Reset Password</button>

          {/* Display messages inside the form card */}
          {message && <p className="text-green-400 mt-4 text-center">{message}</p>}
          {errorMessage && <p className="text-red-400 mt-4 text-center">{errorMessage}</p>}
        </form>
      </div>

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
      `}</style>
    </div>
  );
}

export default ResetPassword;
