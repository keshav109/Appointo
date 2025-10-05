const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

// Analytics routes
router.post('/generate', authMiddleware, analyticsController.generateDailyAnalytics);
router.get('/range', authMiddleware, analyticsController.getAnalyticsByDateRange);

module.exports = router;