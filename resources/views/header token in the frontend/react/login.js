import React, { useState } from 'react';
import axios from 'axios';
import setAuthToken from "./setAuthToken";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [expiresAt, setExpiresAt] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://your-laravel-url/api/auth/login', {
                email,
                password
            });
            setToken(response.data.access_token);
            setExpiresAt(response.data.expires_at);
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('expires_at', response.data.expires_at);
            setAuthToken(token);

            dispatch(setCurrentUser(response.data.user));

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
