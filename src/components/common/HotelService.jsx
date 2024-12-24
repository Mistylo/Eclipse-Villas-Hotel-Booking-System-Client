import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import { FaClock, FaCocktail, FaTshirt, FaUtensils, FaWifi, FaParking } from "react-icons/fa";
import Card from "react-bootstrap/Card";


const HotelService = () => {
  return (
    <>  
    
    <Container className="mb-2" >
        <Header title={"Exclusive Offerings"}/>

        <Row>
            <h4 className="text-center" style={{ fontFamily:"'Bona Nova SC', serif", paddingTop:"20px"}}>
                Services at Eclipse Villas 
            </h4>
        </Row>

        
        <hr/>
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">

            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="hotel-color">
                            <FaClock/> 24 Hour Reception
                        </Card.Title>
                        <Card.Text>Experience seamless luxury with our reception, here to cater to your every need, any time of day or night</Card.Text>
                    </Card.Body>           
                </Card>
            </Col>

          <Col>
            <Card>
                <Card.Body>
                    <Card.Title className="hotel-color">
                        <FaWifi/> WiFi
                    </Card.Title>
                    <Card.Text>Stay effortlessly connected with ultra-fast internet access</Card.Text>
                </Card.Body>           
            </Card>
          </Col>

          <Col>
            <Card>
                <Card.Body>
                    <Card.Title className="hotel-color">
                        <FaUtensils/> Fine Dining
                    </Card.Title>
                    <Card.Text>Savor the art of fine dining, where every dish is a masterpiece crafted to perfection</Card.Text>
                </Card.Body>           
            </Card>
          </Col>

          <Col>
            <Card>
                <Card.Body>
                    <Card.Title className="hotel-color">
                        <FaTshirt/> Laundry
                    </Card.Title>
                    <Card.Text>Maintain your freshness and elegance with our premier laundry service</Card.Text>
                </Card.Body>           
            </Card>
          </Col>

          <Col>
            <Card>
                <Card.Body>
                    <Card.Title className="hotel-color">
                        <FaCocktail/> Mini-Bar
                    </Card.Title>
                    <Card.Text>Treat yourself to a refreshing drink or snack from our exclusive mini-bar</Card.Text>
                </Card.Body>           
            </Card>
          </Col>

          <Col>
            <Card>
                <Card.Body>
                    <Card.Title className="hotel-color">
                        <FaParking/> Parking
                    </Card.Title>
                    <Card.Text>Ensure your Vevicle's safety with our comprehensive parking lot</Card.Text>
                </Card.Body>           
            </Card>
          </Col>
        </Row>
    </Container>   
    </>
    )
    }

export default HotelService;