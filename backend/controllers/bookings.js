const bookingsRepositories = require('../repositories/bookings');
const bookingsServices = require('../services/bookings');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utilts/errorResponse');


const getBookingsByUserId = asyncHandler(async (req, res, next) => {
    const  userId  = req.userId;
    const bookings = await bookingsRepositories.getBookingsByUserId(userId);
    res.status(200).json({ success: true, data: bookings });
})


const createBooking = asyncHandler(async (req, res, next) => {
    const { slotTime } = req.body;
    const { doctorId } = req.params;
    const userId = req.userId;

    const booking = await bookingsServices.createBooking(doctorId, slotTime, userId);
    res.status(200).json({ success: true, data: { booking } });
});

const updateBooking = asyncHandler(async (req, res, next) => {
    const { bookingId } = req.params;
    const data = req.body;

    const existingBooking = await bookingsRepositories.getBookingById(bookingId);
    if (!existingBooking) {
        return next(new ErrorResponse('Booking not found', 404));
    }

    if (data.slotTime && data.doctorId) {
        const conflictingBooking = await bookingsRepositories.getExistingBooking(
            data.doctorId,
            data.slotTime
        );

        if (conflictingBooking && String(conflictingBooking._id) !== bookingId) {
            return next(new ErrorResponse('This slot is already booked for the doctor.', 409));
        }
    }

    await bookingsRepositories.updateBooking(bookingId, data);

    const updatedData = await bookingsRepositories.getBookingById(bookingId);

    res.status(200).json({ success: true, data: updatedData });
});


const deleteBooking = asyncHandler(async (req, res, next) => {
    const { bookingId } = req.params;
    const existingBooking = await bookingsRepositories.getBookingById(bookingId);
    if (!existingBooking) {
        return next(new ErrorResponse('Booking not found', 404));
    }

    await bookingsRepositories.deleteBooking(bookingId);

    res.status(200).json({ 
        success: true, 
        data: { message: 'Booking deleted successfully' } 
    });
});

module.exports = {
    getBookingsByUserId,
    createBooking,
    updateBooking,
    deleteBooking
};
