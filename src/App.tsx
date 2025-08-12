import { useState, useEffect } from 'react'; // Import hooks
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

// Import Layout Components
import Header from './components/Header';
import { FooterSection } from './components/ui/footer-section'; // Import new footer
// Removed CombinedBackground import
// import { CombinedBackground } from './components/ui/CombinedBackground';

// Import Page Components
import HomePage from './pages/HomePage';


import StoreLocatorPage from './pages/StoreLocatorPage';
import ContactPage from './pages/ContactPage';
// Import Individual Cocktail Pages
import LemonDropPage from './pages/cocktails/LemonDropPage';
import LavenderPage from './pages/cocktails/LavenderPage';
import CucumberPage from './pages/cocktails/CucumberPage';
// Import Age Gate Modal
import { AgeVerificationModal } from './components/AgeVerificationModal';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PressPage from './pages/PressPage';
import { BottleNexusLoader } from './components/BottleNexusLoader';
import { CartProvider, useCart } from './contexts/CartContext';
import { CartSidebar } from './components/CartSidebar';


function AppContent() {
  const { isCartOpen, closeCart } = useCart();
  
  return (
    <>
      {/* Apply base background and ensure full height */}
      <div className="flex flex-col min-h-screen bg-brand-background text-brand-text">
        <Header />
        {/* Main content area grows to push footer down */}
        <main className="flex-grow">
          <Routes>
            {/* Render all pages directly */}
            <Route path="/" element={<HomePage />} />
            
            {/* Add routes for individual cocktail pages */}
            <Route path="/cocktails/lemon-drop" element={<LemonDropPage />} />
            <Route path="/cocktails/lavender" element={<LavenderPage />} />
            <Route path="/cocktails/cucumber" element={<CucumberPage />} />
            
            <Route path="/store-locator" element={<StoreLocatorPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/press" element={<PressPage />} />

            {/* TODO: Add a 404 Not Found route */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        {/* Use the new FooterSection */}
        <FooterSection />
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}

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
      <ScrollToTop />
      <BottleNexusLoader />
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
