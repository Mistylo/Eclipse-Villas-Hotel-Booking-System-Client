import React, { useEffect, useState } from 'react';
import BookingForm from './BookingForm';
import { useParams } from 'react-router-dom';
import { getRoomById } from '../utils/ApiFunctions';
import RoomCarousel from '../common/RoomCarousel'; 
import { FaWifi, FaTv, FaUtensils, FaWineGlassAlt, FaCar, FaParking, FaTshirt } from 'react-icons/fa';

const Checkout = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [roomInfo, setRoomInfo] = useState({ photo: "", roomType: "", roomPrice: "" });
    const { roomId } = useParams();

    useEffect(() => {
        setTimeout(() => {
            getRoomById(roomId)
                .then(response => {
                    console.log("API response:", response); // 调试信息
                    setRoomInfo(response);
                    setIsLoading(false);
                }).catch((error) => {
                    console.error("API call failed:", error); // 调试信息
                    setError(error.message || "An error occurred");
                    setIsLoading(false);
                });
        }, 2000);
    }, [roomId]);

    return (
        <div>
            <section className='container'>
                <div className='row flex-column flex-md-row align-items-center'>
                    <div className='col-md-4 mt-5 mb-5'>
                        {isLoading ? (
                            <p>Loading Room Information...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className='room-info'>
                                {roomInfo?.photo && (
                                    <img
                                        src={`data:image/png;base64,${roomInfo.photo}`}
                                        alt='Room Photo'
                                        style={{ width: '100%', height: '80%' }}
                                    />
                                )}
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Room Type :</th>
                                            <td>{roomInfo?.roomType || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <th>Room Price :</th>
                                            <td>{roomInfo?.roomPrice ? `€${roomInfo.roomPrice}` : 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <th>Room Service :</th>
                                            <td>
                                                <ul className='list-unstyled'>
                                                    <li><FaWifi /> Wifi </li>
                                                    <li><FaTv /> Netflix Premium</li>
                                                    <li><FaUtensils /> Breakfast</li>
                                                    <li><FaWineGlassAlt /> Mini Bar</li>
                                                    <li><FaCar /> Car Service</li>
                                                    <li><FaParking /> Parking Space</li>
                                                    <li><FaTshirt /> Laundry</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className='col-md-8'>
                        <BookingForm />
                    </div>
                </div>
            </section>
            <div className='container'>
                <RoomCarousel />
            </div>
        </div>
    );
};

export default Checkout;
