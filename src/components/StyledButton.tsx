import React from 'react';
import { Button, ButtonProps } from './ui/button';

interface StyledButtonProps extends ButtonProps {
  children: React.ReactNode;
  variant?: "jayded" | "collection" | "contact" | "secondary";
  showDashes?: boolean;
  responsive?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  className,
  variant = "jayded",
  showDashes = true,
  responsive = true,
  ...props
}) => {
  // Responsive padding system that scales with text length
  const getResponsivePadding = () => {
    if (!responsive) return "px-6 py-3";

    const textLength = React.Children.toArray(children).join('').length;

    if (textLength <= 4) return "px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4"; // DELVE
    if (textLength <= 8) return "px-3 sm:px-5 lg:px-7 py-2 sm:py-3 lg:py-4"; // PURCHASE
    return "px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4"; // Longer text
  };

  // Responsive font sizing
  const getResponsiveFont = () => {
    if (!responsive) return "text-sm";

    const textLength = React.Children.toArray(children).join('').length;

    if (textLength <= 4) return "text-xs sm:text-sm lg:text-base"; // DELVE
    if (textLength <= 8) return "text-xs sm:text-sm"; // PURCHASE
    return "text-xs sm:text-sm"; // Longer text
  };

  // Dash sizing based on screen size
  const getDashSize = () => {
    if (!responsive) return "w-4 h-px";

    return "w-2 sm:w-3 lg:w-4 h-px";
  };

  return (
    <Button
      variant="jayded"
      className={`rounded-none group transition-all duration-300 text-white border border-white hover:bg-white hover:text-black ${getResponsivePadding()} ${className}`}
      {...props}
    >
      <span className={`relative flex h-full w-full items-center justify-center gap-2 sm:gap-3 lg:gap-4 transition-all duration-300 ${getResponsiveFont()}`}>
        {showDashes && (
          <span className={`${getDashSize()} bg-white group-hover:bg-black transition-colors duration-300`}></span>
        )}
        <span className="uppercase font-medium tracking-wider">{children}</span>
        {showDashes && (
          <span className={`${getDashSize()} bg-white group-hover:bg-black transition-colors duration-300`}></span>
        )}
      </span>
    </Button>
  );
};

export default StyledButton;
