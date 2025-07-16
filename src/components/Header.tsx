import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinksLeft = [
    { path: '/', label: 'Home' },
    { path: '/store-locator', label: 'Store Locator' },
    { path: '/contact', label: 'Contact' },
  ];

  const navLinksRight = [
    { path: '/cocktails/lavender', label: 'Lavender' },
    { path: '/cocktails/lemon-drop', label: 'Lemon' },
    { path: '/cocktails/cucumber', label: 'Cucumber' },
  ];

  const mobileNavLinks = [...navLinksLeft, ...navLinksRight];

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative uppercase tracking-wide text-sm font-medium pb-1 transition-colors duration-300 ease-in-out",
      "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-brand-gold after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100",
      isActive ? "text-brand-gold after:scale-x-100" : "text-brand-text"
    );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out",
          isScrolled
            ? "bg-black/80 backdrop-blur-md shadow-md border-b border-brand-gold/10"
            : "bg-transparent border-b border-transparent",
          // Conditional z-index: lower when mobile menu is open
          isMobileMenuOpen ? "z-40" : "z-50"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Left Desktop Navigation */}
          <div className="hidden sm:flex items-center flex-1">
            <ul className="flex space-x-8">
              {navLinksLeft.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className={getNavLinkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
            <Link to="/" className="block h-9 transition-transform duration-300 ease-in-out hover:scale-105">
              <img src="/JAF only_Wh.png" alt="Jayded AF Cocktails Logo" className="h-full w-auto" />
            </Link>
          </div>

          {/* Right Desktop Navigation */}
          <div className="hidden sm:flex items-center flex-1 justify-end">
            <ul className="flex space-x-8">
              {navLinksRight.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className={getNavLinkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex-1 flex justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-text hover:text-brand-gold focus:outline-none p-2 relative z-50"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay - Now a portal to ensure it's always on top */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center sm:hidden"
            style={{ position: 'fixed' }} // Ensure fixed positioning
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-4 text-brand-text hover:text-brand-gold p-2 z-[101]"
              aria-label="Close menu"
            >
              <X className="h-7 w-7" />
            </button>
            <ul className="flex flex-col space-y-6 text-center">
              {mobileNavLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        "text-2xl uppercase tracking-wide font-medium transition-colors duration-300 ease-in-out",
                        isActive ? "text-brand-gold" : "text-brand-text hover:text-brand-gold/80"
                      )
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
