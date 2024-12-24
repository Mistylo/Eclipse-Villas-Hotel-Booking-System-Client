import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate, Link } from "react-router-dom";

const Logout = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.handleLogout(); 
        navigate("/", { state: { message: "Logged out successfully!" } });
    }

    const isLoggedIn = auth.user !== null;

    return isLoggedIn ? (
        <>
           
            <hr className='dropdown-divider'/>
            <button className='dropdown-item' onClick={handleLogout}>
                Logout
            </button>
        </>
    ) : null; 
};

export default Logout;
