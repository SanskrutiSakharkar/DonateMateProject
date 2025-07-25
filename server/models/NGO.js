const { pool } = require('../config/database');

class NGO {
    static async findAll(category = null) {
        try {
            let query = 'SELECT * FROM ngo_partners WHERE verified = 1';
            let params = [];
            
            if (category && category !== 'all') {
                query += ' AND category = ?';
                params.push(category);
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
            const [rows] = await pool.execute(
                'SELECT * FROM ngo_partners WHERE id = ? AND verified = 1',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Failed to find NGO: ${error.message}`);
        }
    }

    static async findByCategory(category) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM ngo_partners WHERE category = ? AND verified = 1 ORDER BY rating DESC',
                [category]
            );
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch NGOs by category: ${error.message}`);
        }
    }

    static async create(ngoData) {
        try {
            const { 
                name, 
                logo_url, 
                category, 
                description, 
                website, 
                verified = 1, 
                rating = 4.5, 
                projects = 0, 
                beneficiaries = '0' 
            } = ngoData;
            
            const [result] = await pool.execute(
                'INSERT INTO ngo_partners (name, logo_url, category, description, website, verified, rating, projects, beneficiaries) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [name, logo_url, category, description, website, verified, rating, projects, beneficiaries]
            );
            
            return { id: result.insertId, ...ngoData };
        } catch (error) {
            throw new Error(`Failed to create NGO: ${error.message}`);
        }
    }

    static async update(id, ngoData) {
        try {
            const { 
                name, 
                logo_url, 
                category, 
                description, 
                website, 
                verified, 
                rating, 
                projects, 
                beneficiaries 
            } = ngoData;
            
            const [result] = await pool.execute(
                'UPDATE ngo_partners SET name = ?, logo_url = ?, category = ?, description = ?, website = ?, verified = ?, rating = ?, projects = ?, beneficiaries = ? WHERE id = ?',
                [name, logo_url, category, description, website, verified, rating, projects, beneficiaries, id]
            );
            
            if (result.affectedRows === 0) {
                throw new Error('NGO not found');
            }
            
            return { id, ...ngoData };
        } catch (error) {
            throw new Error(`Failed to update NGO: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM ngo_partners WHERE id = ?',
                [id]
            );
            
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Failed to delete NGO: ${error.message}`);
        }
    }

    static async updateVerificationStatus(id, verified) {
        try {
            const [result] = await pool.execute(
                'UPDATE ngo_partners SET verified = ? WHERE id = ?',
                [verified, id]
            );
            
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Failed to update NGO verification status: ${error.message}`);
        }
    }

    static async getStats() {
        try {
            const [rows] = await pool.execute(`
                SELECT 
                    COUNT(*) as total_ngos,
                    COUNT(CASE WHEN verified = 1 THEN 1 END) as verified_ngos,
                    AVG(rating) as average_rating,
                    SUM(projects) as total_projects,
                    COUNT(DISTINCT category) as total_categories
                FROM ngo_partners
            `);
            return rows[0];
        } catch (error) {
            throw new Error(`Failed to get NGO stats: ${error.message}`);
        }
    }

    static async getCategoryStats() {
        try {
            const [rows] = await pool.execute(`
                SELECT 
                    category,
                    COUNT(*) as ngo_count,
                    AVG(rating) as avg_rating,
                    SUM(projects) as total_projects
                FROM ngo_partners 
                WHERE verified = 1
                GROUP BY category
                ORDER BY ngo_count DESC
            `);
            return rows;
        } catch (error) {
            throw new Error(`Failed to get category stats: ${error.message}`);
        }
    }

    static async searchNGOs(searchTerm) {
        try {
            const searchPattern = `%${searchTerm}%`;
            const [rows] = await pool.execute(
                'SELECT * FROM ngo_partners WHERE verified = 1 AND (name LIKE ? OR description LIKE ?) ORDER BY rating DESC',
                [searchPattern, searchPattern]
            );
            return rows;
        } catch (error) {
            throw new Error(`Failed to search NGOs: ${error.message}`);
        }
    }

    static async getTopRatedNGOs(limit = 5) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM ngo_partners WHERE verified = 1 ORDER BY rating DESC LIMIT ?',
                [limit]
            );
            return rows;
        } catch (error) {
            throw new Error(`Failed to get top rated NGOs: ${error.message}`);
        }
    }

    static async getMostActiveNGOs(limit = 5) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM ngo_partners WHERE verified = 1 ORDER BY projects DESC LIMIT ?',
                [limit]
            );
            return rows;
        } catch (error) {
            throw new Error(`Failed to get most active NGOs: ${error.message}`);
        }
    }

    static async validateNGOData(ngoData) {
        const errors = [];

        if (!ngoData.name || ngoData.name.trim().length < 2) {
            errors.push('NGO name must be at least 2 characters long');
        }

        if (!ngoData.category) {
            errors.push('NGO category is required');
        }

        const validCategories = ['education', 'healthcare', 'environment', 'emergency', 'poverty', 'animals'];
        if (ngoData.category && !validCategories.includes(ngoData.category)) {
            errors.push('Invalid NGO category');
        }

        if (!ngoData.description || ngoData.description.trim().length < 10) {
            errors.push('NGO description must be at least 10 characters long');
        }

        if (ngoData.website && !ngoData.website.match(/^https?:\/\/.+/)) {
            errors.push('Website must be a valid URL starting with http:// or https://');
        }

        if (ngoData.rating && (ngoData.rating < 0 || ngoData.rating > 5)) {
            errors.push('Rating must be between 0 and 5');
        }

        if (ngoData.projects && ngoData.projects < 0) {
            errors.push('Projects count cannot be negative');
        }

        return errors;
    }
}

module.exports = NGO;
