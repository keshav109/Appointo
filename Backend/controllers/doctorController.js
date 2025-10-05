const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel'); // 1. Import User model
const bcrypt = require('bcryptjs');
// Get all doctors
const getAllDoctors = async (req, res) => {
    try {
        // Build a query object based on the search term from the request URL
        const query = {};
        if (req.query.search) {
            // Use a case-insensitive regex to search in both name and specialty fields
            query.$or = [
                { name: { $regex: req.query.search, $options: 'i' } },
                { specialty: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        // Use the query object to find the doctors
        const doctors = await Doctor.find(query);
        res.status(200).send({ success: true, data: doctors });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error fetching doctors' });
    }
};
const getUserAppointments = async (req, res) => {
    try {
        // The 'protect' middleware gives us the logged-in user in 'req.user'
        const appointments = await Appointment.find({ userId: req.user._id }).populate('doctorId');
        res.status(200).send({ success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Failed to fetch appointments' });
    }
};
// Book an appointment
const bookAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).send({ success: true, message: 'Appointment booked successfully!' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Failed to book appointment' });
    }
};
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            res.status(200).send({ success: true, data: doctor });
        } else {
            res.status(404).send({ success: false, message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error fetching doctor details' });
    }
};

// Get user appointments
// const getUserAppointments = async (req, res) => {
//     try {
//         const appointments = await Appointment.find({ userId: req.body.userId }).populate('doctorId');
//         res.status(200).send({ success: true, data: appointments });
//     } catch (error) {
//         res.status(500).send({ success: false, message: 'Failed to fetch appointments' });
//     }
// };
const addDoctor = async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        const createdDoctor = await doctor.save();
        res.status(201).json(createdDoctor);
    } catch (error) {
        res.status(500).json({ message: 'Error adding doctor', error });
    }
};

// @desc    Update a doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
const updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            doctor.name = req.body.name || doctor.name;
            doctor.specialty = req.body.specialty || doctor.specialty;
            doctor.image = req.body.image || doctor.image;
            doctor.address = req.body.address || doctor.address;
            doctor.fee = req.body.fee || doctor.fee;
            doctor.availability = req.body.availability || doctor.availability;

            const updatedDoctor = await doctor.save();
            res.json(updatedDoctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating doctor', error });
    }
};

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (doctor) {
            res.json({ message: 'Doctor removed' });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting doctor', error });
    }
};
// const cancelUserAppointment = async (req, res) => {
//     try {
//         const appointment = await Appointment.findById(req.params.id);

//         if (!appointment) {
//             return res.status(404).json({ message: 'Appointment not found' });
//         }

//         // Security Check: Ensure the logged-in user owns this appointment
//         if (appointment.userId.toString() !== req.user._id.toString()) {
//             return res.status(401).json({ message: 'Not authorized to cancel this appointment' });
//         }

//         // Prevent cancelling appointments that are already finished or cancelled
//         if (appointment.status === 'Completed' || appointment.status === 'Cancelled') {
//              return res.status(400).json({ message: 'Appointment cannot be cancelled' });
//         }
        
//         appointment.status = 'Cancelled';
//         await appointment.save();
        
//         res.status(200).json({ success: true, message: 'Appointment cancelled successfully' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: `Cancel Appointment Error: ${error.message}` });
//     }
// };
const cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Security check: Ensure the logged-in user owns this appointment
        if (appointment.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        
        // Update status and save
        appointment.status = 'Cancelled';
        await appointment.save();
        
        res.status(200).json({ success: true, message: 'Appointment cancelled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error while cancelling appointment' });
    }
};
const createDoctorAndUser = async (req, res) => {
    const { name, specialty, image, address, fee, availability, email, password } = req.body;

    try {
        // Check if a user with this email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'A user with this email already exists' });
        }

        // --- Create the Doctor Profile ---
        const newDoctor = new Doctor({
            name, specialty, image, address, fee, availability
        });
        await newDoctor.save();

        // --- Create the User Account ---
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            doctorId: newDoctor._id // Link the new user to the new doctor profile
        });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'Doctor profile and user account created successfully.'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error during creation' });
    }
};

module.exports = { 
    getAllDoctors, 
    bookAppointment, 
    getUserAppointments,
  cancelAppointment,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    createDoctorAndUser,
    getDoctorById
};

