const express = require('express');
const router = express.Router();
const { getBookingsByUserId, createBooking, updateBooking, deleteBooking, } = require('../controllers/bookings');
const { verifyTokenHandler } = require('../middlewares/jwtHandler');


router.use(verifyTokenHandler)
router.get('/', getBookingsByUserId);
router.post('/:doctorId', createBooking);
router.patch('/:bookingId', updateBooking);
router.delete('/:bookingId', deleteBooking);


module.exports = router