import React, { useState } from 'react';
import axios from 'axios';

const AddDoctorModal = ({ isOpen, onClose, refreshDoctors }) => {
    // --- Doctor Profile State ---
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [image, setImage] = useState('https://i.imgur.com/8bDNJjH.png'); // Default image
    const [experience, setExperience] = useState('');
const [timings, setTimings] = useState('')
    const [address, setAddress] = useState('');
    const [fee, setFee] = useState(50);
    const [availability, setAvailability] = useState('Available');
const [uploading, setUploading] = useState(false);
    // --- User Credentials State ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setImage(data.url); // Set the image state to the URL from the backend
            setUploading(false);
        } catch (error) {
            console.error('Image upload failed:', error);
            setUploading(false);
            alert('Image upload failed. Please try again.');
        }
    };
    
    // const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //     const token = localStorage.getItem('token');
    //     const doctorData = { 
    //         name, specialty, fee, address, email, password, experience,image,
    //         timings: timings.split(',').map(t => t.trim()) // Convert to array
    //     };
        
    //     await axios.post('/api/admin/create-doctor', doctorData, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     });

    //         alert('Doctor profile and account created successfully!');
    //         refreshDoctors();
    //         onClose();
    //     } catch (error) {
    //         console.error('Error creating doctor:', error);
    //         // Display specific error from backend if available
    //         alert(error.response?.data?.message || 'Failed to create doctor.');
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (uploading) {
            alert('Please wait for the image to finish uploading.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const doctorData = { 
                name, specialty, fee, address, email, password, experience, image,
                timings: timings.split(',').map(t => t.trim())
            };
            
            await axios.post('/api/admin/create-doctor', doctorData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Doctor profile and account created successfully!');
            refreshDoctors();
            onClose();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create doctor.');
        }
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Create New Doctor Profile & Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Doctor Profile Fields */}
                    <h3 className="text-lg font-semibold text-gray-600 border-b pb-2">Doctor Details</h3>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                        <input type="file" onChange={handleImageUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                        {image && !uploading && <img src={image} alt="Profile preview" className="mt-2 h-24 w-24 object-cover rounded-full" />}
                    </div>
                    <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="text" placeholder="Specialty (e.g., Dermatologist)" value={specialty} onChange={e => setSpecialty(e.target.value)} className="w-full p-2 border rounded" required />
                    {/* <input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} className="w-full p-2 border rounded" /> */}
                    <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="number" placeholder="Fee" value={fee} onChange={e => setFee(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="text" placeholder="Experience (e.g., 5 years)" value={experience} onChange={e => setExperience(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="text" placeholder="Timings (e.g., 9am-12pm, 2pm-5pm)" value={timings} onChange={e => setTimings(e.target.value)}className="w-full p-2 border rounded" required />
                    <select value={availability} onChange={e => setAvailability(e.target.value)} className="w-full p-2 border rounded">
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>

                    {/* User Credentials Fields */}
                    <h3 className="text-lg font-semibold text-gray-600 border-b pb-2 mt-6">Login Credentials</h3>
                    <input type="email" placeholder="Doctor's Login Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="password" placeholder="Temporary Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" required />

                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Doctor</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDoctorModal;