import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import './styles/globals.css';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import HomePage from './pages/HomePage/HomePage';
import NGOPage from './pages/NGOPage/NGOPage';
import DonatePage from './pages/DonatePage/DonatePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ThankYouPage from './pages/ThankYouPage/ThankYouPage';

function App() {
  return (
    <div className="App">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="main-content"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ngos" element={<NGOPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  );
}

export default App;
