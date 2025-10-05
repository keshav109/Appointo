import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUserMd, FaChartBar, FaHospital, FaTrash } from 'react-icons/fa';
import Analytics from '../components/admin/Analytics';
import DepartmentManager from '../components/admin/DepartmentManager';
import AddDoctorModal from '../components/AddDoctorModal';

const AdminDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get('/api/doctors/get-all-doctors');
            if (data.success) {
                setDoctors(data.data);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`/api/doctors/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Doctor deleted successfully!');
                getAllDoctors(); // Refresh the list
            } catch (error) {
                console.error('Error deleting doctor:', error);
                alert('Failed to delete doctor.');
            }
        }
    };

    useEffect(() => {
        getAllDoctors();
    }, []);

    const [activeTab, setActiveTab] = useState('analytics');

    return (
        <>
            <AddDoctorModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                refreshDoctors={getAllDoctors}
            />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard</h1>

                    {/* Tabs */}
                    <div className="flex space-x-4 mb-6">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab('analytics')}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === 'analytics'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            <FaChartBar className="text-lg" />
                            <span>Analytics</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab('doctors')}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === 'doctors'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            <FaUserMd className="text-lg" />
                            <span>Doctors</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab('departments')}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === 'departments'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            <FaHospital className="text-lg" />
                            <span>Departments</span>
                        </motion.button>
                    </div>

                    {/* Tab Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'analytics' && <Analytics />}
                        {activeTab === 'departments' && <DepartmentManager />}
                        {activeTab === 'doctors' && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Doctors</h2>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                                    >
                                        <FaUserMd />
                                        <span>Add Doctor</span>
                                    </button>
                                </div>

                                {/* Doctors List */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {doctors.map((doctor) => (
                                        <motion.div
                                            key={doctor._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                                        {doctor.name}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300">{doctor.specialty}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        {doctor.phone}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(doctor._id)}
                                                    className="text-red-500 hover:text-red-600 transition-colors"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
