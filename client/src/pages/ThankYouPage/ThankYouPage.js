import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DONATION_CATEGORIES, ANIMATION_VARIANTS } from '../../utils/constants';
import './ThankYouPage.css';

const ThankYouPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [donation, setDonation] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        // Get donation data from navigation state
        const donationData = location.state?.donation;
        const categoryData = location.state?.category;

        if (!donationData) {
            // If no donation data, redirect to home
            navigate('/', { replace: true });
            return;
        }

        setDonation(donationData);
        setCategory(categoryData);
    }, [location.state, navigate]);

    const getCategoryInfo = (categoryId) => {
        return DONATION_CATEGORIES.find(cat => cat.id === categoryId);
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const shareText = `I just donated ${formatAmount(donation?.amount || 0)} through DonateMate to support ${category || 'various causes'}. Join me in making a difference! #DonateMate #Charity #MakeADifference`;

    const handleShare = (platform) => {
        const url = window.location.origin;
        const text = encodeURIComponent(shareText);
        const shareUrl = encodeURIComponent(url);

        let shareLink = '';
        switch (platform) {
            case 'twitter':
                shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`;
                break;
            case 'facebook':
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${text}`;
                break;
            case 'whatsapp':
                shareLink = `https://wa.me/?text=${text}%20${shareUrl}`;
                break;
            case 'linkedin':
                shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
                break;
            default:
                return;
        }

        window.open(shareLink, '_blank', 'width=600,height=400');
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareText);
            alert('Message copied to clipboard!');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Message copied to clipboard!');
        }
    };

    if (!donation) {
        return null; // Will redirect to home
    }

    const categoryInfo = getCategoryInfo(category);

    return (
        <div className="thank-you-page">
            <motion.div
                className="thank-you-container"
                initial="hidden"
                animate="visible"
                variants={ANIMATION_VARIANTS.fadeIn}
            >
                <div className="container">
                    <motion.div
                        className="thank-you-content"
                        variants={ANIMATION_VARIANTS.scaleIn}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="success-icon">
                            <motion.div
                                className="checkmark"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                            >
                                ✓
                            </motion.div>
                        </div>

                        <h1 className="thank-you-title">Thank You!</h1>
                        <p className="thank-you-subtitle">
                            Your generous donation has been processed successfully and will make a real difference
                        </p>

                        {/* Donation Summary */}
                        <motion.div
                            className="donation-summary"
                            variants={ANIMATION_VARIANTS.fadeIn}
                            transition={{ delay: 0.6 }}
                        >
                            <h2>Donation Summary</h2>
                            <div className="summary-details">
                                <div className="summary-row">
                                    <span className="label">Donation Amount:</span>
                                    <span className="value amount">{formatAmount(donation.amount)}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="label">Donor Name:</span>
                                    <span className="value">{donation.name}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="label">Email:</span>
                                    <span className="value">{donation.email}</span>
                                </div>
                                {category && categoryInfo && (
                                    <div className="summary-row">
                                        <span className="label">Category:</span>
                                        <span className="value">
                                            {categoryInfo.icon} {categoryInfo.name}
                                        </span>
                                    </div>
                                )}
                                {donation.payment_id && (
                                    <div className="summary-row">
                                        <span className="label">Transaction ID:</span>
                                        <span className="value payment-id">{donation.payment_id}</span>
                                    </div>
                                )}
                                <div className="summary-row">
                                    <span className="label">Date:</span>
                                    <span className="value">
                                        {new Date(donation.created_at || Date.now()).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Impact Message */}
                        <motion.div
                            className="impact-message"
                            variants={ANIMATION_VARIANTS.fadeIn}
                            transition={{ delay: 0.8 }}
                        >
                            <h3>Your Impact</h3>
                            <div className="impact-content">
                                {category === 'education' && (
                                    <p>
                                        Your donation of {formatAmount(donation.amount)} can provide educational 
                                        materials for {Math.floor(donation.amount / 100)} children or support 
                                        a child's education for {Math.floor(donation.amount / 2000)} months.
                                    </p>
                                )}
                                {category === 'healthcare' && (
                                    <p>
                                        Your contribution of {formatAmount(donation.amount)} can provide 
                                        medical checkups for {Math.floor(donation.amount / 300)} people or 
                                        essential medicines for {Math.floor(donation.amount / 1500)} families.
                                    </p>
                                )}
                                {category === 'environment' && (
                                    <p>
                                        Your donation of {formatAmount(donation.amount)} can help plant 
                                        {Math.floor(donation.amount / 50)} trees or support environmental 
                                        conservation efforts in local communities.
                                    </p>
                                )}
                                {category === 'emergency' && (
                                    <p>
                                        Your emergency relief donation of {formatAmount(donation.amount)} can provide 
                                        essential supplies for {Math.floor(donation.amount / 500)} families or 
                                        emergency shelter for {Math.floor(donation.amount / 1000)} people.
                                    </p>
                                )}
                                {category === 'poverty' && (
                                    <p>
                                        Your donation of {formatAmount(donation.amount)} can provide basic necessities 
                                        for {Math.floor(donation.amount / 200)} families or skill training for 
                                        {Math.floor(donation.amount / 1500)} individuals.
                                    </p>
                                )}
                                {category === 'animals' && (
                                    <p>
                                        Your animal welfare donation of {formatAmount(donation.amount)} can provide 
                                        food and care for {Math.floor(donation.amount / 150)} animals or 
                                        medical treatment for {Math.floor(donation.amount / 800)} rescued animals.
                                    </p>
                                )}
                                {(!category || !['education', 'healthcare', 'environment', 'emergency', 'poverty', 'animals'].includes(category)) && (
                                    <p>
                                        Your generous donation of {formatAmount(donation.amount)} will make a 
                                        real difference in the lives of those who need it most. Thank you for 
                                        your compassion and generosity in creating positive change.
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Share Section */}
                        <motion.div
                            className="share-section"
                            variants={ANIMATION_VARIANTS.fadeIn}
                            transition={{ delay: 1.0 }}
                        >
                            <h3>Spread the Word</h3>
                            <p>Inspire others to make a difference too!</p>
                            <div className="share-buttons">
                                <button 
                                    onClick={() => handleShare('twitter')}
                                    className="share-btn twitter"
                                    aria-label="Share on Twitter"
                                >
                                    🐦 Twitter
                                </button>
                                <button 
                                    onClick={() => handleShare('facebook')}
                                    className="share-btn facebook"
                                    aria-label="Share on Facebook"
                                >
                                    📘 Facebook
                                </button>
                                <button 
                                    onClick={() => handleShare('whatsapp')}
                                    className="share-btn whatsapp"
                                    aria-label="Share on WhatsApp"
                                >
                                    💬 WhatsApp
                                </button>
                                <button 
                                    onClick={copyToClipboard}
                                    className="share-btn copy"
                                    aria-label="Copy to clipboard"
                                >
                                    📋 Copy
                                </button>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            className="action-buttons"
                            variants={ANIMATION_VARIANTS.fadeIn}
                            transition={{ delay: 1.2 }}
                        >
                            <Link to="/donate" className="btn btn-primary btn-large">
                                Donate Again
                            </Link>
                            <Link to="/ngos" className="btn btn-secondary btn-large">
                                Explore NGOs
                            </Link>
                            <Link to="/" className="btn btn-outline btn-large">
                                Back to Home
                            </Link>
                        </motion.div>

                        {/* Email Confirmation Notice */}
                        <motion.div
                            className="email-notice"
                            variants={ANIMATION_VARIANTS.fadeIn}
                            transition={{ delay: 1.4 }}
                        >
                            <p>
                                📧 A confirmation email with your donation receipt has been sent to <strong>{donation.email}</strong>
                            </p>
                            <p className="next-steps">
                                You'll receive updates about how your donation is being used and the impact it creates.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ThankYouPage;
