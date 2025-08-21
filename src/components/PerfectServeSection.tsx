"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ServeStyle {
  id: number;
  title: string;
  body: string;
  subBody: string;
}

interface PerfectServeSectionProps {
  title: string;
  serveStyles: ServeStyle[];
  flavor?: 'lemon' | 'lavender' | 'cucumber';
}

// InView component placeholder
const InView: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const PerfectServeSection: React.FC<PerfectServeSectionProps> = ({ title, serveStyles, flavor = 'lavender' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-black overflow-hidden" style={{ padding: '80px 0' }}>
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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wider text-white mb-2">
            {title}
          </h2>
          <div className={`w-12 h-px bg-brand-${flavor} mx-auto mb-5`} />
        </motion.div>

        {/* Serve Styles Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto">
          {serveStyles.map((style, index) => (
            <motion.div
              key={style.id}
              className="relative text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background glow on hover - using CSS transition */}
              <div
                className="absolute inset-0 bg-white/5 rounded-lg transition-all duration-300"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  transform: hoveredIndex === index ? 'scale(1)' : 'scale(0.95)'
                }}
              />
              
              <div className="relative p-4 sm:p-8">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-light text-white mb-2 tracking-wider">
                  {style.title.replace(/-/g, ' ')}
                </h3>
                {/* Body */}
                <p className="text-xs sm:text-sm text-gray-400">
                  {style.body.replace(/-/g, ' ')}
                </p>
                {/* Sub-body */}
                <p className="text-xs text-gray-500">
                  {flavor === 'lemon' && style.title === 'Shaken' ? (
                    <>
                      Jane <span className="block md:inline">Bond</span>
                    </>
                  ) : (
                    style.subBody.replace(/-/g, ' ')
                  )}
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

export default PerfectServeSection;
