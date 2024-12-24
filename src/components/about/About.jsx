import React from "react";
import {Carousel,Card } from "react-bootstrap";
import Hotel3 from "../../assets/images/Hotel3.jpg";
import Restaurant from "../../assets/images/Restaurant.jpg";
import Aboutroom from "../../assets/images/About-room.jpg";
import AboutLobby from "../../assets/images/AboutLobby.jpg";
import AboutSeaView from "../../assets/images/AboutSeaView.jpg";
import { Link } from "react-router-dom";


const About = () => {
  return (
    <>
      <div className="container-fluid mb-5">
        {/* First Part */}
        <div className="row">
          <div className="col-md-6 text-black p-4 mt-5" style={{ position: "relative", left: "60px" }}>
            <h2 style={{ fontFamily: "Tinos", fontSize: "48px" }}>ABOUT ECLIPSE VILLAS</h2>
            <h4 style={{ fontFamily: "Unna", fontStyle: "italic" }}>The Luxury Standard</h4>
          </div>
          <div className="col-md-6 text-black p-4 mt-5 mb-3">
            <p style={{ fontFamily: "EB Garamond", fontSize: "18px" }}>
              Mixing timeless classic elegance with modern contemporary design, Eclipse Villas redefines luxury as a harmonious blend of tradition and innovation. Nestled in the heart of the island, this exquisite resort offers a serene escape where the beauty of nature meets the sophistication of cutting-edge amenities.
            </p>
          </div>
        </div>

        {/* Second Part */}
        <div className="row">
          <div className="col-12 text-black p-4" style={{ textAlign: "center" }}>
            <img src={Hotel3} alt="Eclipse Villas" className="img-fluid" style={{ maxWidth: "2000px", maxHeight: "600px", width: "auto", height: "auto" }} />
          </div>
        </div>
      </div>

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-6 text-black p-4 mt-6" style={{ position: "relative", left: "60px", top: "200px" }}>
            <h4 style={{ fontFamily: "Unna", fontStyle: "italic" }}>Who We Are</h4>
            <h2 style={{ fontFamily: "Tinos", fontSize: "48px" }}>OUR LEGACY</h2>
            <p style={{ fontFamily: "EB Garamond", fontSize: "20px" }}>
              Decades ago, The Eclipse Villas was a 100-room luxury resort in the heart of the island of Liaz. It was the first revolutionized hospitality on the island by bringing elements of luxury to a hotel setting for the first time. Today, that legacy of thoughtful innovation lives on as we create extraordinary moments for our guests.
            </p>
          </div>
          <div className="col-md-6 text-white p-4 mt-5" style={{ position: "relative", left: "60px" }}>
            <div className="position-relative d-inline-block">
              <img
                src={Restaurant}
                alt="Ellipse"
                className="rounded-circle"
                style={{ width: "500px", height: "600px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Third Part */}
      <div className="container-fluid mb-5">

      <div className="row">
        <div className="col-md-6 text-black p-4 mt-5" style={{ position: "relative", left: "60px"}}>
          <h4 style={{ fontFamily: "Unna", fontStyle: "italic" }}>The Eclipse Villas</h4>
          <h2 style={{ fontFamily: "Tinos", fontSize: "48px" }}>EXPERIENCE</h2>
        </div>
        <div className="col-md-6 text-black p-4 mt-5 mb-3" style={{ position: "relative", right: "60px"}}>
          <p className="text-center" style={{ fontFamily: "EB Garamond", fontSize: "20px" }}>
            Eclipse Villas inspires life’s most meaningful journeys. We create extraordinary moments that foster a deep sense of satisfaction and a joy that endures long after your trip ends.
          </p>
        </div>
      </div>


      <Carousel style={{ backgroundColor: "transparent" }}>
        {/* First Slide */}
        <Carousel.Item>
          <div style={{ position: "relative", height: "500px", backgroundColor: "transparent" }}>
            <img
              src={Aboutroom}
              alt="First slide"
              style={{
                position: "absolute",
                top: "50px",
                left: "270px",
                bottom: "50px",
                width: "650px",
                height: "600px",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
            <Card
              style={{
                position: "absolute",
                top: "15px",
                left: "800px",
                width: "400px",
                height: "200px",
                backgroundColor: "white", 
                border: "1px solid black", 
                padding: "10px",
                zIndex: 1,
              }}
            >
       <Card.Body>
                <Card.Title className="text-center mt-2" style={{ fontFamily: "Tinos", fontSize: "25px" }}>A Home At the Heart of the Island</Card.Title>
                <Card.Text className="text-center" style={{fontFamily: "EB Garamond", fontSize: "18px"}}>
                    Discover the elegance of Eclipse Villas and indulge in our world-class amenities.
                </Card.Text>
                <div className="text-center">
                    <Card.Link 
                    as={Link} to="/browse-all-rooms"
                    style={{ color: "black", textDecoration: "underline", textDecorationColor: "black" }}
                    >
                    Browse All Rooms
                    </Card.Link>
                </div>
                </Card.Body>
            </Card>
          </div>
        </Carousel.Item>

        {/* Second Slide */}
        <Carousel.Item>
          <div style={{ position: "relative", height: "500px", backgroundColor: "transparent" }}>
            <img
              src={AboutLobby}
              alt="Second slide"
              style={{
                position: "absolute",
                top: "10px",
                left: "270px",
                bottom: "50px",
                width: "650px",
                height: "600px",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
            <Card
               style={{
                position: "absolute",
                top: "300px",
                left: "800px",
                width: "400px",
                height: "200px",
                backgroundColor: "white", 
                border: "1px solid black", 
                padding: "10px", 
                zIndex: 1,
              }}
            >
              <Card.Body>
                <Card.Title className="text-center mt-2" style={{ fontFamily: "Tinos", fontSize: "25px" }}>An Elevated Retreat</Card.Title>
                <Card.Text className="text-center" style={{fontFamily: "EB Garamond", fontSize: "18px"}}>
                  Join our membership and experience the ultimate luxury experience
                </Card.Text>
                <div className="text-center">
                <Card.Link  as={Link} to="/register" style={{ color: "black", textDecoration: "underline", textDecorationColor: "black" }}>Registration</Card.Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Carousel.Item>

        {/* Third Slide */}
        <Carousel.Item>
          <div style={{ position: "relative", height: "500px", backgroundColor: "transparent" }}>
            <img
              src={AboutSeaView}
              alt="Third slide"
              style={{
                position: "absolute",
                top: "50px",
                left: "270px",
                bottom: "50px",
                width: "650px",
                height: "600px",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
            <Card
               style={{
                position: "absolute",
                top: "15px",
                left: "800px",
                width: "400px",
                height: "200px",
                backgroundColor: "white", 
                border: "1px solid black", 
                padding: "10px", 
                zIndex: 1,
              }}
            >
              <Card.Body>
                <Card.Title className="text-center mt-2" style={{ fontFamily: "Tinos", fontSize: "25px" }}>Your Journey Begins Here</Card.Title>
                <Card.Text className="text-center" style={{fontFamily: "EB Garamond", fontSize: "18px"}}>Find your bookings and explore our world-class amenities</Card.Text>
                <div className="text-center">
                <Card.Link as={Link} to="/find-booking" style={{ color: "black", textDecoration: "underline", textDecorationColor: "black" }}>Find Your Booking</Card.Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
    </>
  );
};

export default About;
