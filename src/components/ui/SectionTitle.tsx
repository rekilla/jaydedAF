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
  lemon: 'bg-brand-lemon',
  lavender: 'bg-brand-lavender',
  cucumber: 'bg-brand-cucumber',
};

export const SectionTitle: React.FC<SectionTitleProps> = ({ flavor = 'lemon', children, className, lineWidth, noUnderline }) => {
  const flavorClass = flavorClasses[flavor] || flavorClasses.lemon;

  return (
    <h2
      className={cn(
        'text-[40.5px] leading-[50px] font-light tracking-[2.7px] text-white',
        className
      )}
    >
      <span
        className={cn(
          'relative inline-block'
        )}
      >
        {children}
        {lineWidth && !noUnderline && <div className={cn("absolute bottom-[-8px] left-1/2 -translate-x-1/2 h-[1px]", flavorClass)} style={{ width: lineWidth }} />}
      </span>
    </h2>
  );
};