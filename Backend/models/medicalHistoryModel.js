const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    allergies: [String],
    chronicConditions: [String],
    surgeries: [{
        name: String,
        date: Date,
        description: String
    }],
    medications: [{
        name: String,
        dosage: String,
        frequency: String,
        startDate: Date,
        endDate: Date
    }],
    familyHistory: {
        type: String
    }
}, { timestamps: true });

const MedicalHistory = mongoose.model('MedicalHistory', medicalHistorySchema);
module.exports = MedicalHistory;