import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserMd, FaCalendarAlt, FaUserCircle, FaCog, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ user }) => { // The 'user' prop is passed from App.js
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 sticky top-0 z-50 shadow-lg transition-all duration-300 ease-in-out">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white hover:scale-105 transition-all duration-300">
                        <FaUserMd className="text-3xl" />
                        <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg">Appointo</span>
                    </Link>
                    <ThemeToggle />
                </div>
                <div className="flex items-center">
                    {user ? ( // Check if a user is logged in
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 focus:outline-none group"
                            >
                                <span className="text-sm font-medium text-white">Welcome, {user.name}</span>
                                <img src="https://i.imgur.com/8bDNJjH.png" alt="User Profile" className="w-10 h-10 rounded-full border-2 border-white/50 group-hover:border-white transition-all duration-300" />
                                <FaChevronDown className={`text-white transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 mt-4 w-56 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl py-2 transform opacity-0 scale-95 transition-all duration-200 ease-out origin-top-right animate-fadeIn">
                                    <Link to="/my-appointments" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200" onClick={() => setMenuOpen(false)}>
                                        <FaCalendarAlt className="text-lg" />
                                        <span>My Appointments</span>
                                    </Link>
                                    
                                    {/* Show Patient Dashboard for normal users */}
                                    {user.role === 'user' && (
                                        <Link to="/patient/dashboard" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200" onClick={() => setMenuOpen(false)}>
                                            <FaUserCircle className="text-lg" />
                                            <span>Patient Dashboard</span>
                                        </Link>
                                    )}

                                    {/* Conditionally render the Doctor Dashboard link */}
                                    {user.role === 'doctor' && (
                                        <Link to="/doctor/dashboard" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200" onClick={() => setMenuOpen(false)}>
                                            <FaUserMd className="text-lg" />
                                            <span>Doctor Dashboard</span>
                                        </Link>
                                    )}

                                    {/* Conditionally render the Admin Dashboard link */}
                                    {user.role === 'admin' && (
                                        <Link to="/admin" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200" onClick={() => setMenuOpen(false)}>
                                            <FaCog className="text-lg" />
                                            <span>Admin Dashboard</span>
                                        </Link>
                                    )}

                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200">
                                            <FaSignOutAlt className="text-lg" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link 
                            to="/login" 
                            className="flex items-center space-x-2 bg-white/20 backdrop-blur-md text-white font-semibold px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <FaUserCircle className="text-xl" />
                            <span>Login / SignUp</span>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;