import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import setAuthToken from "./setAuthToken";



const token = localStorage.getItem('token');
const expiresAt = localStorage.getItem('expires_at');

// Check for token to keep user logged in
if (token) {
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (expiresAt < currentTime) {
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
