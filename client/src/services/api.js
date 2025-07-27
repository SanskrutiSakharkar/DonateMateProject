import { API_BASE_URL, API_ENDPOINTS } from '../utils/constants';

const apiService = {
    getDonationStats: async () => {
        try {
            // Use API_ENDPOINTS for consistency
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.stats}`);
            if (!response.ok) throw new Error('Failed to fetch stats');
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Error fetching donation stats:', error);
            return { success: false, error: error.message };
        }
    },

    getNGOs: async (category = null) => {
        try {
            const url = category 
                ? `${API_BASE_URL}${API_ENDPOINTS.ngos}?category=${category}`
                : `${API_BASE_URL}${API_ENDPOINTS.ngos}`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch NGOs');
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Error fetching NGOs:', error);
            return { success: false, error: error.message };
        }
    },

    createDonation: async (donationData) => {
        try {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.donations}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donationData),
            });
            
            if (!response.ok) throw new Error('Failed to create donation');
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Error creating donation:', error);
            return { success: false, error: error.message };
        }
    },

    createPaymentOrder: async (amount) => {
        try {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.payment.create}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });
            
            if (!response.ok) throw new Error('Failed to create payment order');
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Error creating payment order:', error);
            return { success: false, error: error.message };
        }
    },

    verifyPayment: async (paymentData) => {
        try {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.payment.verify}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });
            
            if (!response.ok) throw new Error('Failed to verify payment');
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Error verifying payment:', error);
            return { success: false, error: error.message };
        }
    }
};

export { apiService };
