import React from 'react';
import { motion } from 'framer-motion';
import DonateForm from '../../components/DonateForm/DonateForm';
import './DonatePage.css';

const DonatePage = () => {
  return (
    <div className="donate-page">
      <motion.section 
        className="donate-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="donate-hero-content">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1>Make a Difference Today</h1>
              <p>Your contribution creates ripples of positive change that extend far beyond what you can imagine. Join thousands of donors who are building a better tomorrow.</p>
              
              <div className="trust-indicators">
                <div className="trust-item">
                  <span>Secure Payment</span>
                </div>
                <div className="trust-item">
                  <span>100% Transparent</span>
                </div>
                <div className="trust-item">
                  <span>Trusted Platform</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <DonateForm />
    </div>
  );
};

export default DonatePage;
