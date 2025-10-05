import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const DepartmentManager = () => {
    const [departments, setDepartments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        head: ''
    });
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDepartments();
        fetchDoctors();
    }, []);

    const fetchDepartments = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('/api/departments/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDepartments(data.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const { data } = await axios.get('/api/doctors/get-all-doctors');
            setDoctors(data.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (editingDepartment) {
                await axios.put(`/api/departments/${editingDepartment._id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.post('/api/departments/create',
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            setIsModalOpen(false);
            setEditingDepartment(null);
            setFormData({ name: '', description: '', head: '' });
            fetchDepartments();
        } catch (error) {
            console.error('Error saving department:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`/api/departments/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchDepartments();
            } catch (error) {
                console.error('Error deleting department:', error);
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Department Management</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                    <FaPlus /> <span>Add Department</span>
                </button>
            </div>

            {/* Department List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map(department => (
                    <motion.div
                        key={department._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{department.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{department.description}</p>
                                {department.head && (
                                    <p className="text-blue-600 dark:text-blue-400 text-sm mt-2">
                                        Head: {department.head.name}
                                    </p>
                                )}
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        setEditingDepartment(department);
                                        setFormData({
                                            name: department.name,
                                            description: department.description,
                                            head: department.head?._id
                                        });
                                        setIsModalOpen(true);
                                    }}
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(department._id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Department Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
                    >
                        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                            {editingDepartment ? 'Edit Department' : 'Add Department'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Department Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        rows="3"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Department Head
                                    </label>
                                    <select
                                        value={formData.head}
                                        onChange={(e) => setFormData(prev => ({ ...prev, head: e.target.value }))}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">Select a doctor</option>
                                        {doctors.map(doctor => (
                                            <option key={doctor._id} value={doctor._id}>
                                                {doctor.name} - {doctor.specialty}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingDepartment(null);
                                        setFormData({ name: '', description: '', head: '' });
                                    }}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    {editingDepartment ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default DepartmentManager;