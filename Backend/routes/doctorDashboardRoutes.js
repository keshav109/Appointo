const express = require('express');
const { protect, isDoctor } = require('../middleware/authMiddleware');
const { 
     getDoctorProfile,
    getDoctorAppointments, 
    updateAppointmentStatus, 
    updateDoctorAvailability 
} = require('../controllers/doctorDashboardController');
const router = express.Router();

// This line protects all subsequent routes in this file
router.use(protect, isDoctor);

router.get('/appointments', getDoctorAppointments);
router.put('/appointments/:id/status', updateAppointmentStatus);
router.put('/profile', updateDoctorAvailability);
router.get('/profile', getDoctorProfile);
module.exports = router;