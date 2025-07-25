const { pool } = require('../config/database');

class Donation {
    static async create(donationData) {
        try {
            // Destructure and provide default values
            const {
                name,
                email,
                phone = null,
                amount,
                category,
                message = null,
                payment_id = null,
                razorpay_order_id = null,
                status = 'pending'
            } = donationData;

            // Validate required fields
            if (!name || !email || !amount || !category) {
                throw new Error('Missing required fields: name, email, amount, category');
            }

            // Ensure amount is a valid number
            const validAmount = parseFloat(amount);
            if (isNaN(validAmount) || validAmount <= 0) {
                throw new Error('Invalid amount provided');
            }

            // Clean and validate data
            const cleanData = {
                name: String(name).trim(),
                email: String(email).trim(),
                phone: phone ? String(phone).trim() : null,
                amount: validAmount,
                category: String(category),
                message: message ? String(message).trim() : null,
                payment_id: payment_id || null,
                razorpay_order_id: razorpay_order_id || null,
                status: status || 'pending'
            };

            console.log('Creating donation with data:', cleanData); // Debug log

            const [result] = await pool.execute(
                `INSERT INTO donations 
                 (name, email, phone, amount, category, message, payment_id, razorpay_order_id, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    cleanData.name,
                    cleanData.email,
                    cleanData.phone,
                    cleanData.amount,
                    cleanData.category,
                    cleanData.message,
                    cleanData.payment_id,
                    cleanData.razorpay_order_id,
                    cleanData.status
                ]
            );
            
            return { 
                id: result.insertId, 
                ...cleanData,
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
                [limit, offset]
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
                    SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as total_amount,
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
