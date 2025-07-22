const express = require('express');
const DonationController = require('../controllers/donationController');
const { validateDonation } = require('../middleware/validation');

const router = express.Router();

// Get all donations
router.get('/', DonationController.getDonations);

// Get donation statistics
router.get('/stats/summary', DonationController.getStats);

// Get donation by ID
router.get('/:id', DonationController.getDonationById);

// Create new donation
router.post('/', validateDonation, DonationController.createDonation);

// Update donation status
router.patch('/:id/status', DonationController.updateDonationStatus);

module.exports = router;
