const bookingsRepository = require('../repositories/bookings');
const doctorsRepositories = require('../repositories/doctors');
const ErrorResponse = require('../utilts/errorResponse');
const mongoose = require('mongoose');


const createBooking = async (doctorId, slotTime, userId) => {
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        throw new ErrorResponse('Invalid Doctor ID format', 400);
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ErrorResponse('Invalid User ID format', 400);
    }

    if (!doctorId) {
        throw new ErrorResponse('Doctor ID required', 400);
    }

    if (!userId) {
        throw new ErrorResponse('User ID required', 400);
    }

    if (!slotTime) {
        throw new ErrorResponse('Slot time required', 400);
    }

    const doctor = await doctorsRepositories.getDoctorById(doctorId);

    if (!doctor) {
        throw new ErrorResponse('Doctor not found', 404);
    }

    const currentTime = new Date();
    var slotTimeDate = new Date(slotTime);
  

    if (slotTimeDate < currentTime) {
        throw new ErrorResponse('Cannot book a past time slot', 400);
    }

    if (doctor.booked_tokens >= doctor.total_tokens) {
        throw new ErrorResponse('No available tokens left', 400);
    }


    const isSlotAvailable = doctor.availability_periods.some(period => {
        const periodStart = period.start;
        const periodEnd = period.end;

        const getTimeFromDate = (dateString) => {
            const date = new Date(dateString);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        };

    
        return getTimeFromDate(slotTimeDate) >= periodStart && getTimeFromDate(slotTimeDate) <= periodEnd;
    });
    
    
   
    if (!isSlotAvailable) {
        throw new ErrorResponse("Slot time is not within the doctor's availability periods", 400);
    }


    const existingBookingSlot = await bookingsRepository.getExistingBooking( doctorId, slotTime );
    if (existingBookingSlot) {
        throw new ErrorResponse('Slot already booked for this date', 400);
    }



    doctor.booked_tokens++;
    doctor.availability_periods = doctor.availability_periods.filter(slot => slot.start !== slotTime);

    const bookingData = {
        doctorId: doctorId,
        slotTime: slotTime,
        userId: userId
    };

    const booking = await bookingsRepository.createBooking(bookingData);
    await doctorsRepositories.updateDoctor(doctor._id, {
        booked_tokens: doctor.booked_tokens,
        availability_periods: doctor.availability_periods
    });

    return booking

};

module.exports = {
    createBooking
}