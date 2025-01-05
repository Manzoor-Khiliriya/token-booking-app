const express = require('express');
const router = express.Router();
const { getBookingsByUserId, createBooking, updateBooking, deleteBooking, } = require('../controllers/bookings');
const { verifyTokenHandler } = require('../middlewares/jwtHandler');


router.use(verifyTokenHandler)
router.get('/', getBookingsByUserId);
router.post('/:doctorId', createBooking);
router.patch('/', updateBooking);
router.delete('/', deleteBooking);


module.exports = router