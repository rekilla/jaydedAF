import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Import local Swiper CSS globally
import './styles/vendor/swiper/swiper.css';
import './styles/vendor/swiper/pagination.css';
// import './styles/vendor/swiper/effect-fade.css'; // Keep commented if not using fade effect
import './styles/bottle-nexus-overrides.css'; // Import the override styles
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
