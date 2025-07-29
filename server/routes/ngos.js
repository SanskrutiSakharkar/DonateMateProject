const express = require('express');
const NGOController = require('../controllers/ngoController');

const router = express.Router();

// GET /api/ngos → Fetch all NGOs, optionally with category filter via query param
router.get('/', NGOController.getAllNGOs);

// GET /api/ngos/stats → Return aggregated NGO stats
router.get('/stats', NGOController.getNGOStats);

// GET /api/ngos/category/:category → Get NGOs by category (case-insensitive)
router.get('/category/:category', NGOController.getNGOsByCategory);

// GET /api/ngos/:id → Get single NGO by ID
router.get('/:id', NGOController.getNGOById);

module.exports = router;
