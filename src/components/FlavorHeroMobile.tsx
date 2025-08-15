import React from 'react';
import { motion } from 'framer-motion';

interface FlavorHeroMobileProps {
  flavorData: {
    key: string;
    name: string;
    heroImage?: string;
    tagline: string;
    colorClass: string;
    colorHex: string;
  };
}

const FlavorHeroMobile: React.FC<FlavorHeroMobileProps> = ({ flavorData }) => {
  const heroAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.3 }
  };

  return (
    <section className="relative h-auto pt-24 pb-0 w-full flex flex-col items-center justify-center bg-black sm:hidden">
      <div className="relative z-10 text-center">
        <motion.div {...heroAnimation}>
          {flavorData.heroImage ? (
            <img
              src={flavorData.heroImage}
              alt={`${flavorData.name} title`}
              className="w-full max-w-sm mx-auto"
              style={{ transform: 'scale(0.85)' }}
            />
          ) : (
            <h1 className={`font-bold text-5xl drop-shadow-lg ${flavorData.colorClass}`}>
              {flavorData.name}
            </h1>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FlavorHeroMobile;
