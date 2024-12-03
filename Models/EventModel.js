import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,   
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    qrCode: {
        type: String, // Added to store the QR code as a string
        
    },
    isDeleted:{
        type:  Boolean,
        default: false
    }
});

const EventModel = mongoose.model('Event', eventSchema);
export default EventModel;
