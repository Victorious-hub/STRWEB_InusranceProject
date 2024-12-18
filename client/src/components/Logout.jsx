import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate} from 'react-router-dom';

const Logout = () => {
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(false);
        navigate('/', { replace: true }); 
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return null;
};

export default Logout;