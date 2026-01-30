const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { requestLogger } = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const alertRoutes = require('./routes/alertRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Update the CORS middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'https://visa-slot-alert-seven.vercel.app', // Your Vercel frontend
    'https://visa-slot-alert.vercel.app', // Also add this in case
    'https://visa-slot-alert-seven.vercel.app' // Exact domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(requestLogger);

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/alerts', alertRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Visa Slot Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for undefined routes
app.use('*', notFoundHandler);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;