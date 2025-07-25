import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ngoAPI } from '../../services/api';
import { DONATION_CATEGORIES } from '../../utils/constants';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './NGOPage.css';

const NGOPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || 'all');
  const [ngos, setNGOs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNGOs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ngoAPI.getAllNGOs(selectedCategory === 'all' ? null : selectedCategory);
      
      if (response.success) {
        setNGOs(response.data);
      } else {
        setError('Failed to fetch NGO partners');
      }
    } catch (error) {
      console.error('Error fetching NGOs:', error);
      setError('Failed to load NGO partners. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchNGOs();
  }, [fetchNGOs]);

  const handleDonateToNGO = (ngo) => {
    navigate('/donate', {
      state: {
        selectedNGO: ngo,
        selectedCategory: ngo.category,
        categoryTitle: DONATION_CATEGORIES.find(cat => cat.id === ngo.category)?.title
      }
    });
  };

  if (loading) {
    return (
      <div className="ngo-page-simple">
        <div className="container">
          <div className="loading-container">
            <LoadingSpinner size="large" />
            <p>Loading NGO partners...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ngo-page-simple">
        <div className="container">
          <div className="error-container">
            <h2>Error Loading NGOs</h2>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchNGOs}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ngo-page-simple">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Our NGO Partners</h1>
          <p>Verified organizations working to create positive change</p>
        </div>

        {/* Category Filter Buttons */}
        <div className="filter-section">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All NGOs ({ngos.length})
          </button>
          {DONATION_CATEGORIES.map(category => {
            const count = ngos.filter(ngo => ngo.category === category.id).length;
            return (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.title} ({count})
              </button>
            );
          })}
        </div>

        {/* NGO List */}
        <div className="ngo-list">
          {ngos.length === 0 ? (
            <div className="empty-state">
              <h3>No NGOs Found</h3>
              <p>No NGO partners found for the selected category.</p>
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedCategory('all')}
              >
                Show All NGOs
              </button>
            </div>
          ) : (
            ngos.map((ngo) => (
              <motion.div
                key={ngo.id}
                className="ngo-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="ngo-logo">
                  <img 
                    src={ngo.logo_url} 
                    alt={ngo.name}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(ngo.name)}&background=3B82F6&color=fff&size=60`;
                    }}
                  />
                  {ngo.verified && (
                    <div className="verified-badge">✓</div>
                  )}
                </div>

                <div className="ngo-details">
                  <div className="ngo-header">
                    <h3>{ngo.name}</h3>
                    <div className="ngo-meta">
                      <span className="category-tag">
                        {DONATION_CATEGORIES.find(cat => cat.id === ngo.category)?.title}
                      </span>
                      <div className="rating">
                        <span className="stars">★★★★★</span>
                        <span className="rating-value">{ngo.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="ngo-description">{ngo.description}</p>
                  
                  <div className="ngo-stats">
                    <span className="stat">
                      <strong>{ngo.projects}</strong> Projects
                    </span>
                    <span className="stat">
                      <strong>{ngo.beneficiaries}</strong> Beneficiaries
                    </span>
                  </div>
                </div>

                <div className="ngo-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDonateToNGO(ngo)}
                  >
                    Donate Now
                  </button>
                  <a
                    href={ngo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Visit Website
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NGOPage;
