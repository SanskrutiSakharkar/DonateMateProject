const { pool } = require('../config/database');

class NGO {
    static async findAll(category = null) {
        try {
            let query = 'SELECT * FROM ngo_partners WHERE verified = 1';
            let params = [];
            
            if (category && category !== 'all') {
                query += ' AND LOWER(category) = ?';
                params.push(category.toLowerCase());
            }
            
            query += ' ORDER BY rating DESC, name ASC';
            
            const [rows] = await pool.execute(query, params);
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch NGOs: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await pool.execute('SELECT * FROM ngo_partners WHERE id = ?', [id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Failed to find NGO: ${error.message}`);
        }
    }

    static async findByCategory(category) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM ngo_partners WHERE LOWER(category) = ? AND verified = 1 ORDER BY rating DESC',
                [category.toLowerCase()]
            );
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch NGOs by category: ${error.message}`);
        }
    }

    static async getStats() {
        try {
            const [rows] = await pool.execute(`
                SELECT category, COUNT(*) AS total_ngos, SUM(projects) AS total_projects 
                FROM ngo_partners 
                WHERE verified = 1 
                GROUP BY category
            `);
            return rows;
        } catch (error) {
            throw new Error(`Failed to get NGO statistics: ${error.message}`);
        }
    }
}

module.exports = NGO;
