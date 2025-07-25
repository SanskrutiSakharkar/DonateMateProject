const express = require('express');
const NGOController = require('../controllers/ngoController');

const router = express.Router();

// Get all NGOs (with optional category filter)
router.get('/', NGOController.getAllNGOs);

// Get NGO statistics  
router.get('/stats', NGOController.getNGOStats);

// Get NGOs by category
router.get('/category/:category', NGOController.getNGOsByCategory);

// Get NGO by ID
router.get('/:id', NGOController.getNGOById);

// Create new NGO (admin only for now)
router.post('/', NGOController.createNGO);

module.exports = router;
