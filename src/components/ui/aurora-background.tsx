"use client";
import React, { ReactNode } from "react";
import { cn } from "../../lib/utils"; // Correct relative path

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  flavorColorHex?: string; // Add prop for dynamic tint
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  flavorColorHex, // Destructure the new prop
  ...props
}: AuroraBackgroundProps) => {
  return (
    // Use main tag as per snippet
    <main>
      <div
        className={cn(
          // Use classes from snippet
          "relative flex flex-col h-[100vh] items-center justify-center bg-black text-white overflow-hidden transition-bg",
          className
        )}
        {...props}
      >
        {/* Dynamic Tint Layer */}
        {flavorColorHex && (
          <div
            style={{ background: `radial-gradient(ellipse at center, ${flavorColorHex} 0%, transparent 70%)` }}
            className="absolute inset-0 blur-[80px] opacity-30 pointer-events-none transition-all duration-700 z-0" // Ensure it's behind main aurora
          ></div>
        )}
        {/* Original Aurora Effect Layer */}
        <div className="absolute inset-0 pointer-events-none z-10"> {/* Ensure this is above tint */}
          <div
            className={cn(
              `
              absolute -inset-[10px] opacity-50 will-change-transform
              [background-image:repeating-linear-gradient(100deg,#ffffff_0%,#ffffff_7%,transparent_10%,transparent_12%,#ffffff_16%),repeating-linear-gradient(100deg,#3b82f6_10%,#818cf8_15%,#60a5fa_20%,#ddd6fe_25%,#93c5fd_30%)]
              [background-size:300%,200%]
              [background-position:50%_50%,50%_50%]
              filter blur-[10px] invert dark:invert-0
              mix-blend-difference
              animate-aurora
              `, // Use animate-aurora defined in tailwind.config.js
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
            )}
          ></div>
        </div>
        {/* Content goes on top */}
        <div className="relative z-20 w-full">{children}</div> {/* Ensure content is above all effects */}
      </div>
    </main>
  );
};
