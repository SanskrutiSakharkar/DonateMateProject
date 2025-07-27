const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class PaymentController {
    static async createOrder(req, res) {
        try {
            const { amount, currency = 'INR' } = req.body;

            if (!amount || amount < 100) {
                return res.status(400).json({
                    success: false,
                    message: 'Amount must be at least ₹1'
                });
            }

            const order = await razorpay.orders.create({
                amount: Math.round(amount),
                currency,
                receipt: `receipt_${Date.now()}`,
            });

            res.status(200).json({
                success: true,
                order_id: order.id,
                amount: order.amount,
                key_id: process.env.RAZORPAY_KEY_ID
            });
        } catch (error) {
            console.error('Create order error:', error);
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

            const crypto = require('crypto');
            const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
            hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
            const generated_signature = hmac.digest('hex');

            if (generated_signature === razorpay_signature) {
                res.status(200).json({
                    success: true,
                    message: 'Payment verified successfully'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Payment verification failed'
                });
            }
        } catch (error) {
            console.error('Verify payment error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to verify payment',
                error: error.message
            });
        }
    }
}

module.exports = PaymentController;
