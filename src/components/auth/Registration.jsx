import React from "react";
import { useState } from "react";
import { registerUser } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import Login from '../auth/Login';

const Registration = () => {
    const[registration,setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const[errorMessage,setErrorMessage] = useState("")
    const[successMessage,setSuccessMessage] = useState("")

    const handleInputChange = (e) => {
        setRegistration({...registration, [e.target.name]: e.target.value})
    }

    const handleRegistration = async(e) => {
        e.preventDefault()
        try{
            const result = await registerUser(registration)
            setSuccessMessage(result)
            setErrorMessage("")
            setRegistration({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            })
        }catch(error){
            setSuccessMessage("")
            setErrorMessage(`Registration failed. ${error}`)
        }
        setTimeout(() => {
            setErrorMessage("")
            setSuccessMessage("")
        }, 5000)
    }



    return (
    <section className="container col-6 mt-5 mb-5">
         {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
         {successMessage && <p className="alert alert-success">{successMessage}</p>}

         <h2>Sign Up</h2>
         <form onSubmit={handleRegistration}>
         <div className="row mb-3">
                    <label htmlFor="firstName" className="col-sm-2 col-form-label"> 
                        First Name
                    </label>
                    <div>
                        <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={registration.firstName}
                        onChange={handleInputChange}
                        />
                    </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="lastName" className="col-sm-2 col-form-label"> 
                    Last Name
                </label>
                <div>
                    <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={registration.lastName}
                    onChange={handleInputChange}
                    />
                </div>
            </div>


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
                        value={Login.email}
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
                        value={Login.password}
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
                        Sign Up
                    </button>
                    <span style={{marginLeft : "10px"}}>
                        Already have an account? <Link to={"/login"}>Login</Link>
                    </span>
                </div>

         </form>

    </section>
    );
    }

    export default Registration;