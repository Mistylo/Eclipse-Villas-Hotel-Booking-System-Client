import React from'react';
import { Container } from 'react-bootstrap';

const Parallax = ({ children }) => {
  return (
    <div className="parallax mb-5">
      <Container className='text-center px-5 py-5 justify-content-center'>
        <div className='animated-texts bounceIn'>
            <h1 style={{ fontFamily: "'Dancing Script', serif", fontSize: "4rem" , color:"rgba(255, 255, 255, 0.9)", marginTop: "1.5rem" }}>Eclipse Villas</h1>
            <h3 style={{ fontFamily: "'EB Garamond', serif", marginTop: "1.5rem", textAlign: "center" }}>Dedicated to Elevating Every Moment of Your Stay</h3>
        </div>
      </Container>
    </div>
  );
};

export default Parallax;