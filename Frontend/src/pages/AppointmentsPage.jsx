// import React, 'react';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchAppointments = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            const res = await axios.get('/api/doctors/get-user-appointments', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch appointments", error);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const handleCancel = async (appointmentId) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            try {
                const token = localStorage.getItem('token');
                // THE FIX: Add the '/api/doctors' prefix to the URL
                const res = await axios.put(
                    `/api/doctors/my-appointments/${appointmentId}/cancel`, 
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (res.data.success) {
                    alert('Appointment cancelled successfully!');
                    fetchAppointments(); // Refresh the list
                }
            } catch (error) {
                console.error("Failed to cancel appointment", error);
                alert("Could not cancel the appointment. Please try again.");
            }
        }
    };

    if (loading) {
        return <div className="text-center p-8">Loading appointments...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Appointments</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                {appointments.length > 0 ? (
                    <div className="space-y-4">
                        {appointments.filter(appt => appt.doctorId).map(appt => (
                            <div key={appt._id} className="border-b pb-4 flex flex-col sm:flex-row justify-between sm:items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">Dr. {appt.doctorId.name}</h2>
                                    <p className="text-gray-600">{appt.doctorId.specialty}</p>
                                    <p className="text-gray-500">{new Date(appt.date).toLocaleDateString()} at {appt.time}</p>
                                </div>
                                <div className="text-left sm:text-right mt-3 sm:mt-0">
                                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        appt.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                        appt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        appt.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                        'bg-red-100 text-red-800'
                                     }`}>{appt.status}</span>
                                     
                                     {(appt.status === 'Pending' || appt.status === 'Confirmed') && (
                                         <button 
                                            onClick={() => handleCancel(appt._id)}
                                            className="mt-2 sm:ml-4 text-sm font-semibold text-red-600 hover:text-red-800"
                                         >
                                             Cancel Appointment
                                         </button>
                                     )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">You have no appointments scheduled.</p>
                )}
            </div>
        </div>
    );
};

export default AppointmentsPage;