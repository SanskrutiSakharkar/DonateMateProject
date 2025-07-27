const express = require('express');
const NGOController = require('../controllers/ngoController');
const router = express.Router();

// GET /api/ngos
router.get('/', NGOController.getAllNGOs);

// GET /api/ngos/stats
router.get('/stats', NGOController.getNGOStats);

// GET /api/ngos/category/:category
router.get('/category/:category', NGOController.getNGOsByCategory);

// GET /api/ngos/:id
router.get('/:id', NGOController.getNGOById);

module.exports = router;
