import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginUser(props) {
    const { setIsLoggedIn, setIsSubscribed } = props;
    
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const message = params.get('message');

    const [formInputs, setFormInputs] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState(message);
    const navigate = useNavigate(); // Get the history object

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormInputs({ ...formInputs, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isValid = isFormValid(formInputs);

        if (isValid.status === 'success') {
            console.log('Sending request to server to check user...');
            fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                body: JSON.stringify(formInputs),
                headers: { 'Content-Type': 'application/json' }
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'error') {
                        setErrorMessage(data.message);
                    } else {
                        localStorage.setItem('token', data['access_token']);
                        localStorage.setItem('email', formInputs['email']);
                        console.log("User has logged in");
                        console.log(data);
                        setIsLoggedIn(true);
                        setIsSubscribed(Boolean(data.subscription));
                        navigate('/');
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
            <form id="sign-in-form" className="signin" onSubmit={handleSubmit}>
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
                <button type="submit">Sign in</button>
            </form>
            
        </div>
        </React.Fragment>);
}

function isFormValid(formInputs) {
    const re = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    if (!re.test(formInputs.email)) {
        return { status: 'error', message: 'Wrong input for email' };
    }
    if (formInputs.password.length < 10) {
        return { status: 'error', message: 'Password is too short' };
    }
    return { status: 'success' };
};

export default LoginUser;