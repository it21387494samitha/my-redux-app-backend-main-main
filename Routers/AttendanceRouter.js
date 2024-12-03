import express from 'express';
import { checkInWithQR, markAttendance, updateAttendance } from '../Controllers/AttendanceController.js';
import { verifyToken } from '../Middleware/VerifyToken.js';

const router = express.Router();

// Route for marking attendance
router.post('/mark-attendance',verifyToken, markAttendance);

// Route for checking out
router.put('/attendance/:attendanceId', verifyToken, updateAttendance);

router.get('/check-in/:eventId/:userId', verifyToken,checkInWithQR);

export default router;
