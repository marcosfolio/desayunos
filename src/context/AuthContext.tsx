import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { User } from '../services/userService';

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            setUser(firebaseUser ? {
                id: firebaseUser.uid,
                email: firebaseUser.email!,
                name: firebaseUser.displayName,
                photoUrl: firebaseUser.photoURL
            } : null);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 