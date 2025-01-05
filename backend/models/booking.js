const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor', 
        required: true },
    slotTime: { 
        type: Date, 
        required: true },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
}, {
    timestamps: true
});


const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
