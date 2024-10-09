'use client';

import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar/NavBar";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            <NavBar />
            <div className="container mx-auto px-6 py-12 pt-24">
                <h1 className="text-4xl font-bold text-center text-blue-300 mb-6">Privacy Policy</h1>
                <h3 className="text-2xl font-semibold mb-4">Effective Date: 1st October 2024.</h3>
                <p className="mb-4">
                    UrbanScript, LLC values your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our AI-generated interior design tool and related services such as prompt generation and account management.
                </p>
                <p className="mb-4">
                    Please read this Privacy Policy carefully. By accessing or using the Services, you agree to the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use the Services.
                </p>

                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                    UrbanScript collects information to provide better services to our users. The types of information we collect depend on how you use our Services and include:
                </p>
                <h3 className="text-xl font-semibold mb-4">1.1. Personal Data</h3>
                <p className="mb-4">
                    When you sign up for UrbanScript, create an account, or use our Services, we may collect the following information:
                </p>
                <ul className="mb-4 ml-4 list-disc">
                    <li><strong>Contact Information</strong>: Name, email address and phone number.</li>
                    <li><strong>Account Information</strong>: Username, password, profile photo, and other details related to your account.</li>
                    <li><strong>Payment Information</strong>: Billing details, payment methods, transaction records (for purchasing credits), and related financial information.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">1.2. Automatically Collected Information</h3>
                <p className="mb-4">
                    We collect information about your interaction with our Services automatically, including:
                </p>
                <ul className="mb-4 ml-4 list-disc">
                    <li><strong>Device Information</strong>: Details such as IP address, browser type, operating system, and mobile device identifiers.</li>
                    <li><strong>Usage Data</strong>: Information about how you use our platform, such as access times, pages viewed, and interactions with our Services.</li>
                    <li><strong>Cookies and Tracking Technologies</strong>: We use cookies, web beacons, and similar tracking technologies to collect information about your online activities. This helps us improve your experience and track user behavior.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">1.3. User-Generated Content</h3>
                <p className="mb-4">
                    When you use our AI-generated design tool, we may collect information related to your input data (design preferences, room types, style choices) and the designs created.
                </p>

                <h3 className="text-xl font-semibold mb-4">1.4. Third-Party Information</h3>
                <p className="mb-4">
                    We may receive information from third-party services, such as social media platforms, when you connect your UrbanScript account with those services. This includes:
                </p>
                <ul className="mb-4 ml-4 list-disc">
                    <li><strong>Social Media Data</strong>: Public profile information (name, profile picture, etc.) when you sign in or register using Google.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">1.5. Sensitive Information</h3>
                <p className="mb-4">
                    UrbanScript does not intentionally collect sensitive personal data such as race, ethnicity, religious beliefs, sexual orientation, or health-related information unless explicitly provided by the user. However, users are discouraged from submitting such information unless necessary.
                </p>

                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">
                    We use the information we collect to operate, maintain, and improve our Services. The primary purposes for using your information include:
                </p>
                <h3 className="text-xl font-semibold mb-4">2.1. Account Management</h3>
                <ul className="mb-4 ml-4 list-disc">
                    <li>To create and manage your account.</li>
                    <li>To communicate with you regarding account verification, login, and account-related activities.</li>
                    <li>We will soon provide access to your saved designs, custom settings, and preferences.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">2.2. Providing Our Services</h3>
                <ul className="mb-4 ml-4 list-disc">
                    <li>To generate personalized interior design images based on your preferences.</li>
                    <li>We will soon store your AI-generated designs securely.</li>
                    <li>To offer design consultation and other related services based on your input.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">2.3. Payment Processing - brought down</h3>
                <ul className="mb-4 ml-4 list-disc">
                    <li>To process payments for credits purchased.</li>
                    <li>To manage billing, refunds, and subscriptions.</li>
                    <li>To ensure secure transactions and prevent fraud.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">2.4. Improving the Platform</h3>
                <ul className="mb-4 ml-4 list-disc">
                    <li>To analyze usage trends and user behavior to improve the design and functionality of our Services.</li>
                    <li>To conduct research and analytics to understand user needs and preferences better.</li>
                    <li>To personalize content and recommend designs or features that may interest you.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">2.5. Marketing and Communication</h3>
                <ul className="mb-4 ml-4 list-disc">
                    <li>To send promotional materials, newsletters, and product updates. You can opt out of these communications at any time.</li>
                    <li>To display relevant advertisements, offers, or recommendations based on your usage patterns.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">2.6. Legal and Security Reasons</h3>
                <ul className="mb-4 ml-4 list-disc">
                    <li>To detect, prevent, and address security threats, fraud, or other illegal activities.</li>
                    <li>To comply with legal obligations, such as responding to law enforcement requests or government authorities.</li>
                    <li>To enforce our terms of service and policies.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">3. Cookies and Tracking Technologies</h2>
                <p className="mb-4">
                    UrbanScript uses cookies and other tracking technologies to enhance user experience and improve our Services.
                </p>
                <h3 className="text-xl font-semibold mb-4">3.1. Types of Cookies</h3>
                <ul className="mb-4 ml-4 list-disc">
                    <li><strong>Session Cookies</strong>: Temporary cookies that expire when you close your browser.</li>
                    <li><strong>Persistent Cookies</strong>: Cookies that remain on your device for a set period or until you delete them.</li>
                    <li><strong>Third-Party Cookies</strong>: Cookies placed by third-party services such as Google Analytics to help us analyze website traffic and user behavior.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">3.2. Why We Use Cookies</h3>
                <ul className="mb-4 ml-4 list-disc">
                    <li>To remember your login details and keep your session active.</li>
                    <li>To track and measure the effectiveness of marketing campaigns.</li>
                    <li>To provide personalized content and recommendations based on your preferences.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">3.3. Managing Cookies</h3>
                <p className="mb-4">
                    You can manage your cookie settings through your browser settings. You may disable cookies, but this may limit your ability to use certain features of our Services.
                </p>

                <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
                <p className="mb-4">
                    UrbanScript does not sell or rent your personal data to third parties. However, we may share your information in the following situations:
                </p>
                <h3 className="text-xl font-semibold mb-4">4.1. Service Providers</h3>
                <p className="mb-4">
                    We may share your information with third-party service providers to help us operate our Services, such as payment processors, cloud storage, and analytics providers. These third parties are obligated to protect your information and may not use it for any other purpose.
                </p>

                <h3 className="text-xl font-semibold mb-4">4.2. Legal Compliance</h3>
                <p className="mb-4">
                    We may disclose your information if required to do so by law or in response to valid requests by public authorities, including courts and government agencies.
                </p>

                <h3 className="text-xl font-semibold mb-4">4.3. Business Transfers</h3>
                <p className="mb-4">
                    In the event of a merger, acquisition, or asset sale, your information may be transferred to the acquiring party. We will notify you before your personal data is transferred and becomes subject to a different privacy policy.
                </p>

                <h3 className="text-xl font-semibold mb-4">4.4. With Your Consent</h3>
                <p className="mb-4">
                    We may share your information for any other purpose with your consent.
                </p>

                <h2 className="text-2xl font-semibold mb-4">5. Security of Your Information</h2>
                <p className="mb-4">
                    UrbanScript takes the security of your personal data seriously. We implement reasonable security measures to protect your information from unauthorized access, use, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.
                </p>

                <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                <p className="mb-4">
                    Depending on your location, you may have certain rights regarding your personal data, including:
                </p>
                <ul className="mb-4 ml-4 list-disc">
                    <li>The right to access your personal data.</li>
                    <li>The right to rectify inaccurate or incomplete data.</li>
                    <li>The right to request the deletion of your personal data.</li>
                    <li>The right to restrict or object to the processing of your personal data.</li>
                    <li>The right to data portability.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
                <p className="mb-4">
                    UrbanScript may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date at the top. You are advised to review this Privacy Policy periodically for any changes. Your continued use of our Services after the posting of changes constitutes your acceptance of such changes.
                </p>

                <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions or concerns about this Privacy Policy or our practices regarding your personal data, please contact us at:
                </p>
                <p className="mb-4">
                    Email: <a href="mailto:urbanscript.ai@gmail.com" className="text-blue-300">urbanscript.ai@gmail.com</a>
                </p>

            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
