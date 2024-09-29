// // app/layout.js
// import localFont from "next/font/local";
// import Link from "next/link";
// import "./globals.css";
// import Header from "../components/Header";  // Import the Header
// import Footer from "../components/Footer";  // Import the Footer
// import { AuthProvider } from "./providers";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata = {
//   title: "Urbanscript LLC",
//   description: "Your design Assistant",
// };

// export const fetchCache = 'force-no-store';

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
//       >
//         <Header /> {/* Header added here */}
//         <AuthProvider>
//           <main className="flex-grow">{children}</main> {/* Ensures content grows */}
//         </AuthProvider>
//         <Footer /> {/* Footer added here */}
//       </body>
//     </html>
//   );
// }


// app/layout.js

'use client'; // This component uses React hooks

export const fetchCache = 'force-no-store';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';
import ScrollToTop from '@/components/ScrollToTop'; // Check this path
import { AuthProvider } from "./providers";

const Layout = ({ children }) => {
    useEffect(() => {
        const aos_init = () => {
            AOS.init({
                once: true,
                duration: 1000,
                easing: 'ease-out-cubic',
            });
        };

        window.addEventListener('load', aos_init);

        return () => {
            window.removeEventListener('load', aos_init);
        };
    }, []);

    return (
        <>
            <html lang="en">
                <head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>MLD | Molad e Konsult - Bespoke Web and Mobile Applications</title>
                    <meta name="description" content="Bespoke Web and Mobile Applications" />
                    {/* Add any other meta tags or links here */}
                </head>
                <body>
                    <AuthProvider>
                        <ScrollToTop>
                            {children}
                        </ScrollToTop>
                    </AuthProvider>
                </body>
            </html>
        </>
    );
};

export default Layout;
