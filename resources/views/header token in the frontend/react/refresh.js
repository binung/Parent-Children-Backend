import axios from 'axios';

const refreshToken = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api//auth/refresh-token');
        const { access_token, expires_at } = response.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('expires_at', expires_at);
        return access_token;
    } catch (error) {
        console.error('Error refreshing token', error);
        // Redirect to login or handle error
    }
};
