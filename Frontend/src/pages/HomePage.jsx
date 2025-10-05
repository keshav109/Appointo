import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorCard from "../components/DoctorCard";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllDoctors = async (search = "") => {
    try {
      const res = await axios.get(`/api/doctors/get-all-doctors?search=${search}`);
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    getAllDoctors(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1200 600">
            <path className="text-blue-500 opacity-20" fill="currentColor" d="M0 0h1200v600H0z"/>
            <circle className="text-blue-400 opacity-20" cx="720" cy="300" r="200" fill="currentColor"/>
            <circle className="text-blue-300 opacity-20" cx="480" cy="300" r="150" fill="currentColor"/>
          </svg>
        </div>
        <div className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your Health, Our Priority
              </h1>
              <p className="mt-6 text-xl text-blue-100 max-w-xl">
                Connect with trusted healthcare professionals and book appointments hassle-free. Your journey to better health starts here.
              </p>
              <div className="mt-8 space-x-4 flex">
                <a
                  href="#search-doctors"
                  className="inline-flex items-center px-6 py-3 text-base font-medium text-blue-700 bg-white rounded-lg shadow-md hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                >
                  Find a Doctor
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 text-base font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-blue-700 transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="/src/assets/doctorh.png"
                alt="Healthcare Professional"
                className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <div id="search-doctors" className="max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative flex shadow-lg rounded-lg overflow-hidden bg-white">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by doctor's name or specialty..."
              className="w-full px-6 py-4 text-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 font-medium hover:bg-blue-700 transition-all duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Top Doctors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Expert Doctors
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our network of experienced healthcare professionals
            </p>
          </div>
          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M34 24v-4c0-5.523-4.477-10-10-10S14 14.477 14 20v4m20 0l-3 24H17l-3-24m20 0h-20" />
              </svg>
              <p className="mt-4 text-lg text-gray-600">
                No doctors available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;