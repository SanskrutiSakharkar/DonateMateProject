import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.header 
      className="header-modern"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo-modern">
            <div className="logo-icon-modern">
              <span className="heart-icon">❤️</span>
            </div>
            <div className="logo-text-modern">
              <span className="logo-name">DonateMate</span>
              <span className="logo-tagline">Connect • Impact • Transform</span>
            </div>
          </Link>

          <nav className={`nav-modern ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list-modern">
              <li className="nav-item-modern">
                <Link 
                  to="/" 
                  className={`nav-link-modern ${isActive('/') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item-modern">
                <Link 
                  to="/ngos" 
                  className={`nav-link-modern ${isActive('/ngos') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  NGO Partners
                </Link>
              </li>
              <li className="nav-item-modern">
                <Link 
                  to="/about" 
                  className={`nav-link-modern ${isActive('/about') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li className="nav-item-modern">
                <Link 
                  to="/donate" 
                  className="nav-link-donate-modern"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Donate Now</span>
                </Link>
              </li>
            </ul>
          </nav>

          <button 
            className="menu-toggle-modern"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-modern ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
