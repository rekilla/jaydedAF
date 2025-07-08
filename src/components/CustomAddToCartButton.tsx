"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Custom Add to Cart Button Component
export const CustomAddToCartButton: React.FC<{
  productId: number;
  inStock?: boolean;
  colorHex: string;
}> = ({ productId, inStock = true, colorHex }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    if (!inStock) return;
    
    setIsLoading(true);
    
    // Find and click the hidden BottleNexus button
    setTimeout(() => {
      const bottleNexusContainer = document.querySelector(`[data-bottlenexus-id="${productId}"]`);
      if (bottleNexusContainer) {
        const iframe = bottleNexusContainer.querySelector('iframe');
        if (iframe) {
          // Try to click the button inside the iframe
          try {
            const iframeDoc = (iframe as HTMLIFrameElement).contentDocument;
            if (iframeDoc) {
              const button = iframeDoc.querySelector('button');
              if (button) {
                button.click();
              }
            }
          } catch (e) {
            // If cross-origin, try clicking the iframe itself
            iframe.click();
          }
        }
      }
      
      setTimeout(() => setIsLoading(false), 500);
    }, 100);
  };

  if (!inStock) {
    return (
      <button
        disabled
        className="px-8 py-3 border border-white/20 text-white/40 
                   uppercase tracking-wider text-sm font-light
                   cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="relative px-8 py-3 border border-[#D4AF37] text-[#D4AF37] 
                 hover:bg-[#D4AF37] hover:text-black
                 transition-all duration-300
                 uppercase tracking-wider text-sm font-light group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        boxShadow: `0 0 20px ${colorHex}10`
      }}
    >
      <span className={`relative z-10 transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        Add to Cart
      </span>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent 
                          rounded-full animate-spin" />
        </div>
      )}
    </motion.button>
  );
};