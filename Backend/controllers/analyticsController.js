const Analytics = require('../models/analyticsModel');
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');

// Generate Daily Analytics
const generateDailyAnalytics = async (req, res) => {
    try {
        const date = new Date();
        date.setHours(0, 0, 0, 0);

        // Get appointments for the day
        const appointments = await Appointment.aggregate([
            {
                $match: {
                    date: {
                        $gte: date,
                        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    completed: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
                        }
                    },
                    cancelled: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0]
                        }
                    },
                    revenue: { $sum: "$fee" }
                }
            }
        ]);

        // Get department-wise statistics
        const departmentStats = await Appointment.aggregate([
            {
                $match: {
                    date: {
                        $gte: date,
                        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $lookup: {
                    from: 'doctors',
                    localField: 'doctorId',
                    foreignField: '_id',
                    as: 'doctor'
                }
            },
            {
                $unwind: '$doctor'
            },
            {
                $group: {
                    _id: '$doctor.department',
                    appointments: { $sum: 1 },
                    revenue: { $sum: "$fee" }
                }
            }
        ]);

        // Get doctor-wise statistics
        const doctorStats = await Appointment.aggregate([
            {
                $match: {
                    date: {
                        $gte: date,
                        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: '$doctorId',
                    appointments: { $sum: 1 },
                    revenue: { $sum: "$fee" },
                    avgRating: { $avg: "$rating" }
                }
            }
        ]);

        // Create analytics record
        const analytics = await Analytics.create({
            date,
            appointments: {
                total: appointments[0]?.total || 0,
                completed: appointments[0]?.completed || 0,
                cancelled: appointments[0]?.cancelled || 0,
                revenue: appointments[0]?.revenue || 0
            },
            departmentStats: departmentStats.map(stat => ({
                department: stat._id,
                appointments: stat.appointments,
                revenue: stat.revenue
            })),
            doctorStats: doctorStats.map(stat => ({
                doctor: stat._id,
                appointments: stat.appointments,
                revenue: stat.revenue,
                rating: stat.avgRating
            }))
        });

        res.status(201).json({
            success: true,
            message: 'Analytics generated successfully',
            data: analytics
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating analytics',
            error: error.message
        });
    }
};

// Get Analytics by Date Range
const getAnalyticsByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const analytics = await Analytics.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        })
        .populate('departmentStats.department', 'name')
        .populate('doctorStats.doctor', 'name specialty');

        res.status(200).json({
            success: true,
            data: analytics
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching analytics',
            error: error.message
        });
    }
};

module.exports = {
    generateDailyAnalytics,
    getAnalyticsByDateRange
};