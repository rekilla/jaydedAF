import React from 'react';
import { Button, ButtonProps } from './ui/button';

interface StyledButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button
      variant="jayded"
      className={`w-[127.25px] h-[56px] rounded-none group ${className}`}
      {...props}
    >
      <span className="flex items-center justify-center gap-4">
        <span className="w-4 h-px bg-white group-hover:bg-black"></span>
        <span className="uppercase">{children}</span>
        <span className="w-4 h-px bg-white group-hover:bg-black"></span>
      </span>
    </Button>
  );
};

export default StyledButton;
