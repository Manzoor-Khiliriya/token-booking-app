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
    const  userId = req.userId;
    const data = req.body;
    const existingBooking = await bookingsRepositories.getBookingById(userId);
    if (!existingBooking) {
        return next(new ErrorResponse('Booking not found', 404));
    }
    await bookingsRepositories.updateBooking(id, data);
    const updatedData = await bookingsRepositories.getBookingById(id);
    res.status(200).json({ success: true, data: updatedData })
})

const deleteBooking = asyncHandler(async (req, res, next) => {
    const userId  = req.userId;

    const existingBooking = await bookingsRepositories.getBookingById(userId);
    if (!existingBooking) {
        return next(new ErrorResponse('Booking not found', 404));
    }

    await bookingsRepositories.deleteBooking(id);
    res.status(200).json({ success: true, data: { message: 'Booking deleted successfully' } });
});

module.exports = {
    getBookingsByUserId,
    createBooking,
    updateBooking,
    deleteBooking
};
