// DonateMate Constants - All application constants in one place

// Donation Categories with Images and Colors
export const DONATION_CATEGORIES = [
    {
        id: 'education',
        name: 'Education',
        description: 'Support educational initiatives and literacy programs',
        color: '#E59560',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=200&fit=crop&crop=center'
    },
    {
        id: 'healthcare',
        name: 'Healthcare',
        description: 'Provide medical aid and healthcare services',
        color: '#1D3124',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&crop=center'
    },
    {
        id: 'environment',
        name: 'Environment',
        description: 'Protect our planet and combat climate change',
        color: '#BACEC1',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop&crop=center'
    },
    {
        id: 'emergency',
        name: 'Emergency Relief',
        description: 'Disaster relief and emergency assistance',
        color: '#E59560',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=200&fit=crop&crop=center'
    },
    {
        id: 'poverty',
        name: 'Poverty Alleviation',
        description: 'Help communities break the cycle of poverty',
        color: '#1D3124',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=200&fit=crop&crop=center'
    },
    {
        id: 'animals',
        name: 'Animal Welfare',
        description: 'Protect and care for animals in need',
        color: '#BACEC1',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=200&fit=crop&crop=center'
    }
];

// Suggested Donation Amounts
export const SUGGESTED_AMOUNTS = [100, 500, 1000, 2500, 5000, 10000];

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
        pattern: /^[6-9]\d{9}$/,
        minLength: 10,
        maxLength: 10
    },
    amount: {
        required: true,
        min: 10,
        max: 1000000
    }
};

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Endpoints Configuration
export const API_ENDPOINTS = {
    base: API_BASE_URL,
    donations: '/donations',
    ngos: '/ngos',
    categories: '/categories',
    stats: '/stats',
    payment: {
        create: '/payment/create-order',
        verify: '/payment/verify'
    }
};

// Razorpay Configuration
export const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_vmXN7zPSzh3cFp';

// Social Media Links
export const SOCIAL_LINKS = {
    twitter: 'https://twitter.com/donatemate',
    facebook: 'https://facebook.com/donatemate',
    instagram: 'https://instagram.com/donatemate',
    linkedin: 'https://linkedin.com/company/donatemate'
};

// Animation Variants for Framer Motion
export const ANIMATION_VARIANTS = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.6 }
        }
    },
    slideIn: {
        hidden: { x: -50, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1,
            transition: { duration: 0.6 }
        }
    },
    scaleIn: {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.6 }
        }
    },
    stagger: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }
};

// Toast Messages
export const TOAST_MESSAGES = {
    success: {
        donation: 'Thank you! Your donation has been processed successfully.',
        form: 'Form submitted successfully!',
        payment: 'Payment completed successfully!'
    },
    error: {
        network: 'Network error. Please check your connection.',
        payment: 'Payment failed. Please try again.',
        validation: 'Please fill in all required fields correctly.',
        generic: 'Something went wrong. Please try again.'
    },
    info: {
        loading: 'Processing your request...',
        redirect: 'Redirecting you to payment gateway...',
        saving: 'Saving your information...'
    }
};

// App Settings
export const APP_SETTINGS = {
    name: 'DonateMate',
    tagline: 'Connecting Hearts with Verified NGO Partners',
    description: 'DonateMate is a trusted platform that connects generous donors with verified NGOs across India, ensuring transparency and maximum impact for every donation.',
    version: '1.0.0',
    contact: {
        email: 'support@donatemate.org',
        phone: '+91-9876543210'
    },
    social: SOCIAL_LINKS
};

// Payment Status Constants
export const PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled'
};

// Local Storage Keys
export const STORAGE_KEYS = {
    USER_PREFERENCES: 'donatemate_user_preferences',
    DONATION_DRAFT: 'donatemate_donation_draft',
    THEME: 'donatemate_theme'
};

// Color Palette Constants
export const COLORS = {
    primary: '#E59560',
    primaryLight: '#F0A976',
    primaryDark: '#D4824A',
    secondary: '#BACEC1',
    accent: '#1D3124',
    cream: '#F6F4E8',
    success: '#4A7C59',
    error: '#D2691E',
    warning: '#E59560',
    info: '#6B8E7A'
};

// Breakpoints for Responsive Design
export const BREAKPOINTS = {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    large: '1200px'
};

// ESLINT FIX: Assign object to variable before exporting as default
const constants = {
    DONATION_CATEGORIES,
    SUGGESTED_AMOUNTS,
    VALIDATION_RULES,
    RAZORPAY_KEY,
    ANIMATION_VARIANTS,
    TOAST_MESSAGES,
    APP_SETTINGS,
    API_ENDPOINTS,
    API_BASE_URL,
    SOCIAL_LINKS,
    PAYMENT_STATUS,
    STORAGE_KEYS,
    COLORS,
    BREAKPOINTS
};

export default constants;
