import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddDoctorModal from '../components/AddDoctorModal'; // Import the modal

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

    return (
        <>
            <AddDoctorModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                refreshDoctors={getAllDoctors}
            />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Manage Doctors</h2>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Add New Doctor
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialty</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {doctors.map(doctor => (
                                    <tr key={doctor._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{doctor.specialty}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                            <button onClick={() => handleDelete(doctor._id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
