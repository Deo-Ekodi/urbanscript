"use client";

import { createContext, useContext } from "react";
import { SessionProvider, useSession } from "next-auth/react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const { data: session } = useSession();

    return (
        <SessionProvider>
            <AuthContext.Provider value={{ user: session?.user }}>
                {children}
            </AuthContext.Provider>
        </SessionProvider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
