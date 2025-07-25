const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

class PaymentController {
    static async createOrder(req, res) {
        try {
            const { amount, currency = 'INR' } = req.body;

            const options = {
                amount: amount, // Amount in paise
                currency: currency,
                receipt: `order_${Date.now()}`,
                payment_capture: 1
            };

            const order = await razorpay.orders.create(options);

            res.status(200).json({
                success: true,
                order_id: order.id,
                amount: order.amount,
                currency: order.currency,
                key_id: process.env.RAZORPAY_KEY_ID
            });
        } catch (error) {
            console.error('Payment order creation error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create payment order',
                error: error.message
            });
        }
    }

    static async verifyPayment(req, res) {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

            const sign = razorpay_order_id + '|' + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(sign.toString())
                .digest('hex');

            if (razorpay_signature === expectedSign) {
                res.status(200).json({
                    success: true,
                    message: 'Payment verified successfully'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Invalid payment signature'
                });
            }
        } catch (error) {
            console.error('Payment verification error:', error);
            res.status(500).json({
                success: false,
                message: 'Payment verification failed',
                error: error.message
            });
        }
    }
}

module.exports = PaymentController;
