// API Configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? '/api'
    : 'http://localhost:5000/api';

// Razorpay Configuration
export const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_vmXN7zPSzh3cFp';

// Donation Categories
export const DONATION_CATEGORIES = [
    {
        id: 'education',
        name: 'Education',
        description:'Support educational initiatives and literacy programs',
        color: '#E59560',
        image: '/images/categories/education.jpg'
    },
    {
        id: 'healthcare',
        name: 'Healthcare',
        description: 'Provide medical aid and healthcare services',
        color: '#1D3124',
        image: '/images/categories/healthcare.jpg'
    },
    {
        id: 'environment',
        name: 'Environment',
        description: 'Protect our planet and combat climate change',
        color: '#BACEC1',
        image: '/images/categories/environment.jpg'
    },
    {
        id: 'emergency',
        name: 'Emergency Relief',
        description: 'Disaster relief and emergency assistance',
        color: '#E59560',
        image: '/images/categories/emergency.jpg'
    },
    {
        id: 'poverty',
        name: 'Poverty Alleviation',
        description: 'Help communities break the cycle of poverty',
        color: '#1D3124',
        image: '/images/categories/poverty.jpg'
    },
    {
        id: 'animals',
        name: 'Animal Welfare',
        description: 'Protect and care for animals in need',
        icon: '🐾',
        color: '#BACEC1',
        image: '/images/categories/animals.jpg'
    }
];
// Donation Amounts
export const SUGGESTED_AMOUNTS = [500, 1000, 2500, 5000, 10000];

// Application Settings
export const APP_SETTINGS = {
    name: 'DonateMate',
    tagline: 'Connecting Hearts with Verified NGO Partners',
    description: 'A trusted platform to make meaningful donations to verified NGOs across India',
    version: '1.0.0',
    supportEmail: 'support@donatemate.org',
    privacyPolicy: '/privacy-policy',
    termsOfService: '/terms-of-service'
};

// Social Media Links
export const SOCIAL_LINKS = {
    facebook: 'https://facebook.com/donatemate',
    twitter: 'https://twitter.com/donatemate',
    instagram: 'https://instagram.com/donatemate',
    linkedin: 'https://linkedin.com/company/donatemate'
};

// Form Validation Rules
export const VALIDATION_RULES = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
        required: false,
        pattern: /^[6-9]\d{9}$/
    },
    amount: {
        required: true,
        min: 10,
        max: 1000000
    }
};

// Toast Messages
export const TOAST_MESSAGES = {
    success: {
        donation: 'Thank you! Your donation has been processed successfully.',
        copy: 'Copied to clipboard!',
        share: 'Link shared successfully!'
    },
    error: {
        network: 'Network error. Please check your connection.',
        payment: 'Payment failed. Please try again.',
        validation: 'Please fill all required fields correctly.',
        server: 'Server error. Please try again later.'
    },
    info: {
        loading: 'Processing your donation...',
        redirect: 'Redirecting to payment gateway...'
    }
};

// Animation Variants for Framer Motion
export const ANIMATION_VARIANTS = {
    fadeIn: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    },
    slideIn: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    },
    stagger: {
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }
};

export default {
    API_BASE_URL,
    RAZORPAY_KEY,
    DONATION_CATEGORIES,
    SUGGESTED_AMOUNTS,
    APP_SETTINGS,
    SOCIAL_LINKS,
    VALIDATION_RULES,
    TOAST_MESSAGES,
    ANIMATION_VARIANTS
};
