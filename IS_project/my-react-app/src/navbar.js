import React from 'react';
import { Link } from 'react-router-dom';
import { logged } from './index'

function Navbar() {

  const handleSignOut = () => {
    document.cookie = "user_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    console.log("Logging out...");
    fetch("http://127.0.0.1:8000/api/logout", {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
        .then((response) => response.json())
        .then((data) => {
            if (data["status"] == "error") {
              console.log(data['message'])
              logged(false);
            } else {
              localStorage.removeItem('token');
              localStorage.removeItem('email');
              console.log("User has logged out");
              logged(false);
            }
    });
  };

  return (
    <React.Fragment>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/login" id="user-signin">Sign in</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/" onClick={handleSignOut} id="user-signout">Sign out</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/schedule" id="schedule">Schedule</Link>
            </li>
        </ul>
        </div>
        </nav>
    </React.Fragment>
  );
}

export default Navbar;
