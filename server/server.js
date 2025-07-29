require('dotenv').config({ path: __dirname + '/.env' });

console.log('Environment Variables Check:');
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD ? '***set***' : 'NOT SET');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);

const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

const { pool, testConnection } = require('./config/database');
testConnection();

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

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Log all /api requests
app.use('/api', (req, res, next) => {
    console.log(`Incoming API request: ${req.method} ${req.originalUrl}`);
    next();
});

// Route imports
const donationRoutes = require('./routes/donations');
const paymentRoutes = require('./routes/payments');
const ngoRoutes = require('./routes/ngos');

// Route registrations
app.use('/api/donations', donationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ngos', ngoRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'DonateMate API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Database test
app.get('/api/test-db', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT 1 as test, NOW() as timestamp');
        res.json({ success: true, data: rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Database error', error: err.message });
    }
});

// API index
app.get('/api', (req, res) => {
    res.json({
        name: 'DonateMate API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            donations: '/api/donations',
            ngos: '/api/ngos',
            payments: '/api/payments'
        }
    });
});

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, 'client/build');
    app.use(express.static(buildPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.json({
            message: 'DonateMate API Server (development)',
            frontend: 'Run React separately at http://localhost:3000',
            health: '/api/health'
        });
    });
}

// Catch unknown API routes
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

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Unexpected error'
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`DonateMate Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`API: http://localhost:${PORT}/api`);
    console.log(`Health: http://localhost:${PORT}/api/health`);
    if (process.env.NODE_ENV === 'production') {
        console.log('Serving React frontend from client/build');
    }
});

// Graceful shutdown
const shutdown = async (signal) => {
    console.log(`Received ${signal}. Shutting down...`);
    server.close(async () => {
        console.log('HTTP server closed');
        await pool.end();
        console.log('Database pool closed');
        process.exit(0);
    });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

module.exports = app;
