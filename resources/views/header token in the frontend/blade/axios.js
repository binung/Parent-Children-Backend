async function fetchData() {
    if (isTokenExpired()) {
        await refreshToken();
    }

    const token = localStorage.getItem('token');

    try {
        const response = await axios.get('https://your-server-url/api/protected-endpoint', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Data fetched:', response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function isTokenExpired() {
    const expiration = localStorage.getItem('tokenExpiration');
    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime > expiration;
}

async function refreshToken() {
    try {
        const response = await axios.post('https://your-server-url/api/refresh', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const newToken = response.data.token;
        const newExpiration = response.data.expiration;

        localStorage.setItem('token', newToken);
        localStorage.setItem('tokenExpiration', newExpiration);

        console.log('Token refreshed:', newToken);
    } catch (error) {
        console.error('Token refresh failed:', error);
    }
}
