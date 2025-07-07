import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Import local Swiper CSS globally
import './styles/vendor/swiper/swiper.css';
import './styles/vendor/swiper/pagination.css';
// import './styles/vendor/swiper/effect-fade.css'; // Keep commented if not using fade effect
import './styles/bottle-nexus-overrides.css'; // Import the override styles
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
