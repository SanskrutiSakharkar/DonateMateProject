import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method.toUpperCase()} request to ${config.url}`);
    if (config.data) {
      console.log('📤 Request data:', config.data);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response received:', response.data);
    return response.data;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || error.message || 'Network error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export const donationAPI = {
  // Create payment order
  createOrder: async (amount, currency = 'INR') => {
    try {
      console.log('Creating payment order for amount:', amount);
      return await api.post('/payments/create-order', { 
        amount: Math.round(amount * 100), // Convert to paise
        currency 
      });
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    try {
      return await api.post('/payments/verify-payment', paymentData);
    } catch (error) {
      console.error('Verify payment error:', error);
      throw error;
    }
  },

  // Save donation with data validation
  saveDonation: async (donationData) => {
    try {
      console.log('💾 Saving donation data:', donationData);

      // Validate required fields before sending
      if (!donationData.name || !donationData.email || !donationData.amount || !donationData.category) {
        throw new Error('Missing required donation fields');
      }

      // Clean the data explicitly to prevent undefined values
      const cleanData = {
        name: String(donationData.name || '').trim(),
        email: String(donationData.email || '').trim(),
        phone: String(donationData.phone || '').trim(),
        amount: parseFloat(donationData.amount) || 0,
        category: String(donationData.category || '').trim(),
        message: String(donationData.message || '').trim(),
        payment_id: String(donationData.payment_id || ''),
        razorpay_order_id: String(donationData.razorpay_order_id || ''),
        status: String(donationData.status || 'pending')
      };

      console.log('🧹 Cleaned donation data:', cleanData);

      const response = await api.post('/donations', cleanData);
      console.log('💰 Donation saved successfully:', response);
      return response;
    } catch (error) {
      console.error('Save donation error:', error);
      throw error;
    }
  },

  // Get donations
  getDonations: async (limit = 50, offset = 0) => {
    try {
      return await api.get(`/donations?limit=${limit}&offset=${offset}`);
    } catch (error) {
      console.error('Get donations error:', error);
      throw error;
    }
  },

  // Get donation by ID
  getDonationById: async (id) => {
    try {
      return await api.get(`/donations/${id}`);
    } catch (error) {
      console.error('Get donation by ID error:', error);
      throw error;
    }
  },

  // Get donation statistics
  getStats: async () => {
    try {
      return await api.get('/donations/stats/summary');
    } catch (error) {
      console.error('Get stats error:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      return await api.get('/health');
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }
};

export const ngoAPI = {
  // Get all NGOs with optional category filter
  getAllNGOs: async (category = null) => {
    try {
      const url = category ? `/ngos?category=${category}` : '/ngos';
      return await api.get(url);
    } catch (error) {
      console.error('Get NGOs error:', error);
      throw error;
    }
  },

  // Get NGO by ID
  getNGOById: async (id) => {
    try {
      return await api.get(`/ngos/${id}`);
    } catch (error) {
      console.error('Get NGO by ID error:', error);
      throw error;
    }
  },

  // Get NGOs by category
  getNGOsByCategory: async (category) => {
    try {
      return await api.get(`/ngos/category/${category}`);
    } catch (error) {
      console.error('Get NGOs by category error:', error);
      throw error;
    }
  },

  // Get NGO statistics
  getNGOStats: async () => {
    try {
      return await api.get('/ngos/stats');
    } catch (error) {
      console.error('Get NGO stats error:', error);
      throw error;
    }
  }
};

export default api;
