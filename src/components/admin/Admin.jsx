import React from "react";
import { Link } from "react-router-dom";

/* Admin component */
const Admin = () => {
    return (
        <section className="container mt-5">
            <h2>Welcom to Admin Panel</h2>
            <hr/>
            <Link to="/existing-rooms"> Manage Rooms</Link>
            <br/>
            <Link to="/existing-bookings"> Manage Bookings</Link>

        </section>
    )
}

export default Admin;