import React, { useState, useEffect } from 'react';  
import MainHeader from '../layout/MainHeader';
import Parallax from '../common/Parallax';
import HotelService from '../common/HotelService';
import RoomCarousel from '../common/RoomCarousel';
import RoomSearch from '../common/RoomSearch';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();  
  const message = location.state && location.state.message;
  const currentUser = localStorage.getItem('userId');
  
  const [showUserMessage, setShowUserMessage] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setShowUserMessage(true);

      const timer = setTimeout(() => {
        setShowUserMessage(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  return (
    <section>
      {message && <p className="text-warning px-5">{message}</p>}
      {showUserMessage && currentUser && (
        <h6 className="text-success text-center">
          You are logged in as {currentUser}
        </h6>
      )}
      <div className="spaced-section">
        <MainHeader />
      </div>   
      <section className="container spaced-section">
        <div className="spaced-section">
          <RoomSearch />
        </div>
        <div className="spaced-section">
          <RoomCarousel />
        </div>
        <div className="spaced-section">
          <HotelService />
        </div>
        <div className="spaced-section">
          <Parallax />
        </div>
      </section>
    </section>
  );
};

export default Home;
