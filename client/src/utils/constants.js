// DonateMate Constants - All application constants in one place

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Razorpay Configuration - ADDED
export const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY || 'your_razorpay_key_here';

// Form Validation Rules - ADDED
export const VALIDATION_RULES = {
    // Name validation
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/,
        message: 'Name must be 2-50 characters and contain only letters and spaces'
    },
    
    // Email validation
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    
    // Phone validation (Indian format)
    phone: {
        required: false,
        pattern: /^[6-9]\d{9}$/,
        message: 'Please enter a valid 10-digit Indian phone number'
    },
    
    // Amount validation
    amount: {
        required: true,
        min: 10,
        max: 1000000,
        message: 'Amount must be between ₹10 and ₹10,00,000'
    },
    
    // Category validation
    category: {
        required: true,
        message: 'Please select a donation category'
    },
    
    // Message validation (optional)
    message: {
        required: false,
        maxLength: 500,
        message: 'Message cannot exceed 500 characters'
    }
};

// Animation Variants for Framer Motion
export const ANIMATION_VARIANTS = {
    // Page transitions
    pageInitial: { opacity: 0, y: 20 },
    pageAnimate: { opacity: 1, y: 0 },
    pageExit: { opacity: 0, y: -20 },
    
    // Slide animations
    slideUp: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 }
    },
    
    slideDown: {
        initial: { opacity: 0, y: -30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 30 }
    },
    
    slideLeft: {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -30 }
    },
    
    slideRight: {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 30 }
    },
    
    // Scale animations
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 }
    },
    
    // Fade animations
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    },
    
    // Stagger children
    container: {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    },
    
    // Thank you page specific animations
    thankYou: {
        initial: { opacity: 0, scale: 0.5, rotate: -10 },
        animate: { 
            opacity: 1, 
            scale: 1, 
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    },
    
    celebration: {
        initial: { opacity: 0, y: 50 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: {
                delay: 0.2,
                type: "spring",
                stiffness: 200
            }
        }
    }
};

// Donation Categories
export const DONATION_CATEGORIES = [
  {
    id: 'education',
    name: 'Education',
    description: 'Support educational initiatives and literacy programs',
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
    color: '#BACEC1',
    image: '/images/categories/animals.jpg'
  }
];


// Suggested Donation Amounts
export const SUGGESTED_AMOUNTS = [100, 500, 1000, 2500, 5000, 10000];

// Social Media Links
export const SOCIAL_LINKS = {
    twitter: 'https://twitter.com/donatemate',
    facebook: 'https://facebook.com/donatemate',
    instagram: 'https://instagram.com/donatemate',
    linkedin: 'https://linkedin.com/company/donatemate'
};

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

// App Settings
export const APP_SETTINGS = {
    name: 'DonateMate',
    tagline: 'Connecting Hearts with Verified NGO Partners',
    description: 'DonateMate is a trusted platform that connects generous donors with verified NGOs across India, ensuring transparency and maximum impact for every donation.',
    version: '1.0.0'
};

// Colors
export const COLORS = {
    primary: '#E59560',
    secondary: '#BACEC1',
    accent: '#1D3124',
    cream: '#F6F4E8'
};

// Default export for backwards compatibility
const constants = {
    API_BASE_URL,
    RAZORPAY_KEY,
    VALIDATION_RULES,
    ANIMATION_VARIANTS,
    DONATION_CATEGORIES,
    SUGGESTED_AMOUNTS,
    SOCIAL_LINKS,
    API_ENDPOINTS,
    APP_SETTINGS,
    COLORS
};

export default constants;
