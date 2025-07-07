import React from 'react';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuth } from './context/AuthContext';

import CreateUser from './Components/CreateUser';
import Login from './Components/Login';
import Logout from './Components/Logout';
import './App.css';
import axios from 'axios';

const queryClient = new QueryClient();
axios.defaults.baseURL = 'https://localhost:7246';

function App() {
    const { token } = useAuth();

    return (
        <>
            <h1>TicketTracker - Create User</h1>
            <QueryClientProvider client={queryClient}>
                {token ? <CreateUser /> : <Login />}
                <Logout />
            </QueryClientProvider>
        </>
    );
}

export default App;
