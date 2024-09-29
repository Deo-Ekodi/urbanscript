// app/components/ScrollToTop.js

'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = ({ children }) => {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [pathname]);

    return <>{children}</>;
};

export default ScrollToTop;
