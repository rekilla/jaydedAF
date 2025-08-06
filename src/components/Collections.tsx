"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BottleNexusButton } from './BottleNexusButton';
import { useCart } from '../contexts/CartContext';
import { BottleNexusProvider } from '../contexts/BottleNexusContext';
import { products, Product } from '../data/products';
import { CustomAddToCartButton } from './CustomAddToCartButton';

// Image preloader hook
const useImagePreloader = (imageUrls: string[]) => {
  useEffect(() => {
    const preloadImages = async () => {
      const promises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      try {
        await Promise.all(promises);
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();
  }, [imageUrls]);
};

// Individual Product Card Component
const ProductCard: React.FC<{
  product: Product;
}> = ({ product }) => {
  const { openCart } = useCart();

  return (
    <motion.div
      className="relative flex flex-col items-center"
    >

      {/* Product Image Container */}
      <Link to={product.path}>
        <div
          className="relative z-10 w-64 h-80 mb-8 cursor-pointer transform-gpu"
        >
          <motion.img
            src={product.bottleImage}
            alt={`${product.name} bottle`}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="text-center z-10">
        <p className="text-sm text-black/80 max-w-xs mx-auto mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Hidden BottleNexus button */}
        <div className="hidden" data-bottlenexus-id={product.bottleNexusId}>
          {product.bottleNexusId && (
            <BottleNexusButton id={product.bottleNexusId} onCartOpen={openCart} />
          )}
        </div>

        {/* Visible Custom Button */}
        <CustomAddToCartButton 
          productId={product.bottleNexusId || product.id}
          inStock={product.inStock}
        />
      </div>

    </motion.div>
  );
};

// InView component placeholder
const InView: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

// Main Collection Section Component
export const LuxuryCollectionSection: React.FC = () => {

  const allImageUrls = products.flatMap(product => [product.bottleImage, product.lifestyleImage]);
  useImagePreloader(allImageUrls);


  return (
    <BottleNexusProvider>
      <section className="relative py-20 sm:py-24 pb-32 bg-white overflow-hidden">
        <InView className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[120px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pb-12">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                >
                  <ProductCard
                    product={product}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </InView>
      </section>
    </BottleNexusProvider>
  );
};

export default LuxuryCollectionSection;
