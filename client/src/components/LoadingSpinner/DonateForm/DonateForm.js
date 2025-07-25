import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { DONATION_CATEGORIES, DONATION_AMOUNTS, RAZORPAY_CONFIG } from '../../utils/constants';
import { donationAPI } from '../../services/api';
import './DonateForm.css';

const DonateForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    category: 'Education',
    message: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set category from navigation state
    if (location.state?.selectedCategory) {
      const categoryTitle = location.state.categoryTitle || 
        DONATION_CATEGORIES.find(cat => cat.id === location.state.selectedCategory)?.title || 
        'Education';
      
      setFormData(prev => ({
        ...prev,
        category: categoryTitle
      }));
    }
  }, [location.state]);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Name validation
      if (!formData.name || !formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }

      // Email validation
      if (!formData.email || !formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      // Phone validation
      if (!formData.phone || !formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else {
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length !== 10) {
          newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
      }
    }

    if (step === 2) {
      // Amount validation
      if (!formData.amount || parseFloat(formData.amount) < 1) {
        newErrors.amount = 'Please enter a valid amount (minimum ₹1)';
      }
      
      // Category validation
      if (!formData.category || !formData.category.trim()) {
        newErrors.category = 'Please select a donation category';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAmountSelect = (amount) => {
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: '' }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(2)) return;

    setLoading(true);

    try {
      console.log('Starting donation process...');
      
      // Create Razorpay order
      const orderResponse = await donationAPI.createOrder(parseFloat(formData.amount));
      
      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Failed to create payment order');
      }

      const { order_id, amount, key_id } = orderResponse;
      console.log('Payment order created:', { order_id, amount, key_id });

      // Initialize Razorpay payment
      const options = {
        ...RAZORPAY_CONFIG,
        key: key_id,
        amount: amount,
        order_id: order_id,
        name: 'DonateMate',
        description: `Donation for ${formData.category}`,
        handler: async function(response) {
          try {
            console.log('Payment successful:', response);
            
            // Prepare donation data with explicit cleaning
            const donationData = {
              name: String(formData.name || '').trim(),
              email: String(formData.email || '').trim(),
              phone: String(formData.phone || '').trim(),
              amount: parseFloat(formData.amount),
              category: String(formData.category || '').trim(),
              message: String(formData.message || '').trim(),
              payment_id: String(response.razorpay_payment_id),
              razorpay_order_id: String(response.razorpay_order_id),
              status: 'completed'
            };

            console.log('Saving donation data:', donationData);

            // Save donation to database via API
            const saveResponse = await donationAPI.saveDonation(donationData);
            
            if (!saveResponse.success) {
              throw new Error(saveResponse.message || 'Failed to save donation details');
            }

            console.log('Donation saved successfully:', saveResponse);
            toast.success('Thank you! Your donation was successful.');
            
            // Navigate to thank you page
            navigate('/thank-you', { 
              state: { 
                donation: {
                  ...donationData,
                  id: saveResponse.data?.id
                }
              } 
            });
          } catch (error) {
            console.error('Error saving donation:', error);
            toast.error(`Failed to save donation details: ${error.message}. Please contact support.`);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
            setLoading(false);
          }
        },
        theme: {
          color: '#E59560' // Warm orange from your color palette
        }
      };

      console.log('Opening Razorpay payment gateway...');
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error processing donation:', error);
      toast.error(`Failed to process donation: ${error.message}`);
      setLoading(false);
    }
  };

  const selectedCategory = DONATION_CATEGORIES.find(cat => 
    cat.title === formData.category
  ) || DONATION_CATEGORIES[0];

  return (
    <div className="donate-form-container">
      <div className="container">
        <div className="donate-form-wrapper">
          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="progress-steps">
              {[1, 2].map(step => (
                <div
                  key={step}
                  className={`progress-step ${currentStep >= step ? 'active' : ''}`}
                >
                  <div className="step-circle">
                    {currentStep > step ? '✓' : step}
                  </div>
                  <span className="step-label">
                    {step === 1 ? 'Personal Info' : 'Donation Details'}
                  </span>
                </div>
              ))}
            </div>
            <div 
              className="progress-fill"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>

          <div className="form-content">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  className="form-step"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="step-header">
                    <h2>Personal Information</h2>
                    <p>Let us know who you are so we can send you donation updates</p>
                  </div>

                  <form className="donation-form">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Enter your full name"
                        required
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
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
                        required
                      />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-input ${errors.phone ? 'error' : ''}`}
                        placeholder="Enter your phone number"
                        required
                      />
                      {errors.phone && <span className="form-error">{errors.phone}</span>}
                    </div>

                    <div className="form-actions">
                      <motion.button
                        type="button"
                        onClick={handleNextStep}
                        className="btn btn-primary btn-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Continue
                        <span className="btn-icon">→</span>
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  className="form-step"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="step-header">
                    <h2>Donation Details</h2>
                    <p>Choose your donation amount and category</p>
                  </div>

                  <form className="donation-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Donation Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        {DONATION_CATEGORIES.map(category => (
                          <option key={category.id} value={category.title}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="selected-category-preview">
                      <div 
                        className="category-preview-card"
                        style={{ background: selectedCategory.bgGradient }}
                      >
                        <div className="preview-content">
                          <h4>{selectedCategory.title}</h4>
                          <p>{selectedCategory.description}</p>
                          <span className="impact-badge">{selectedCategory.impact}</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Donation Amount (₹) *</label>
                      <div className="amount-selection">
                        <div className="amount-buttons">
                          {DONATION_AMOUNTS.map(amount => (
                            <motion.button
                              key={amount}
                              type="button"
                              className={`amount-btn ${formData.amount === amount ? 'active' : ''}`}
                              onClick={() => handleAmountSelect(amount)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              ₹{amount.toLocaleString()}
                            </motion.button>
                          ))}
                        </div>
                        <div className="custom-amount">
                          <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className={`form-input ${errors.amount ? 'error' : ''}`}
                            placeholder="Enter custom amount"
                            min="1"
                            required
                          />
                        </div>
                      </div>
                      {errors.amount && <span className="form-error">{errors.amount}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Message (Optional)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="form-textarea"
                        placeholder="Share why this cause matters to you..."
                        rows="4"
                      ></textarea>
                    </div>

                    <div className="security-notice">
                      <div className="security-badge">
                        <span>Secure payment powered by Razorpay</span>
                      </div>
                    </div>

                    <div className="form-actions">
                      <motion.button
                        type="button"
                        onClick={handlePrevStep}
                        className="btn btn-secondary"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                      >
                        ← Back
                      </motion.button>
                      
                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary btn-lg"
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                      >
                        {loading ? (
                          <>
                            <LoadingSpinner size="small" color="white" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Donate ₹{formData.amount ? parseFloat(formData.amount).toLocaleString() : '0'}
                            <span className="btn-icon">💝</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateForm;
