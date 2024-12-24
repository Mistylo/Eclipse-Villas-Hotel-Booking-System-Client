import React from'react';

const Header = ({title}) => {
  return (
    <header className='header'>
        <div className='overlay'></div>
        <div className='container'>
        <div className='animated-texts overlay-content'>
            <h1 className='header-title text-center' style={{ fontFamily:"'Bona Nova SC', serif", fontSize: "2rem" ,  color:"rgba(255, 255, 255, 0.9)", textAlign: "center"}}>{title}</h1>
        </div>
        </div>
    </header>
  );
};
export default Header;