import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000, 
});


apiClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/*Handle refershToken logic */
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest || !error.response) {
            console.error('Error response or config missing:', error);
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    // Ask for a new access token using the refresh token
                    const { data } = await axios.post('http://localhost:8080/auth/refresh-token', {
                        refreshToken,
                    });

                    const { token: newAccessToken } = data;

                    // Update the access token in the local storage
                    localStorage.setItem('accessToken', newAccessToken);

                    // Request with the new access token
                    apiClient.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return apiClient(originalRequest);
                } catch (refreshError) {
                    console.error('Refresh token failed:', refreshError);
                    // Clear the local storage and redirect to login page
                    localStorage.clear();
                    if (window.location.pathname !== '/login') {
                        window.location.replace('/login');
                    }
                    return Promise.reject(refreshError);
                }
            } else {
                // If there is no refresh token, clear the local storage and redirect to login page
                console.error('No refresh token available. Redirecting to login.');
                localStorage.clear();
                if (window.location.pathname !== '/login') {
                    window.location.replace('/login');
                }
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
