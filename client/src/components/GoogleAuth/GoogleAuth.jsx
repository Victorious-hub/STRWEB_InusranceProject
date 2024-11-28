import React, { useContext, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import $api from '../../http/index';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
    const clientId = "454685750002-g0i4h7p2muuf0s3pp4k3l1aja3kb2893.apps.googleusercontent.com";
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;

            const response = await $api.post('/google-auth', {
                token: credential,
            });

            const { token } = response.data;
            localStorage.setItem('token', token);
            setToken(true);
            navigate('/catalog');
            console.log('Token stored successfully:', token);
        } catch (error) {
            console.error('Error authenticating with Google:', error);
        }
    };
    

    const handleGoogleLoginError = () => {
        console.log('Login Failed');
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
