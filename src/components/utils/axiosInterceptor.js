import axios from 'axios';
import { refreshToken } from './ApiFunctions'; 


const getHeader = () => {
    const token = localStorage.getItem("token");
    return {
        "Authorization": token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
    };
};


const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: getHeader(), 
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Handle expired token
            try {
                const newToken = await refreshToken(); 
                localStorage.setItem("token", newToken); // Update token in local storage
                error.config.headers["Authorization"] = `Bearer ${newToken}`; // Update token in request header
                return api.request(error.config); // Update token and retry request
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                throw refreshError;
            }
        }
        return Promise.reject(error);
    }
);

export default api;
