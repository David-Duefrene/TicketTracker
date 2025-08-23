import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuth, getCurrentToken } from './context/AuthContext';

import { Login } from './features/users/index';

import AdminBoard from './dashboards/AdminBoard';

import './App.css';
import axios from 'axios';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    },
} as any);
axios.defaults.baseURL = 'https://localhost:7246';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
    config => {
        const token = getCurrentToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);




// Basic ErrorBoundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: any, errorInfo: any) {
        // You can log error info here
        console.error(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return <div style={{ color: 'red' }}>Something went wrong.</div>;
        }
        return this.props.children;
    }
}

function App() {
    const { token } = useAuth();

    return (
        <>
            <h1>TicketTracker</h1>
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading...</div>}>
                        {token ? <AdminBoard /> : <Login />}
                    </Suspense>
                </ErrorBoundary>
            </QueryClientProvider>
        </>
    );
}

export default App;
