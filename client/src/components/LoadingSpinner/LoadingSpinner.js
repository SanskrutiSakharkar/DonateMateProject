import React from 'react';
import { motion } from 'framer-motion';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
    size = 'medium', 
    message = '', 
    overlay = false,
    color = 'primary' 
}) => {
    const sizeClasses = {
        small: 'spinner-small',
        medium: 'spinner-medium',
        large: 'spinner-large'
    };

    const colorClasses = {
        primary: 'spinner-primary',
        white: 'spinner-white',
        secondary: 'spinner-secondary'
    };

    const spinnerComponent = (
        <div className={`loading-spinner ${sizeClasses[size]} ${colorClasses[color]}`}>
            <motion.div
                className="spinner-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
                <div className="spinner-circle"></div>
            </motion.div>
            {message && (
                <motion.p
                    className="spinner-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {message}
                </motion.p>
            )}
        </div>
    );

    if (overlay) {
        return (
            <motion.div
                className="loading-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {spinnerComponent}
            </motion.div>
        );
    }

    return spinnerComponent;
};

export default LoadingSpinner;
