import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import './ThankYouPage.css';

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const donation = location.state?.donation;

  useEffect(() => {
    // Redirect to home if no donation data
    if (!donation) {
      navigate('/');
    }
  }, [donation, navigate]);

  if (!donation) {
    return null;
  }

  const shareText = `I just donated ₹${donation.amount.toLocaleString()} to ${donation.category} through DonateMate! Join me in making a difference. #DonateMate #MakeADifference`;

  const handleShare = (platform) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.origin)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="thank-you-page">
      <div className="container">
        <motion.div
          className="thank-you-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="success-animation"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="success-circle">
              <motion.div
                className="checkmark"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                ✓
              </motion.div>
            </div>
            <motion.div
              className="success-rings"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
            ></motion.div>
          </motion.div>

          <motion.div
            className="thank-you-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1>Thank You for Your Generosity! 🎉</h1>
            <p className="thank-you-subtitle">
              Your donation has been successfully processed. You're now part of a community 
              making real change happen across the world.
            </p>
          </motion.div>

          <motion.div
            className="donation-summary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3>Donation Summary</h3>
            <div className="summary-card">
              <div className="summary-header">
                <div className="donation-icon">💝</div>
                <div className="donation-amount">₹{donation.amount.toLocaleString()}</div>
              </div>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Donor Name:</span>
                  <span>{donation.name}</span>
                </div>
                <div className="summary-row">
                  <span>Email:</span>
                  <span>{donation.email}</span>
                </div>
                <div className="summary-row">
                  <span>Category:</span>
                  <span>{donation.category}</span>
                </div>
                <div className="summary-row">
                  <span>Payment ID:</span>
                  <span className="payment-id">{donation.payment_id}</span>
                </div>
                <div className="summary-row">
                  <span>Status:</span>
                  <span className="status-success">Completed ✓</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="next-steps"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3>What happens next?</h3>
            <div className="steps-grid">
              <div className="step-item">
                <div className="step-icon">📧</div>
                <div className="step-text">
                  <h4>Email Confirmation</h4>
                  <p>You'll receive a detailed receipt and tax deduction certificate via email within 24 hours.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-icon">📊</div>
                <div className="step-text">
                  <h4>Impact Updates</h4>
                  <p>We'll keep you informed about how your donation is making a difference in the community.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-icon">🤝</div>
                <div className="step-text">
                  <h4>Join Our Community</h4>
                  <p>Connect with other donors and stay updated on our latest initiatives and success stories.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="thank-you-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Return Home
              <span className="btn-icon">🏠</span>
            </motion.button>
            
            <motion.button
              className="btn btn-accent btn-lg"
              onClick={() => navigate('/donate')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Donate Again
              <span className="btn-icon">💝</span>
            </motion.button>
          </motion.div>

          <motion.div
            className="social-share"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h4>Share Your Good Deed</h4>
            <p>Inspire others to join the cause by sharing your donation</p>
            <div className="share-buttons">
              <button 
                className="share-btn twitter"
                onClick={() => handleShare('twitter')}
              >
                <span className="share-icon">🐦</span>
                Twitter
              </button>
              <button 
                className="share-btn facebook"
                onClick={() => handleShare('facebook')}
              >
                <span className="share-icon">📘</span>
                Facebook
              </button>
              <button 
                className="share-btn linkedin"
                onClick={() => handleShare('linkedin')}
              >
                <span className="share-icon">💼</span>
                LinkedIn
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYouPage;
