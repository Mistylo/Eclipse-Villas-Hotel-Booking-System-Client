import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { refreshToken as refreshTokenApi } from "../utils/ApiFunctions";
import axios from "axios";

// Create a context for the authentication data
export const AuthContext = createContext({
    user: null,
    handleLogin: (token, refreshToken) => {},
    handleLogout: () => {},
    sendAuthenticatedRequest: async (originalRequest) => {}, 
});

// AuthProvider component
const AuthProvider = ({ children }) => {
    let tokenExpirationTimer = null;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const expirationTime = localStorage.getItem("expirationTime");
        if (token && expirationTime) {
            try {
                const decodedToken = jwt_decode(token);
                setUser(decodedToken);
            } catch (error) {
                console.error("Invalid token:", error);
                handleLogout();
            }
        }
    }, []);

    // Check if token is expired and refresh if necessary
    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                console.error("No refresh token found!");
                handleLogout();
                return false;
            }

            const response = await refreshTokenApi(refreshToken);
            handleLogin(
                response.token,
                response.refreshToken,
            );
            return true;
        } catch (error) {
            console.error("Error refreshing token:", error);
            handleLogout();
            return false;
        }
    };

    // Handle login by storing token and refresh token in local storage and setting user state
    const handleLogin = (token, refreshToken) => {
        if (!token || token.trim() === "") {
            console.error("Token is empty or invalid!");
            setErrorMessage("Invalid token received from server.");
            return;
        }
    
        try {
            const decodedToken = jwt_decode(token);
            console.log("Decoded token:", decodedToken);
    
            localStorage.setItem("userId", decodedToken.sub); 
            localStorage.setItem("userRole", decodedToken.roles); 
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
 
            setUser(decodedToken);
        } catch (err) {
            console.error("Error decoding token:", err.message);
            setErrorMessage("Failed to decode token.");
            return;
        }
    };
    

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        clearTimeout(tokenExpirationTimer);
    };

    // Send authenticated request by adding token to header if it is not expired, otherwise refresh token and try again
    const sendAuthenticatedRequest = async (originalRequest) => {
        try {
            const response = await axios(originalRequest);
            return response;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                const refreshed = await refreshAccessToken();
                if (!refreshed) throw new Error("Session expired");
                originalRequest.headers[
                    "Authorization"
                ] = `Bearer ${localStorage.getItem("token")}`;
                return axios(originalRequest);
            }
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                handleLogin,
                handleLogout,
                sendAuthenticatedRequest,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

