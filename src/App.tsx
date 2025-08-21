import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

// Import Layout Components
import Header from './components/Header';
import { FooterSection } from './components/ui/footer-section';

// Lazy load page components for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const StoreLocatorPage = lazy(() => import('./pages/StoreLocatorPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LemonDropPage = lazy(() => import('./pages/cocktails/LemonDropPage'));
const LavenderPage = lazy(() => import('./pages/cocktails/LavenderPage'));
const CucumberPage = lazy(() => import('./pages/cocktails/CucumberPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const PressPage = lazy(() => import('./pages/PressPage'));

// Import Age Gate Modal (keep this eager since it's critical)
import { AgeVerificationModal } from './components/AgeVerificationModal';
import { CartProvider, useCart } from './contexts/CartContext';
import { CartSidebar } from './components/CartSidebar';

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="text-white">Loading...</div>
  </div>
);


function AppContent() {
  const { isCartOpen, closeCart } = useCart();
  
  return (
    <>
      {/* Apply base background and ensure full height */}
      <div className="flex flex-col min-h-screen bg-brand-background text-brand-text">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cocktails/lemon-drop" element={<LemonDropPage />} />
              <Route path="/cocktails/lavender" element={<LavenderPage />} />
              <Route path="/cocktails/cucumber" element={<CucumberPage />} />
              <Route path="/store-locator" element={<StoreLocatorPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/press" element={<PressPage />} />
            </Routes>
          </Suspense>
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
    <>
      <ScrollToTop />
      <CartProvider>
        <AppContent />
      </CartProvider>
    </>
  );
}

export default App;
