const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    medications: [{
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
        instructions: String
    }],
    diagnosis: String,
    notes: String,
    date: { type: Date, default: Date.now },
    nextVisit: Date,
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;