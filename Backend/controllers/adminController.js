const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const bcrypt = require('bcryptjs');

const createDoctorAccount = async (req, res) => {
    const { name, specialty, experience, fee, address, timings, email, password,image } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'A user with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'doctor' // Set the role to 'doctor'
        });
        const savedUser = await newUser.save();

        const newDoctor = new Doctor({
            userId: savedUser._id,
            name, specialty, experience, fee, address, timings,image
        });
        await newDoctor.save();

        res.status(201).json({ message: 'Doctor account created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createDoctorAccount };