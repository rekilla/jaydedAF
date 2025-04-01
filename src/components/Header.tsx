import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '../lib/utils'; // Assuming utils is in src/lib
import { Menu, X } from 'lucide-react'; // Icons for mobile menu
import { motion, AnimatePresence } from 'framer-motion'; // For mobile menu animation

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to close mobile menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }; // Cleanup on unmount
  }, [isMobileMenuOpen]);


  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/cocktails', label: 'Cocktails' },
    { path: '/store-locator', label: 'Store Locator' },
    { path: '/contact', label: 'Contact' },
  ];

  // Function to generate NavLink classes
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative uppercase tracking-wide text-sm font-medium pb-1 transition-colors duration-300 ease-in-out",
      "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-brand-gold after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100", // Underline hover effect
      isActive ? "text-brand-gold after:scale-x-100" : "text-brand-text" // Active state: gold text and persistent underline
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out", // Use fixed positioning
        isScrolled
          ? "bg-black/80 backdrop-blur-md shadow-md border-b border-brand-gold/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-brand-gold text-3xl font-bold font-heading tracking-tight">
            JAF
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} className={getNavLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-text hover:text-brand-gold focus:outline-none p-2"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center sm:hidden" // Fullscreen overlay
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-4 text-brand-text hover:text-brand-gold p-2"
              aria-label="Close menu"
            >
              <X className="h-7 w-7" />
            </button>
            <ul className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => // Adjusted for mobile styling if needed
                        cn(
                            "text-2xl uppercase tracking-wide font-medium transition-colors duration-300 ease-in-out",
                            isActive ? "text-brand-gold" : "text-brand-text hover:text-brand-gold/80"
                        )
                    }
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
