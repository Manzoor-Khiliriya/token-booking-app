const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor', 
        require: true },
    slotTime: { 
        type: Date, 
        require: true },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        require: true },
}, {
    timestamps: true
});


const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
