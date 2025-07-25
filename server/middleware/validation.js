const Joi = require('joi');

const donationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    amount: Joi.number().positive().min(1).max(1000000).required(),
    category: Joi.string().valid('Education', 'Healthcare', 'Environment', 'Emergency Relief', 'Poverty Alleviation', 'Animal Welfare', 'General').required(),
    payment_id: Joi.string().optional(),
    razorpay_order_id: Joi.string().optional(),
    phone: Joi.string().optional(),
    message: Joi.string().optional()
});

const orderSchema = Joi.object({
    amount: Joi.number().positive().min(100).max(100000000).required(), // In paise
    currency: Joi.string().valid('INR').default('INR')
});

const validateDonation = (req, res, next) => {
    const { error } = donationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            details: error.details[0].message
        });
    }
    next();
};

const validateOrder = (req, res, next) => {
    const { error } = orderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            details: error.details[0].message
        });
    }
    next();
};

module.exports = { validateDonation, validateOrder };
