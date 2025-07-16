"use client";
import React from 'react';
import { Spotlight } from './ui/spotlight';

interface FlavorHeroMobileProps {
  flavor: {
    key: string;
    colorHex: string;
  };
}

export const FlavorHeroMobile: React.FC<FlavorHeroMobileProps> = ({ flavor }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-black via-gray-900/50 to-black">
      {/* Optimized Spotlight for mobile */}
      <Spotlight
        flavorColorHex={flavor.colorHex}
        flavorKey={flavor.key}
        intensity={0.6}
        pulseIntensity={0.7}
        beamCount={2}
        animationSpeed={10}
        luxuryMode={true}
      />
      
      {/* Stronger gradient for mobile visibility */}
      <div
        className="absolute inset-0 opacity-40 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${flavor.colorHex}50 0%, transparent 60%)`
        }}
      />
      
      {/* Mobile-optimized luxury gradient */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at top, ${flavor.colorHex}40 0%, transparent 40%),
            radial-gradient(ellipse at bottom, ${flavor.colorHex}20 0%, transparent 60%)
          `
        }}
      />
      
      {/* Subtle shimmer for mobile */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none animate-shimmer"
        style={{
          background: `linear-gradient(45deg, transparent 40%, ${flavor.colorHex}25 50%, transparent 60%)`,
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Light noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};