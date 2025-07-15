import React from 'react';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuth, getCurrentToken } from './context/AuthContext';

import Login from './Components/Login';

import CreateUser from './Components/Users/CreateUser';
import CreateGroup from './Components/Groups/CreateGroup';
import CreateTicketQueue from './Components/TicketQueue/CreateTicketQueue';

import TabbedComponent from './components/UI/tabbedComponent';

import './App.css';
import axios from 'axios';

const queryClient = new QueryClient();
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

function App() {
    const { token } = useAuth();

    const tabs = [
        ['Create User', <CreateUser key="create-user" />],
        ['Create Group', <CreateGroup key="create-group" />],
        ['Create Ticket Queue', <CreateTicketQueue key="create-ticket-queue" />]
    ];

    return (
        <>
            <h1>TicketTracker</h1>
            <QueryClientProvider client={queryClient}>
                {token ? <TabbedComponent tabs={tabs} /> : <Login />}
            </QueryClientProvider>
        </>
    );
}

export default App;
