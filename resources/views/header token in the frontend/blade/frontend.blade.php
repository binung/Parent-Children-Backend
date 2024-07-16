<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sanctum Auth Example</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>

<body>
    <script>
        async function login(email, password) {
            try {
                const response = await axios.post('https://your-server-url/api/login', {
                    email: email,
                    password: password
                });

                const token = response.data.token;
                const expiration = response.data.expiration;

                localStorage.setItem('token', token);
                localStorage.setItem('tokenExpiration', expiration);

                console.log('Login successful, token stored:', token);
            } catch (error) {
                console.error('Login failed:', error);
            }
        }

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

        // Example usage
        login('john@example.com', 'password').then(() => {
            fetchData();
        });
    </script>
</body>

</html>
