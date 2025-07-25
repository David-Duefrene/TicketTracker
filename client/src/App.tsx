import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuth, getCurrentToken } from './context/AuthContext';

import { Login } from './features/users/index';

import AdminBoard from './dashboards/AdminBoard';

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

    return (
        <>
            <h1>TicketTracker</h1>
            <QueryClientProvider client={queryClient}>
                {token ? <AdminBoard /> : <Login />}
            </QueryClientProvider>
        </>
    );
}

export default App;
