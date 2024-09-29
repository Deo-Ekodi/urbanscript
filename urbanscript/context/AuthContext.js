// context/AuthContext.js

import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

// Create the context
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap around the children
export const AuthProvider = ({ children }) => {
    const { data: session, status } = useSession();
    
    return (
        <AuthContext.Provider value={{ session, status }}>
            {children}
        </AuthContext.Provider>
    );
};
