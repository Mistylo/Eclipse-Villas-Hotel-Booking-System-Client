import axios from 'axios' 
import api from './axiosInterceptor';
import jwtDecode from 'jwt-decode';


export const getHeader = (token) => {
    const accessToken = token || localStorage.getItem("token"); // Get token from local storage if not provided
    return {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    };
};

/* This function adds a new room to the database */
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);
    const response = await api.post("/rooms/add/new-room", formData);   
    // Handle both 200 and 201 status codes as success
    return response.status === 200 || response.status === 201;
}


/*This function gets all room types from the database*/
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types");
        // Filter out empty or invalid room types
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types");
    }
}


/* This function gets all rooms from the database */
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms");
        console.log("Fetched rooms:", result.data);
        return result.data;
    } catch (error) {
        console.error("Error fetching rooms:", error.response ? error.response.data : error.message);
        throw new Error("Error fetching rooms");
    }
}


/* This function delets a room by the Id */
export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    }catch(error){
        throw new Error(`Error deleting room ${error.message}`)
    }
}


/* This function updates a room by the Id */
export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    if (roomData.photo) {
        formData.append("photo", roomData.photo);
    }
    const response = await api.put(`/rooms/update/${roomId}`, formData);
    return response;
}


/* This function gets a room by the Id */
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        console.log("API response:", result.data); 
        return result.data; // Ensure we return the data object, not the response object
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`);
    }
}


/* This function books a room by the Id */
export async function bookRoom(roomId, booking) {
    try {
        console.log("Booking request:", booking); 
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
        console.log("Booking response:", response.data); 
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("Error booking room:", error.response.data);
            throw new Error(error.response.data);
        } else {
            console.error("Error booking room:", error.message);
            throw new Error(`Error booking room: ${error.message}`);
        }
    }
}


/* This function gets all bookings from the database */
export async function getAllBookings(){
    try{
        const result = await api.get("/bookings/all-bookings");
        console.log("Fetched bookings:", result.data); 
        return result.data;
    }catch(error){
        console.error("Error fetching bookings:", error.response ? error.response.data : error.message);
        throw new Error(`Error fetching bookings : ${error.message}`);
    }
}


/* This function gets a booking by the booking number */
export async function getBookingByBookingNumber(bookingNumber) {
    try {
        const result = await api.get(`/bookings/confirmation/${bookingNumber}`);
        return result.data;
    } catch (error) {
        if (error.response && error.response.data) {
            const customError = new Error(error.response.data.message || "Error finding booking");
            customError.response = error.response;
            throw customError;
        } else {
            throw new Error(`Error finding booking: ${error.message}`);
        }
    }
}


/* This function cancels a booking */
export async function cancelBooking(bookingId){
    try{
        const result = await api.delete(`/bookings/booking/${bookingId}/cancel`)
        return result.data
    }catch(error){
        throw new Error(`Error canceling booking : ${error.message}`)
    }

}


/* This function gets all rooms available for a given date range and room type */   
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(`rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`);
    return result;
}


/* This function registers a new user */
export async function registerUser(registration) {
    try{
        const response = await api.post("/auth/register-user", registration);
        return response.data;
    }catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }else{
            throw new Error(`Error registering user: ${error.message}`);
        }
    }
}


/* This function logs in a user */
export async function loginUser(login) {
    try{
        const response = await api.post("/auth/login", login);
        if(response.status >= 200 && response.status < 300){
            return response.data;
        }else{
            return null;
        }
    }catch(error){
        console.error(error);
        return null;
    }
}


/* This function gets the user profile */
export async function getUserProfile(userId) {
    try{
        const response = await api.get(`/users/profile/${userId}`,{
            headers: getHeader()
        })
        return response.data;
    }catch(error){
        throw error;
    }
}


/* This function updates the user profile */
export async function deleteUser(userId) {
    try{
        const response = await api.delete(`/users/delete/${userId}`,{
            headers: getHeader()
    });
    return response.data;
    }catch(error){
        return error.message;
    }
}


/* This function gets the user by id */
export async function getUser(userId){
    try{
        const response = await api.get(`/users/${userId}`,{
            headers: getHeader()
    })
    return response.data;
    }catch(error){
        throw error;
    }
}


/* This function get the refershToken */
export async function refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const response = await axios.post('http://localhost:8080/auth/refresh-token', { refreshToken });
        const newToken = response.data.accessToken;

        // Try to decode the token to ensure it's valid
        try {
            const decoded = jwtDecode(newToken);
            console.log(decoded);  
        } catch (error) {
            throw new Error('Invalid token specified');
        }

        localStorage.setItem("token", newToken);
        return newToken;
    } catch (error) {
        console.error('Refresh token error:', error);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        // Jump to login page
        window.location.href = "/login";
        throw new Error('Failed to refresh token');
    }
}


/* This function gets the bookings by user id */
export async function getBookingByUserId(userId, token) {
    try {
        const response = await api.get(`/bookings/user/${userId}/bookings`, {
            headers: getHeader(token)
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Token expired, try to refresh it
            const newToken = await refreshToken();
            // After refresh, try again
            const retryResponse = await api.get(`/bookings/user/${userId}/bookings`, {
                headers: getHeader(newToken)
            });
            return retryResponse.data;
        }
        console.error("Error fetching bookings:", error.message);
        throw new Error("Failed to fetch bookings");
    }
}

  
