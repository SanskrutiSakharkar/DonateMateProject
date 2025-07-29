const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'Sana@123',
    database: process.env.MYSQL_DATABASE || 'donate_mate_db',
    port: process.env.MYSQL_PORT || 3306,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

});

// Test connection function
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully');
        console.log(`Connected to: ${process.env.MYSQL_HOST || 'localhost'}:${process.env.MYSQL_PORT || 3306}`);
        console.log(`Database: ${process.env.MYSQL_DATABASE || 'donate_mate_db'}`);
        connection.release();
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        console.error('Check your database credentials and ensure MySQL is running');
        return false;
    }
}

module.exports = { pool, testConnection };
