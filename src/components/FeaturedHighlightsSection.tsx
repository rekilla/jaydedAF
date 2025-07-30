"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Highlight {
  id: number;
  title: string;
  value: string;
  description: string;
  icon: string;
}

const highlights: Highlight[] = [
  {
    id: 1,
    title: "Premium Quality",
    value: "100%",
    description: "Real gin spirits, no artificial alternatives",
    icon: "/leaf-svgrepo-com.svg"
  },
  {
    id: 2,
    title: "Perfect Strength",
    value: "12.5%",
    description: "ABV for the ideal cocktail experience",
    icon: "/martini-glass-with-straw-svgrepo-com.svg"
  },
  {
    id: 3,
    title: "Natural Ingredients",
    value: "100%",
    description: "Natural ingredients in our cocktails",
    icon: "/check-mark-svgrepo-com.svg"
  }
];

// InView component placeholder
const InView: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const FeaturedHighlightsSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-black overflow-hidden" style={{ padding: '30px 0' }}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]" />
      
      <InView className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[120px] relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-light tracking-wider text-white mb-2">
            Why Choose Jayded AF
          </h2>
          <div className="w-12 h-px bg-white mx-auto" />
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.id}
              className="relative text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background glow on hover - using CSS transition instead of motion */}
              <div
                className="absolute inset-0 bg-white/5 rounded-lg transition-all duration-300"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  transform: hoveredIndex === index ? 'scale(1)' : 'scale(0.95)'
                }}
              />
              
              <div className="relative p-6 sm:p-8">
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <img 
                    src={highlight.icon} 
                    alt={highlight.title}
                    className="w-8 h-8 sm:w-10 sm:h-10 opacity-80"
                  />
                </div>
                
                {/* Value - using CSS transition */}
                <div 
                  className="text-3xl sm:text-4xl font-light text-white mb-2 transition-transform duration-300"
                  style={{
                    transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  {highlight.value}
                </div>
                
                {/* Title */}
                <h3 className="text-sm sm:text-base font-light text-white mb-2 tracking-wider">
                  {highlight.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
              
              {/* Bottom accent line - using CSS transition */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-white transition-all duration-300"
                style={{
                  width: hoveredIndex === index ? '50%' : '0%'
                }}
              />
            </motion.div>
          ))}
        </div>
      </InView>
    </section>
  );
};

export default FeaturedHighlightsSection;