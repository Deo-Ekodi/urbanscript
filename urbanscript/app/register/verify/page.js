"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyAccount() {
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState("Verifying your account..."); // Initial state
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyAccount = async () => {
      const token = new URLSearchParams(window.location.search).get("token");

      const res = await fetch(`/api/register/verify?token=${token}`);
      const data = await res.json();

      if (data.success) {
        setVerificationStatus("Your account has been successfully verified!");
        setVerified(true);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setVerificationStatus("Verification failed. Please try again.");
        setVerified(false);
      }
    };

    verifyAccount();
  }, [router]);

  return (
    <div className="verify-container">
      <div className="verify-content">
        {verified ? <div className="success-icon">✓</div> : <div className="loader"></div>}
        <h1 className="verify-text">{verificationStatus}</h1>
        {verified ? (
          <p className="sub-text">
            Redirecting you to the login page shortly...
          </p>
        ) : (
          <p className="sub-text">Hang tight, we're making sure everything checks out!</p>
        )}
      </div>
      <style jsx>{`
        .verify-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .verify-content {
          text-align: center;
          color: #fff;
          padding: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          animation: fadeIn 1.5s ease-in-out;
        }

        .loader {
          border: 6px solid rgba(255, 255, 255, 0.3);
          border-top: 6px solid #fff;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        .success-icon {
          font-size: 60px;
          color: #48bb78;
          margin-bottom: 20px;
          animation: bounce 1s ease-in-out;
        }

        .verify-text {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          animation: pulse 2s infinite;
        }

        .sub-text {
          font-size: 16px;
          color: #d1d5db;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-30px); }
          60% { transform: translateY(-15px); }
        }

        @keyframes pulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
