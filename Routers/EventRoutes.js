import express from 'express';
import VerifyToken, { verifyRole } from '../Middleware/VerifyToken.js';

import { 
    CreateEvent, 
    GetEvents, 
    GetEventById, 
    UpdateEvent, 
    DeleteEvent,
    SoftDeleteEvent,
    GetEventsforadmin,
    GetEventsCount, 

} from '../Controllers/EventController.js';

const router = express.Router();

// Protected routes for event management
router.post('/',VerifyToken, verifyRole(['admin']),CreateEvent);
router.get('/', VerifyToken, GetEvents);
router.get('/all',VerifyToken,GetEvents);
router.get('/allad',VerifyToken,verifyRole(['admin']),GetEventsforadmin);
router.get('/count',GetEventsCount);
router.get('/:eventId', VerifyToken, GetEventById);
router.put('/:eventId',  VerifyToken,UpdateEvent);
router.delete('/:eventId',  VerifyToken,DeleteEvent);
router.delete('/soft/:eventId',VerifyToken, SoftDeleteEvent);



export default router;
