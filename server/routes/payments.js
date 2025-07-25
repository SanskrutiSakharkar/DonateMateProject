const express = require('express');
const PaymentController = require('../controllers/paymentController');
const { validateOrder } = require('../middleware/validation');

const router = express.Router();

// Create payment order
router.post('/create-order', validateOrder, PaymentController.createOrder);

// Verify payment
router.post('/verify-payment', PaymentController.verifyPayment);

module.exports = router;
