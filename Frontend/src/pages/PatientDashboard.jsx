import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFile, FaHistory, FaPrescription, FaStar, FaVideo, FaNotesMedical, FaCalendarAlt, FaUpload, FaDownload, FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const PatientDashboard = () => {
    const [activeTab, setActiveTab] = useState('medical-history');
    const [medicalHistory, setMedicalHistory] = useState(null);
    const [healthRecords, setHealthRecords] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            if (activeTab === 'medical-history') {
                const res = await axios.get('/api/patient/medical-history', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMedicalHistory(res.data.data || {
                    allergies: [],
                    conditions: [],
                    medications: [],
                    familyHistory: ''
                });
            } else if (activeTab === 'health-records') {
                const res = await axios.get('/api/patient/health-records', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setHealthRecords(res.data.data);
            } else if (activeTab === 'prescriptions') {
                const res = await axios.get('/api/patient/prescriptions', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPrescriptions(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            showNotification('Failed to fetch data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'lab_result');
        formData.append('title', file.name);
        formData.append('date', new Date().toISOString());

        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/patient/health-records', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            showNotification('File uploaded successfully');
            fetchData();
        } catch (error) {
            console.error('Upload error:', error);
            showNotification('Failed to upload file', 'error');
        }
    };

    const updateMedicalHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/patient/medical-history', medicalHistory, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditMode(false);
            showNotification('Medical history updated successfully');
        } catch (error) {
            console.error('Update error:', error);
            showNotification('Failed to update medical history', 'error');
        }
    };

    const renderMedicalHistory = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <FaNotesMedical className="text-blue-500 dark:text-blue-400" />
                    <span>Medical History</span>
                </h3>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        if (editMode) {
                            updateMedicalHistory();
                        } else {
                            setEditMode(true);
                        }
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        editMode ? 'bg-blue-500 text-white dark:bg-blue-600' : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                >
                    <FaEdit className="text-lg" />
                    <span>{editMode ? 'Save Changes' : 'Edit History'}</span>
                </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Allergies</label>
                        <input
                            type="text"
                            className={`w-full px-3 py-2 border rounded-lg transition-colors dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${
                                editMode
                                    ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    : 'border-gray-200 bg-gray-50'
                            }`}
                            placeholder="Enter allergies, separated by commas"
                            value={medicalHistory?.allergies?.join(', ') || ''}
                            onChange={(e) =>
                                setMedicalHistory((prev) => ({
                                    ...prev,
                                    allergies: e.target.value.split(',').map((item) => item.trim())
                                }))
                            }
                            disabled={!editMode}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Medical Conditions</label>
                        <input
                            type="text"
                            className={`w-full px-3 py-2 border rounded-lg transition-colors dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${
                                editMode
                                    ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    : 'border-gray-200 bg-gray-50'
                            }`}
                            placeholder="Enter medical conditions"
                            value={medicalHistory?.conditions?.join(', ') || ''}
                            onChange={(e) =>
                                setMedicalHistory((prev) => ({
                                    ...prev,
                                    conditions: e.target.value.split(',').map((item) => item.trim())
                                }))
                            }
                            disabled={!editMode}
                        />
                    </div>
                </motion.div>
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Medications</label>
                        <input
                            type="text"
                            className={`w-full px-3 py-2 border rounded-lg transition-colors dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${
                                editMode
                                    ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    : 'border-gray-200 bg-gray-50'
                            }`}
                            placeholder="Enter current medications"
                            value={medicalHistory?.medications?.join(', ') || ''}
                            onChange={(e) =>
                                setMedicalHistory((prev) => ({
                                    ...prev,
                                    medications: e.target.value.split(',').map((item) => item.trim())
                                }))
                            }
                            disabled={!editMode}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Family History</label>
                        <textarea
                            className={`w-full px-3 py-2 border rounded-lg transition-colors ${
                                editMode
                                    ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    : 'border-gray-200 bg-gray-50'
                            }`}
                            placeholder="Enter relevant family medical history"
                            value={medicalHistory?.familyHistory || ''}
                            onChange={(e) =>
                                setMedicalHistory((prev) => ({
                                    ...prev,
                                    familyHistory: e.target.value
                                }))
                            }
                            disabled={!editMode}
                            rows={3}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );

    const renderHealthRecords = () => (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <FaFile className="text-blue-500 dark:text-blue-400" />
                    <span>Health Records</span>
                </h3>
                <motion.label
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer transition-colors hover:bg-blue-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaUpload className="text-lg" />
                    <span>Upload Record</span>
                    <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.jpg,.jpeg,.png" />
                </motion.label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {healthRecords.map((record, index) => (
                    <motion.div
                        key={record._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">{record.title}</h4>
                                <p className="text-sm text-gray-500">{new Date(record.date).toLocaleDateString()}</p>
                            </div>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href={record.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600 p-2"
                            >
                                <FaDownload />
                            </motion.a>
                        </div>
                        <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {record.type}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    const renderPrescriptions = () => (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <FaPrescription className="text-blue-500" />
                    <span>Prescriptions</span>
                </h3>
                <select
                    onChange={(e) =>
                        setPrescriptions((prev) =>
                            [...prev].sort((a, b) =>
                                e.target.value === 'date'
                                    ? new Date(b.date) - new Date(a.date)
                                    : a.medicine.localeCompare(b.medicine)
                            )
                        )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="date">Sort by Date</option>
                    <option value="medicine">Sort by Medicine</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prescriptions.map((prescription, index) => (
                    <motion.div
                        key={prescription._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-medium text-gray-900">{prescription.medicine}</h4>
                                <p className="text-sm text-gray-500">Dr. {prescription.doctorId.name}</p>
                                <p className="text-sm text-gray-500">{new Date(prescription.date).toLocaleDateString()}</p>
                            </div>
                            <span
                                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    prescription.active
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                                {prescription.active ? 'Active' : 'Completed'}
                            </span>
                        </div>
                        <div className="mt-3 space-y-2">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Dosage:</span> {prescription.dosage}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Duration:</span> {prescription.duration}
                            </p>
                            {prescription.instructions && (
                                <p className="text-sm text-gray-600 mt-2">
                                    <span className="font-medium">Instructions:</span> {prescription.instructions}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                        <FaNotesMedical className="text-blue-500" />
                        <span>Patient Dashboard</span>
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">Manage your health records, prescriptions, and medical history</p>
                </motion.div>

                {/* Notification */}
                <AnimatePresence>
                    {notification && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`p-4 rounded-lg mb-6 ${
                                notification.type === 'success'
                                    ? 'bg-green-50 text-green-800 border border-green-200'
                                    : 'bg-red-50 text-red-800 border border-red-200'
                            }`}
                        >
                            {notification.message}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex space-x-1 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm mb-6"
                >
                    {['medical-history', 'health-records', 'prescriptions'].map((tab) => (
                        <motion.button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                                activeTab === tab
                                    ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-md scale-100'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 scale-95 hover:scale-100'
                            }`}
                            whileHover={{ scale: activeTab === tab ? 1 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {tab === 'medical-history' && <FaHistory className="text-lg" />}
                            {tab === 'health-records' && <FaFile className="text-lg" />}
                            {tab === 'prescriptions' && <FaPrescription className="text-lg" />}
                            <span className="capitalize">{tab.replace('-', ' ')}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200"
                >
                    <div className="p-6">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your health information...</p>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'medical-history' && renderMedicalHistory()}
                                {activeTab === 'health-records' && renderHealthRecords()}
                                {activeTab === 'prescriptions' && renderPrescriptions()}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PatientDashboard;