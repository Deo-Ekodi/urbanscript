'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function PaystackPayment() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Ensure Paystack script is loaded on the client-side
        const script = document.createElement('script');
        script.src = "https://js.paystack.co/v1/inline.js";
        script.async = true;
        document.body.appendChild(script);

        // Clean up the script after component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = () => {
        if (typeof window.PaystackPop !== 'undefined') {
            setLoading(true);

            const handler = window.PaystackPop.setup({
                key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Replace with your public key
                email: email,
                amount: 100 * 50, // Amount in kobo (for NGN)
                currency: 'KES',
                callback: function (response) {
                    setLoading(false);
                    alert(`Payment complete! Reference: ${response.reference}`);
                },
                onClose: function () {
                    setLoading(false);
                    alert('Transaction was not completed.');
                }
            });

            handler.openIframe();
        } else {
            alert('Paystack is not yet loaded.');
        }
    };

    return (
        <div>
            <div>
                <h1>Buy Product Tokens</h1>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handlePayment} disabled={loading}>
                    {loading ? 'Processing...' : 'Pay with Paystack'}
                </button>
            </div>
        </div>
    );
}
