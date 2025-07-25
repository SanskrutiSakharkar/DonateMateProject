import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// CSS imports in correct order
import './styles/variables.css';
import './styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Component imports
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import DonatePage from './pages/DonatePage/DonatePage';
import ThankYouPage from './pages/ThankYouPage/ThankYouPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NGOPage from './pages/NGOPage/NGOPage';
import { TOAST_CONFIG } from './utils/constants';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/ngos" element={<NGOPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer {...TOAST_CONFIG} />
      </div>
    </Router>
  );
}

export default App;
