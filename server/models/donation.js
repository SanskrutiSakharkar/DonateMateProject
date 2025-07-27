const { pool } = require('../config/database');

class Donation {
    static async create(donationData) {
        try {
            console.log('Creating donation with data:', donationData);

            // Extract and sanitize data with explicit null handling
            const name = donationData.name ? String(donationData.name).trim() : null;
            const email = donationData.email ? String(donationData.email).trim() : null;
            const phone = donationData.phone ? String(donationData.phone).trim() : null;
            const amount = donationData.amount ? parseFloat(donationData.amount) : null;
            const category = donationData.category ? String(donationData.category).trim() : null;
            const message = donationData.message ? String(donationData.message).trim() : null;
            const payment_id = donationData.payment_id ? String(donationData.payment_id) : null;
            const razorpay_order_id = donationData.razorpay_order_id ? String(donationData.razorpay_order_id) : null;
            const status = donationData.status ? String(donationData.status) : 'pending';

            // Validate required fields
            if (!name) throw new Error('Name is required');
            if (!email) throw new Error('Email is required');
            if (!amount || isNaN(amount) || amount <= 0) throw new Error('Valid amount is required');
            if (!category) throw new Error('Category is required');

            // Insert with explicit values
            const [result] = await pool.execute(
                `INSERT INTO donations 
                 (name, email, phone, amount, category, message, payment_id, razorpay_order_id, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [name, email, phone, amount, category, message, payment_id, razorpay_order_id, status]
            );
            
            return { 
                id: result.insertId, 
                name,
                email,
                phone,
                amount,
                category,
                message,
                payment_id,
                razorpay_order_id,
                status,
                created_at: new Date()
            };
        } catch (error) {
            console.error('Donation creation error:', error);
            throw new Error(`Failed to create donation: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await pool.execute('SELECT * FROM donations WHERE id = ?', [id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Failed to find donation: ${error.message}`);
        }
    }

    static async findAll(limit = 100, offset = 0) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM donations ORDER BY created_at DESC LIMIT ? OFFSET ?',
                [parseInt(limit), parseInt(offset)]
            );
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch donations: ${error.message}`);
        }
    }

    static async updateStatus(id, status) {
        try {
            const [result] = await pool.execute(
                'UPDATE donations SET status = ? WHERE id = ?',
                [status, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Failed to update donation status: ${error.message}`);
        }
    }

    static async getTotalStats() {
        try {
            const [rows] = await pool.execute(`
                SELECT 
                    COUNT(*) as total_donations,
                    COALESCE(SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END), 0) as total_amount,
                    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_donations
                FROM donations
            `);
            return rows[0];
        } catch (error) {
            throw new Error(`Failed to get donation stats: ${error.message}`);
        }
    }
}

module.exports = Donation;
