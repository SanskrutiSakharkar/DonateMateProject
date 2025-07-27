const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import database configuration
const { pool, testConnection } = require('./config/database');

// Test database connection on startup
testConnection();

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'", "https://checkout.razorpay.com"],
            connectSrc: ["'self'", "https://api.razorpay.com"]
        }
    }
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? [
            process.env.FRONTEND_URL,
            'https://*.up.railway.app',
            'https://*.railway.app'
        ]
        : ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Import routes
const donationRoutes = require('./routes/donations');
const paymentRoutes = require('./routes/payments');
const ngoRoutes = require('./routes/ngos');

// API Routes
app.use('/api/donations', donationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ngos', ngoRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'DonateMate API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
    });
});

// Database connection test endpoint
app.get('/api/test-db', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT 1 as test, NOW() as timestamp');
        res.json({ 
            success: true, 
            message: 'Database connection successful',
            data: rows[0]
        });
    } catch (error) {
        console.error('Database test error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Database connection failed',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// API documentation endpoint
app.get('/api', (req, res) => {
    res.json({
        name: 'DonateMate API',
        version: '1.0.0',
        description: 'Backend API for DonateMate donation platform',
        endpoints: {
            health: '/api/health',
            donations: '/api/donations',
            ngos: '/api/ngos',
            payments: '/api/payments'
        },
        environment: process.env.NODE_ENV || 'development'
    });
});

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from React build
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    // Serve images and other assets
    app.use('/images', express.static(path.join(__dirname, '../client/public/images')));
    
    // Handle React routing - send all non-API requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
} else {
    // Development mode message
    app.get('/', (req, res) => {
        res.json({
            message: 'DonateMate API Server',
            mode: 'development',
            frontend: 'Run React app separately on port 3000',
            api_docs: '/api',
            health_check: '/api/health'
        });
    });
}

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.stack);
    
    // Handle specific error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: err.message
        });
    }
    
    if (err.code === 'ECONNREFUSED') {
        return res.status(503).json({
            success: false,
            message: 'Database connection refused',
            error: 'Service temporarily unavailable'
        });
    }
    
    // Default error response
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `API endpoint ${req.originalUrl} not found`,
        available_endpoints: [
            '/api/health',
            '/api/donations',
            '/api/ngos',
            '/api/payments'
        ]
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(` DonateMate Server running on port ${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(` Server URL: http://localhost:${PORT}`);
    console.log(` API Documentation: http://localhost:${PORT}/api`);
    console.log(` Health Check: http://localhost:${PORT}/api/health`);
    
    if (process.env.NODE_ENV === 'production') {
        console.log(' Serving React build files');
        console.log(' Production mode active');
        console.log(' Security middleware enabled');
    } else {
        console.log(' Development mode - React app should run separately');
        console.log(' Debug logging enabled');
    }
});

// Graceful shutdown handling
const gracefulShutdown = async (signal) => {
    console.log(`\n Received ${signal}. Shutting down gracefully...`);
    
    server.close(async () => {
        console.log('HTTP server closed');
        
        try {
            await pool.end();
            console.log('Database connections closed');
            process.exit(0);
        } catch (error) {
            console.error('Error during shutdown:', error);
            process.exit(1);
        }
    });
    
    // Force close after 10 seconds
    setTimeout(() => {
        console.error('Forcing shutdown after timeout');
        process.exit(1);
    }, 10000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

module.exports = app;
