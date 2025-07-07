"use client";

import { useEffect } from 'react';

export const BottleNexusLoader: React.FC = () => {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="buybutton.stagingbottlenexus.com"]');
    if (existingScript) {
      console.log('[DEBUG] BottleNexus script already loaded');
      return;
    }

    // Create and load the script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://buybutton.stagingbottlenexus.com/buybutton.min.js?v=1751046740211';
    
    // Add data attributes
    script.setAttribute('data-bottle-nexus', 'true');
    
    script.onload = () => {
      if ((window as any).BottleNexus) {
        const instance = (window as any).BottleNexus.init();
        
        // Preload cart components to speed up first interaction
        instance.preloadCart?.();
        
        // Enable fast mode if available
        instance.setConfig?.({
          enableFastCheckout: true,
          preloadAssets: true
        });
        
        console.log('[DEBUG] BottleNexus initialized with optimizations');
      }
    };

    script.onerror = () => {
      console.error('[DEBUG] Failed to load Bottle Nexus script');
    };

    // Append to body
    document.body.appendChild(script);

    return () => {
      // Don't remove script on cleanup as it might be used by other components
    };
  }, []);

  return null;
};
