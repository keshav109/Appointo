const MedicalHistory = require('../models/medicalHistoryModel');
const HealthRecord = require('../models/healthRecordModel');
const Prescription = require('../models/prescriptionModel');
const Review = require('../models/reviewModel');
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');

// Medical History Controller
exports.updateMedicalHistory = async (req, res) => {
    try {
        const history = await MedicalHistory.findOneAndUpdate(
            { userId: req.user._id },
            req.body,
            { new: true, upsert: true }
        );
        res.status(200).json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMedicalHistory = async (req, res) => {
    try {
        const history = await MedicalHistory.findOne({ userId: req.user._id });
        res.status(200).json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Health Records Controller
exports.uploadHealthRecord = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const record = new HealthRecord({
            userId: req.user._id,
            fileUrl: result.secure_url,
            ...req.body
        });
        await record.save();
        res.status(201).json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getHealthRecords = async (req, res) => {
    try {
        const records = await HealthRecord.find({ userId: req.user._id })
            .sort({ date: -1 });
        res.status(200).json({ success: true, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Review Controller
exports.createReview = async (req, res) => {
    try {
        const review = new Review({
            userId: req.user._id,
            ...req.body
        });
        await review.save();
        res.status(201).json({ success: true, data: review });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getDoctorReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ doctorId: req.params.doctorId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Prescription Controller
exports.getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ userId: req.user._id })
            .populate('doctorId', 'name')
            .sort({ date: -1 });
        res.status(200).json({ success: true, data: prescriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Notification Controller for SMS/Email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendAppointmentReminder = async (appointmentId) => {
    try {
        const appointment = await Appointment.findById(appointmentId)
            .populate('userId', 'email name')
            .populate('doctorId', 'name');

        // Send email reminder
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: appointment.userId.email,
            subject: 'Appointment Reminder',
            html: `
                <h2>Appointment Reminder</h2>
                <p>Dear ${appointment.userId.name},</p>
                <p>This is a reminder for your appointment with ${appointment.doctorId.name} 
                   on ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}.</p>
                <p>Please arrive 10 minutes before your scheduled time.</p>
            `
        });

        return { success: true };
    } catch (error) {
        console.error('Reminder Error:', error);
        return { success: false, error: error.message };
    }
};