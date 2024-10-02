'use client';

import React from 'react';
import NavBar from '@/components/Navbar/NavBar';

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            {/* NavBar */}
            <NavBar />

            {/* Add padding to prevent overlap */}
            <div className="container mx-auto px-6 py-12 pt-24">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-center text-blue-300 mb-6">Refund Policy</h1>

                {/* Policy Content */}
                <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
                    <p className="mb-4">
                        At <span className="text-blue-400">UrbanScript</span>, we are committed to providing a unique and innovative experience through our AI-generated interior designs. While AI is a powerful tool for creativity, we understand it may not always produce the results you expect. Therefore, we want to ensure you are fully aware of our policies before making any purchases.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4">Non-Refundable Nature</h2>
                    <p className="mb-4">
                        All payments made for our services are final and <span className="text-blue-400">non-refundable</span>. Due to the high operational costs involved in powering the advanced GPUs required for AI image generation, we cannot offer refunds once credits have been used. This helps us maintain a fair and sustainable service for all our valued users.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4">Service-Based Model</h2>
                    <p className="mb-4">
                        Our services rely on extensive computing infrastructure, which incurs significant costs that cannot be easily reversed once funds are received. Payments you make contribute to the ongoing maintenance and operation of our servers, ensuring uninterrupted service for all users.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4">Explore Before Purchase</h2>
                    <p className="mb-4">
                        We highly recommend exploring our community page before making any purchases. There, you can view daily generated designs from other users, which may help you understand the possibilities and limitations of AI-generated imagery. We believe in transparency and encourage you to make an informed decision before using our tool.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4">Alternative Solutions</h2>
                    <p className="mb-4">
                        If you are dissatisfied with your experience, we encourage you to contact our customer support team. While refunds are not available, we are happy to explore potential solutions or alternatives to improve your experience with <span className="text-blue-400">UrbanScript</span>.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4">No Exceptions</h2>
                    <p className="mb-4">
                        There are no exceptions to this refund policy, regardless of the circumstances. By purchasing and using credits, you agree to these terms.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4">Join Us in Creativity</h2>
                    <p>
                        Your support and understanding are greatly appreciated as we continue to enhance and refine our AI tools. We hope you will join us on this journey of creative exploration with <span className="text-blue-400">UrbanScript</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;
