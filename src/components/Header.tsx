import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const solidHeaderPages = ['/store-locator', '/contact', '/press'];
    
    if (solidHeaderPages.includes(pathname)) {
      setIsScrolled(true);
      // For solid header pages, we don't need a scroll listener for this effect
      return;
    }

    // For other pages (like home), handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check scroll position on initial load for these pages
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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
    { path: '/cocktails/lemon-drop', label: 'Lemon', hoverColorClass: 'after:bg-brand-lemon' },
    { path: '/cocktails/lavender', label: 'Lavender', hoverColorClass: 'after:bg-brand-lavender' },
    { path: '/cocktails/cucumber', label: 'Cucumber', hoverColorClass: 'after:bg-brand-cucumber' },
  ];

  const mobileNavLinks = [...navLinksLeft, ...navLinksRight];

  const getNavLinkClass = ({ isActive }: { isActive: boolean }, hoverColorClass = 'after:bg-white') =>
    cn(
      "relative uppercase tracking-wide text-sm font-medium pb-1 transition-colors duration-300 ease-in-out",
      "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100",
      hoverColorClass,
      isActive ? "text-white after:scale-x-100" : "text-white/80 hover:text-white"
    );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out",
          isMobileMenuOpen ? "z-40" : "z-50",
          isScrolled
            ? (['/store-locator', '/contact', '/press'].includes(pathname)
              ? "bg-black shadow-md border-b border-white/10"
              : "bg-black/50 backdrop-blur-lg shadow-md border-b border-white/10")
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
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
            <Link to="/" className="block h-11 transition-transform duration-300 ease-in-out hover:scale-105">
              <img src="/JAF only_Wh.png" alt="Jayded AF Cocktails Logo" className="h-full w-auto" />
            </Link>
          </div>

          {/* Right Desktop Navigation */}
          <div className="hidden sm:flex items-center flex-1 justify-end">
            <ul className="flex space-x-8">
              {navLinksRight.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className={(props) => getNavLinkClass(props, link.hoverColorClass)}>
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
              className="text-white hover:text-white/80 focus:outline-none p-2 relative z-50"
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
              className="absolute top-6 right-4 text-white hover:text-white/80 p-2 z-[101]"
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
                        isActive ? "text-white" : "text-white/80 hover:text-white"
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
