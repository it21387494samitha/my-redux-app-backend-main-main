import EventModel from '../Models/EventModel.js';
import QRCode from 'qrcode';



// Create an event
export const CreateEvent = async (req, res) => {
    const { name, date, location, description } = req.body;
    const userId = req.user.id; // Assuming user is authenticated

    try {
        // Create the new event object
        const newEvent = new EventModel({
            name,
            date,
            location,
            description,
            createdBy: userId,
            isDeleted: false
        });

        // Generate the QR code based on event data
        const qrCodeData = `${name} - ${date} - ${location}`;
        const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

        // Add the generated QR code URL to the event
        newEvent.qrCode = qrCodeUrl;

        // Save the event to the database
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};



// Get all events
export const GetEvents = async (req, res) => {
    try {
        const events = await EventModel.find({isDeleted:false});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error });
    }
};

export const GetEventsforadmin = async (req, res) => {
    try {
        const events = await EventModel.find({isDeleted:false});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error });
    }
};


export const GetEventsCount = async (req, res) => {
    try {
        const events = await EventModel.find({isDeleted:false});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error });
    }
};

// Get event by ID
export const GetEventById = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving event', error });
    }
};

// Update an event
export const UpdateEvent = async (req, res) => {
    const { eventId } = req.params;
    const { name, date, location, description } = req.body;

    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(
            eventId,
            { name, date, location, description },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error });
    }
};

// Delete an event
export const DeleteEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const deletedEvent = await EventModel.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
};



//
export const SoftDeleteEvent = async (req, res) => {
    const{eventId} =req.params ;
    try {
        await EventModel.findByIdAndUpdate(eventId, { isDeleted: true });
    } catch (error) {
        console.error('Error performing soft delete for event:', error);
        throw error;
    }
};
