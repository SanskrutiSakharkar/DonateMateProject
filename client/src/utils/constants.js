export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const DONATION_CATEGORIES = [
  {
    id: 'education',
    title: 'Education',
    description: 'Empower minds through quality education and learning opportunities for underprivileged children and youth worldwide.',
    color: '#E59560',
    bgGradient: 'linear-gradient(135deg, #E59560, #D47A3C)',
    image: '/images/categories/education.jpg',
    stats: '50,000+ students supported',
    impact: 'Building futures through knowledge',
    fallbackColor: '#E59560'
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Provide essential medical care and health services to communities in need across the globe.',
    color: '#B85C3E',
    bgGradient: 'linear-gradient(135deg, #B85C3E, #A04D30)',
    image: '/images/categories/healthcare.jpg',
    stats: '25,000+ lives saved',
    impact: 'Healing communities with care',
    fallbackColor: '#B85C3E'
  },
  {
    id: 'environment',
    title: 'Environment',
    description: 'Protect our planet through conservation efforts and sustainable environmental initiatives for future generations.',
    color: '#4A7C4E',
    bgGradient: 'linear-gradient(135deg, #4A7C4E, #3F6B43)',
    image: '/images/categories/environment.jpg',
    stats: '1M+ trees planted',
    impact: 'Preserving Earth for future generations',
    fallbackColor: '#4A7C4E'
  },
  {
    id: 'emergency',
    title: 'Emergency Relief',
    description: 'Rapid response and disaster relief for communities affected by natural calamities and humanitarian crises.',
    color: '#D47A3C',
    bgGradient: 'linear-gradient(135deg, #D47A3C, #C06B2A)',
    image: '/images/categories/emergency.jpg',
    stats: '100+ disasters responded',
    impact: 'First aid when it matters most',
    fallbackColor: '#D47A3C'
  },
  {
    id: 'poverty',
    title: 'Poverty Alleviation',
    description: 'Breaking the cycle of poverty through sustainable livelihood and skill development programs for families.',
    color: '#BACEC1',
    bgGradient: 'linear-gradient(135deg, #BACEC1, #A3B8A8)',
    image: '/images/categories/poverty.jpg',
    stats: '30,000+ families empowered',
    impact: 'Creating pathways to prosperity',
    fallbackColor: '#BACEC1'
  },
  {
    id: 'animals',
    title: 'Animal Welfare',
    description: 'Protecting and caring for animals through rescue operations, shelters, and wildlife conservation programs.',
    color: '#2D4A34',
    bgGradient: 'linear-gradient(135deg, #2D4A34, #1D3124)',
    image: '/images/categories/animals.jpg',
    stats: '15,000+ animals rescued',
    impact: 'Giving voice to the voiceless',
    fallbackColor: '#2D4A34'
  }
];

export const DONATION_AMOUNTS = [100, 500, 1000, 2000, 5000, 10000];

export const RAZORPAY_CONFIG = {
  key: process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_1234567890abcdef',
  currency: 'INR',
  name: 'DonateMate',
  description: 'Connecting hearts with verified NGO partners',
  theme: {
    color: '#E59560'
  }
};

export const TOAST_CONFIG = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'
};
