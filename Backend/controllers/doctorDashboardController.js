const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');

// @desc    Get all appointments for the logged-in doctor
// const getDoctorAppointments = async (req, res) => {
//     try {
//         const appointments = await Appointment.find({ doctorId: req.user.doctorId })
//             .populate('userId', 'name email'); // Get patient name and email
//         res.json({ success: true, data: appointments });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };
const getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.user._id });
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor profile not found for this user.' });
        }
        res.json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: `Get Profile Error: ${error.message}` });
    }
};

const getDoctorAppointments = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.user._id });
        if (!doctor) {
            return res.json({ success: true, data: [] });
        }
        const appointments = await Appointment.find({ doctorId: doctor._id }).populate('userId', 'name email');
        res.json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: `Doctor Appointments Error: ${error.message}` });
    }
};


// This function has been fixed
const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const doctor = await Doctor.findOne({ userId: req.user._id });

        // THE FIX: Check if a doctor profile exists first.
        if (!doctor) {
            return res.status(403).json({ success: false, message: 'Doctor profile not found for this user.' });
        }

        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Ensure the doctor is updating their own appointment
        if (appointment.doctorId.toString() !== doctor._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this appointment' });
        }
        
        appointment.status = status;
        await appointment.save();
        res.json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: `Update Status Error: ${error.message}` });
    }
};

// @desc    Update doctor's availability
const updateDoctorAvailability = async (req, res) => {
    try {
        const { availability, timings } = req.body;
        const doctor = await Doctor.findOne({ userId: req.user._id });

        // THE FIX: Add a check to ensure a doctor profile was found
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor profile not found.' });
        }
        
        if (availability) doctor.availability = availability;
        if (timings) doctor.timings = timings;
        
        const updatedDoctor = await doctor.save();
        res.json({ success: true, data: updatedDoctor });

    } catch (error) {
        res.status(500).json({ success: false, message: `Update Availability Error: ${error.message}` });
    }
};

module.exports = {
    getDoctorProfile,
    getDoctorAppointments,
    updateAppointmentStatus,
    updateDoctorAvailability
};