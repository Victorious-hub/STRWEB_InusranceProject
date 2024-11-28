import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/UI/Inputs/Input';
import Button from '../../components/UI/Button/Button';
import $api from '../../http/index';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        birthdate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const { firstName, lastName, email, password, passwordConfirm, birthdate } = formData;

        // Check if all fields are filled
        if (!firstName || !lastName || !email || !password || !passwordConfirm || !birthdate) {
            alert('All fields must be filled.');
            return false;
        }

        // Check if passwords match
        if (password !== passwordConfirm) {
            alert('Passwords do not match.');
            return false;
        }

        // Check if user is at least 18 years old
        const today = new Date();
        const birthDate = new Date(birthdate);
        const age = today.getFullYear() - birthDate.getFullYear();
        const isBirthDateValid =
            age > 18 || (age === 18 && today >= new Date(birthDate.setFullYear(birthDate.getFullYear() + 18)));

        if (!isBirthDateValid) {
            alert('You must be at least 18 years old to register.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await $api.post('/public/clients/registration', formData);
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            alert(`SERVER: ${error.response.data.error}`);
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="register-page">
            <form onSubmit={handleSubmit} className="register-form">
                <h2 className="register-title">Register</h2>
                <Input
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    name="firstName"
                />
                <Input
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    name="lastName"
                />
                <Input
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    name="email"
                />
                <Input
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    name="password"
                />
                <Input
                    type="password"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    placeholder="Repeat Password"
                    name="passwordConfirm"
                />
                <Input
                    type="date"
                    value={formData.birthdate}
                    onChange={handleChange}
                    placeholder="Birthdate"
                    name="birthdate"
                />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default Register;
