const Doctor = require('../models/doctor');


async function getAllDoctors() {
    try {
        const doctors = await Doctor.find();
        return doctors;
    } catch (error) {
        throw error;
    }
}

async function getDoctorById(id) {
    try {
        const doctor = await Doctor.findById(id);
        return doctor;
    } catch (error) {
        throw error;
    }

}

async function createDoctor(doctorData) {
    try {
        const newDoctorData = new Doctor(doctorData);
        const doctor = await newDoctorData.save();
        return doctor;
    } catch (error) {
        throw error;
    }
}

const updateDoctor = async (id, data) => {
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, data);
    return updatedDoctor;
};

const deleteDoctor = async (id) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);; 
        return deletedDoctor; 
    } catch (error) {
        throw error; 
    }
};

module.exports = {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
}