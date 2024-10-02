// pages/success.js
'use client';
import { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// Styled components
const SuccessPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #f5f7fa, #c3cfe2);
  color: #4A4A4A;
  text-align: center;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin: 20px 0;
  animation: fadeIn 1s ease-in;
`;

const Subheading = styled.h2`
  font-size: 1.5rem;
  margin: 10px 0;
  animation: fadeIn 1.2s ease-in;
`;

const Balloon = styled.div`
  width: 100px;
  height: 140px;
  background-color: #ff6f61;
  border-radius: 50% 50% 0 0;
  position: relative;
  margin: 20px;
  animation: float 3s ease-in infinite;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 20px;
    height: 20px;
    background-color: #ff6f61;
    border-radius: 50%;
    transform: translateX(-50%);
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const SuccessMessage = styled.p`
  margin: 20px 0;
  font-size: 1.2rem;
  animation: fadeIn 1.5s ease-in;
`;

const DashboardLink = styled(Link)`
  background-color: #4A90E2;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ABD;
  }
`;

// Payment Success Component
const SuccessPage = () => {
  useEffect(() => {
    // You can add any side effects here, like analytics tracking
  }, []);

  return (
    <SuccessPageContainer>
      <Heading>Payment Successful!</Heading>
      <Subheading>Thank you for your purchase!</Subheading>
      <Balloon />
      <Balloon />
      <Balloon />
      <SuccessMessage>Your transaction was successful, and your credits have been updated.</SuccessMessage>
      <DashboardLink href="/dashboard">Go to Dashboard</DashboardLink>
    </SuccessPageContainer>
  );
};

export default SuccessPage;
