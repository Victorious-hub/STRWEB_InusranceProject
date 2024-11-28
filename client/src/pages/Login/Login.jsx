import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/UI/Inputs/Input';
import Button from '../../components/UI/Button/Button';
import './../Styles.css'
import $api from '../../http/index';
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

async function auth(){
    const response =await fetch('http://localhost:8080/request',{method:'post'});
  
    const data = await response.json();
    console.log(data);
    navigate(data.url);
  
  }

const Login = () => {
    const { setToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await $api.post('/public/auth/login', { email, password });
            localStorage.setItem('token', response.data.accessToken);
            setToken(true);
            navigate('/catalog');
        } catch (error) {
            alert(`SERVER: ${error.response.data.error}`);
            console.error('Authorization error:', error);
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginForm">
                <h2>Authentication</h2>
                <br></br>

                <form>
                    <div className="form-group">
                        <h3>Email</h3>
                        <Input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <h3>Password</h3>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <GoogleAuth></GoogleAuth>

                    <Button onClick={handleLogin}>Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;