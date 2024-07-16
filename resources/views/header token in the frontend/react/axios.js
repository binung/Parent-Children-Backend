import axios from 'axios';
import moment from 'moment';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/auth',
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        const expiresAt = localStorage.getItem('expires_at');

        if (token && expiresAt && moment().isBefore(moment(expiresAt))) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // Handle token expiration, e.g., by refreshing the token or logging out
            console.warn('Token is expired');
            localStorage.removeItem('token');
            localStorage.removeItem('expires_at');
            // Redirect to login or refresh token logic
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;

// Backend: Set the token expiration time when generating tokens and return it with the token.
// Frontend: Store the token and its expiration time. Before making requests, check if the token is expired and handle accordingly (e.g., refresh the token or log out the user).
// This approach ensures that the frontend always has a valid token and can handle expired tokens gracefully.
