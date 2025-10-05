const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    // Link back to the user account
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: String, required: true }, // New field
    fee: { type: Number, required: true },
    address: { type: String, required: true },
    timings: { type: [String], required: true }, // New field for appointment timings
    availability: { type: String, enum: ['Available', 'Unavailable'], default: 'Available' },
    image: { type: String }
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;