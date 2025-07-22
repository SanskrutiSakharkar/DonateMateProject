const NGO = require('../models/NGO');

class NGOController {
    static async getAllNGOs(req, res) {
        try {
            const { category } = req.query;
            const ngos = await NGO.findAll(category);
            
            res.status(200).json({
                success: true,
                data: ngos,
                count: ngos.length
            });
        } catch (error) {
            console.error('Get NGOs error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch NGOs',
                error: error.message
            });
        }
    }

    static async getNGOById(req, res) {
        try {
            const { id } = req.params;
            const ngo = await NGO.findById(id);
            
            if (!ngo) {
                return res.status(404).json({
                    success: false,
                    message: 'NGO not found'
                });
            }
            
            res.status(200).json({
                success: true,
                data: ngo
            });
        } catch (error) {
            console.error('Get NGO by ID error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch NGO',
                error: error.message
            });
        }
    }

    static async getNGOsByCategory(req, res) {
        try {
            const { category } = req.params;
            const ngos = await NGO.findByCategory(category);
            
            res.status(200).json({
                success: true,
                data: ngos,
                count: ngos.length,
                category: category
            });
        } catch (error) {
            console.error('Get NGOs by category error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch NGOs by category',
                error: error.message
            });
        }
    }

    static async createNGO(req, res) {
        try {
            const ngoData = req.body;
            const ngo = await NGO.create(ngoData);
            
            res.status(201).json({
                success: true,
                message: 'NGO created successfully',
                data: ngo
            });
        } catch (error) {
            console.error('Create NGO error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create NGO',
                error: error.message
            });
        }
    }

    static async getNGOStats(req, res) {
        try {
            const stats = await NGO.getStats();
            
            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error('Get NGO stats error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch NGO statistics',
                error: error.message
            });
        }
    }
}

module.exports = NGOController;
