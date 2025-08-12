"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StoryPoint {
  title: string;
  description: string;
}

const storyPoints: StoryPoint[] = [
    {
        title: "IDENTITY",
        description: "We are unabashedly bold, layered and authentic.\nOur voice is clear, concise, multifaceted and definitive."
    },
    {
        title: "SET APART",
        description: "We create qualitative products that are ethically sourced, premium, exclusive and modern."
    },
    {
        title: "MISSION",
        description: "To nourish an environment ripe for the unapologetic expression of the modern woman. To create space for the reflection of sinfully edgy, incredibly chic and effortlessly cool individuality. All the while affirming, you are the sun your world revolves around."
    },
    {
        title: "VALUES",
        description: "Charisma. Impact. Intrepid. Bona Fide."
    },
    {
        title: "PROMISE",
        description: "To further an agenda that allows for the mirroring of confidence and authenticity."
    },
    {
        title: "APPROACH",
        description: "To align the interests and lifestyle desires of our consumers by offering a product line that emboldens a fresh and distinct point of view."
    }
];

// InView component placeholder
const InView: React.FC<{ children: React.ReactNode; className?: string; variants?: any }> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const BrandStorySection: React.FC = () => {
  return (
    <section
      className="relative bg-[#0a0a0a] overflow-hidden"
      style={{ padding: '30px 0' }}
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
          <h2 className="text-[40.5px] leading-[50px] font-light tracking-[2.7px] text-white mb-2">
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
                key={index}
                className="transition-all duration-300 opacity-100"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Dash */}
                  <span className="text-xs sm:text-sm font-light transition-colors duration-300 mt-1 text-[#D4AF37]">
                    —
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-[40.5px] leading-[50px] font-light tracking-[2.7px] mb-1 sm:mb-2 transition-colors duration-300 text-white">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed transition-all duration-300 text-white/70 whitespace-pre-line">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Video Placeholder */}
          <motion.div
            className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-full w-full bg-black/20 rounded-lg overflow-hidden flex items-center justify-center">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                src="/ice.webm"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </InView>
    </section>
  );
};

export default BrandStorySection;
