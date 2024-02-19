import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RegisterUser from './register';
import LoginUser from './login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
   <Router>
    <Routes> 
        <Route exact path="/" element={<App/>} />
        <Route exact path="/register" element={<RegisterUser/>} />
        <Route exact path="/login" element={<LoginUser/>} />
      </Routes> 
    </Router>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export function logged(isLoggedIn) {
  var buttonSignIn = document.querySelector(`#user-signin `);
  var buttonSignOut = document.querySelector(`#user-signout`);
  
  if (isLoggedIn) {
    buttonSignIn.disabled = true;
    buttonSignOut.disabled = false;
  } else {
    buttonSignIn.disabled = false;
    buttonSignOut.disabled = true;
  }
};

document.querySelector("#user-signout").addEventListener("click", (evt) => {
  evt.preventDefault();

  console.log("Logging out...");
  fetch("http://127.0.0.1:8000/api/logout")
      .then((response) => response.json())
      .then((data) => {
          if (data["status"] == "error") {
             // displays error message
          } else {
            console.log("User has logged out");
            logged(false);
          }
  });
});