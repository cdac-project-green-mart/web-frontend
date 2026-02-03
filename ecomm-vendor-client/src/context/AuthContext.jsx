import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, register as apiRegister, validateToken } from '../api/auth.js';

const AuthContext = createContext(null);

const STORAGE_KEYS = { token: 'token', userId: 'userId', userRole: 'userRole', userName: 'userName' };

function persistUser(token, user) {
    if (!token || !user) return;
    localStorage.setItem(STORAGE_KEYS.token, token);
    localStorage.setItem(STORAGE_KEYS.userId, user.id || '');
    localStorage.setItem(STORAGE_KEYS.userRole, user.role || '');
    localStorage.setItem(STORAGE_KEYS.userName, user.name || '');
}

function clearUser() {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
}

const VENDOR_ROLES = ['VENDOR', 'ADMIN'];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadSession = useCallback(async () => {
        const data = await validateToken();
        if (data && VENDOR_ROLES.includes(data.role)) {
            setUser({ id: data.id, email: data.email, name: data.name, role: data.role });
        } else {
            setUser(null);
            clearUser();
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadSession();
    }, [loadSession]);

    const login = useCallback(async (email, password) => {
        const { token, user: u } = await apiLogin({ email, password });
        if (!VENDOR_ROLES.includes(u.role)) {
            throw new Error('Access denied. Use the buyer portal or sign in with a vendor account.');
        }
        persistUser(token, u);
        setUser({ id: u.id, email: u.email, name: u.name, role: u.role });
        return u;
    }, []);

    const register = useCallback(async (name, email, password) => {
        await apiRegister({ name, email, password, role: 'VENDOR' });
        return apiLogin({ email, password }).then(({ token, user: u }) => {
            persistUser(token, u);
            setUser({ id: u.id, email: u.email, name: u.name, role: u.role });
            return u;
        });
    }, []);

    const logout = useCallback(() => {
        clearUser();
        setUser(null);
        window.location.href = '/login';
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token: typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.token) : null,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
                refreshSession: loadSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
