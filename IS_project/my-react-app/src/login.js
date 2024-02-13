import React, { useState } from 'react';

function LoginUser() {
    const [formInputs, setFormInputs] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormInputs({ ...formInputs, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isValid = isFormValid(formInputs);

        if (isValid.status === 'success') {
            console.log('Sending request to server to check user...');
            fetch('/api', {
                method: 'POST',
                body: JSON.stringify(formInputs),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'error') {
                        setErrorMessage(data.message);
                    } else {
                        // Handle successful user creation
                    }
                });
        } else {
            setErrorMessage(isValid.message);
        }
    };

    return (
        <React.Fragment>
        <div>
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
                        // minLength="10"
                        alt="put your password here"
                    />
                    <div className="status" aria-hidden="true">
                        {formInputs.password.length < 10 && 'At least 10 characters'}
                    </div>
                </div>
                <button type="submit">Sign in</button>
            </form>
            {errorMessage && <div id="error-message-signup">{errorMessage}</div>}
        </div>
        </React.Fragment>);
}

function isFormValid(formInputs) {
    const re = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    if (!re.test(formInputs.email)) {
        return { status: 'error', message: 'Wrong input for email' };
    }
    // if (formInputs.password.length < 10) {
    //     return { status: 'error', message: 'Password is too short' };
    // }
    return { status: 'success' };
}

export default LoginUser;