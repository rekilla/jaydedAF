"use client";
import React from 'react';
import { cn } from '../../lib/utils'; // Revert to relative path
import { AuroraBackground } from './aurora-background';
import { BeamsBackground } from './beams-background';

interface CombinedBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  // Props for AuroraBackground
  showRadialGradient?: boolean;
  auroraStyle?: React.CSSProperties & { '--aurora'?: string };
  auroraClassName?: string;
  // Props for BeamsBackground
  beamsIntensity?: "subtle" | "medium" | "strong";
  beamsClassName?: string;
}

export const CombinedBackground: React.FC<CombinedBackgroundProps> = ({
  children,
  className,
  showRadialGradient,
  auroraStyle,
  auroraClassName,
  beamsIntensity,
  beamsClassName,
  ...props // Pass remaining div props to the outer container
}) => {
  return (
    // Outer container takes full width/height and positions layers
    <div className={cn("relative w-full h-full overflow-hidden", className)} {...props}>
      {/* Beams Layer (typically behind Aurora) */}
      <BeamsBackground
        intensity={beamsIntensity}
        className={cn("absolute inset-0 z-0", beamsClassName)} // Positioned absolutely, behind Aurora
      />
      {/* Aurora Layer (receives children and style overrides) */}
      <AuroraBackground
        showRadialGradient={showRadialGradient}
        style={auroraStyle}
        className={cn("relative z-10", auroraClassName)} // Positioned relatively, above beams
      >
        {/* Children are rendered within Aurora, which handles centering/layout */}
        {children}
      </AuroraBackground>
    </div>
  );
};
