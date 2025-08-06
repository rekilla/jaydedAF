import React from 'react';
import { cn } from '../../lib/utils';

type Flavor = 'lemon' | 'lavender' | 'cucumber';

interface SectionTitleProps {
  flavor?: Flavor;
  children: React.ReactNode;
  className?: string;
  lineWidth?: string; // Add lineWidth prop
  noUnderline?: boolean; // Add noUnderline prop
}

const flavorClasses: Record<Flavor, string> = {
  lemon: 'after:bg-brand-gold',
  lavender: 'after:bg-brand-lavender',
  cucumber: 'after:bg-green-500', // Assuming a green color for cucumber
};

export const SectionTitle: React.FC<SectionTitleProps> = ({ flavor = 'lemon', children, className, lineWidth, noUnderline }) => {
  const flavorClass = flavorClasses[flavor] || flavorClasses.lemon;

  return (
    <h2
      className={cn(
        'text-3xl sm:text-4xl font-bold text-white',
        className
      )}
    >
      <span
        className={cn(
          'relative inline-block',
          !noUnderline && flavorClass
        )}
      >
        {children}
        {lineWidth && !noUnderline && <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 h-px bg-brand-lavender" style={{ width: lineWidth }} />}
      </span>
    </h2>
  );
};