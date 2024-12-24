import React from'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from'react-router-dom';



const RoomCard = ({ room }) => {
  return (
    <Col key={room.id} className='mb-4' xs={12}>
        <Card>
            <Card.Body className='d-flex flex-wrap align=items-center'>
                <div className='flex-shrink-0 mr-3 mb-3 mb-md-0'>
                    <Link to={`/book-room/${room.id}`}>
                        <Card.Img
                        variant='top'
                        src={`data:image/png;base64, ${room.photo}`}
                        alt='Room Photo'
                        style={{width: "100%", maxWidth: "200px", height : "auto"}}
                        />
                    </Link>
                </div>
                <div className='flex-grow-1 ml-3 px-5 d-flex flex-column justify-content-center'>
                    <Card.Title className='hotel-color'>{room.roomType}</Card.Title>
                    <Card.Title className='room-price'>€{room.roomPrice} | night</Card.Title>
                    <Card.Text>Some room information goes here for the guest to read through</Card.Text>
                </div>
                <div className='d-flex align-items-center justify-content-end mt-3 flex-shrink-0'>
                    <Link to={`/book-room/${room.id}`} className='btn btn-hotel btn-sm'>
                        Book Now                
                    </Link>
                </div>
            </Card.Body>
        </Card>
    </Col>
    );
};

export default RoomCard;