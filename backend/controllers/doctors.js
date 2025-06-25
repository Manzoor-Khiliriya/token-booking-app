const doctorsRepositories = require('../repositories/doctors');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utilts/errorResponse');



const getAllDoctors = asyncHandler(async (req, res, next) => {
    const doctors = await doctorsRepositories.getAllDoctors();
    res.status(200).json({ success: true, data: doctors });
})

const getDoctorById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const doctor = await doctorsRepositories.getDoctorById(id);
    if (!doctor) {
        return next(new ErrorResponse('Doctor not found', 404));
    }
    res.status(200).json({ success: true, data: doctor });
})

const createDoctor = asyncHandler(async (req, res, next) => {
    const { name, place, district, speciality } = req.body;

    const customTimeSlots = [
        { "start": "10:00 AM", "end": "12:00 PM" }
    ];

    const doctorData = {
        name,
        place,
        district,
        speciality,
        availability_periods: customTimeSlots
    };

    const doctor = await doctorsRepositories.createDoctor(doctorData);
    res.status(200).json({ success: true, data: doctor });
});

const updateDoctor = asyncHandler(async (req, res, next) => {
    const id = req.params;
    const data = req.body;
    const existingDoctor = await doctorsRepositories.getDoctorById(id);
    if (!existingDoctor) {
        return next(new ErrorResponse('Doctor not found', 404));
    }
    await doctorsRepositories.updateDoctor(id, data);
    const updatedData = await doctorsRepositories.getDoctorById(id);
    res.status(200).json({ success: true, data: updatedData })
})

const deleteDoctor = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const existingDoctor = await doctorsRepositories.getDoctorById(id);
    if (!existingDoctor) {
        return next(new ErrorResponse('Doctor not found', 404));
    }

    await doctorsRepositories.deleteDoctor(id);
    res.status(200).json({ success: true, data: { message: 'Doctor deleted successfully' } });
});


module.exports = {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
}