import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { apiService } from '../../services/api';
import { 
    DONATION_CATEGORIES, 
    SUGGESTED_AMOUNTS, 
    VALIDATION_RULES, 
    RAZORPAY_KEY,
    ANIMATION_VARIANTS
} from '../../utils/constants';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './DonateForm.css';

const DonateForm = ({ selectedCategory, onSuccess, onCategoryChange }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        amount: '',
        category: selectedCategory || '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    // Load Razorpay script properly
    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                // Check if already loaded
                if (window.Razorpay) {
                    setRazorpayLoaded(true);
                    resolve(true);
                    return;
                }

                // Check if script already exists
                const existingScript = document.getElementById('razorpay-checkout-js');
                if (existingScript) {
                    existingScript.onload = () => {
                        setRazorpayLoaded(true);
                        resolve(true);
                    };
                    return;
                }

                // Create new script
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.id = 'razorpay-checkout-js';
                script.async = true;
                
                script.onload = () => {
                    setRazorpayLoaded(true);
                    resolve(true);
                };
                
                script.onerror = () => {
                    console.error('Failed to load Razorpay script');
                    resolve(false);
                };

                document.head.appendChild(script);
            });
        };

        loadRazorpayScript();
    }, []);

    useEffect(() => {
        if (selectedCategory && selectedCategory !== formData.category) {
            setFormData(prev => ({ ...prev, category: selectedCategory }));
            if (onCategoryChange) {
                onCategoryChange(selectedCategory);
            }
        }
    }, [selectedCategory, formData.category, onCategoryChange]);

    const validateField = (name, value) => {
        const rules = VALIDATION_RULES[name];
        if (!rules) return '';

        if (rules.required && (!value || value.toString().trim() === '')) {
            return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }

        if (rules.minLength && value.length < rules.minLength) {
            return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rules.minLength} characters`;
        }

        if (rules.pattern && !rules.pattern.test(value)) {
            if (name === 'email') return 'Please enter a valid email address';
            if (name === 'phone') return 'Please enter a valid 10-digit phone number';
            if (name === 'name') return 'Name can only contain letters and spaces';
        }

        if (rules.min && parseFloat(value) < rules.min) {
            return `Amount must be at least ₹${rules.min}`;
        }

        if (rules.max && parseFloat(value) > rules.max) {
            return `Amount must be less than ₹${rules.max}`;
        }

        return '';
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Always validate required fields based on current step
        if (currentStep >= 1) {
            const nameError = validateField('name', formData.name);
            const emailError = validateField('email', formData.email);
            
            if (nameError) newErrors.name = nameError;
            if (emailError) newErrors.email = emailError;
            
            if (formData.phone) {
                const phoneError = validateField('phone', formData.phone);
                if (phoneError) newErrors.phone = phoneError;
            }
        }

        if (currentStep >= 2) {
            const amountError = validateField('amount', formData.amount);
            if (amountError) newErrors.amount = amountError;
            
            if (!formData.category) {
                newErrors.category = 'Please select a category';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleAmountSelect = (amount) => {
        setFormData(prev => ({ ...prev, amount: amount.toString() }));
        setErrors(prev => ({ ...prev, amount: '' }));
    };

    const handleCategorySelect = (categoryId) => {
        setFormData(prev => ({ ...prev, category: categoryId }));
        setErrors(prev => ({ ...prev, category: '' }));
        if (onCategoryChange) {
            onCategoryChange(categoryId);
        }
    };

    // Fixed navigation functions
    const handleNextStep = () => {
        console.log('Next step clicked, current step:', currentStep);
        if (validateForm()) {
            setCurrentStep(prev => prev + 1);
            console.log('Moving to next step');
        } else {
            console.log('Validation failed:', errors);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    // Fixed Razorpay payment handler
    const handlePayment = async () => {
        console.log('Payment button clicked');
        
        if (!validateForm()) {
            console.log('Form validation failed');
            return;
        }

        if (!razorpayLoaded || !window.Razorpay) {
            toast.error('Payment gateway is loading. Please wait and try again.');
            return;
        }

        try {
            setIsLoading(true);
            toast.info('Initiating payment...');

            const amount = parseFloat(formData.amount);
            
            // Create Razorpay options
            const options = {
                key: RAZORPAY_KEY || 'rzp_test_vmXN7zPSzh3cFp', // Fallback test key
                amount: Math.round(amount * 100), // Convert to paise
                currency: 'INR',
                name: 'DonateMate',
                description: `Donation for ${formData.category || 'General'}`,
                image: '/logo192.png', // Your app logo
                handler: async function (response) {
                    console.log('Payment successful:', response);
                    
                    try {
                        // Create donation record
                        const donationData = {
                            ...formData,
                            amount: amount,
                            payment_id: response.razorpay_payment_id,
                            status: 'completed',
                            created_at: new Date().toISOString()
                        };

                        console.log('Saving donation:', donationData);
                        
                        // Save to database (this might be mock in your current setup)
                        const saveResponse = await apiService.createDonation(donationData);
                        
                        if (saveResponse.success) {
                            toast.success('Thank you! Your donation has been processed successfully.');
                            if (onSuccess) {
                                onSuccess(saveResponse.data);
                            }
                        } else {
                            toast.success('Payment successful! Thank you for your donation.');
                            if (onSuccess) {
                                onSuccess(donationData);
                            }
                        }
                    } catch (error) {
                        console.error('Error saving donation:', error);
                        toast.success('Payment successful! Thank you for your donation.');
                        if (onSuccess) {
                            onSuccess({
                                ...formData,
                                amount: amount,
                                payment_id: response.razorpay_payment_id,
                                status: 'completed',
                                created_at: new Date().toISOString()
                            });
                        }
                    } finally {
                        setIsLoading(false);
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                notes: {
                    category: formData.category,
                    message: formData.message
                },
                theme: {
                    color: '#E59560'
                },
                modal: {
                    ondismiss: function() {
                        console.log('Payment dismissed');
                        toast.info('Payment cancelled');
                        setIsLoading(false);
                    }
                }
            };

            console.log('Opening Razorpay with options:', options);
            
            const rzp = new window.Razorpay(options);
            
            rzp.on('payment.failed', function (response) {
                console.error('Payment failed:', response);
                toast.error(`Payment failed: ${response.error.description}`);
                setIsLoading(false);
            });
            
            rzp.open();

        } catch (error) {
            console.error('Payment initiation error:', error);
            toast.error('Failed to initiate payment. Please try again.');
            setIsLoading(false);
        }
    };

    const getCategoryInfo = (categoryId) => {
        return DONATION_CATEGORIES.find(cat => cat.id === categoryId);
    };

    const selectedCategoryInfo = getCategoryInfo(formData.category);

    return (
        <div className="donate-form">
            {/* Progress Bar */}
            <div className="progress-bar">
                <div className="progress-steps">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                        >
                            <span className="step-number">{step}</span>
                            <span className="step-label">
                                {step === 1 && 'Details'}
                                {step === 2 && 'Amount'}
                                {step === 3 && 'Review'}
                            </span>
                        </div>
                    ))}
                </div>
                <div 
                    className="progress-fill" 
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
            </div>

            <div className="form-content">
                {/* Step 1: Personal Details */}
                {currentStep === 1 && (
                    <motion.div
                        className="form-step"
                        initial="hidden"
                        animate="visible"
                        variants={ANIMATION_VARIANTS.fadeIn}
                    >
                        <h3 className="step-title">Your Details</h3>
                        
                        <div className="form-group">
                            <label className="form-label">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`form-input ${errors.name ? 'error' : ''}`}
                                placeholder="Enter your full name"
                                autoComplete="name"
                                required
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`form-input ${errors.email ? 'error' : ''}`}
                                placeholder="Enter your email address"
                                autoComplete="email"
                                required
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone Number (Optional)</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`form-input ${errors.phone ? 'error' : ''}`}
                                placeholder="Enter your phone number"
                                autoComplete="tel"
                            />
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>

                        <div className="step-actions">
                            <button 
                                type="button" 
                                onClick={handleNextStep}
                                className="btn btn-primary btn-large"
                            >
                                Continue to Amount
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Amount and Category */}
                {currentStep === 2 && (
                    <motion.div
                        className="form-step"
                        initial="hidden"
                        animate="visible"
                        variants={ANIMATION_VARIANTS.fadeIn}
                    >
                        <h3 className="step-title">Donation Amount & Category</h3>
                        
                        <div className="form-group">
                            <label className="form-label">Select Category *</label>
                            <div className="category-grid">
                                {DONATION_CATEGORIES.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => handleCategorySelect(category.id)}
                                        className={`category-option ${formData.category === category.id ? 'selected' : ''}`}
                                    >
                                        <span className="category-icon">{category.icon}</span>
                                        <span className="category-name">{category.name}</span>
                                    </button>
                                ))}
                            </div>
                            {errors.category && <span className="error-message">{errors.category}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Donation Amount (₹) *</label>
                            <div className="amount-options">
                                {SUGGESTED_AMOUNTS.map((amount) => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() => handleAmountSelect(amount)}
                                        className={`amount-option ${formData.amount === amount.toString() ? 'selected' : ''}`}
                                    >
                                        ₹{amount.toLocaleString()}
                                    </button>
                                ))}
                            </div>
                            
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                className={`form-input amount-input ${errors.amount ? 'error' : ''}`}
                                placeholder="Enter custom amount"
                                min="10"
                                max="1000000"
                                required
                            />
                            {errors.amount && <span className="error-message">{errors.amount}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Message (Optional)</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="form-input form-textarea"
                                placeholder="Add a personal message with your donation"
                                rows="3"
                            />
                        </div>

                        <div className="step-actions">
                            <button 
                                type="button" 
                                onClick={handlePrevStep}
                                className="btn btn-secondary"
                            >
                                Back
                            </button>
                            <button 
                                type="button" 
                                onClick={handleNextStep}
                                className="btn btn-primary btn-large"
                            >
                                Review Donation
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Review and Payment */}
                {currentStep === 3 && (
                    <motion.div
                        className="form-step"
                        initial="hidden"
                        animate="visible"
                        variants={ANIMATION_VARIANTS.fadeIn}
                    >
                        <h3 className="step-title">Review Your Donation</h3>
                        
                        <div className="donation-summary">
                            <div className="summary-section">
                                <h4>Donor Information</h4>
                                <div className="summary-item">
                                    <span className="label">Name:</span>
                                    <span className="value">{formData.name}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="label">Email:</span>
                                    <span className="value">{formData.email}</span>
                                </div>
                                {formData.phone && (
                                    <div className="summary-item">
                                        <span className="label">Phone:</span>
                                        <span className="value">{formData.phone}</span>
                                    </div>
                                )}
                            </div>

                            <div className="summary-section">
                                <h4>Donation Details</h4>
                                <div className="summary-item">
                                    <span className="label">Category:</span>
                                    <span className="value">
                                        {selectedCategoryInfo?.icon} {selectedCategoryInfo?.name}
                                    </span>
                                </div>
                                <div className="summary-item">
                                    <span className="label">Amount:</span>
                                    <span className="value amount-highlight">
                                        ₹{parseFloat(formData.amount || 0).toLocaleString()}
                                    </span>
                                </div>
                                {formData.message && (
                                    <div className="summary-item">
                                        <span className="label">Message:</span>
                                        <span className="value">{formData.message}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="payment-info">
                            <div className="info-box">
                                <h4>Secure Payment</h4>
                                <p>Powered by Razorpay - India's most trusted payment gateway</p>
                                {!razorpayLoaded && (
                                    <p className="loading-text">Loading payment gateway...</p>
                                )}
                            </div>
                        </div>

                        <div className="step-actions">
                            <button 
                                type="button" 
                                onClick={handlePrevStep}
                                className="btn btn-secondary"
                                disabled={isLoading}
                            >
                                Back
                            </button>
                            <button 
                                type="button" 
                                onClick={handlePayment}
                                className="btn btn-primary btn-large donate-now-btn"
                                disabled={isLoading || !razorpayLoaded}
                            >
                                {isLoading ? (
                                    <>
                                        <LoadingSpinner size="small" color="white" />
                                        Processing...
                                    </>
                                ) : !razorpayLoaded ? (
                                    'Loading Payment Gateway...'
                                ) : (
                                    <>
                                        Donate ₹{parseFloat(formData.amount || 0).toLocaleString()}
                                        <span className="btn-icon">💝</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default DonateForm;
