const express = require('express');
const { 
    loginUser, 
    registerUser, 
    getCurrentUser
} = require('../controllers/userController');

// 1. Import the middleware from its file
const { protect } = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

// 2. Now the 'protect' function is defined and can be used here
router.get('/me', protect, getCurrentUser);

module.exports = router;