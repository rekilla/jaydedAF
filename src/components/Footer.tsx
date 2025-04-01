import React from 'react';
// Removed Link import as it's not used for quick links currently

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  // Using a simple text logo for now until image is provided
  // const logoPlaceholder = "assets/images/logo-placeholder-gold.png";

  return (
    <footer className="bg-brand-dark mt-24 py-10 border-t border-brand-gold/10 text-sm text-brand-text/60"> {/* Increased top margin and padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6"> {/* Adjusted gap */}
        {/* Logo */}
        <div className="flex-shrink-0 order-1 md:order-2"> {/* Centered logo on mobile */}
          <span className="text-brand-gold text-xl font-bold font-heading tracking-tight"> {/* Styled text logo */}
            JAF
          </span>
          {/* <img
            src={logoPlaceholder}
            alt="Jayded AF Logo"
            className="h-6 opacity-90" // Slightly larger, less transparent
            // Remove inline style filter when using actual gold logo image
            style={{ filter: 'invert(70%) sepia(15%) saturate(1500%) hue-rotate(350deg) brightness(90%) contrast(90%)' }}
          /> */}
        </div>
        {/* Copyright */}
        <div className="text-center order-3 md:order-1"> {/* Copyright first on desktop */}
          <p>&copy; {currentYear} Jayded AF Cocktails. All Rights Reserved.</p>
        </div>
        {/* Contact Email */}
        <div className="text-center order-2 md:order-3"> {/* Email last on desktop */}
          <a href="mailto:INFO@JAYDEDAF.COM" className="font-medium text-brand-gold hover:text-brand-text transition-colors duration-300">
            INFO@JAYDEDAF.COM
          </a>
        </div>
        {/* Social media icons omitted as per plan */}
        {/* Optional quick links could go here if needed */}
        {/* <div className="flex gap-4 order-4">
          <Link to="/" className="hover:text-brand-gold">Home</Link>
          <Link to="/about" className="hover:text-brand-gold">About</Link>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
