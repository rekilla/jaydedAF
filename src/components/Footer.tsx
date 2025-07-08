import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/jaydedaf',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" fill="#bfb23a"/>
          <g transform="scale(0.75) translate(4, 4)" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </g>
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/jaydedaf',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" fill="#bfb23a"/>
          <g transform="scale(0.75) translate(4, 4)" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </g>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/jaydedaf',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" fill="#bfb23a"/>
          <g transform="scale(0.75) translate(4, 4)" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </g>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-brand-dark mt-24 py-10 border-t border-brand-gold/10 text-sm text-brand-text/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Copyright */}
        <div className="text-center order-3 md:order-1">
          <p>&copy; {currentYear} Jayded AF Cocktails. All Rights Reserved.</p>
        </div>

        {/* Logo and Socials */}
        <div className="flex flex-col items-center gap-4 order-1 md:order-2">
          <div className="flex-shrink-0">
            <span className="text-brand-gold text-xl font-bold font-heading tracking-tight">
              JAF
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-medium text-brand-gold uppercase tracking-wider text-xs">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:opacity-80 transition-opacity"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Email */}
        <div className="text-center order-2 md:order-3">
          <a href="mailto:INFO@JAYDEDAF.COM" className="font-medium text-brand-gold hover:text-brand-text transition-colors duration-300">
            INFO@JAYDEDAF.COM
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
