const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        // This line declares the 'user' variable after finding it in the database.
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(200).send({ message: "User does not exist", success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: "Invalid credentials", success: false });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        // This line correctly uses the 'user' variable declared above.
        res.status(200).send({ message: "Login Successful", success: true, token, role: user.role });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send({ success: false, message: `Login Controller Error: ${error.message}` });
    }
};

const registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).send({ message: "User already exists", success: false });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({ name: req.body.name, email: req.body.email, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: "Registered successfully", success: true });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).send({ success: false, message: `Register Controller Error: ${error.message}` });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.status(200).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Get Current User Error:", error);
        res.status(500).send({ success: false, message: `Get Current User Error: ${error.message}` });
    }
};

module.exports = { loginUser, registerUser, getCurrentUser };