import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { DONATION_CATEGORIES } from '../../utils/constants';

const NGOPage = () => {
    const [ngos, setNGOs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const fetchNGOs = async () => {
            try {
                setIsLoading(true);

                const cleanedCategory = selectedCategory.trim().toLowerCase(); // ✅ sanitize
                console.log('Fetching NGOs for category:', JSON.stringify(cleanedCategory));

                const response = await apiService.getNGOs(cleanedCategory);

                console.log('API Response:', response);

                if (response.success && Array.isArray(response.data)) {
                    setNGOs(response.data);
                    console.log(`Successfully loaded ${response.data.length} NGOs`);
                } else {
                    console.warn('Invalid response');
                    setNGOs([]);
                }

            } catch (error) {
                console.error('Error fetching NGOs:', error);
                setNGOs([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNGOs();
    }, [selectedCategory]);

    if (isLoading) {
        return (
            <div className="ngo-page">
                <div className="container">
                    <div className="loading-container" style={{ textAlign: 'center', padding: '50px' }}>
                        <div className="loading-spinner" style={{ 
                            border: '4px solid #f3f3f3',
                            borderTop: '4px solid #E59560',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 20px'
                        }}></div>
                        <p>Loading NGO partners...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ngo-page">
            <div className="container">

                {/* Section Header */}
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
                        Our NGO Partners
                    </h1>
                    <p className="section-description" style={{ fontSize: '1.1rem', color: '#666' }}>
                        Verified organizations making a real difference in communities across India
                    </p>
                </div>

                {/* Category Filter */}
                <div className="category-filter" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    <button 
                        onClick={() => setSelectedCategory('all')}
                        className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        style={{
                            padding: '10px 20px',
                            border: '2px solid #E59560',
                            borderRadius: '25px',
                            backgroundColor: selectedCategory === 'all' ? '#E59560' : 'transparent',
                            color: selectedCategory === 'all' ? 'white' : '#E59560',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        All Categories
                    </button>
                    {DONATION_CATEGORIES.map((category) => (
                        <button 
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id.trim().toLowerCase())} // ✅ sanitize input
                            className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                            style={{
                                padding: '10px 20px',
                                border: '2px solid #E59560',
                                borderRadius: '25px',
                                backgroundColor: selectedCategory === category.id ? '#E59560' : 'transparent',
                                color: selectedCategory === category.id ? 'white' : '#E59560',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {category.icon} {category.name}
                        </button>
                    ))}
                </div>

                {/* NGO Grid */}
                <div className="ngos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', marginBottom: '50px' }}>
                    {Array.isArray(ngos) && ngos.length > 0 ? (
                        ngos.map((ngo) => (
                            <div key={ngo.id} className="ngo-card" style={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                padding: '30px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                border: '1px solid #f0f0f0',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}>
                                <div className="ngo-header" style={{ marginBottom: '20px' }}>
                                    <div className="ngo-title-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#1D3124', margin: 0, lineHeight: '1.3' }}>
                                            {ngo.name}
                                        </h3>
                                        {ngo.verified && (
                                            <span className="verified-badge" style={{
                                                backgroundColor: '#4CAF50',
                                                color: 'white',
                                                padding: '4px 8px',
                                                borderRadius: '12px',
                                                fontSize: '0.8rem',
                                                fontWeight: '500'
                                            }}>
                                                ✓ Verified
                                            </span>
                                        )}
                                    </div>
                                    <span className="ngo-category" style={{
                                        backgroundColor: '#BACEC1',
                                        color: '#1D3124',
                                        padding: '6px 12px',
                                        borderRadius: '15px',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        textTransform: 'capitalize'
                                    }}>
                                        {ngo.category}
                                    </span>
                                </div>
                                <p className="ngo-description" style={{ color: '#666', lineHeight: '1.6', marginBottom: '25px', fontSize: '0.95rem' }}>
                                    {ngo.description}
                                </p>
                                <div className="ngo-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '25px' }}>
                                    <div className="ngo-stat" style={{ textAlign: 'center' }}>
                                        <span className="stat-value" style={{ display: 'block', fontSize: '1.3rem', fontWeight: '700', color: '#E59560' }}>
                                            {ngo.rating}
                                        </span>
                                        <span className="stat-label" style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            Rating
                                        </span>
                                    </div>
                                    <div className="ngo-stat" style={{ textAlign: 'center' }}>
                                        <span className="stat-value" style={{ display: 'block', fontSize: '1.3rem', fontWeight: '700', color: '#E59560' }}>
                                            {ngo.projects}
                                        </span>
                                        <span className="stat-label" style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            Projects
                                        </span>
                                    </div>
                                    <div className="ngo-stat" style={{ textAlign: 'center' }}>
                                        <span className="stat-value" style={{ display: 'block', fontSize: '1.3rem', fontWeight: '700', color: '#E59560' }}>
                                            {ngo.beneficiaries}
                                        </span>
                                        <span className="stat-label" style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            Lives Impacted
                                        </span>
                                    </div>
                                </div>
                                <div className="ngo-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                                    <button className="btn btn-primary" style={{
                                        backgroundColor: '#E59560',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        flex: '1',
                                        transition: 'background-color 0.3s ease'
                                    }}>
                                        Donate Now
                                    </button>
                                    <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{
                                        backgroundColor: 'transparent',
                                        color: '#E59560',
                                        border: '2px solid #E59560',
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        textAlign: 'center',
                                        flex: '1',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-ngos" style={{ textAlign: 'center', padding: '50px', gridColumn: '1 / -1' }}>
                            <p style={{ fontSize: '1.1rem', color: '#666' }}>
                                No NGO partners found for the selected category.
                            </p>
                        </div>
                    )}
                </div>

                {/* Call to Action */}
                <div className="cta-section" style={{ textAlign: 'center', backgroundColor: '#F6F4E8', padding: '40px', borderRadius: '15px' }}>
                    <h3 style={{ marginBottom: '15px', color: '#1D3124' }}>
                        Ready to Make a Difference?
                    </h3>
                    <p style={{ marginBottom: '25px', color: '#666' }}>
                        Join thousands of donors supporting verified NGOs across India
                    </p>
                    <button style={{
                        backgroundColor: '#E59560',
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        Start Donating Today
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NGOPage;
