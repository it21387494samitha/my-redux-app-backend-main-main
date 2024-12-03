import AttendanceModel from '../Models/AttendanceModel.js';
import SeatModel from '../Models/SeatModel.js';

// Mark attendance based on seat booking
export const markAttendance = async (req, res) => {
    try {
        const { userId, seatId, eventId } = req.body;

        const seat = await SeatModel.findById(seatId);
        if (!seat || !seat.isAvailable || seat.reservedBy !== userId) {
            return res.status(400).json({ message: "Invalid seat reservation." });
        }

        const newAttendance = new AttendanceModel({
            user: userId,
            seat: seatId,
            event: eventId,
            status: 'Present',
            checkInTime: new Date()
        });

        await newAttendance.save();
        res.status(201).json(newAttendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update attendance when user checks out
export const updateAttendance = async (req, res) => {
    try {
        const { attendanceId } = req.params;

        const attendance = await AttendanceModel.findById(attendanceId);
        if (!attendance) {
            return res.status(404).json({ message: "Attendance not found." });
        }

        attendance.checkOutTime = new Date();
        attendance.status = 'Absent'; // Optional, if you want to mark attendance differently based on check-out
        await attendance.save();

        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const checkInWithQR = async (req, res) => {
    try {
        const { eventId, userId } = req.params;

        const attendance = await AttendanceModel.findOne({
            event: eventId,
            user: userId
        });

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found.' });
        }

        attendance.status = 'Present';
        attendance.checkInTime = new Date();
        await attendance.save();

        res.status(200).json({ message: 'Check-in successful', attendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};