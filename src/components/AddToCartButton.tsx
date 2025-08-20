"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  price: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  productId
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    // Simulate adding to cart
    try {
      console.log(`Product ${productId} added to cart! (Simulated)`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="relative px-8 py-3 border border-brand-gold text-brand-gold 
                 hover:bg-brand-gold hover:text-black transition-all duration-300
                 uppercase tracking-wider text-sm font-light group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        Add to Cart
      </span>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-brand-gold border-t-transparent 
                          rounded-full animate-spin" />
        </div>
      )}
      
      <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-10 
                      transition-opacity duration-300" />
    </motion.button>
  );
};
