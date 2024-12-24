import React, { useContext, useState } from "react";
import {useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from '../auth/AuthProvider';
import { loginUser } from "../utils/ApiFunctions";

const Login = () => {
    const[errorMessage, setErrorMessage] = useState("");
    const[login, setLogin] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const {handleLogin} = useContext(AuthContext);

    const handleInputChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const success = await loginUser(login);
        console.log("Login response:", success);
    
        if (success) {
            const { accessToken: token, refreshToken, refreshTokenExpiration } = success;
    
            if (!refreshToken || !refreshTokenExpiration) {
                console.error("Missing refresh token or expiration time in login response!");
                setErrorMessage("Login failed. Please try again.");
                return;
            }
    
            handleLogin(token, refreshToken);
    
            const alertTime = refreshTokenExpiration - 10 * 60 * 1000; // Alert 10 minutes before token expiration
    
            setTimeout(() => {
                alert("Your session is about to expire. Please log in again!");
            }, alertTime - Date.now());
    
            navigate("/");
    
        } else {
            setErrorMessage("Invalid email or password");
        }
    
        setTimeout(() => {
            setErrorMessage("");
        }, 4000);
    };
    

     return (
        <section className="container col-6 mt-5 mb-5">
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label"> 
                        Email
                    </label>
                    <div>
                        <input
                        id="email"
                        type="email"
                        name="email"
                        className="form-control"
                        value={login.email}
                        onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label"> 
                        Password
                    </label>
                    <div>
                        <input
                        id="password"
                        type="password"
                        name="password"
                        className="form-control"
                        value={login.password}
                        onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <button 
                    type="submit" 
                    className="btn btn-hotel"
                    style={{marginRight : "10px"}}
                    >
                        Login
                    </button>
                    <span style={{marginLeft : "10px"}}>
                        Don't have an account? <Link to={"/register"}>Sign Up</Link>
                    </span>
                </div>
                
            </form>
           
        </section>
    )
}

export default Login;