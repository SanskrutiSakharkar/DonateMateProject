const express = require('express');
const DonationController = require('../controllers/donationController');
const router = express.Router();

// GET /api/donations
router.get('/', DonationController.getDonations);

// POST /api/donations
router.post('/', DonationController.createDonation);

// GET /api/donations/stats/summary
router.get('/stats/summary', DonationController.getStats);

// GET /api/donations/:id
router.get('/:id', DonationController.getDonationById);

// PUT /api/donations/:id/status
router.put('/:id/status', DonationController.updateDonationStatus);

module.exports = router;
