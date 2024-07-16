import axios from 'axios';

async function login(email, password) {
    try {
        const response = await axios.post('https://your-server-url/api/login', {
            email: email,
            password: password
        });

        // Store token in localStorage
        const token = response.data.token;
        const expiration = response.data.expiration;

        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', expiration);

        /*

        // Alternatively, store token in sessionStorage
        sessionStorage.setItem('token', token);

        // Using cookies (less secure as it can be accessed by JavaScript)
        document.cookie = `token=${token};path=/`;

        */

        console.log('Login successful, token stored:', token);
    } catch (error) {
        console.error('Login failed:', error);
    }
}
