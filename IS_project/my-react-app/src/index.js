import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './navbar';
import App from './App';
import RegisterUser from './register';
import LoginUser from './login';
import Scheduler from './schedule';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
   <Router>
      <Navbar/>
      <Routes> 
        <Route exact path="/" element={<App/>} />
        <Route exact path="/register" element={<RegisterUser/>} />
        <Route exact path="/login" element={<LoginUser/>} />
        <Route exact path="/schedule" element={<Scheduler/>} />
      </Routes> 
    </Router>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export function logged(isLoggedIn) {
  
  var buttonSignIn = document.querySelector(`#user-signin`);
  var buttonSignOut = document.querySelector(`#user-signout`);
  var schedule = document.getElementById("schedule");
  
  if (isLoggedIn) {
    buttonSignIn.classList.add('disabled');
    buttonSignOut.classList.remove('disabled');
    schedule.style.display = 'block';
    console.log('User signed in. Sign in button disabled')
  } else {
    buttonSignIn.classList.remove('disabled');
    buttonSignOut.classList.add('disabled');
    schedule.style.display = "none";
    console.log('User not signed in. Sign out disabled')
  }
};

// document.addEventListener("DOMContentLoaded", function() {
//   document.querySelector("#user-signout").addEventListener("click", (evt) => {
//     evt.preventDefault();

//     console.log("Logging out...");
//     fetch("http://127.0.0.1:8000/api/logout")
//         .then((response) => response.json())
//         .then((data) => {
//             if (data["status"] == "error") {
//               // displays error message
//             } else {
//               console.log("User has logged out");
//               logged(false);
//             }
//     });
//   });
// });