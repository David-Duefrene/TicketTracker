import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';
import { usePostApiAuthLogout } from '../../../api/auth';

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const mutation = usePostApiAuthLogout({
        mutation: {
            onSuccess: () => {
                logout();
                navigate('/login');
            },
            onError: () => {
                logout();
                navigate('/login');
            }
        }
    });

    useEffect(() => {
        mutation.mutate();
        // eslint-disable-next-line
    }, []);

    return <div>Logging out...</div>;
};

export default Logout;
