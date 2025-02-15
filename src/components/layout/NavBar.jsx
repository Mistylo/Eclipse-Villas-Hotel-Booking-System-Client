import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logout from '../auth/Logout';
import { AuthContext } from '../auth/AuthProvider';

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false);

    // Use AuthContext to get user data
    const { user } = useContext(AuthContext) || {};

    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    };

    // check if user is logged in and has admin role
    const isLoggedIn = user !== null;
    const userRole = localStorage.getItem('userRole')?.split(',') || [];
    const isAdmin = userRole.includes('ROLE_ADMIN');

    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
            <div className='container-fluid'>
                <Link to={"/"} className='navbar-brand'>
                    <span className='hotel-logo'>Eclipse Villas</span>
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarScroll'
                    aria-controls='navbarScroll'
                    aria-expanded="false"
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarScroll'>
                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                        <li className='nav-item'>
                            <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>Browse all rooms</NavLink>                   
                        </li>

                        <li className='nav-item'>
                            <NavLink className="nav-link" aria-current="page" to={"/about"}>About Us</NavLink>                   
                        </li>


                        {isLoggedIn && isAdmin && (
                            <li className='nav-item'>
                                <NavLink className="nav-link" aria-current="page" to={"/admin"}>Admin</NavLink>                   
                            </li>
                        )}

                    </ul>

                    <ul className='d-flex navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to={"/find-booking"}>Find My Booking</NavLink>
                        </li>

                        <li className='nav-item dropdown'>
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href='#'
                                id='navbarDropdown'
                                role='button'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                                onClick={handleAccountClick}
                            >
                                {" "}Account
                            </a>

                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`} aria-labelledby='navbarDropdown'>
                                {isLoggedIn ? (
                                    <>
                                        <li>
                                            <Link to={"/profile"} className='dropdown-item'>Profile</Link>
                                        </li>
                                        <li><Logout /></li>
                                    </>
                                ) : (
                                    <li>
                                        <Link to={"/login"} className='dropdown-item'>Login</Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
