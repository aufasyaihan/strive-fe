"use client";

import { getCurrentUser } from "@/lib/auth";
import { User } from "@/types/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
    user: User | null;
    session: string | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setSession: (session: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
    initialUser?: User | null;
    initialSession?: string | null;
}

export function AuthProvider({ children, initialUser = null, initialSession = null }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(initialUser);
    const [session, setSession] = useState<string | null>(initialSession);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error('Error checking auth status:', error);
                setUser(null);
                setSession(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (!initialUser) {
            checkAuth();
        } else {
            setIsLoading(false);
        }
    }, [initialUser]);

    return (
        <AuthContext.Provider value={{ 
            user, 
            session, 
            isLoading,
            setUser,
            setSession
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}
