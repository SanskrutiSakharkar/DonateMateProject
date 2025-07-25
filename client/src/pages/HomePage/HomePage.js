import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { DONATION_CATEGORIES } from '../../utils/constants';
import { donationAPI } from '../../services/api';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_donations: 0,
    total_amount: 0,
    completed_donations: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await donationAPI.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleDonateNow = () => {
    navigate('/donate');
  };

  const statsItems = [
    {
      number: stats.completed_donations || 1250,
      label: 'Lives Impacted',
      icon: '👥',
      color: '#4A7C4E'
    },
    {
      number: `₹${(stats.total_amount || 850000).toLocaleString()}`,
      label: 'Funds Raised',
      icon: '💰',
      color: '#E59560'
    },
    {
      number: stats.total_donations || 2400,
      label: 'Total Donations',
      icon: '💝',
      color: '#BACEC1'
    },
    {
      number: '50+',
      label: 'NGO Partners',
      icon: '🤝',
      color: '#1D3124'
    }
  ];

  const features = [
    {
      icon: '🏢',
      title: 'Verified NGO Partners',
      description: 'All our NGO partners are thoroughly verified for transparency and impact.'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Industry-standard encryption ensures your donations are safe and secure.'
    },
    {
      icon: '📊',
      title: 'Track Your Impact',
      description: 'Get real-time updates on how your donations are making a difference.'
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      description: 'Support causes across the world and create meaningful change everywhere.'
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-title">
                Connecting Hearts with
                <span className="hero-highlight"> Verified NGO Partners</span>
              </h1>
              <p className="hero-description">
                DonateMate bridges the gap between generous donors and trusted NGOs. 
                Make secure donations, track your impact, and be part of meaningful 
                change across education, healthcare, environment, and more.
              </p>
              
              <div className="hero-actions">
                <motion.button
                  className="btn btn-primary btn-lg hero-btn"
                  onClick={handleDonateNow}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Donating Today
                  <span className="btn-icon">→</span>
                </motion.button>
                
                <motion.button
                  className="btn btn-secondary btn-lg"
                  onClick={() => navigate('/about')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>

              <div className="hero-trust-indicators">
                <div className="trust-item">
                  <span>Secure & Encrypted</span>
                </div>
                <div className="trust-item">
                  <span>Verified NGOs</span>
                </div>
                <div className="trust-item">
                  <span>100% Transparent</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-image"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="hero-cards">
                <div className="hero-card floating">
                  <div className="card-icon">🌟</div>
                  <h3>Make Impact</h3>
                  <p>Your donation creates real change</p>
                </div>
                <div className="hero-card floating-delay">
                  <div className="card-icon">❤️</div>
                  <h3>Build Trust</h3>
                  <p>Transparent and verified processes</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our Impact in Numbers</h2>
            <p>See the difference we're making together</p>
          </motion.div>
          
          <div className="stats-grid">
            {statsItems.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="stat-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-number" style={{ color: stat.color }}>
                  {stat.number}
                </div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-progress">
                  <div className="progress-bar-fill" style={{ backgroundColor: stat.color }}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Choose Your Cause</h2>
            <p className="section-description">
              Every cause matters, and every donation makes a difference. 
              Select a category that resonates with your heart and start making an impact today.
            </p>
          </motion.div>

          <div className="categories-grid">
            {DONATION_CATEGORIES.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Why Choose DonateMate?</h2>
            <p className="section-description">
              We make charitable giving simple, secure, and impactful
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-description">
              Join our community of changemakers and start creating positive impact today. 
              Every donation, big or small, contributes to building a better world.
            </p>
            
            <div className="cta-actions">
              <motion.button
                className="btn btn-primary btn-lg cta-btn"
                onClick={handleDonateNow}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Donating
                <span className="btn-icon">💝</span>
              </motion.button>
              
              <motion.button
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/ngos')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore NGOs
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
