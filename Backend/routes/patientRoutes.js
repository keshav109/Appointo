const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    updateMedicalHistory,
    getMedicalHistory,
    uploadHealthRecord,
    getHealthRecords,
    createReview,
    getDoctorReviews,
    getPrescriptions
} = require('../controllers/patientController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Medical History Routes
router.put('/medical-history', protect, updateMedicalHistory);
router.get('/medical-history', protect, getMedicalHistory);

// Health Records Routes
router.post('/health-records', protect, upload.single('file'), uploadHealthRecord);
router.get('/health-records', protect, getHealthRecords);

// Review Routes
router.post('/reviews', protect, createReview);
router.get('/reviews/:doctorId', getDoctorReviews);

// Prescription Routes
router.get('/prescriptions', protect, getPrescriptions);

module.exports = router;