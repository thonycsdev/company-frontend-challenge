'use client';
import { axios_configuration } from '@/configurations/axiosConfiguration';
import { AuthTypeSignIn } from '@/types/auth.types';
import { User } from '@/types/user.types';
import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';

const LOCAL_STORAGE_ITEM = 'currentUser';

type AuthContextType = {
    getUser: () => User | undefined;
    authenticate: (payload: AuthTypeSignIn) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('Context not initialized');
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    const getUser = () => {
        if (user) return user;
        try {
            const userFromLocalStorage = getUserFromLocalStorage();
            return userFromLocalStorage;
        } catch {
            console.error('User not signed');
        }
    };

    const authenticate = async (payload: AuthTypeSignIn) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_URL}/auth/authenticate`,
                payload
            );
            setUser(response.data);
            axios_configuration.addBearerToken(response.data.jwtToken);
            localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(response.data));
        } catch (error) {
            console.error('Erro ao autenticar:', error);
        }
    };

    const logout = () => {
        setUser(undefined);
        localStorage.removeItem(LOCAL_STORAGE_ITEM);
    };

    return (
        <AuthContext.Provider value={{ getUser, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

function getUserFromLocalStorage(): User | undefined {
    const str: string | null = localStorage.getItem(LOCAL_STORAGE_ITEM);
    if (!str) throw new Error('Logged User not found');
    const user: User | undefined = JSON.parse(str);
    return user;
}
