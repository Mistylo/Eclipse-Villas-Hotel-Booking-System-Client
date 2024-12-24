import moment from 'moment';
import React, { useState } from 'react';
import { getAvailableRooms } from '../utils/ApiFunctions';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import RoomTypeSelector from './RoomTypeSelector';
import RoomSearchResult from './RoomSearchResult';

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [availableRooms, setAvailableRooms] = useState(null);  
    const [isLoading, setIsLoading] = useState(false);
    const [isSearched, setIsSearched] = useState(false);  

    const handleSearch = (e) => {
        e.preventDefault();

        const checkIn = moment(searchQuery.checkInDate);
        const checkOut = moment(searchQuery.checkOutDate);

        if (!checkIn.isValid() || !checkOut.isValid()) {
            setErrorMessage("Please enter valid date format");
            return;
        }

        if (!checkOut.isSameOrAfter(checkIn)) {
            setErrorMessage("Check-out date should come after check-in date");
            return;
        }

        const formattedCheckIn = checkIn.format("YYYY-MM-DD");
        const formattedCheckOut = checkOut.format("YYYY-MM-DD");

        setIsLoading(true);
        setIsSearched(true); 
    
        getAvailableRooms(formattedCheckIn, formattedCheckOut, searchQuery.roomType)
            .then((response) => {
                setAvailableRooms(response.data);  
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching available rooms:", error);
                setAvailableRooms([]);  
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery((prevState) => ({
            ...prevState,
            [name]: value
        }));

        const checkIn = moment(name === 'checkInDate' ? value : searchQuery.checkInDate);
        const checkOut = moment(name === 'checkOutDate' ? value : searchQuery.checkOutDate);
        if (checkIn.isValid() && checkOut.isValid()) {
            setErrorMessage('');  
        }
    };

    const clearSearch = () => {
        console.log("clearSearch function triggered!"); 
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: ""
        });
        setAvailableRooms(null);  
        setErrorMessage(""); 
        setIsLoading(false); 
        setIsSearched(false); 
    };

    return (
        <>
            <Container className='mt-5 mb-5 py-5 shadow'>
                <Form onSubmit={handleSearch}>
                    <Row className='justify-content-center'>

                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkInDate'>
                                <Form.Label>Check-in Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="checkInDate"
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkOutDate'>
                                <Form.Label>Check-out Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="checkOutDate"
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label>Room Type</Form.Label>
                                <div className='d-flex'>
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleInputChange}
                                        newRoom={searchQuery}
                                    />
                                    <Button variant="secondary" type="submit">Search</Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                {isLoading ? (
                        <p className='text-center mt-3'>finding available rooms...</p>
                    ) : availableRooms !== null ? (
                        <RoomSearchResult
                            results={availableRooms}
                            onClearSearch={clearSearch} 
                        />
                    ) : null}  


                {errorMessage && <p className='text-danger'>{errorMessage}</p>}
            </Container>
        </>
    );
}

export default RoomSearch;
