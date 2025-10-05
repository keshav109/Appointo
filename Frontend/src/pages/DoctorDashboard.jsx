import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctorProfile, setDoctorProfile] = useState(null);
    const [availability, setAvailability] = useState('');
    const [timings, setTimings] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Define the data fetching logic in the main component scope
    // We wrap it in useCallback for performance optimization
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) { navigate('/login'); return; }
            
            const [apptRes, profileRes] = await Promise.all([
                axios.get('/api/doctor-dashboard/appointments', { headers: { Authorization: `Bearer ${token}` } }),
                axios.get('/api/doctor-dashboard/profile', { headers: { Authorization: `Bearer ${token}` } })
            ]);

            if (apptRes.data.success) setAppointments(apptRes.data.data);
            if (profileRes.data.success) {
                setDoctorProfile(profileRes.data.data);
                setAvailability(profileRes.data.data.availability);
                setTimings(profileRes.data.data.timings.join(', '));
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // 2. useEffect now just calls the function on component load
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleStatusUpdate = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`/api/doctor-dashboard/appointments/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // 3. This call now works because fetchData is in the same scope
            fetchData();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const updatedProfile = {
                availability,
                timings: timings.split(',').map(t => t.trim())
            };
            await axios.put('/api/doctor-dashboard/profile', updatedProfile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Profile updated successfully!');
            // 4. This call also works, refreshing all data
            fetchData();
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile.");
        }
    };
    
    if (loading) return <div className="text-center p-8">Loading Dashboard...</div>;

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
            
            {/* Profile Management Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Manage Your Profile</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Availability</label>
                            <select value={availability} onChange={e => setAvailability(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Appointment Timings</label>
                            <input type="text" value={timings} onChange={e => setTimings(e.target.value)} placeholder="e.g., 9am-12pm, 2pm-5pm" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save Changes</button>
                    </div>
                </form>
            </div>

            {/* Appointments Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                         <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.map(appt => (
                                <tr key={appt._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{appt.patientDetails.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{appt.patientDetails.age}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{appt.patientDetails.gender}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(appt.date).toLocaleDateString()} - {appt.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{appt.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        {appt.status === 'Pending' && <button onClick={() => handleStatusUpdate(appt._id, 'Confirmed')} className="text-green-600 hover:text-green-900">Confirm</button>}
                                        {appt.status === 'Confirmed' && <button onClick={() => handleStatusUpdate(appt._id, 'Completed')} className="text-blue-600 hover:text-blue-900">Complete</button>}
                                        {appt.status !== 'Cancelled' && appt.status !== 'Completed' && <button onClick={() => handleStatusUpdate(appt._id, 'Cancelled')} className="text-red-600 hover:text-red-900">Cancel</button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;

