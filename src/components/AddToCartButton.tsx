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
    
    try {
      // Find the actual BottleNexus button and click it
      const bottleNexusButton = document.querySelector(
        `[data-product-id="${productId}"] iframe`
      );
      
      if (bottleNexusButton) {
        // Try to access the button inside the iframe
        const iframeDoc = (bottleNexusButton as HTMLIFrameElement).contentDocument;
        if (iframeDoc) {
          const button = iframeDoc.querySelector('button');
          if (button) {
            button.click();
            console.log('Clicked BottleNexus button for product', productId);
          }
        }
      }
      
      // Alternative: Try using the BottleNexus API directly
      if ((window as any).BottleNexusInstance) {
        const instance = (window as any).BottleNexusInstance;
        console.log('BottleNexus instance:', instance);
        
        // Try different methods
        if (instance.addItem) {
          await instance.addItem(productId, 1);
        } else if (instance.cart?.addVariant) {
          await instance.cart.addVariant(productId, 1);
        } else if (instance.UI?.components?.product?.[productId]) {
          // Try to trigger the product's add to cart
          const productComponent = instance.UI.components.product[productId];
          if (productComponent.addToCart) {
            productComponent.addToCart();
          }
        }
      }
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
