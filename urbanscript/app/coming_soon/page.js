'use client';
export const fetchCache = 'force-no-store';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation'; // Correct import for Next.js App Router

// Styled Components
const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2c3e50, #bdc3c7);
  font-family: 'Poppins', sans-serif;
  color: #fff;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: -webkit-linear-gradient(#ff8a00, #ff4d00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glow 2s ease-in-out infinite alternate;

  @keyframes glow {
    0% {
      text-shadow: 0 0 10px #ff4d00, 0 0 20px #ff4d00, 0 0 30px #ff4d00, 0 0 40px #ff8a00;
    }
    100% {
      text-shadow: 0 0 20px #ff8a00, 0 0 30px #ff8a00, 0 0 40px #ff4d00, 0 0 50px #ff4d00;
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.8);
`;

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;

  div {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    text-align: center;
    min-width: 80px;
  }

  div span {
    font-size: 3rem;
    font-weight: 600;
    color: #ff4d00;
  }

  div small {
    display: block;
    font-size: 1rem;
    color: #fff;
    margin-top: 10px;
  }
`;

const NotifyButton = styled.button`
  padding: 12px 24px;
  background-color: #ff4d00;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 8px 20px rgba(255, 77, 0, 0.5);

  &:hover {
    background-color: #ff8a00;
  }
`;

const HomeButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: transparent;
  border: 2px solid #ff8a00;
  color: #ff8a00;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  &:hover {
    background-color: #ff8a00;
    color: #fff;
  }
`;

const ComingSoon = () => {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const router = useRouter(); // Using 'next/navigation' for router in App Router

  useEffect(() => {
    const countdownDate = new Date("2024-10-29T00:00:00").getTime();

    const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      });

      if (distance < 0) {
        clearInterval(x);
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    }, 1000);

    return () => clearInterval(x);
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing! You'll be notified when we launch.");
  };

  const handleGoHome = () => {
    router.push('/'); // Navigates to the home page
  };

  return (
    <PageContainer>
      <Title>Coming Soon!</Title>
      <Subtitle>We're working hard to bring you something amazing. Stay tuned!</Subtitle>

      <CountdownContainer>
        <div>
          <span>{countdown.days}</span>
          <small>Days</small>
        </div>
        <div>
          <span>{countdown.hours}</span>
          <small>Hours</small>
        </div>
        <div>
          <span>{countdown.minutes}</span>
          <small>Minutes</small>
        </div>
        <div>
          <span>{countdown.seconds}</span>
          <small>Seconds</small>
        </div>
      </CountdownContainer>

      <form onSubmit={handleEmailSubmit}>
        <NotifyButton>Notify Me</NotifyButton>
      </form>

      {/* New Home button */}
      <HomeButton onClick={handleGoHome}>
        Back to Home
      </HomeButton>
    </PageContainer>
  );
};

export default ComingSoon;
