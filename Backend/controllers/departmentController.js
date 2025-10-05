const Department = require('../models/departmentModel');
const Doctor = require('../models/doctorModel');

// Create Department
const createDepartment = async (req, res) => {
    try {
        const { name, description, head } = req.body;
        const department = await Department.create({ name, description, head });
        res.status(201).json({
            success: true,
            message: 'Department created successfully',
            data: department
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating department',
            error: error.message
        });
    }
};

// Get All Departments
const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
            .populate('head', 'name email phone specialty');
        res.status(200).json({
            success: true,
            data: departments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching departments',
            error: error.message
        });
    }
};

// Update Department
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        ).populate('head');
        
        res.status(200).json({
            success: true,
            message: 'Department updated successfully',
            data: department
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating department',
            error: error.message
        });
    }
};

// Delete Department
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        await Department.findByIdAndDelete(id);
        
        // Update doctors in this department
        await Doctor.updateMany(
            { department: id },
            { $unset: { department: "" } }
        );

        res.status(200).json({
            success: true,
            message: 'Department deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting department',
            error: error.message
        });
    }
};

// Get Department Statistics
const getDepartmentStats = async (req, res) => {
    try {
        const { id } = req.params;
        const doctors = await Doctor.find({ department: id }).count();
        const department = await Department.findById(id)
            .populate('head', 'name email phone specialty');

        res.status(200).json({
            success: true,
            data: {
                department,
                doctorsCount: doctors
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching department statistics',
            error: error.message
        });
    }
};

module.exports = {
    createDepartment,
    getAllDepartments,
    updateDepartment,
    deleteDepartment,
    getDepartmentStats
};