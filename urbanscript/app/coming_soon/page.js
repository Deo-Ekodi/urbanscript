'use client';
export const fetchCache = 'force-no-store';

import { useEffect, useState } from 'react';

const ComingSoon = () => {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const countdownDate = new Date("2024-10-01T00:00:00").getTime();

    const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

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

  return (
    <div className="container">
      <h1 className="text-5xl font-bold mb-4">Coming Soon!</h1>
      <p className="mb-8">We're working hard to bring you something amazing. Stay tuned!</p>
      
      <div className="flex justify-center space-x-4 mb-8">
        <div>
          <div className="text-4xl">{String(countdown.days).padStart(2, '0')}</div>
          <div>Days</div>
        </div>
        <div>
          <div className="text-4xl">{String(countdown.hours).padStart(2, '0')}</div>
          <div>Hours</div>
        </div>
        <div>
          <div className="text-4xl">{String(countdown.minutes).padStart(2, '0')}</div>
          <div>Minutes</div>
        </div>
        <div>
          <div className="text-4xl">{String(countdown.seconds).padStart(2, '0')}</div>
          <div>Seconds</div>
        </div>
      </div>
      {/* below is an email option */}
      {/* <form onSubmit={handleEmailSubmit} className="mb-8">
        <input type="email" placeholder="Enter your email for updates" required className="p-2 rounded-md"/>
        <button type="submit" className="bg-pink-500 p-2 rounded-md ml-2 hover:bg-pink-600 transition">Notify Me</button>
      </form> */}
    </div>
  );
};

export default ComingSoon;
