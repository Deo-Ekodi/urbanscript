// app/layout.js
'use client'; // This component uses React hooks

import { AuthProvider } from './providers/providers'; // Adjust this path based on your structure
import { SessionProvider } from "next-auth/react";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';
import ScrollToTop from '@/components/ScrollToTop'; // Verify this path

const Layout = ({ children }) => {
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 1000,
            easing: 'ease-out-cubic',
        });
    }, []);

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>UrbanScript | Molad e Konsult - Bespoke Web and Mobile Applications</title>
                <meta name="description" content="Bespoke Web and Mobile Applications" />
            </head>
            <body>
                <SessionProvider>
                    <AuthProvider>
                        <ScrollToTop>
                            {children}
                        </ScrollToTop>
                    </AuthProvider>
                </SessionProvider>
            </body>
        </html>
    );
};

export default Layout;
