import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import RegisterUser from './register';
import Home from './Home';
import Library from './library';
import LoginUser from './login'
import Schedule from './schedule';


function ParentApp() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSignOutParent = () => {
        setIsLoggedIn(false);
        setIsSubscribed(false);
    };

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');

        fetch('http://127.0.0.1:8000/api/get_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    setIsLoggedIn(true);
                    setIsSubscribed(Boolean(data.subscribed));
                    console.log(isLoggedIn, isSubscribed);
                    console.log(data);
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }, []);

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} isSubscribed={isSubscribed} handleSignOutParent={handleSignOutParent} />
            <Routes>
                <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} />} />
                <Route exact path="/register" element={<RegisterUser setIsLoggedIn={setIsLoggedIn} />} />
                <Route exact path="/login" element={<LoginUser setIsLoggedIn={setIsLoggedIn} setIsSubscribed={setIsSubscribed} />} />
                <Route exact path="/schedule" element={<Schedule />} />
                <Route exact path="/library" element={<Library />} />
            </Routes>
        </div>
    );
}

export default ParentApp;