import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, APP_SETTINGS } from '../../utils/constants';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <div className="footer-content container">
                <div className="footer-section">
                    <div className="footer-logo">
                        <span className="logo-icon">💝</span>
                        <span className="logo-text">DonateMate</span>
                    </div>
                    <p className="footer-description">
                        {APP_SETTINGS.description}. Join thousands of donors making a positive impact across India.
                    </p>
                    <div className="social-links">
                        <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            📘
                        </a>
                        <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            🐦
                        </a>
                        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            📷
                        </a>
                        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            💼
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Quick Links</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/ngos">NGO Partners</Link></li>
                        <li><Link to="/donate">Donate Now</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Categories</h3>
                    <ul className="footer-links">
                        <li><Link to="/ngos?category=education">Education</Link></li>
                        <li><Link to="/ngos?category=healthcare">Healthcare</Link></li>
                        <li><Link to="/ngos?category=environment">Environment</Link></li>
                        <li><Link to="/ngos?category=emergency">Emergency Relief</Link></li>
                        <li><Link to="/ngos?category=poverty">Poverty Alleviation</Link></li>
                        <li><Link to="/ngos?category=animals">Animal Welfare</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Support</h3>
                    <ul className="footer-links">
                        <li><a href={`mailto:${APP_SETTINGS.supportEmail}`}>Contact Us</a></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/terms-of-service">Terms of Service</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {currentYear} {APP_SETTINGS.name}. All rights reserved.</p>
                    <p>Made with ❤️ for a better world</p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
