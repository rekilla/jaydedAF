"use client";
import React from 'react';
import { Spotlight } from './ui/spotlight';

interface FlavorHeroProps {
  flavor: {
    key: string;
    colorHex: string;
  };
}

export const FlavorHero: React.FC<FlavorHeroProps> = ({ flavor }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <Spotlight
        flavorColorHex={flavor.colorHex}
        flavorKey={flavor.key}
        intensity={0.8}
        pulseIntensity={0.9}
        beamCount={3}
        animationSpeed={8}
        luxuryMode={true}
      />
      
      {/* Multiple gradient layers for depth */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 70% 50%, ${flavor.colorHex}40 0%, transparent 70%)`
        }}
      />
      
      {/* Additional luxury gradient */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top, ${flavor.colorHex}30 0%, transparent 50%),
                      radial-gradient(ellipse at bottom, rgba(138, 43, 226, 0.2) 0%, transparent 50%)`
        }}
      />
      
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none animate-shimmer"
        style={{
          background: `linear-gradient(45deg, transparent 30%, ${flavor.colorHex}20 50%, transparent 70%)`,
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Premium grid pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
        }}
      />
      
      {/* Subtle noise texture for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};