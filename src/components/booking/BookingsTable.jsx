import React, { useEffect, useState } from 'react';
import { parseISO } from 'date-fns';
import DateSlider from '../common/DateSlider';


const convertDateArrayToISO = (dateArray) => {
  return new Date(dateArray[0], dateArray[1], dateArray[2]).toISOString().split('T')[0];
};

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo;
        if (startDate && endDate) {
            // Ensure startDate and endDate are in ISO string format
            const parsedStartDate = startDate instanceof Date ? startDate : parseISO(startDate);
            const parsedEndDate = endDate instanceof Date ? endDate : parseISO(endDate);

            filtered = bookingInfo.filter((booking) => {
                // Ensure booking.checkInDate and booking.checkOutDate are in ISO string format
                const checkInDateStr = Array.isArray(booking.checkInDate)
                    ? convertDateArrayToISO(booking.checkInDate)
                    : booking.checkInDate;
                const checkOutDateStr = Array.isArray(booking.checkOutDate)
                    ? convertDateArrayToISO(booking.checkOutDate)
                    : booking.checkOutDate;

                // Change booking.checkInDate and booking.checkOutDate to ISO string format
                const bookingStartDate = typeof checkInDateStr === 'string' ? parseISO(checkInDateStr) : null;
                const bookingEndDate = typeof checkOutDateStr === 'string' ? parseISO(checkOutDateStr) : null;

                if (!bookingStartDate || !bookingEndDate) {
                    return false; // If date is invalid, filter out this booking
                }

                return bookingStartDate >= parsedStartDate && bookingEndDate <= parsedEndDate;
            });
        }
        setFilteredBookings(filtered);
    };

    useEffect(() => {
        setFilteredBookings(bookingInfo);
    }, [bookingInfo]);

    return (
        <section className='p-4'>
            <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
            <table className='table table-bordered table-hover shadow'>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking Id</th>
                        <th>Room Id</th>
                        <th>Room Type</th>
                        <th>Check-In Date</th>
                        <th>Check-Out Date</th>
                        <th>Guest Name</th>
                        <th>Guest Email</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Total Guest</th>
                        <th>Booking Number</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {filteredBookings.map((booking, index) => (
                        <tr key={booking.bookingId}>
                            <td>{index + 1}</td>
                            <td>{booking.bookingId}</td>
                            <td>{booking.event.id}</td>
                            <td>{booking.event.roomType}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>{booking.guestFullName}</td>
                            <td>{booking.guestEmail}</td>
                            <td>{booking.numOfAdults}</td>
                            <td>{booking.numOfChildren}</td>
                            <td>{booking.totalGuest}</td>
                            <td>{booking.bookingNumber}</td>
                            <td>
                                <button
                                    className='btn btn-danger btn-sm'
                                    onClick={() => handleBookingCancellation(booking.bookingId)}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredBookings.length === 0 && <p className='text-center'>No Bookings Found</p>}
        </section>
    );
};

export default BookingsTable;

