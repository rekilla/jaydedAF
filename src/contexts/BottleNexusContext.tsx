"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface BottleNexusInstance {
  createComponent: (options: any) => void;
  cart?: {
    on: (event: string, callback: (data: any) => void) => void;
  };
}

interface BottleNexusContextType {
  instance: BottleNexusInstance | null;
  isInitialized: boolean;
}

const BottleNexusContext = createContext<BottleNexusContextType>({
  instance: null,
  isInitialized: false,
});

export const useBottleNexus = () => useContext(BottleNexusContext);

export const BottleNexusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [instance, setInstance] = useState<BottleNexusInstance | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = () => {
      if ((window as any).BottleNexus) {
        try {
          const bnInstance = (window as any).BottleNexus.init();
          setInstance(bnInstance);
          setIsInitialized(true);
          console.log('BottleNexus initialized successfully.');

          // Attach event listeners here, once
          if (bnInstance.cart) {
            bnInstance.cart.on('add', function(event: any) {
              console.log('Product added to cart:', event);
              window.dispatchEvent(new CustomEvent('bottlenexus:cart:add', { detail: event }));
            });
            
            bnInstance.cart.on('open', function() {
              console.log('Cart opened');
              window.dispatchEvent(new CustomEvent('bottlenexus:cart:open'));
            });
            
            bnInstance.cart.on('update', function(cart: any) {
              console.log('Cart updated:', cart);
              window.dispatchEvent(new CustomEvent('bottlenexus:cart:update', { detail: cart }));
            });
          }
        } catch (error) {
          console.error('Failed to initialize BottleNexus:', error);
        }
      } else {
        // Retry if the script hasn't loaded yet
        setTimeout(initialize, 100);
      }
    };

    // The BottleNexusLoader component should handle the script loading.
    // We just need to wait for the window.BottleNexus object.
    initialize();
  }, []);

  return (
    <BottleNexusContext.Provider value={{ instance, isInitialized }}>
      {children}
    </BottleNexusContext.Provider>
  );
};
