const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { 
    getAllDoctors, 
    bookAppointment, 
    getUserAppointments,
    cancelAppointment,
    addDoctor,
    updateDoctor,
    deleteDoctor,
     getDoctorById,
     createDoctorAndUser,
        } = require('../controllers/doctorController');
const router = express.Router();
// const { protect, admin } = require('../middleware/authMiddleware');
// const { protect } = require('../middleware/authMiddleware');
router.get('/get-all-doctors', getAllDoctors);
router.post('/book-appointment', bookAppointment);
router.get('/get-user-appointments', protect, getUserAppointments);
router.put('/my-appointments/:id/cancel', protect, cancelAppointment);
router.post('/add', protect, admin, addDoctor);
router.put('/:id', protect, admin, updateDoctor);
router.delete('/:id', protect, admin, deleteDoctor);
router.post('/create-with-user', protect, admin, createDoctorAndUser);
router.get('/:id', getDoctorById);
module.exports = router;

