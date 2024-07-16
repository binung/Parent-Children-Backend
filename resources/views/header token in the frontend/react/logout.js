import React from 'react';
import axios from 'axios';

const Logout = () => {
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://your-laravel-url/api/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('token');
            console.log('Logged out');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
