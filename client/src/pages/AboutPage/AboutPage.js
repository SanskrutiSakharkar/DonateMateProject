import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS, APP_SETTINGS } from '../../utils/constants';
import './AboutPage.css';

const AboutPage = () => {
    const teamMembers = [
        {
            name: 'Sarah Johnson',
            role: 'Founder & CEO',
            description: 'Passionate about creating meaningful connections between donors and NGOs across India.',
          
        },
        {
            name: 'Rajesh Kumar',
            role: 'NGO Relations Head',
            description: 'Ensures all partner NGOs meet our strict verification standards and impact criteria.',
      
        },
        {
            name: 'Priya Sharma',
            role: 'Technology Lead',
            description: 'Builds secure, user-friendly platforms for seamless and transparent donations.',
           
        }
    ];

    const values = [
        {
            title: 'Transparency',
            description: 'Every donation is tracked and verified. You know exactly where your money goes and the impact it creates.',
            icon: '🔍'
        },
        {
            title: 'Trust',
            description: 'All NGO partners are thoroughly vetted for credibility, impact, and financial transparency.',
            icon: '🤝'
        },
        {
            title: 'Impact',
            description: 'We focus on creating measurable, lasting change in communities that need it most.',
            icon: '📈'
        },
        {
            title: 'Accessibility',
            description: 'Making charitable giving easy, secure, and accessible for everyone across India.',
            icon: '♿'
        }
    ];

    const stats = [
        { number: '15,000+', label: 'Donations Processed' },
        { number: '500+', label: 'Verified NGOs' },
        { number: '₹5.2M+', label: 'Amount Raised' },
        { number: '2M+', label: 'Lives Impacted' }
    ];

    const milestones = [
        {
            year: '2020',
            title: 'DonateMate Founded',
            description: 'Started with a vision to connect donors with verified NGOs across India.'
        },
        {
            year: '2021',
            title: 'First 100 NGOs',
            description: 'Onboarded our first 100 verified NGO partners across 15 states.'
        },
        {
            year: '2022',
            title: '₹1M Milestone',
            description: 'Facilitated over ₹1 million in donations, impacting 100,000+ lives.'
        },
        {
            year: '2023',
            title: 'National Expansion',
            description: 'Expanded to all 28 states with 500+ verified NGO partners.'
        },
        {
            year: '2024',
            title: 'Tech Innovation',
            description: 'Launched AI-powered impact tracking and donor-NGO matching system.'
        }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <motion.section
                className="about-hero"
                initial="hidden"
                animate="visible"
                variants={ANIMATION_VARIANTS.fadeIn}
            >
                <div className="container">
                    <h1 className="hero-title">About DonateMate</h1>
                    <p className="hero-description">
                        {APP_SETTINGS.tagline}
                    </p>
                    <p className="hero-subtitle">
                        Empowering meaningful change through transparent, verified, and impactful donations since 2020.
                    </p>
                </div>
            </motion.section>

            {/* Mission Section */}
            <motion.section
                className="mission-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={ANIMATION_VARIANTS.stagger}
            >
                <div className="container">
                    <motion.div
                        className="section-header"
                        variants={ANIMATION_VARIANTS.fadeIn}
                    >
                        <h2 className="section-title">Our Mission</h2>
                        <p className="section-description">
                            We believe that everyone deserves the opportunity to make a meaningful difference. 
                            DonateMate bridges the gap between generous hearts and verified NGOs, ensuring 
                            that every donation creates maximum impact where it's needed most.
                        </p>
                    </motion.div>

                    <motion.div
                        className="mission-content"
                        variants={ANIMATION_VARIANTS.fadeIn}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="mission-text">
                            <h3>Connecting Hearts with Causes</h3>
                            <p>
                                In a world where countless organizations are working tirelessly to solve 
                                critical problems, finding the right place to contribute can be overwhelming. 
                                DonateMate simplifies this process by curating a platform of verified, 
                                high-impact NGOs across India.
                            </p>
                            <p>
                                Our platform ensures that your generosity reaches those who need it most, 
                                with complete transparency and accountability every step of the way. We believe 
                                in the power of collective action and the difference each individual can make.
                            </p>
                        </div>
                        <div className="mission-visual">
                            <div className="visual-card">
                                <h4>Our Goal</h4>
                                <p>To democratize charitable giving and maximize social impact through technology and transparency</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Values Section */}
            <motion.section
                className="values-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={ANIMATION_VARIANTS.stagger}
            >
                <div className="container">
                    <motion.div
                        className="section-header"
                        variants={ANIMATION_VARIANTS.fadeIn}
                    >
                        <h2 className="section-title">Our Values</h2>
                        <p className="section-description">
                            The principles that guide everything we do and every decision we make
                        </p>
                    </motion.div>

                    <div className="values-grid">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                className="value-card"
                                variants={ANIMATION_VARIANTS.fadeIn}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <div className="value-icon">{value.icon}</div>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-description">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section
                className="stats-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={ANIMATION_VARIANTS.stagger}
            >
                <div className="container">
                    <motion.div
                        className="section-header"
                        variants={ANIMATION_VARIANTS.fadeIn}
                    >
                        <h2 className="section-title">Our Impact So Far</h2>
                        <p className="section-description">
                            Numbers that tell the story of our collective impact
                        </p>
                    </motion.div>

                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="stat-card"
                                variants={ANIMATION_VARIANTS.scaleIn}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3 className="stat-number">{stat.number}</h3>
                                <p className="stat-label">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Journey Section */}
            <motion.section
                className="journey-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={ANIMATION_VARIANTS.stagger}
            >
                <div className="container">
                    <motion.div
                        className="section-header"
                        variants={ANIMATION_VARIANTS.fadeIn}
                    >
                        <h2 className="section-title">Our Journey</h2>
                        <p className="section-description">
                            Key milestones in our mission to transform charitable giving in India
                        </p>
                    </motion.div>

                    <div className="timeline">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                className="timeline-item"
                                variants={ANIMATION_VARIANTS.fadeIn}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className="timeline-year">{milestone.year}</div>
                                <div className="timeline-content">
                                    <h4>{milestone.title}</h4>
                                    <p>{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Team Section */}
            <motion.section
                className="team-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={ANIMATION_VARIANTS.stagger}
            >
                <div className="container">
                    <motion.div
                        className="section-header"
                        variants={ANIMATION_VARIANTS.fadeIn}
                    >
                        <h2 className="section-title">Meet Our Team</h2>
                        <p className="section-description">
                            The passionate individuals working to make charitable giving easier and more impactful
                        </p>
                    </motion.div>

                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                className="team-card"
                                variants={ANIMATION_VARIANTS.fadeIn}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ y: -8 }}
                            >
                                <div className="member-avatar">{member.avatar}</div>
                                <h3 className="member-name">{member.name}</h3>
                                <p className="member-role">{member.role}</p>
                                <p className="member-description">{member.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                className="cta-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={ANIMATION_VARIANTS.fadeIn}
            >
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Make a Difference?</h2>
                        <p>Join thousands of donors who are already creating positive change across India</p>
                        <div className="cta-actions">
                            <a href="/donate" className="btn btn-primary btn-large">
                                Start Donating
                            </a>
                            <a href="/ngos" className="btn btn-secondary btn-large">
                                Explore NGOs
                            </a>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default AboutPage;
