import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


function Navbar(props) {
  const { isLoggedIn, isSubscribed, handleSignOutParent } = props;

  const handleSignOut = () => {

    console.log("Logging out...");
    fetch("http://127.0.0.1:8000/api/logout", {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["status"] == "error") {
          console.log(data['message'])
        }
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        console.log("User has logged out");
        // removing all cookies associated with this domain
        Cookies.remove();
        handleSignOutParent();
      });
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse show" id="navbarNav"> {/* Add the 'show' class here */}
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {!isLoggedIn && (<li className="nav-item">
              <Link className="nav-link" to="/login" id="user-signin">Sign in</Link>
            </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleSignOut} id="user-signout">Sign out</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/register" id="register">Register</Link>
              </li>
            )}
            {/* {isLoggedIn && isSubscribed && (
              <li className="nav-item">
                <Link className="nav-link" to="/schedule" id="schedule">Schedule</Link>
              </li>
            )} */}
            <li className="nav-item">
              <Link className="nav-link" to="/library" id="library">Library</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coaches" id="faq">Our Coaches</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/scheduler" id="scheduler">Расписание</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faq" id="faq">FAQ</Link>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
