import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => { // The 'user' prop is passed from App.js
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    My<span className="text-gray-700">TURN</span>
                </Link>
                <div className="flex items-center">
                    {user ? ( // Check if a user is logged in
                        <div className="relative">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2 focus:outline-none">
                                <span className="text-sm font-medium text-gray-700">Welcome, {user.name}</span>
                                <img src="https://i.imgur.com/8bDNJjH.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                    <Link to="/my-appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>My Appointments</Link>
                                    
                                    {/* Conditionally render the Doctor Dashboard link */}
                                    {user.doctorId && (
                                        <Link to="/dashboard/doctor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                                            Doctor Dashboard
                                        </Link>
                                    )}

                                    {/* Conditionally render the Admin Dashboard link */}
                                    {user.isAdmin && (
                                        <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                                            Admin Dashboard
                                        </Link>
                                    )}

                                    <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="bg-yellow-400 text-gray-800 font-semibold px-5 py-2 rounded-md hover:bg-yellow-500 transition-colors">
                            Login / SignUp
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;