import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

/* Dummy team data – replace with real images / names */
const TEAM = [
  { id: 1, name: 'Aditi Sharma', role: 'Founder & CEO', photo: '/images/team/aditi.jpg' },
  { id: 2, name: 'Rahul Mehta', role: 'CTO',           photo: '/images/team/rahul.jpg' },
  { id: 3, name: 'Sara Ali',     role: 'Partnerships',  photo: '/images/team/sara.jpg' },
  { id: 4, name: 'John Lee',     role: 'Product Lead',  photo: '/images/team/john.jpg' }
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* ---------- HERO ---------- */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            className="about-hero-inner"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="about-title">About&nbsp;DonateMate</h1>

            {/* the line right above the button – now white, no emoji */}
            <p className="about-subtitle">
              Transparent giving. Real impact.
            </p>

            <motion.button
              className="btn btn-primary btn-lg cta-btn"
              onClick={() => navigate('/donate')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start&nbsp;Donating
              {/* icon span kept for spacing but hidden in CSS */}
              <span className="btn-icon"></span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ---------- MISSION ---------- */}
      <section className="mission-section">
        <div className="container">
          <h2 className="section-heading">Our&nbsp;Mission</h2>
          <p className="mission-text">
            DonateMate bridges the gap between generous hearts and verified NGO partners.
            Every contribution you make is tracked, audited and channelled where it can
            create the most positive change.
          </p>
        </div>
      </section>

      {/* ---------- TEAM  ---------- */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-heading">Meet&nbsp;the&nbsp;Team</h2>

          {/* centred grid */}
          <div className="team-grid">
            {TEAM.map(member => (
              <motion.div
                key={member.id}
                className="team-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=BACEC1&color=fff`;}}
                />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
