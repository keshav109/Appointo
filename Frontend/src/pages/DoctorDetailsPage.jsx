import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- Helper function to generate time slots ---
const generateTimeSlots = (timings, durationInMinutes = 30) => {
    const slots = [];
    const parseTime = (timeStr) => {
        const match = timeStr.match(/(\d+):?(\d+)?(am|pm)/i);
        if (!match) return 0; // Return a default if parsing fails
        let [ , hours, minutes, modifier] = match;
        hours = parseInt(hours, 10);
        minutes = minutes ? parseInt(minutes, 10) : 0;
        
        if (modifier.toLowerCase() === 'pm' && hours < 12) hours += 12;
        if (modifier.toLowerCase() === 'am' && hours === 12) hours = 0; // Midnight case
        
        return { hours, minutes };
    };

    timings.forEach(range => {
        const [startStr, endStr] = range.split('-');
        const startTime = parseTime(startStr);
        const endTime = parseTime(endStr);

        let currentTime = new Date();
        currentTime.setHours(startTime.hours, startTime.minutes, 0, 0);

        let endDateTime = new Date();
        endDateTime.setHours(endTime.hours, endTime.minutes, 0, 0);

        while (currentTime < endDateTime) {
            slots.push(currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
            currentTime.setMinutes(currentTime.getMinutes() + durationInMinutes);
        }
    });
    return slots;
};


const DoctorDetailsPage = ({ user }) => {
    const [doctor, setDoctor] = useState(null);
    const [generatedSlots, setGeneratedSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [formData, setFormData] = useState({ name: '', age: '', gender: 'Male' });
    const { id: doctorId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            if (doctorId) {
                try {
                    const { data } = await axios.get(`/api/doctors/${doctorId}`);
                    if (data.success) {
                        setDoctor(data.data);
                        // Generate slots from the doctor's available time ranges
                        if (data.data.timings) {
                            const slots = generateTimeSlots(data.data.timings);
                            setGeneratedSlots(slots);
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch doctor details", error);
                }
            }
        };
        fetchDoctorDetails();
    }, [doctorId]);

    const handleBooking = async (e) => {
        e.preventDefault();
        
        if (!user) {
            alert('You must be logged in to book an appointment.');
            navigate('/login');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/doctors/book-appointment', {
                doctorId: doctorId,
                userId: user._id, // Automatically use the logged-in user's ID
                date: new Date().toISOString().split('T')[0], // Using today's date as an example
                time: selectedTime,
                patientDetails: formData,
            }, { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            
            if (res.data.success) {
                alert('Appointment Booked Successfully!');
                navigate('/my-appointments');
            }
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Booking failed. Please try again.');
        }
    };

    if (!doctor) {
        return <div className="text-center p-8">Loading doctor details...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-xl p-8 md:flex gap-8">
                {/* Left Side: Doctor Info */}
                <div className="md:w-1/3 text-center md:text-left">
                    <img src={doctor.image} alt={doctor.name} className="w-48 h-48 rounded-full mx-auto object-cover mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">{doctor.name}</h1>
                    <p className="text-lg text-blue-600 font-semibold">{doctor.specialty}</p>
                    <p className="text-gray-600 mt-2">{doctor.experience}</p>
                    <p className="text-gray-500 mt-4">{doctor.address}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-4">Fee: ${doctor.fee}</p>
                </div>

                {/* Right Side: Booking Form */}
                <div className="md:w-2/3 mt-8 md:mt-0">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Book an Appointment</h2>
                     <form onSubmit={handleBooking} className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">1. Select an Available Time</h3>
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                {generatedSlots.length > 0 ? (
                                    generatedSlots.map(time => (
                                        <button key={time} type="button" onClick={() => setSelectedTime(time)} className={`p-3 rounded-md font-medium transition-colors ${selectedTime === time ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}>
                                            {time}
                                        </button>
                                    ))
                                ) : (
                                    <p className="col-span-full text-gray-500">No available slots for this doctor.</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">2. Patient Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-md" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                                <input type="number" placeholder="Age" className="w-full p-3 border rounded-md" onChange={(e) => setFormData({...formData, age: e.target.value})} required />
                                <select className="w-full p-3 border rounded-md" defaultValue="Male" onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                                    <option>Male</option><option>Female</option><option>Other</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400" disabled={!selectedTime}>
                            Confirm Appointment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetailsPage;