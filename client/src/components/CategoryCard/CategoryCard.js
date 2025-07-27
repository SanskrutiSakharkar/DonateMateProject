import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    if (!category) {
        return null;
    }

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
        setImageLoading(false);
    };

    const handleImageStart = () => {
        setImageLoading(true);
    };

    return (
        <motion.div
            className="category-card"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
        >
            <Link to={`/ngos?category=${category.id}`} className="category-link">
                <div className={`category-image ${imageLoading ? 'loading' : ''}`}>
                    {!imageError && (
                        <img 
                            src={category.image} 
                            alt={`${category.name} - ${category.description}`}
                            loading="lazy"
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                            onLoadStart={handleImageStart}
                            style={{ 
                                opacity: imageLoaded && !imageError ? 1 : 0,
                                transition: 'opacity 0.3s ease'
                            }}
                        />
                    )}
                    
                    {/* Fallback when image fails or is loading */}
                    <div 
                        className={`category-fallback ${(imageError || !imageLoaded) ? 'show' : ''}`}
                        style={{ 
                            background: `linear-gradient(135deg, ${category.color}15, ${category.color}25)`,
                            color: category.color
                        }}
                    >
                        {category.icon}
                    </div>
                    
                    <div className="category-overlay"></div>
                </div>
                
                <div className="category-content">
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-description">{category.description}</p>
                    <div className="category-cta">
                        <span>Donate Now</span>
                        <span className="arrow">→</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CategoryCard;
