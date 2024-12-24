import React, { useState, useEffect } from "react";
import { getRoomById, bookRoom } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Form, FormControl, Button } from "react-bootstrap";
import BookingSummary from './BookingSummary';


const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);

    const currentUser = localStorage.getItem("userId");

    const [booking, setBooking] = useState({
        guestName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numberOfAdults: "",
        numberOfChildren: "",
        totalGuests: 0, 
    });

    const { roomId } = useParams();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    };

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId);
            setRoomPrice(response.roomPrice);
        } catch (error) {
            setErrorMessage("Error retrieving room price.");
        }
    };

    useEffect(() => {
        getRoomPriceById(roomId);
    }, [roomId]);

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const numberOfNights = checkOutDate.diff(checkInDate, 'days');
        const pricePerDay = roomPrice || 0;
        return numberOfNights * pricePerDay;
    };

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numberOfAdults);
        return adultCount >= 1;
    };

    const isCheckOutDateValid = () => {
        const valid = moment(booking.checkOutDate).isAfter(moment(booking.checkInDate));
        if (!valid) setErrorMessage("Check-out date should be after check-in date");
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation();
        } else {
            setIsValidated(true);
        }
    };

    const handleBooking = async () => {
        try {

            const bookingRequest = {
                guestFullName: booking.guestName,
                guestEmail: booking.guestEmail,
                checkInDate: booking.checkInDate,
                checkOutDate: booking.checkOutDate,
                numOfAdults: booking.numberOfAdults,
                numOfChildren: booking.numberOfChildren,
                totalGuest: booking.totalGuests
            };

            const bookingNumber = await bookRoom(roomId, bookingRequest);
            navigate("/booking-success", { state: { message: bookingNumber } });
        } catch (error) {
            setErrorMessage(error.message);
            navigate("/booking-success", { state: { error: error.message } });
        }
    };
    

    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card card-body mt-3" style={{ minHeight: '690px' }}>
                        <h4 className="mt-1 mb-3 text-center">Reserve Room</h4>
                        <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="guestName" className="mt-3 mb-3">Full Name:</Form.Label>
                                <FormControl
                                    required
                                    type="text"
                                    id="guestName"
                                    name="guestName"
                                    value={booking.guestName}
                                    onChange={handleInputChange}
                                    isInvalid={isValidated && !booking.guestName}
                                    placeholder="Please enter your full name"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your full name
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="guestEmail" className="mt-3 mb-3">Email:</Form.Label>
                                <FormControl
                                    required
                                    type="email"
                                    id="guestEmail"
                                    name="guestEmail"
                                    value={booking.guestEmail}
                                    onChange={handleInputChange}
                                    isInvalid={isValidated && !booking.guestEmail}
                                    placeholder="Please enter your email"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your email
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="checkInDate" className="mt-3 mb-3">Check-In Date:</Form.Label>
                                <FormControl
                                    required
                                    type="date"
                                    id="checkInDate"
                                    name="checkInDate"
                                    value={booking.checkInDate}
                                    onChange={handleInputChange}
                                    isInvalid={isValidated && !booking.checkInDate}
                                    placeholder="Select check-in date"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please select your check-in date
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="checkOutDate"  className="mt-3 mb-3">Check-Out Date:</Form.Label>
                                <FormControl
                                    required
                                    type="date"
                                    id="checkOutDate"
                                    name="checkOutDate"
                                    value={booking.checkOutDate}
                                    onChange={handleInputChange}
                                    isInvalid={isValidated && !booking.checkOutDate}
                                    placeholder="Select check-out date"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please select your check-out date
                                </Form.Control.Feedback>
                                {errorMessage && <div className="text-danger">{errorMessage}</div>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="numberOfAdults" className="mt-3 mb-3">Number of Adults:</Form.Label>
                                <FormControl
                                    required
                                    type="number"
                                    id="numberOfAdults"
                                    name="numberOfAdults"
                                    value={booking.numberOfAdults}
                                    min="1"
                                    onChange={handleInputChange}
                                    isInvalid={isValidated && (booking.numberOfAdults < 1 || !booking.numberOfAdults)}
                                    placeholder="0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter at least 1 adult
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="numberOfChildren" className="mt-3 mb-3">Number of Children:</Form.Label>
                                <FormControl
                                    type="number"
                                    id="numberOfChildren"
                                    name="numberOfChildren"
                                    value={booking.numberOfChildren}
                                    min="0"
                                    onChange={handleInputChange}
                                    isInvalid={isValidated && booking.numberOfChildren < 0}
                                    placeholder="0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid number of children
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button type="submit" className="btn btn-hotel btn-primary mt-4">
                                Continue
                            </Button>
                        </Form>
                    </div>
                </div>

                {isValidated && (
                    <div className="col-md-6">
                        <BookingSummary
                            booking={booking}
                            payment={calculatePayment()}
                            onConfirm={handleBooking}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingForm;

