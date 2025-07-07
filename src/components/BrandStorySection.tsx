"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StoryPoint {
  number: string;
  title: string;
  description: string;
  image: string;
}

const storyPoints: StoryPoint[] = [
  {
    number: "01",
    title: "The Vision",
    description: "Born from a desire to redefine cocktail culture. Alexa Jayde Fitzpatrick envisioned a brand that celebrates individuality and liquid luxury.",
    image: "/images/brand/vision.jpg"
  },
  {
    number: "02", 
    title: "Unapologetically Bold",
    description: "Jayded AF isn't just a name—it's an attitude. For those who refuse to blend in and choose to stand out.",
    image: "/images/brand/bold.jpg"
  },
  {
    number: "03",
    title: "Crafted Excellence",
    description: "Every bottle represents our commitment to quality. Real gin, natural flavors, and the perfect pour every time.",
    image: "/images/brand/craft.jpg"
  }
];

// InView component placeholder
const InView: React.FC<{ children: React.ReactNode; className?: string; variants?: any }> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const BrandStorySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images before showing anything
  useEffect(() => {
    const loadImages = async () => {
      const promises = storyPoints.map((point) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = point.image;
          img.onload = resolve;
          img.onerror = () => resolve(null);
        });
      });
      
      await Promise.all(promises);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  // Auto-advance stories
  useEffect(() => {
    if (!isPaused && imagesLoaded) {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % storyPoints.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isPaused, imagesLoaded]);

  // Handle manual selection
  const handleStoryClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    // Resume auto-play after 8 seconds
    setTimeout(() => setIsPaused(false), 8000);
  };

  if (!imagesLoaded) {
    return (
      <section className="relative bg-[#0a0a0a] overflow-hidden" style={{ padding: '30px 0' }}>
        <div className="container mx-auto px-4 h-[400px] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative bg-[#0a0a0a] overflow-hidden" 
      style={{ padding: '30px 0' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <InView className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-light tracking-wider text-white mb-2">
            Our Story
          </h2>
          <div className="w-12 h-px bg-[#D4AF37] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Story Points */}
          <motion.div 
            className="order-2 lg:order-1 space-y-4 sm:space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {storyPoints.map((point, index) => (
              <motion.div
                key={point.number}
                className={`cursor-pointer transition-all duration-300 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
                onClick={() => handleStoryClick(index)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Number */}
                  <span className={`
                    text-xs sm:text-sm font-light transition-colors duration-300 mt-1
                    ${index === activeIndex ? 'text-[#D4AF37]' : 'text-white/40'}
                  `}>
                    {point.number}
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`
                      text-lg sm:text-xl font-light mb-1 sm:mb-2 transition-colors duration-300
                      ${index === activeIndex ? 'text-white' : 'text-white/60'}
                    `}>
                      {point.title}
                    </h3>
                    <p className={`
                      text-xs sm:text-sm leading-relaxed transition-all duration-300
                      ${index === activeIndex ? 'text-white/70' : 'text-white/30'}
                    `}>
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Simple dots with progress */}
            <div className="flex gap-2 mt-6 sm:mt-8">
              {storyPoints.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStoryClick(index)}
                  className="relative"
                >
                  <div className={`
                    w-1.5 h-1.5 sm:w-1 sm:h-1 rounded-full transition-all duration-300
                    ${index === activeIndex ? 'bg-[#D4AF37]' : 'bg-white/20'}
                  `} />
                  {index === activeIndex && !isPaused && (
                    <motion.div
                      className="absolute inset-0 w-1.5 h-1.5 sm:w-1 sm:h-1 rounded-full bg-[#D4AF37]"
                      initial={{ scale: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Image Display with Stacked Images */}
          <motion.div 
            className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-full w-full bg-white/5 rounded-lg overflow-hidden">
              {/* All images stacked - no AnimatePresence */}
              {storyPoints.map((story, index) => (
                <div
                  key={story.number}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                    visibility: index === activeIndex ? 'visible' : 'hidden'
                  }}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              ))}
              
              {/* Fallback placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-light text-white/10 mb-4">
                    {activeIndex + 1}/3
                  </div>
                  <p className="text-sm text-white/40">Brand Story</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </InView>
    </section>
  );
};

export default BrandStorySection;
