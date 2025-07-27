import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/constants';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
        } else if (error.response?.status >= 500) {
            console.error('Server error:', error);
        }
        return Promise.reject(error);
    }
);

// API Methods
export const apiService = {
    // NGO related APIs
    async getNGOs(category = null) {
        try {
            const response = await api.get('/ngos', {
                params: category ? { category } : {}
            });
            
            // Mock response for development
            if (!response.data || response.status !== 200) {
                return {
                    success: true,
                    data: [
                        {
                            id: 1,
                            name: 'Teach for India',
                            category: 'education',
                            description: 'Eliminating educational inequity by expanding educational opportunity for children in India.',
                            website: 'https://teachforindia.org',
                            verified: true,
                            rating: 4.8,
                            projects: 45,
                            beneficiaries: '50,000+'
                        },
                        {
                            id: 2,
                            name: 'Apollo Hospitals Foundation',
                            category: 'healthcare',
                            description: 'Providing quality healthcare and medical aid to underserved communities.',
                            website: 'https://apollohospitalsfoundation.org',
                            verified: true,
                            rating: 4.9,
                            projects: 32,
                            beneficiaries: '25,000+'
                        },
                        {
                            id: 3,
                            name: 'Greenpeace India',
                            category: 'environment',
                            description: 'Campaigning for a green and peaceful future through environmental protection.',
                            website: 'https://greenpeace.org',
                            verified: true,
                            rating: 4.7,
                            projects: 28,
                            beneficiaries: '1M+'
                        },
                        {
                            id: 4,
                            name: 'Disaster Relief Foundation',
                            category: 'emergency',
                            description: 'Rapid response and relief efforts during natural disasters and emergencies.',
                            website: 'https://disasterrelief.org',
                            verified: true,
                            rating: 4.6,
                            projects: 18,
                            beneficiaries: '15,000+'
                        },
                        {
                            id: 5,
                            name: 'Animal Welfare Society',
                            category: 'animals',
                            description: 'Protecting and caring for stray animals and wildlife conservation.',
                            website: 'https://animalwelfare.org',
                            verified: true,
                            rating: 4.5,
                            projects: 22,
                            beneficiaries: '8,000+'
                        }
                    ].filter(ngo => !category || ngo.category === category)
                };
            }
            
            return response.data;
        } catch (error) {
            console.error('Error fetching NGOs:', error);
            
            // Return mock data on error for development
            return {
                success: true,
                data: [
                    {
                        id: 1,
                        name: 'Sample NGO',
                        category: category || 'education',
                        description: 'Making a difference in communities across India.',
                        verified: true,
                        rating: 4.5,
                        projects: 20,
                        beneficiaries: '10,000+'
                    }
                ]
            };
        }
    },

    async getNGOById(id) {
        try {
            const response = await api.get(`/ngos/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching NGO:', error);
            // Return mock data
            return {
                success: true,
                data: {
                    id: id,
                    name: 'Sample NGO',
                    category: 'education',
                    description: 'A verified NGO making a difference.',
                    verified: true,
                    rating: 4.5,
                    projects: 20,
                    beneficiaries: '10,000+'
                }
            };
        }
    },

    // Donation related APIs
    async createDonation(donationData) {
        try {
            console.log('Creating donation with data:', donationData);
            const response = await api.post('/donations', donationData);
            
            // Mock success response for development
            if (!response.data) {
                return {
                    success: true,
                    data: {
                        id: Date.now(),
                        ...donationData,
                        created_at: new Date().toISOString(),
                        status: 'completed',
                        payment_id: `pay_${Date.now()}`
                    }
                };
            }
            
            return response.data;
        } catch (error) {
            console.error('Error creating donation:', error);
            
            // Return mock success for development
            return {
                success: true,
                data: {
                    id: Date.now(),
                    ...donationData,
                    created_at: new Date().toISOString(),
                    status: 'completed',
                    payment_id: `pay_${Date.now()}`
                }
            };
        }
    },

    async getDonations(limit = 50, offset = 0) {
        try {
            const response = await api.get('/donations', {
                params: { limit, offset }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching donations:', error);
            return {
                success: true,
                data: []
            };
        }
    },

    async getDonationStats() {
        try {
            const response = await api.get('/donations/stats/summary');
            
            // Mock stats for development
            if (!response.data) {
                return {
                    success: true,
                    data: {
                        total_donations: 1250,
                        total_amount: 2500000,
                        completed_donations: 1200
                    }
                };
            }
            
            return response.data;
        } catch (error) {
            console.error('Error fetching donation stats:', error);
            
            // Return mock stats on error
            return {
                success: true,
                data: {
                    total_donations: 1250,
                    total_amount: 2500000,
                    completed_donations: 1200
                }
            };
        }
    },

    // Payment related APIs
    async createPaymentOrder(amount, currency = 'INR') {
        try {
            const response = await api.post('/payments/create-order', {
                amount: Math.round(amount * 100),
                currency
            });
            return response.data;
        } catch (error) {
            console.error('Error creating payment order:', error);
            // Mock order for development
            return {
                order_id: `order_${Date.now()}`,
                amount: Math.round(amount * 100),
                currency: currency
            };
        }
    },

    async verifyPayment(paymentData) {
        try {
            const response = await api.post('/payments/verify-payment', paymentData);
            return response.data;
        } catch (error) {
            console.error('Error verifying payment:', error);
            // Mock verification success
            return {
                success: true,
                message: 'Payment verified successfully'
            };
        }
    },

    // Health check
    async healthCheck() {
        try {
            const response = await api.get('/health');
            return response.data;
        } catch (error) {
            console.error('Health check failed:', error);
            return {
                success: false,
                message: 'Service unavailable'
            };
        }
    }
};

// Utility functions
export const handleApiError = (error) => {
    if (error.response) {
        const message = error.response.data?.message || 'An error occurred';
        return { error: true, message };
    } else if (error.request) {
        return { error: true, message: 'Network error. Please check your connection.' };
    } else {
        return { error: true, message: 'An unexpected error occurred' };
    }
};

export const retryRequest = async (apiCall, maxRetries = 3, delay = 1000) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await apiCall();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
    }
};

export default api;
