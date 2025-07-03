const express = require('express');
const router = express.Router();
const { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors');
const { verifyTokenHandler } = require('../middlewares/jwtHandler');


router.get('/',[verifyTokenHandler] ,getAllDoctors);
router.get('/:id',[verifyTokenHandler], getDoctorById);
router.post('/', createDoctor);
router.patch('/:id', updateDoctor);
router.delete('/:id', deleteDoctor)


module.exports = router;