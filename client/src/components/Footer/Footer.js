import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'About',
      links: [
        { name: 'Our Mission', href: '/about' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Impact Stories', href: '/stories' },
        { name: 'Team', href: '/team' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Live Chat', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Refund Policy', href: '/refunds' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', href: '#' },
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' }
  ];

  return (
    <footer className="footer-modern">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <span>❤️</span>
              </div>
              <span className="footer-logo-text">DonateMate</span>
            </Link>
            <p className="footer-description">
              Connecting generous hearts with verified NGO partners to create meaningful impact. Together, we're building a better world through transparent, secure donations.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tooltip={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                className="footer-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="footer-section-title">{section.title}</h4>
                <ul className="footer-link-list">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.href} className="footer-link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h3>Stay Updated</h3>
            <p>Get the latest updates on our impact and new initiatives</p>
          </div>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} DonateMate. All rights reserved. Made with ❤️ for a better world.
            </p>
            <div className="footer-badges">
              <span className="badge"> Secure</span>
              <span className="badge"> Verified</span>
              <span className="badge"> Trusted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
