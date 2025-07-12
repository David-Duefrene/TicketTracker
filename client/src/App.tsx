import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuth, getCurrentToken } from './context/AuthContext';

import CreateUser from './Components/Users/CreateUser';
import Login from './Components/Login';

import './App.css';
import axios from 'axios';
import CreateGroup from './Components/Groups/CreateGroup';

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
    const [selectedTab, setSelectedTab] = useState<'CreateUser' | 'CreateGroup'>('CreateUser');

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'CreateUser':
                return <CreateUser />;
            case 'CreateGroup':
                return <CreateGroup />;
            default:
                return null;
        }
    };

    const content = (
        <div>
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', marginBottom: 16 }}>
                <button
                    style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderBottom: selectedTab === 'CreateUser' ? '2px solid #007bff' : '2px solid transparent',
                        background: 'none',
                        cursor: 'pointer',
                        fontWeight: selectedTab === 'CreateUser' ? 'bold' : 'normal'
                    }}
                    onClick={() => setSelectedTab('CreateUser')}
                >
                    Create User
                </button>
                <button
                    style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderBottom: selectedTab === 'CreateGroup' ? '2px solid #007bff' : '2px solid transparent',
                        background: 'none',
                        cursor: 'pointer',
                        fontWeight: selectedTab === 'CreateGroup' ? 'bold' : 'normal'
                    }}
                    onClick={() => setSelectedTab('CreateGroup')}
                >
                    Create Group
                </button>
            </div>
            <div>
                {renderTabContent()}
            </div>
        </div>
    )

    return (
        <>
            <h1>TicketTracker</h1>
            <QueryClientProvider client={queryClient}>
                {token ? content : <Login />}
            </QueryClientProvider>
        </>
    );
}

export default App;
