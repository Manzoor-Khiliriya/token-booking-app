const mongoose = require('mongoose');

const availabilityPeriodSchema = new mongoose.Schema({
    start: { type: String, require: true },
    end: { type: String, require: true }
})

const doctorSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    speciality: {
        require: true,
        type: String
    },
    place: {
        require: true,
        type: String
    },
    district: {
        require: true,
        type: String
    },
    total_tokens: { type: Number, default: 30 },
    booked_tokens: { type: Number, default: 0 },
    availability_periods: [availabilityPeriodSchema]
})


const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
