import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, onConfirm }) => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numOfDays = checkOutDate.diff(checkInDate, "days");
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);



    const navigate = useNavigate();

    const handleConfirmBooking = async () => {
        setIsProcessingPayment(true);
        try {
            await onConfirm();
            setIsProcessingPayment(false);
            setIsBookingConfirmed(true);
        } catch (error) {
            setIsProcessingPayment(false);
            console.error("Error confirming booking:", error);
        }
    };

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success");
        }
    }, [isBookingConfirmed, navigate]);

    return (
        <div className="card card-body mt-5">
            <h4 className="mt-3 mb-5 text-center">Reservation Summary</h4>

            <p className="text-center">Full Name: <strong>{booking.guestName}</strong></p>
            <p className="text-center">Email: <strong>{booking.guestEmail}</strong></p>
            <p className="text-center">Check-In Date: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong></p>
            <p className="text-center">Check-Out Date: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong></p>
            <p className="text-center">Number of Days: <strong>{numOfDays}</strong></p>

            <div>
                <h5 className="mt-4 mb-3 text-center">Number of Guests</h5>
                <p className="text-center">Adults: <strong>{booking.numberOfAdults}</strong></p>              
                <p className="text-center">Children:<strong> {booking.numberOfChildren}</strong></p>
            </div>

            {payment > 0 ? (
                <>
                    <p className="mt-5 mb-5 text-center">Total Payment: <strong>€{payment}</strong></p>

                    <Button variant="success" onClick={handleConfirmBooking}>
                        {isProcessingPayment ? (
                            <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                        ) : null}
                        {isProcessingPayment ? "Booking confirmed, redirecting to payment..." : "Confirm Booking and Proceed to Payment"}
                    </Button>
                </>
            ) : (
                <p className="text-danger">Please select valid dates: Check-Out Date should be after Check-In Date.</p>
            )}
        </div>
    );
};

export default BookingSummary;
