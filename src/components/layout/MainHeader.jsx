import React from'react';

const MainHeader = () => {
  return (
    <header className='header-banner' style={{ marginBottom: '2rem'}}>
    <div className='overlay'></div>
    <div className='animated-texts overlay-content'>
        <h1 style={{ fontFamily: "'Dancing Script', serif", fontSize: "4rem" , color:"rgba(255, 255, 255, 0.9)"}}>
        Welcome to Eclipse Villas
        </h1>
        <h4 style={{ fontFamily: "'EB Garamond', serif", marginTop: "1.5rem", textAlign: "center" }}>
        Immerse Yourself in Unparalleled Hotel Luxury
        </h4>
    </div>
    </header>

    )
    }

export default MainHeader;