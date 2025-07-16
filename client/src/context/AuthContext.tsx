import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
    token: JwtResponse | null;
    login: (token: JwtResponse) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface JwtResponse {
    result: string;
}

let currentToken: JwtResponse | null = null;
export const setCurrentToken = (token: JwtResponse | null) => currentToken = token;
export const getCurrentToken = () => currentToken?.result;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<JwtResponse | null>(null);

    const login = (newToken: JwtResponse) => {
        setToken(newToken);
        setCurrentToken(newToken);
        console.log(newToken)
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