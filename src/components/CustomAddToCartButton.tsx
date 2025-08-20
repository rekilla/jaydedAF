"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Custom Add to Cart Button Component
export const CustomAddToCartButton: React.FC<{
  productId: number;
  inStock?: boolean;
}> = ({ productId, inStock = true }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    if (!inStock) return;
    
    setIsLoading(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      setIsLoading(false);
      alert(`Product ${productId} added to cart! (Simulated)`);
    }, 1000);
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
      className="relative w-[127.25px] h-[56px] rounded-none border border-white bg-transparent text-white
                 hover:bg-white hover:text-black
                 transition-all duration-300
                 uppercase tracking-wider text-sm font-light group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className={`relative z-10 transition-opacity flex h-full w-full items-center justify-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <span className="w-3 h-px bg-white group-hover:bg-black"></span>
        Purchase
        <span className="w-3 h-px bg-white group-hover:bg-black"></span>
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