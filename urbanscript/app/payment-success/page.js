'use client'; // Ensure client-side rendering

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/navigation'; // Use the App Router's navigation

// Keyframes for floating animation
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

// Styled components for the page
const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0f7fa, #ffffff);
  font-family: Arial, sans-serif;
  padding: 40px;
  position: relative; /* To position doodles */
  overflow: hidden;
`;

const Emoji = styled.div`
  font-size: 5rem;
  animation: ${float} 2s ease-in-out infinite;
  margin-bottom: 20px;
`;

const SuccessMessage = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #00796b;
`;

const Details = styled.p`
  font-size: 1.2em;
  color: #555;
  margin-bottom: 10px;
`;

const RedirectMessage = styled.p`
  font-size: 1.2em;
  color: #00796b;
  margin-top: 20px;
`;

// SVG Doodles
const DoodleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Ensure doodles don't interfere with user interaction */
  z-index: -1; /* Place doodles behind the content */
`;

const DoodleSVG = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`;

// Main Component
const PaymentSuccess = () => {
  const router = useRouter();
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    // Show redirect message after 2 seconds
    const timer1 = setTimeout(() => {
      setShowRedirectMessage(true);
    }, 2000);

    // Redirect to dashboard after 5 seconds
    const timer2 = setTimeout(() => {
      router.push('/dashboard'); // Adjust this route based on your dashboard route
    }, 5000);

    // Cleanup timers on unmount
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [router]);

  return (
    <SuccessContainer>
      {/* Floating Emoji */}
      <Emoji>👍</Emoji>
      <SuccessMessage>Payment Successful!</SuccessMessage>
      <Details>Your credits have been added to your account.</Details>
      <Details>You're all set to start generating stunning designs.</Details>

      {showRedirectMessage && (
        <RedirectMessage>
          Taking you to your dashboard now...
        </RedirectMessage>
      )}

      {/* Simple SVG Doodles */}
      <DoodleContainer>
        <DoodleSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <rect width="100%" height="100%" fill="none" />
          {/* Simplified doodles */}
          <circle cx="100" cy="150" r="10" fill="rgba(255, 200, 0, 0.7)" />
          <circle cx="300" cy="100" r="15" fill="rgba(100, 149, 237, 0.5)" />
          <circle cx="500" cy="300" r="20" fill="rgba(50, 205, 50, 0.6)" />
          <circle cx="700" cy="450" r="10" fill="rgba(238, 130, 238, 0.7)" />
          <circle cx="200" cy="450" r="8" fill="rgba(255, 165, 0, 0.6)" />
          <path d="M50 100 Q150 50, 250 100 T450 100" fill="none" stroke="rgba(0, 0, 255, 0.2)" strokeWidth="5" />
          <path d="M350 400 C350 370, 400 370, 400 400 C400 430, 350 430, 350 400 Z" fill="rgba(255, 69, 0, 0.1)" />
        </DoodleSVG>
      </DoodleContainer>
    </SuccessContainer>
  );
};

export default PaymentSuccess;
