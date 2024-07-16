import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "./login";
    }
}


const App = () => {
    return (
        <div>
            <h1>Auth Example</h1>
            <Register />
            <Login />
            <Logout />
        </div>
    );
};

export default App;
