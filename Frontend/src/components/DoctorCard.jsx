import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
      <div className="cursor-pointer relative group">
        <Link to={`/doctor/${doctor._id}`} className="block">
          <div className="relative">
            <img 
              className="w-full h-64 object-cover object-center transform transition-transform duration-300 group-hover:scale-105" 
              src={doctor.image || 'https://i.imgur.com/2s31bC5.png'} 
              alt={doctor.name} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>
        <div className="p-6 space-y-4">
          <Link to={`/doctor/${doctor._id}`} className="block group">
            <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {doctor.address}
            </div>
          </Link>
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center ${
                doctor.availability === 'Available'
                  ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                  : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${
                doctor.availability === 'Available' ? 'bg-green-600' : 'bg-red-600'
              }`}></span>
              {doctor.availability}
            </span>
            <Link
              to={`/book/${doctor._id}`}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default DoctorCard;

  