import React from 'react';
import { Button, ButtonProps } from './ui/button';

interface StyledButtonProps extends ButtonProps {
  children: React.ReactNode;
  variant?: "jayded" | "collection" | "contact";
}

const StyledButton: React.FC<StyledButtonProps> = ({ children, className, variant = "jayded", ...props }) => {
  return (
    <Button
      variant={variant}
      className={`w-[127.25px] h-[56px] rounded-none group ${className}`}
      {...props}
    >
      <span className="relative flex h-full w-full items-center justify-center gap-4 transition-all duration-300">
        <span className="w-4 h-px bg-white group-hover:bg-black"></span>
        <span className="uppercase">{children}</span>
        <span className="w-4 h-px bg-white group-hover:bg-black"></span>
      </span>
    </Button>
  );
};

export default StyledButton;
