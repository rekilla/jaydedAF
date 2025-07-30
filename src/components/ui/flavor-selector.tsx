"use client";
import React from 'react';
import { motion } from 'framer-motion';

// Simple className merger function
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface FlavorSelectorProps {
  flavors: Array<{
    key: string;
    title: React.ReactNode;
    label: string;
    colorHex: string;
    bottleRenderImage: string;
  }>;
  activeIndex: number;
  onFlavorChange: (index: number) => void;
  className?: string;
}

export const FlavorSelector: React.FC<FlavorSelectorProps> = ({
  flavors,
  activeIndex,
  onFlavorChange,
  className
}) => {
  return (
    <div className={cn("flex flex-row gap-3", className)}>
      {flavors.map((flavor, index) => {
        const isActive = index === activeIndex;
        
        return (
          <motion.button
            key={flavor.key}
            onClick={() => onFlavorChange(index)}
            className={cn(
              "relative transition-all duration-300 group",
              "w-28 h-36 md:w-20 md:h-24" // 75% larger mobile, original desktop
            )}
            whileHover={{ scale: isActive ? 1.1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background Glow - Only when active */}
            {isActive && (
              <div 
                className="absolute inset-0 rounded-full blur-xl opacity-60"
                style={{
                  background: `radial-gradient(circle, ${flavor.colorHex}40 0%, transparent 70%)`,
                  transform: 'scale(1.5)'
                }}
              />
            )}
            
            {/* Bottle Image */}
            <motion.img
              src={flavor.bottleRenderImage}
              alt={`${flavor.title} bottle`}
              className="relative z-10 w-full h-full object-contain"
              style={{
                filter: isActive 
                  ? `drop-shadow(0 4px 16px ${flavor.colorHex}80) brightness(1.1)` 
                  : 'drop-shadow(0 2px 8px rgba(0,0,0,0.3)) brightness(0.7)'
              }}
              animate={{
                scale: isActive ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Subtle label below */}
            <div 
              className={cn(
                "absolute -bottom-6 left-1/2 transform -translate-x-1/2",
                "text-[8px] md:text-[10px] font-bold tracking-wide text-center transition-all duration-300",
                isActive ? "text-white opacity-100" : "text-white/40 opacity-0 group-hover:opacity-60"
              )}
            >
              {flavor.label}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};