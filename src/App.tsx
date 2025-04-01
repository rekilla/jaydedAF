import React, { useState, useEffect } from 'react'; // Import hooks
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Import Layout Components
import Header from './components/Header';
import Footer from './components/Footer'; // Keep old footer for now, will replace later
import { FooterSection } from './components/ui/footer-section'; // Import new footer
// Removed CombinedBackground import
// import { CombinedBackground } from './components/ui/CombinedBackground';

// Import Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CocktailsPage from './pages/CocktailsPage';
import StoreLocatorPage from './pages/StoreLocatorPage';
import ContactPage from './pages/ContactPage';
// Import Individual Cocktail Pages
import LemonDropPage from './pages/cocktails/LemonDropPage';
import LavenderPage from './pages/cocktails/LavenderPage';
import CucumberPage from './pages/cocktails/CucumberPage';
// Import Age Gate Modal
import { AgeVerificationModal } from './components/AgeVerificationModal';


function App() {
  // State to track age verification
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isLoadingVerification, setIsLoadingVerification] = useState(true); // Prevent flash of content

  useEffect(() => {
    // Check localStorage on mount - ONLY set true if explicitly 'true'
    const storedVerification = localStorage.getItem('isAgeVerified');
    if (storedVerification === 'true') {
      setIsAgeVerified(true);
    }
    // Otherwise, isAgeVerified remains false by default
    setIsLoadingVerification(false); // Done checking
  }, []);

  const handleVerificationSuccess = () => {
    // Removed log
    setIsAgeVerified(true);
    localStorage.setItem('isAgeVerified', 'true');
  };

  // Show loading state or modal until verified
  if (isLoadingVerification) {
    return <div className="fixed inset-0 bg-black flex items-center justify-center text-white">Loading...</div>; // Or a spinner
  }

  if (!isAgeVerified) {
    return <AgeVerificationModal onVerified={handleVerificationSuccess} />;
  }

  // Render the main app content if verified
  return (
    <Router>
      {/* Apply base background and ensure full height */}
      <div className="flex flex-col min-h-screen bg-brand-background text-brand-text">
        <Header />
        {/* Main content area grows to push footer down */}
        <main className="flex-grow">
          <Routes>
            {/* Render all pages directly */}
            <Route path="/" element={<HomePage />} />
            <Route path="/cocktails" element={<CocktailsPage />} />
            {/* Add routes for individual cocktail pages */}
            <Route path="/cocktails/lemon-drop" element={<LemonDropPage />} />
            <Route path="/cocktails/lavender" element={<LavenderPage />} />
            <Route path="/cocktails/cucumber" element={<CucumberPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/store-locator" element={<StoreLocatorPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* TODO: Add a 404 Not Found route */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        {/* Use the new FooterSection */}
        <FooterSection />
      </div>
    </Router>
  );
}

export default App;
