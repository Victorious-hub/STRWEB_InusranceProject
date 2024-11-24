import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/UI/Inputs/Input';
import Button from '../components/UI/Button/Button';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
    });


    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await $api.post('/auth/register', formData);
            alert('Успешная регистрация!')
            navigate('/login');
        } catch (error) {
            alert(`SERVER: ${error.response.data.message}`);
            console.error('Registration error:', error);
        }
    };

    return (
        <div class="loginContainer">
            <div class="loginForm">
                <h2>Регистрация</h2>
                <br></br>

                <form>
                    <div class="form-group">
                        <h3>Логин</h3>
                        <Input
                            type="text"
                            value={formData.login}
                            onChange={(e) => setFormData({...formData, login: e.target.value})}
                        />
                    </div>

                    <div class="form-group">
                        <h3>Почта</h3>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div class="form-group">
                        <h3>Пароль</h3>
                        <Input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <Button onClick={handleRegister}>Зарегистрироваться</Button>
                </form>
            </div>
        </div>
    );
};

export default Register;