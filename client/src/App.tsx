import React from 'react';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuth } from './context/AuthContext';

import CreateUser from './Pages/CreateUser';
import Login from './Pages/Login';
import './App.css';

const queryClient = new QueryClient();

function App() {
    const { token, logout } = useAuth();

    return (
        <>
            <h1>TicketTracker - Create User</h1>
            <QueryClientProvider client={queryClient}>
                    {token ? <CreateUser /> : <Login />}
            </QueryClientProvider>
        </>
    );
}

export default App;
