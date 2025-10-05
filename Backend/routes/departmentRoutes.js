const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Department routes
router.post('/create', authMiddleware, departmentController.createDepartment);
router.get('/all', authMiddleware, departmentController.getAllDepartments);
router.put('/:id', authMiddleware, departmentController.updateDepartment);
router.delete('/:id', authMiddleware, departmentController.deleteDepartment);
router.get('/stats/:id', authMiddleware, departmentController.getDepartmentStats);

module.exports = router;