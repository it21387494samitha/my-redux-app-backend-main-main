import express from 'express';
import VerifyToken from '../Middleware/VerifyToken.js';
import { ReserveSeat, CancelReservation, ViewAvailableSeats, CreateSeat, CreateSeatStructure, GetBookedSeatCount, GetBookingHistory, deleteBooking, ViewAllSeats, deleteSeat, ViewEventSeats, SoftDeleteSeat } from '../Controllers/SeatBookingController.js';

const router = express.Router();


router.post('/create',VerifyToken ,CreateSeat);
// Reserve a seat (protected route)
router.post('/reserve/:eventId/:seatId',  VerifyToken,ReserveSeat);

//
router.get('/event/:eventId/booked-seats-count',  VerifyToken,GetBookedSeatCount);

//
router.post('/creat', VerifyToken, CreateSeatStructure)

// Cancel a reservation (protected route)
router.post('/cancel',  VerifyToken,  CancelReservation);

// View available seats for an event
router.get('/available/:eventId',  VerifyToken,  ViewAvailableSeats);

// SeatBookingRouter.js
router.get('/history',  VerifyToken,  GetBookingHistory);

// Delete a booking by ID (protected route)
router.delete('/history/:id',  VerifyToken,  deleteBooking); 




router.get('/seats',  VerifyToken,  ViewAllSeats); // <-- New Route

router.get('/event/:eventId/seats',  VerifyToken,  ViewEventSeats);





router.delete('/seats/:id',  VerifyToken, deleteSeat);




///

router.delete('/soft/:id',  VerifyToken,SoftDeleteSeat)

    
export default router;
