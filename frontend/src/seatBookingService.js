// // src/services/seatBookingService.js
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/seats'; // Replace with your backend URL

// // Set up a common header for the token
// const setAuthHeader = () => {
//     const token = localStorage.getItem('token');
//     return { headers: { Authorization: `Bearer ${token}` } };
// };

// // Fetch available seats for a specific event
// export const getAvailableSeats = async (eventId) => {
//     const response = await axios.get(`${API_URL} /available/${eventId}`, setAuthHeader());
//     return response.data;
// };

// // Reserve a seat
// export const reserveSeat = async (seatNumber, eventId) => {
//     const response = await axios.post(`${API_URL}/seats/reserve`, { seatNumber, eventId }, setAuthHeader());
//     return response.data;
// };

// // Cancel a reservation
// export const cancelReservation = async (seatNumber, eventId) => {
//     const response = await axios.post(`${API_URL}/seats/cancel`, { seatNumber, eventId }, setAuthHeader());
//     return response.data;
// };
