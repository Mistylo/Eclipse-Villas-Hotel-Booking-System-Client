import React, { useState, useEffect } from 'react';
import { deleteUser, getBookingByUserId, getUser } from '../utils/ApiFunctions';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Profile = () => {
  const [user, setUser] = useState({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: [{ id: '', name: '' }]
  });

  const [bookings, setBookings] = useState([
    {
      id: '',
      event: { id: "", roomType: "" },
      checkInDate: '',
      checkOutDate: '',
      bookingNumber: ''
    }
  ]);

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId, token);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();
      const timeLeft = expirationTime - currentTime;
  
      if (timeLeft < 10 * 60 * 1000) { 
        setAlertVisible(true);
      }
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingByUserId(userId, token);
        setBookings(response); 
        setErrorMessage('');   
      } catch (error) {
        if (error.response && error.response.status === 404) {      
          setBookings([]);
        } else {
          setErrorMessage(error.message || "An unexpected error occurred");
        }
      }
    };
    
    fetchBookings();
  }, [userId, token]);
  

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account?');
    if (confirmed) {
      await deleteUser(userId)
        .then((response) => {
          setMessage(response.data);
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          window.location.href = '/';
          navigate('/');
          window.location.reload();
        })
        .catch((error) => {
          setErrorMessage(error.data);
        });
    }
  };

  return (
    <div className='container'>
      {alertVisible && (
        <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
          Your session is about to expire. Please save your work or re-login.
        </div>
      )}
      {errorMessage && <p className='text-danger'>{errorMessage}</p>}
      {message && <p className='text-danger'>{message}</p>}
      {user ? (
        <div className='card p-5 mt-5' style={{ backgroundColor: 'Whitesmoke', fontFamily: 'Arial, sans-serif' }}>
          <h4 className='card-title text-center mb-4'>User Information</h4>
          <div className='card-body'>
              <div className='col-md-10 mx-auto'>
                <div className='card mb-3 shadow'>
                  <div className='row g-0'>
                    <div className='col-md-2'>
                        <div className='d-flex justify-content-center align-items-center mb-4'>
                          <img
                            src='https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png'
                            alt='Profile'
                            className='rounded-circle'
                            style={{width:"150px",objectFit:"cover"}}
                          />
                        </div>
                      </div>

                      <div className='col-md-10'>
                        <div className='card-body'>
                          <div className='form-group row'>
                            <label className='col-md-2 col-form-label fw-bold'>ID:</label>
                            <div className='col-md-10'>
                              <p className='card-text'>{user.id}</p>
                            </div>
                          </div>
                          <hr/>

                          <div className='form-group row'>
                            <label className='col-md-2 col-form-label fw-bold'>First Name:</label>
                            <div className='col-md-10'>
                              <p className='card-text'>{user.firstName}</p>
                            </div>
                          </div>
                          <hr/>

                          <div className='form-group row'>
                            <label className='col-md-2 col-form-label fw-bold'>Last Name:</label>
                            <div className='col-md-10'>
                              <p className='card-text'>{user.lastName}</p>
                            </div>
                          </div>
                          <hr/>
                          
                          <div className='form-group row'>
                            <label className='col-md-2 col-form-label fw-bold'>Last Name:</label>
                            <div className='col-md-10'>
                              <p className='card-text'>{user.email}</p>
                            </div>
                            </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 className='card-title text-center mb-5 mt-5'>Booking History</h4>
          {bookings.length > 0 ? (
            <table className='table table-bordered table-hover shadow'>
              <thead>
                <tr>
                  <th scope='col'>Booking Number</th>
                  <th scope='col'>Room Type</th>
                  <th scope='col'>Check In Date</th>
                  <th scope='col'>Check Out Date</th>
                  <th scope='col'>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.bookingNumber}</td>
                    <td>{booking.event.roomType}</td>
                    <td>{moment(booking.checkInDate, "YYYY-MM-DD").subtract(1, "month").format("MMM Do, YYYY")}</td>
          <td>{moment(booking.checkOutDate, "YYYY-MM-DD").subtract(1, "month").format("MMM Do, YYYY")}</td> 

                    <td className='text-success'>On-going</td>
                  </tr>
                ))}
              </tbody>
            </table>
      ) : (
        <p>You have not made any bookings yet</p>
      )}
    <div className='d-flex justify-content-center'>
      <div className='mx-2'>
        <button className='btn btn-danger btn-sm mt-5' onClick={handleDeleteAccount}>Delect Account</button>
      </div>
    </div>
    </div>
    </div>
  ) : (
    <p>Loding user</p>
  )}
</div>
  )
}

export default Profile;
