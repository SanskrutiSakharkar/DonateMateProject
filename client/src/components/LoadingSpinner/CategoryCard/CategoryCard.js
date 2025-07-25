import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category, index }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDonate = () => {
    navigate('/donate', { 
      state: { 
        selectedCategory: category.id,
        categoryTitle: category.title
      } 
    });
  };

  const handleViewNGOs = () => {
    navigate('/ngos', { 
      state: { 
        category: category.id,
        categoryTitle: category.title
      } 
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      className="category-card-modern"
      data-category={category.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="category-image-container">
        {!imageError ? (
          <>
            <img 
              src={category.image} 
              alt={category.title}
              className={`category-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            {!imageLoaded && (
              <div 
                className="category-image-placeholder"
                style={{ background: category.bgGradient }}
              >
                <div className="placeholder-content">
                  <div className="placeholder-icon">📷</div>
                  <span>Loading...</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div 
            className="category-image-fallback"
            style={{ background: category.bgGradient }}
          >
            <div className="fallback-content">
              <div className="fallback-icon">
                {category.id === 'education' && '📚'}
                {category.id === 'healthcare' && '🏥'}
                {category.id === 'environment' && '🌱'}
                {category.id === 'emergency' && '🚨'}
                {category.id === 'poverty' && '🤝'}
                {category.id === 'animals' && '🐾'}
              </div>
              <span className="fallback-title">{category.title}</span>
            </div>
          </div>
        )}
        
        <div className="category-overlay">
          <div className="category-stats">
            <span className="stats-text">{category.stats}</span>
          </div>
        </div>
      </div>
      
      <div className="category-content-modern">
        <div className="category-header">
          <h3 className="category-title-modern">{category.title}</h3>
          <div className="category-indicator" style={{ backgroundColor: category.color }}></div>
        </div>
        
        <p className="category-description-modern">{category.description}</p>
        
        <div className="impact-section" data-category={category.id}>
          <span className="impact-label">Our Impact:</span>
          <span className="impact-text">{category.impact}</span>
        </div>
        
        <div className="category-actions">
          <motion.button
            className="btn btn-primary category-btn-donate"
            onClick={handleDonate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Donate Now
            <span className="btn-icon">💝</span>
          </motion.button>
          
          <motion.button
            className="btn btn-secondary category-btn-ngos"
            onClick={handleViewNGOs}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View NGOs
            <span className="btn-icon">👥</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
