const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { createDoctorAccount } = require('../controllers/adminController');
const router = express.Router();

// All routes here are protected for admins only
router.use(protect, admin);

router.post('/create-doctor', createDoctorAccount);

module.exports = router;