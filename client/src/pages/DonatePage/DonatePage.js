import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DonateForm from '../../components/DonateForm/DonateForm';
import { apiService } from '../../services/api';
import { DONATION_CATEGORIES, ANIMATION_VARIANTS } from '../../utils/constants';
import './DonatePage.css';

const DonatePage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [featuredNGOs, setFeaturedNGOs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedNGOs = async () => {
            try {
                setIsLoading(true);
                const response = await apiService.getNGOs(selectedCategory || null);
                if (response.success) {
                    setFeaturedNGOs(response.data.slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching featured NGOs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeaturedNGOs();
    }, [selectedCategory]);

    const handleDonationSuccess = (donationData) => {
        navigate('/thank-you', { 
            state: { 
                donation: donationData,
                category: selectedCategory 
            } 
        });
    };

    const getCategoryInfo = (categoryId) => {
        return DONATION_CATEGORIES.find(cat => cat.id === categoryId);
    };

    const selectedCategoryInfo = getCategoryInfo(selectedCategory);

    return (
        <div className="donate-page">
            {/* Centered Hero Section */}
            <motion.div
                className="donate-hero centered-hero"
                initial="hidden"
                animate="visible"
                variants={ANIMATION_VARIANTS.fadeIn}
            >
                <div className="container">
                    <div className="hero-content centered-content">
                        <h1 className="hero-title">Make a Difference Today</h1>
                        <p className="hero-description">
                            Your donation creates lasting impact. Choose your cause and join thousands 
                            of donors making a positive change in communities across India.
                        </p>
                        
                        {selectedCategoryInfo && (
                            <div className="selected-category">
                                <span className="category-icon">{selectedCategoryInfo.icon}</span>
                                <span>Donating to: <strong>{selectedCategoryInfo.name}</strong></span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <div className="container">
                <div className="donate-content">
                    {/* Donation Form */}
                    <motion.div
                        className="form-section"
                        initial="hidden"
                        animate="visible"
                        variants={ANIMATION_VARIANTS.slideIn}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="form-container">
                            <h2 className="form-title">Complete Your Donation</h2>
                            <DonateForm
                                selectedCategory={selectedCategory}
                                onSuccess={handleDonationSuccess}
                                onCategoryChange={setSelectedCategory}
                            />
                        </div>
                    </motion.div>

                    {/* Featured NGOs Sidebar */}
                    <motion.div
                        className="sidebar-section"
                        initial="hidden"
                        animate="visible"
                        variants={ANIMATION_VARIANTS.slideIn}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="sidebar-container">
                            <h3 className="sidebar-title">
                                {selectedCategory 
                                    ? `Featured ${selectedCategoryInfo?.name} NGOs`
                                    : 'Featured NGO Partners'
                                }
                            </h3>
                            
                            {isLoading ? (
                                <div className="sidebar-loading">
                                    <div className="loading-spinner"></div>
                                    <p>Loading NGOs...</p>
                                </div>
                            ) : (
                                <div className="featured-ngos">
                                    {featuredNGOs.map((ngo, index) => (
                                        <motion.div
                                            key={ngo.id}
                                            className="featured-ngo-card"
                                            variants={ANIMATION_VARIANTS.fadeIn}
                                            transition={{ delay: 0.6 + (index * 0.1) }}
                                        >
                                            <div className="ngo-header">
                                                <h4>{ngo.name}</h4>
                                                {ngo.verified && (
                                                    <span className="verified-badge">✓</span>
                                                )}
                                            </div>
                                            <p className="ngo-description">
                                                {ngo.description.substring(0, 100)}...
                                            </p>
                                            <div className="ngo-stats">
                                                <span className="stat">⭐ {ngo.rating}</span>
                                                <span className="stat">{ngo.beneficiaries} helped</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Trust Section */}
                            <div className="trust-section">
                                <h4>Safe & Secure</h4>
                                <div className="trust-badges">
                                    <div className="trust-badge">
                                        <span className="trust-icon">🔒</span>
                                        <span>SSL Encrypted</span>
                                    </div>
                                    <div className="trust-badge">
                                        <span className="trust-icon">✅</span>
                                        <span>Verified NGOs</span>
                                    </div>
                                    <div className="trust-badge">
                                        <span className="trust-icon">📊</span>
                                        <span>Impact Tracking</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DonatePage;
