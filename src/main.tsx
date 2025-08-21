import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./styles/bn.css";
// Import local Swiper CSS globally
import './styles/vendor/swiper/swiper.css';
import './styles/vendor/swiper/pagination.css';
// import './styles/vendor/swiper/effect-fade.css'; // Keep commented if not using fade effect
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import { ensureBottleNexus } from './lib/bn'

// Performance monitoring
if (typeof window !== 'undefined') {
  // Measure LCP
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // Measure page load time
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart);
  });

  // Load BottleNexus SDK once at app start
  ensureBottleNexus();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
