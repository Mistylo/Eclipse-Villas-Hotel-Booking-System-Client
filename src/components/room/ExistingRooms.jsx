import React, { useEffect, useState} from "react"
import { Col, Row } from 'react-bootstrap';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";


const ExistingRooms = () => {
    const[rooms, setRooms] = useState([])
    const[currentPage, setCurrentPage] = useState(1)
    const[roomsPerPage] = useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const[filteredRooms, setFilteredRooms] = useState([])
    const[selectedRoomType, setSelectedRoomType] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchRooms()
    },[])

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const result = await getAllRooms();
            console.log("Fetched rooms:", result); 
            setRooms(result);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching rooms:", error);
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };
    
    
    useEffect(() =>{
        if(selectedRoomType === ""){
            setFilteredRooms(rooms)
        }else{
            const filtered = rooms.filter(room => room.room_type === selectedRoomType)
            setFilteredRooms(filtered)
        }
        setCurrentPage(1)
    },[rooms,selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete= async(roomId) => {
        try {
            const result = await deleteRoom(roomId)
            if(result === ""){
                setSuccessMessage(`Room No ${roomId} was delete`)
                fetchRooms()
            }else{
                console.error(`Error deleting room : ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() =>{
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

  

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) =>{
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    }
    
    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

    return(
        <>
        <div className="container col-md-8 col-lg-6" >
            {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}
            {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
        </div>
        {isLoading ? (
            <p>Loading Existing Rooms...</p>
        ) : (
            <>
            <section className="mt-5 mb-5 container">
                <div className="d-flex justify-content-between mb-3 mt-5">
                    <h2 style={{ fontFamily: 'Nanum Gothic, sans-serif' }}>Existing Rooms</h2>
                </div>

                <Row>

                <Col mb={6} className="mb-2 mb-md-0">
                    <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>             
                </Col>

                <Col mb={6} className="d-flex justify-content-end">
                <Link to={"/add-room"}>
                        <FaPlus/> Add Room            
                    </Link>
                </Col>
                </Row>


                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Room Type</th>
                            <th>Room Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>


                    <tbody>
                        {currentRooms.map((room) =>(
                          <tr key={room.id} className="text-center">
                            <td>{room.id}</td>
                            <td>{room.roomType}</td>
                            <td>{room.roomPrice}</td>
                            <td className="gap-2">
                                <Link to={`/edit-room/${room.id}`}>
                                <span className="btn btn-info btn-sm custom-info-btn">
                                    <FaEye/>
                                    </span>
                                <span className="btn btn-warning btm-sm custom-warning-btn">
                                    <FaEdit/>
                                    </span>                          
                                </Link>


                                <button
                                className="btn btn-danger btn-sm custom-danger-btn"
                                onClick={() => handleDelete(room.id)}>
                                    <FaTrashAlt/>

                                    
                                    </button>
                            </td>
                          </tr>  
                        ))}
                    </tbody>
                </table>
                <RoomPaginator 
                currentPage={currentPage}
                totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                onPageChange={handlePaginationClick}            
                />
            </section>
            
            </>
        )}

        </>
    )
}

export default ExistingRooms