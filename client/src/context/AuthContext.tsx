import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let currentToken: string | null = null;
export const setCurrentToken = (token: string | null) => currentToken = token;
export const getCurrentToken = () => currentToken;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    const login = (newToken: string) => {
        setToken(newToken);
        setCurrentToken(newToken);
    };

    const logout = () => {
        setToken(null);
        setCurrentToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};