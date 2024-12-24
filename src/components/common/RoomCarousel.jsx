import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Container, Carousel, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const RoomCarousel = () => {
  const[rooms, setRooms] = useState([{id:"", roomType:"", roomPrice:"", photo:""}]);
  const[errorMessage, setErrorMessage] = useState("");
  const[isLoading, setIsLoading] = useState(false);

useEffect(() => {
    setIsLoading(true);
    getAllRooms().then((data)=>{
        setRooms(data)
        setIsLoading(false)}).catch((error)=>{
            setErrorMessage(error.message);
            setIsLoading(false)})
},[])

if(isLoading){
    return <div className="mt-5">Loading rooms...</div>
}

if(errorMessage){
    return <div className="text-danger mb-5 mt-5">Error: {errorMessage}</div>
}

  return(
  
  <section className="bg-light mb-5 mt-5 shadow">
    <div style={{ padding: "30px 0" }}> 
    <h1 style={{ fontFamily:"'Bona Nova SC', serif", fontSize: "2.7rem" , color: "#333333", textAlign: "center", marginBottom: "20px"}}>Rooms & Suites</h1>
    </div>

    <Container>
        <Carousel indicators={false}>
            {[...Array(Math.ceil(rooms.length / 4))].map((_, index)=> (
                <Carousel.Item key={index}>
                    <Row>
                        {rooms.slice(index*4, index*4+4).map((room) => (
                          <Col key={room.id} className="mb-4" xs= {12} nd = {6} lg = {3} > 
                            <Card>
                                <Link to={`/book-room/${room.id}`}>
                                    <Card.Img
                                    variant="top"
                                    src={`data:image/png;base64,${room.photo}`}
                                    alt="Room Photo"
                                    className="w-100"
                                    style={{heigt: "200px"}}                                   
                                    />
                                                               
                                </Link>
                                <Card.Body>
                                    <Card.Title className='hotel-color'>{room.roomType}</Card.Title>
                                    <Card.Title className='room-price'>€{room.roomPrice} | night</Card.Title>
                                    <div className='d-flex align-items-center justify-content-end mt-3 flex-shrink-0'>
                                      <Link to={`/book-room/${room.id}`} className='btn btn-hotel btn-sm'>    
                                            Book Now                
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                         </Col>  
                        ))}                     
                    </Row>
                </Carousel.Item>
            ))}
        </Carousel>
    </Container>
  </section>

  )           
  };

  export default RoomCarousel;

