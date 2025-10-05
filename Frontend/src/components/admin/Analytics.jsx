import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchAnalytics();
    }, [dateRange]);

    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`/api/analytics/range?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnalyticsData(data.data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        }
    };

    const prepareChartData = () => {
        if (!analyticsData) return [];
        return analyticsData.map(data => ({
            date: new Date(data.date).toLocaleDateString(),
            appointments: data.appointments.total,
            revenue: data.appointments.revenue,
            completed: data.appointments.completed,
            cancelled: data.appointments.cancelled
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6"
        >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Analytics Dashboard</h2>
            
            {/* Date Range Selector */}
            <div className="flex gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={dateRange.startDate}
                        onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                        className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={dateRange.endDate}
                        onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                        className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Appointments Chart */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Appointments Overview</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={prepareChartData()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="completed" fill="#4CAF50" name="Completed" />
                                <Bar dataKey="cancelled" fill="#f44336" name="Cancelled" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Revenue Overview</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={prepareChartData()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#2196F3" name="Revenue" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {analyticsData && analyticsData.length > 0 && (
                    <>
                        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                            <h4 className="text-blue-700 dark:text-blue-200 text-lg font-semibold">Total Appointments</h4>
                            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                {analyticsData[analyticsData.length - 1].appointments.total}
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                            <h4 className="text-green-700 dark:text-green-200 text-lg font-semibold">Completed</h4>
                            <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                                {analyticsData[analyticsData.length - 1].appointments.completed}
                            </p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
                            <h4 className="text-red-700 dark:text-red-200 text-lg font-semibold">Cancelled</h4>
                            <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                                {analyticsData[analyticsData.length - 1].appointments.cancelled}
                            </p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                            <h4 className="text-purple-700 dark:text-purple-200 text-lg font-semibold">Revenue</h4>
                            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                                ${analyticsData[analyticsData.length - 1].appointments.revenue}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default Analytics;