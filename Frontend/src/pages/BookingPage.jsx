import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import axios from 'axios';

// 2. Accept the 'user' object as a prop here
const BookingPage = ({ user }) => { 
    const { doctorId } = useParams();
    const navigate = useNavigate(); // 3. Initialize useNavigate
    const [selectedTime, setSelectedTime] = useState(null);
    const [formData, setFormData] = useState({ name: '', age: '', gender: 'Male' });

    const timeSlots = ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

    const handleBooking = async (e) => {
        e.preventDefault();

        // Now, this 'user' variable exists because it was passed as a prop
        if (!user) {
            alert('You must be logged in to book an appointment.');
            navigate('/login');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/doctors/book-appointment', {
                doctorId: doctorId,
                userId: user._id, // Use the ID from the user object
                date: new Date().toISOString().split('T')[0], 
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

    return (
        <div className="py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Your Slot</h2>
                <p className="text-gray-500 mb-8">Select a time and provide patient details.</p>
                
                <form onSubmit={handleBooking} className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">1. Select a Time</h3>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                            {timeSlots.map(time => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => setSelectedTime(time)}
                                    className={`p-3 rounded-md text-center font-medium transition-colors ${
                                        selectedTime === time
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                                    }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">2. Patient Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                            <input type="number" placeholder="Age" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, age: e.target.value})} required />
                            <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                     <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">3. Payment Details</h3>
                         <input type="text" placeholder="Card Number (e.g., 4242 4242 4242 4242)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400" disabled={!selectedTime}>
                        Book Appointment & Pay
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;