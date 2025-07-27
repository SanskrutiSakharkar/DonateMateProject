import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/ngos', label: 'NGO Partners' },
        { path: '/donate', label: 'Donate Now' },
        { path: '/about', label: 'About Us' }
    ];

    return (
        <motion.header
            className={`header ${isScrolled ? 'header-scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <nav className="nav container">
                <Link to="/" className="nav-logo" onClick={closeMenu}>
                    <span className="logo-icon">💝</span>
                    <span className="logo-text">DonateMate</span>
                </Link>

                <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
                            onClick={closeMenu}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="nav-actions">
                    <Link to="/donate" className="btn btn-primary btn-small" onClick={closeMenu}>
                        Donate Now
                    </Link>
                </div>

                <button
                    className={`nav-toggle ${isMenuOpen ? 'nav-toggle-open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </motion.header>
    );
};

export default Header;
