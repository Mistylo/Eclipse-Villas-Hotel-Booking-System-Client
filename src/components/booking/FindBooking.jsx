import React, { useState } from 'react';
import { cancelBooking, getBookingByBookingNumber } from '../utils/ApiFunctions';

const FindBooking = () => {
    const [bookingNumber, setBookingNumber] = useState('');
    const [error, setError] = useState('');
    const[successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [bookingInfo, setBookingInfo] = useState({
        bookingId: "",
        event: { id: "", roomType: "" },
        bookingNumber: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        totalAmount: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalGuest: ""
    });

    const [isDeleted, setIsDeleted] = useState(false);

    const clearBookingInfo = {
        bookingId: "",
        event: { id: "", roomType: "" },
        bookingNumber: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        totalAmount: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalGuest: ""
    };

    const handleInputChange = (e) => {
        setBookingNumber(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(''); 
        try {
            const data = await getBookingByBookingNumber(bookingNumber);
            console.log("Booking data:", data);
            setBookingInfo(data);
        } catch (error) {
            console.log("Error caught:", error);
            setBookingInfo(clearBookingInfo);
            if (error.response) {
                console.log("Error response:", error.response);
                if (error.response.status === 404) {
                    setError(error.response.data.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } else {
                console.log("Error without response:", error);
                setError("An unexpected error occurred");
            }
            console.log("Current error state after setError:", error.response ? error.response.data.message : "An unexpected error occurred");
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingInfo.bookingId);
            setIsDeleted(true);
            setSuccessMessage("Booking has been cancelled successfully!");
            setBookingInfo(clearBookingInfo);
            setBookingNumber('');
            setError('');
        } catch (error) {
            setError(error.message);
        }
        setTimeout(() => {
            setSuccessMessage('');
            setIsDeleted(false);
        }, 2000)
    };

    console.log("Current error state:", error); 

    return (
        <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
            <h2>Find My Booking</h2>
            <form onSubmit={handleFormSubmit} className='col-md-6'>
                <div className='input-group mb-3'>
                    <input
                        className='form-control'
                        id='bookingNumber'
                        name='bookingNumber'
                        value={bookingNumber}
                        onChange={handleInputChange}
                        placeholder='Enter Booking Number'
                    />
                    <button className='btn btn-hotel input-group-text'>Find Booking</button>
                </div>
            </form>

            {isLoading ? (
                <div>Finding booking...</div>
            ) : error ? (
                <div className='text-danger'>{error}</div>
            ) : bookingInfo.bookingNumber ? (
                <div className='col-md-6 mt-4 mb-5'>
                    <h3>Booking Information</h3>
                    <p>Booking Number : {bookingInfo.bookingNumber}</p>
                    <p>Room Number : {bookingInfo.event.id}</p>
                    <p>Room Type : {bookingInfo.event.roomType}</p>
                    <p>Check In Date : {bookingInfo.checkInDate}</p>
                    <p>Check Out Date : {bookingInfo.checkOutDate}</p>
                    <p>Full Name: {bookingInfo.guestFullName}</p>
                    <p>Email: {bookingInfo.guestEmail}</p>
                    <p>Adults: {bookingInfo.numOfAdults}</p>
                    <p>Children: {bookingInfo.numOfChildren}</p>
                    <p>Total Guest: {bookingInfo.totalGuest}</p>

                    {!isDeleted && (
                        <button
                            className='btn btn-danger'
                            onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
                        >
                            Cancel Booking
                        </button>
                    )}
                </div>
            ) : (
                <div>find booking...</div>
            )}

            {isDeleted && (
                <div className='alert alert-success mt-3' role='alert'>
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default FindBooking;
