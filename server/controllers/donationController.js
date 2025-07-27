const Donation = require('../models/Donation');

class DonationController {
    static async createDonation(req, res) {
        try {
            console.log('=== DONATION CREATION START ===');
            console.log('Request body:', JSON.stringify(req.body, null, 2));

            const {
                name,
                email,
                phone,
                amount,
                category,
                message,
                payment_id,
                razorpay_order_id,
                status
            } = req.body;

            // Basic validation
            if (!name || typeof name !== 'string' || name.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Name is required and must be a non-empty string',
                    received: { name, type: typeof name }
                });
            }

            if (!email || typeof email !== 'string' || !email.includes('@')) {
                return res.status(400).json({
                    success: false,
                    message: 'Valid email is required',
                    received: { email, type: typeof email }
                });
            }

            if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Valid amount is required',
                    received: { amount, type: typeof amount, parsed: parseFloat(amount) }
                });
            }

            if (!category || typeof category !== 'string' || category.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Category is required',
                    received: { category, type: typeof category }
                });
            }

            // Prepare clean data object
            const donationData = {
                name: String(name).trim(),
                email: String(email).trim(),
                phone: phone ? String(phone).trim() : null,
                amount: parseFloat(amount),
                category: String(category).trim(),
                message: message ? String(message).trim() : null,
                payment_id: payment_id ? String(payment_id) : null,
                razorpay_order_id: razorpay_order_id ? String(razorpay_order_id) : null,
                status: status ? String(status) : 'pending'
            };

            console.log('Cleaned donation data:', donationData);

            // Create donation
            const donation = await Donation.create(donationData);
            
            console.log('=== DONATION CREATION SUCCESS ===');
            console.log('Created donation:', donation);

            res.status(201).json({
                success: true,
                message: 'Donation saved successfully',
                data: donation
            });

        } catch (error) {
            console.error('=== DONATION CREATION ERROR ===');
            console.error('Error details:', error);
            
            res.status(500).json({
                success: false,
                message: 'Failed to save donation',
                error: error.message,
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }

    static async getDonations(req, res) {
        try {
            const { limit = 50, offset = 0 } = req.query;
            const donations = await Donation.findAll(parseInt(limit), parseInt(offset));
            
            res.status(200).json({
                success: true,
                data: donations
            });
        } catch (error) {
            console.error('Get donations error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch donations',
                error: error.message
            });
        }
    }

    static async getDonationById(req, res) {
        try {
            const { id } = req.params;
            const donation = await Donation.findById(id);
            
            if (!donation) {
                return res.status(404).json({
                    success: false,
                    message: 'Donation not found'
                });
            }
            
            res.status(200).json({
                success: true,
                data: donation
            });
        } catch (error) {
            console.error('Get donation by ID error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch donation',
                error: error.message
            });
        }
    }

    static async getStats(req, res) {
        try {
            const stats = await Donation.getTotalStats();
            
            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error('Get stats error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch statistics',
                error: error.message
            });
        }
    }

    static async updateDonationStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            
            if (!status) {
                return res.status(400).json({
                    success: false,
                    message: 'Status is required'
                });
            }
            
            const updated = await Donation.updateStatus(id, status);
            
            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: 'Donation not found'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'Donation status updated successfully'
            });
        } catch (error) {
            console.error('Update donation status error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update donation status',
                error: error.message
            });
        }
    }
}

module.exports = DonationController;
