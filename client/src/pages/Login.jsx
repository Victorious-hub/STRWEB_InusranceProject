import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../components/UI/Inputs/Input';
import Button from '../components/UI/Button/Button';
import './Styles.css'

const Login = () => {
    const { setIsAuth } = useContext(AuthContext);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await $api.post('/auth/login', { login, password });
            const { token } = response.data;

            localStorage.setItem('token', token);
            console.log(token);
            setIsAuth(true);
            navigate('/');
        } catch (error) {
            alert(`SERVER: ${error.response.data.error}`);
            console.error('Authorization error:', error);
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginForm">
                <h2>Авторизация</h2>
                <br></br>

                <form>
                    <div className="form-group">
                        <h3>Логин</h3>
                        <Input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <h3>Пароль</h3>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleLogin}>Войти</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;