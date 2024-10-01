'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const tokenFromUrl = router.query.token;
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [router.query.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      // Handle successful password reset (e.g., redirect to login page)
      console.log('Password reset successfully');
      router.push('/login');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default ResetPassword;