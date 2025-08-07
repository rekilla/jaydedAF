import React from 'react';
import { Button, ButtonProps } from './ui/button';

interface CollectionButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const CollectionButton: React.FC<CollectionButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button
      variant="collection"
      className={`w-[127.25px] h-[56px] rounded-none group ${className}`}
      {...props}
    >
      <span className="relative flex h-full w-full items-center justify-center gap-2 transition-all duration-300">
        <span className="w-4 h-px bg-black group-hover:bg-white"></span>
        <span className="uppercase">{children}</span>
        <span className="w-4 h-px bg-black group-hover:bg-white"></span>
      </span>
    </Button>
  );
};

export default CollectionButton;