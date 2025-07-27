import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; // Added Link import
import { motion } from 'framer-motion';
import { apiService } from '../../services/api';
import { DONATION_CATEGORIES, ANIMATION_VARIANTS } from '../../utils/constants';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './NGOPage.css';

const NGOPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ngos, setNgos] = useState([]);
  const [filteredNgos, setFilteredNgos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ─────────────── fetch NGOs once ─────────────── */
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await apiService.getNGOs();
        if (res.success) setNgos(res.data);
        else setError('Failed to fetch NGOs');
      } catch (err) {
        setError('Failed to load NGO partners. Please try again.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  /* ─────────────── filtering ─────────────── */
  useEffect(() => {
    let list = [...ngos];
    if (selectedCategory !== 'all')
      list = list.filter((n) => n.category === selectedCategory);
    if (searchTerm)
      list = list.filter(
        (n) =>
          n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setFilteredNgos(list);
  }, [ngos, selectedCategory, searchTerm]);

  /* ─────────────── helpers ─────────────── */
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'all') searchParams.delete('category');
    else searchParams.set('category', cat);
    setSearchParams(searchParams);
  };

  const getCatInfo = (id) => DONATION_CATEGORIES.find((c) => c.id === id);

  /* ─────────────── render ─────────────── */
  if (isLoading)
    return (
      <div className="ngo-page">
        <div className="container">
          <LoadingSpinner message="Loading NGO partners…" />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="ngo-page">
        <div className="container">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="ngo-page">
      {/* Header */}
      <motion.div className="page-header" initial="hidden" animate="visible" variants={ANIMATION_VARIANTS.fadeIn}>
        <div className="container">
          <h1 className="page-title">Our NGO Partners</h1>
          <p className="page-description">
            Discover verified NGOs making real impact across India.
          </p>
        </div>
      </motion.div>

      {/* Filters & results */}
      <div className="container">
        <motion.div
          className="filters-section"
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.slideIn}
          transition={{ delay: 0.2 }}
        >
          {/* Search */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search NGOs…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          {/* Category buttons */}
          <div className="category-filters">
            <button
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              All Categories
            </button>
            {DONATION_CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`filter-btn ${selectedCategory === c.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(c.id)}
              >
                <span className="filter-icon">{c.icon}</span>
                {c.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          className="results-section"
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.stagger}
          transition={{ delay: 0.3 }}
        >
          <div className="results-header">
            <h2>
              {filteredNgos.length} NGO{filteredNgos.length !== 1 && 's'} found{' '}
              {selectedCategory !== 'all' && (
                <span className="category-label">in {getCatInfo(selectedCategory)?.name}</span>
              )}
            </h2>
          </div>

          {filteredNgos.length === 0 ? (
            <div className="no-results">
              <h3>No NGOs found</h3>
              <p>Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="ngos-grid">
              {filteredNgos.map((ngo, idx) => (
                <motion.div
                  key={ngo.id}
                  className="ngo-card"
                  variants={ANIMATION_VARIANTS.fadeIn}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="ngo-header">
                    <h3 className="ngo-title">{ngo.name}</h3>
                    {ngo.verified && <span className="verified-badge">✓ Verified</span>}
                  </div>
                  <span
                    className="ngo-category-badge"
                    style={{
                      backgroundColor: getCatInfo(ngo.category)?.color + '20',
                      color: getCatInfo(ngo.category)?.color
                    }}
                  >
                    {getCatInfo(ngo.category)?.icon} {ngo.category}
                  </span>
                  <p className="ngo-description">{ngo.description}</p>
                  {ngo.website && (
                    <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="ngo-website">
                      🌐 Visit Website
                    </a>
                  )}
                  <div className="ngo-stats">
                    <div className="stat">
                      <span className="stat-value">⭐ {ngo.rating}</span>
                      <span className="stat-label">Rating</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{ngo.projects}</span>
                      <span className="stat-label">Projects</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{ngo.beneficiaries}</span>
                      <span className="stat-label">Helped</span>
                    </div>
                  </div>
                  <div className="ngo-actions">
                    <Link to={`/donate?category=${ngo.category}`} className="btn btn-primary">
                      Donate Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NGOPage;
