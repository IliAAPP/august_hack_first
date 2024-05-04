import React, { createContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { Alert } from 'react-native';
import { auth, db, login, logout, register} from '../utils/firebase'
import { addDoc, collection } from '@firebase/firestore';

interface IContext {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<IContext>({} as IContext);

// Добавлены типы для пропсов, включая children
interface AuthProviderProps {
    children: ReactNode;
    user: User | null
    isLoading: boolean
    register: (email: string, password: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const registerHandler = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const { user } = await register(email, password);

            await addDoc(collection(db, 'users'), {
                _id: user.uid, 
                displayName: 'No name',
            });
        } catch (error: any) {
            // Изменено error на error.message
            Alert.alert('Error reg', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const loginHandler = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            await login(email, password);
        } catch (error: any) {
            // Изменено error на error.message
            Alert.alert('Error login', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Удалены ненужные параметры
    const logoutHandler = async () => {
        setIsLoading(true);
        try {
            await logout();
        } catch (error: any) {
            // Изменено error на error.message
            Alert.alert('Error logout', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // Изменено false на null
            setUser(user || null);
            setIsLoadingInitial(false);
        });
        // Добавлено возвращение функции отписки
        return unsubscribe;
    }, []);

    const value = useMemo(() => ({
        user,
        isLoading,
        login: loginHandler,
        logout: logoutHandler,
        register: registerHandler,
    }), [user, isLoading]);

    return (
        <AuthContext.Provider value={value}>
            {!isLoadingInitial && children}
        </AuthContext.Provider>
    );
};

