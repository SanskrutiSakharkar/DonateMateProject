const express = require('express');
const PaymentController = require('../controllers/paymentController');
const router = express.Router();

// POST /api/payments/create-order
router.post('/create-order', PaymentController.createOrder);

// POST /api/payments/verify-payment
router.post('/verify-payment', PaymentController.verifyPayment);

module.exports = router;
