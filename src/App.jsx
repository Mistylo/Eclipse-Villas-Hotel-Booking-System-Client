import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddRoom from './components/room/AddRoom';
import ExistingRooms from './components/room/ExistingRooms';
import Home from './components/home/Home';
import EditRoom from './components/room/EditRoom';
import NavBar from './components/layout/NavBar'; 
import Footer from './components/layout/Footer';
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';
import Checkout from './components/booking/Checkout';
import BookingSuccess from './components/booking/BookingSuccess';
import Bookings from './components/booking/Bookings';
import FindBooking from './components/booking/FindBooking';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile';
import Logout from './components/auth/Logout.jsx';
import AuthProvider from './components/auth/AuthProvider';
import SessionExpirationModal from './components/common/SessionExpirationModal';
import RequireAuth from './components/auth/RequireAuth';
import About from './components/about/About';


function App() {
    return (
        <AuthProvider>
              <SessionExpirationModal />
            <Router>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/edit-room/:roomId" element={<EditRoom />} />
                    <Route path="/existing-rooms" element={<ExistingRooms />} />
                    <Route path="/add-room" element={<AddRoom />} /> 
                    <Route path="/book-room/:roomId" element={<RequireAuth><Checkout /></RequireAuth>} /> 
                    <Route path="/booking-success" element={<BookingSuccess />} />
                    <Route path="/browse-all-rooms" element={<RoomListing />} /> 
                    <Route path="/about" element={<About />} /> 
                    <Route path="/admin" element={<Admin />} /> 
                    <Route path="/existing-bookings" element={<Bookings />} />
                    <Route path="/find-booking" element={<FindBooking />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Router>
            <Footer/>
        </AuthProvider>
    );
}

export default App;
