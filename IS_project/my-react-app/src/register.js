import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logged } from './index';

function RegisterUser() {
    const [formInputs, setFormInputs] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate(); // Get the history object
    
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormInputs({ ...formInputs, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isValid = isFormValid(formInputs);

        if (isValid.status === 'success') {
            console.log('Sending request to server to create new user...');
            fetch('http://127.0.0.1:8000/api/create_new_user', {
                method: 'POST',
                body: JSON.stringify(formInputs),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'success') {
                        localStorage.setItem('token', data['access_token']);
                        localStorage.setItem('email', formInputs['email']);
                        navigate('/');
                        setErrorMessage('');
                        console.log('User is created', data['email'])
                        logged(true)
                    } else {
                        console.log(data.message)
                        setErrorMessage(data.message);
                    }
                });
        } else {
            setErrorMessage(isValid.message);
        }
    };

    return (
        <React.Fragment>
        <div>
        {errorMessage && <div id="error-message-signup">{errorMessage}</div>}
            <form id="sign-up-form" className="signin" onSubmit={handleSubmit}>
                <div className="element">
                    <label htmlFor="user_name">Name</label>
                    <input
                        className="input myInput"
                        id="user_name"
                        name="username"
                        type="text"
                        value={formInputs.username}
                        onChange={handleChange}
                        maxLength="50"
                        alt="put your name here"
                    />
                </div>
                <div className="element">
                    <label htmlFor="user_email">Email</label>
                    <input
                        className="input myInput"
                        id="user_email"
                        name="email"
                        type="email"
                        value={formInputs.email}
                        onChange={handleChange}
                        alt="put your email here"
                    />
                </div>
                <div className="element">
                    <label htmlFor="user_password">Password</label>
                    <input
                        className="input myInput"
                        id="user_password"
                        name="password"
                        type="password"
                        value={formInputs.password}
                        onChange={handleChange}
                        maxLength="50"
                        minLength="10"
                        alt="put your password here"
                    />
                    <div className="status" aria-hidden="true">
                        {formInputs.password.length < 10 && 'At least 10 characters'}
                    </div>
                </div>
                <button type="submit">Sign me up!</button>
            </form>
            {errorMessage && <div id="error-message-signup">{errorMessage}</div>}
        </div>
        </React.Fragment>);
}

function isFormValid(formInputs) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!re.test(formInputs.email)) {
        return { status: 'error', message: 'Wrong input for email' };
    }

    if (formInputs.password.length < 10) {
        return { status: 'error', message: 'Password is too short' };
    }

    return { status: 'success' };
}

export default RegisterUser;
