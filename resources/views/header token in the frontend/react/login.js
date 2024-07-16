import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/register', {
                identifier,
                password
            });
            setUser(response.data.user);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                identifier,
                password
            });
            setUser(response.data.user);
            // Store token in localStorage or state
            localStorage.setItem('token', response.data.access_token);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Email or Name"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
            {user && <p>Welcome, {user.name}!</p>}
        </div>
    );
};

export default Auth;
