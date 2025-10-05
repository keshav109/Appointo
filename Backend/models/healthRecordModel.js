const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // lab_result, report, prescription, etc.
    title: { type: String, required: true },
    date: { type: Date, required: true },
    fileUrl: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    description: String,
    category: String,
    tags: [String]
}, { timestamps: true });

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);
module.exports = HealthRecord;