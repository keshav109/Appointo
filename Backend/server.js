const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route imports
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const doctorDashboardRoutes = require('./routes/doctorDashboardRoutes');
const patientRoutes = require('./routes/patientRoutes'); // Add patient routes

const app = express();
const port = process.env.PORT || 5001;

// Middlewares
app.use(cors({
    origin: ['https://appointo-eta.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log("MongoDB connection error:", err));

// Health Check Endpoints
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.get('/health/detailed', async (req, res) => {
    try {
        // Check database connection
        const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
        
        res.status(200).json({
            status: 'OK',
            timestamp: new Date(),
            server: {
                status: 'Running',
                environment: process.env.NODE_ENV || 'development',
                port: port
            },
            database: {
                status: dbStatus
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: error.message
        });
    }
});

// API Endpoints
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/patient', patientRoutes);

// This line registers your doctor dashboard routes. It's crucial.
app.use('/api/doctor-dashboard', doctorDashboardRoutes);
app.use('/api/upload', uploadRoutes);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});