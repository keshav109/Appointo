import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('/api/users/login', { email, password });
        if (res.data.success) {
            localStorage.setItem('token', res.data.token);
            // Store the user's role
            localStorage.setItem('role', res.data.role); 
            
            alert('Login Successful!');

            // Redirect based on role
            if (res.data.role === 'admin') {
                navigate('/admin');
            } else if (res.data.role === 'doctor') {
                navigate('/doctor/dashboard');
            } else {
                navigate('/');
            }
            window.location.reload();
        } else {
            alert(res.data.message);
        }
    } catch (error) {
            console.log(error);
            alert('An error occurred during login.');
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
                 <p className="text-center text-gray-600 mt-4">
                    New User?{' '}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Create an Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

