const Booking = require('../models/booking');


const getBookingsByUserId = async (userId) => {
    try {
        const bookings = await Booking.find({userId})
            .populate({
                path: 'doctorId',
                select: ['name', 'place']
            })
            .populate({
                path: 'userId',
                select: 'username'
            });
        return bookings;
        console.log(bookings)
    } catch (error) {
        throw error
    }
}

const getExistingBooking = async (doctorId, slotTime) => {
    try {
        const existingBooking = await Booking.findOne({ doctorId, slotTime });
        return existingBooking;
    } catch (error) {
        throw error;
    }
};


const createBooking = async (bookingData) => {
    try {
        const newBooking = new Booking(bookingData);
        const booking = await newBooking.save();
        return booking;
    } catch (error) {
        throw error;
    }

};

const updateBooking = async (id, data) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, data);
        return updatedBooking;
    } catch (error) {
        throw error;
    }
}

const deleteBooking = async (id) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);; 
        return deletedBooking; 
    } catch (error) {
        throw error; 
    }
};



module.exports = {
    getBookingsByUserId,
    getExistingBooking,
    createBooking,
    updateBooking,
    deleteBooking
};
