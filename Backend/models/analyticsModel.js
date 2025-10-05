const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    appointments: {
        total: Number,
        completed: Number,
        cancelled: Number,
        revenue: Number,
    },
    departmentStats: [{
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'departments'
        },
        appointments: Number,
        revenue: Number
    }],
    doctorStats: [{
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'doctors'
        },
        appointments: Number,
        revenue: Number,
        rating: Number
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('analytics', analyticsSchema);