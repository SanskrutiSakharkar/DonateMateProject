const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
};

// Initialize database tables
const initDatabase = async () => {
    try {
        // Create donations table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS donations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                amount DECIMAL(10,2) NOT NULL,
                category VARCHAR(50) NOT NULL DEFAULT 'General',
                payment_id VARCHAR(255),
                razorpay_order_id VARCHAR(255),
                status VARCHAR(50) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_status (status),
                INDEX idx_created_at (created_at)
            )
        `);

        // Create NGO partners table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS ngo_partners (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                logo_url VARCHAR(255),
                category ENUM('education','healthcare','environment','emergency','poverty','animals') NOT NULL,
                description TEXT,
                website VARCHAR(255),
                verified BOOLEAN DEFAULT 1,
                rating DECIMAL(3,2) DEFAULT 4.5,
                projects INT DEFAULT 0,
                beneficiaries VARCHAR(20) DEFAULT '0',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_category (category),
                INDEX idx_verified (verified)
            )
        `);

        // Insert sample NGO data if table is empty
        const [rows] = await pool.execute('SELECT COUNT(*) as count FROM ngo_partners');
        if (rows[0].count === 0) {
            await pool.execute(`
                INSERT INTO ngo_partners (name, logo_url, category, description, website, verified, rating, projects, beneficiaries) VALUES
                ('Teach for India', '/images/ngo-logos/teach-for-india.png', 'education', 'Eliminating educational inequity by expanding educational opportunity.', 'https://teachforindia.org', 1, 4.8, 45, '50,000+'),
                ('Doctors Without Borders', '/images/ngo-logos/doctors-without-borders.png', 'healthcare', 'Providing medical aid where it is needed most.', 'https://doctorswithoutborders.org', 1, 4.9, 32, '25,000+'),
                ('Greenpeace India', '/images/ngo-logos/greenpeace.png', 'environment', 'Campaigning for a green and peaceful future.', 'https://greenpeace.org', 1, 4.7, 28, '1M+'),
                ('Red Cross Society', '/images/ngo-logos/red-cross.png', 'emergency', 'Humanitarian aid and emergency assistance.', 'https://redcross.org', 1, 4.8, 67, '100,000+'),
                ('Smile Foundation', '/images/ngo-logos/smile-foundation.png', 'poverty', 'Empowering underprivileged children, youth and women.', 'https://smilefoundationindia.org', 1, 4.6, 38, '30,000+'),
                ('PETA India', '/images/ngo-logos/peta.png', 'animals', 'People for the Ethical Treatment of Animals.', 'https://petaindia.com', 1, 4.5, 22, '15,000+')
            `);
        }

        console.log('✅ Database tables initialized');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
    }
};

module.exports = { pool, testConnection, initDatabase };
