"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  onImageHover: () => void;
  onImageLeave: () => void;
  isDimmed: boolean;
}> = ({ product, onImageHover, onImageLeave }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { openCart } = useCart();

  return (
    <motion.div
      className="relative flex flex-col items-center"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Spotlight Effect */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[400px] opacity-50"
        style={{
          background: `linear-gradient(to bottom, ${product.colorHex}40 0%, transparent 60%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: product.colorHex,
              left: `${20 + Math.random() * 60}%`,
              top: `${10 + Math.random() * 30}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Product Image Container */}
      <div
        className="relative z-10 w-64 h-80 mb-8 cursor-pointer transform-gpu"
        onMouseEnter={() => { setIsHovered(true); onImageHover(); }}
        onMouseLeave={() => { setIsHovered(false); onImageLeave(); }}
      >
        <motion.img
          src={product.bottleImage}
          alt={`${product.name} bottle`}
          className="absolute inset-0 w-full h-full object-contain"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ filter: `drop-shadow(0 25px 50px ${product.colorHex}20)` }}
        />
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${product.colorHex}20 0%, transparent 70%)` }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Product Info */}
      <div className="text-center z-10">
        <p className="text-sm text-white/80 max-w-xs mx-auto mb-4 leading-relaxed">
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
          colorHex={product.colorHex}
        />
      </div>

      {/* Bottom Glow */}
      <div 
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-t ${product.colorClass} blur-3xl opacity-30`}
      />
    </motion.div>
  );
};

// InView component placeholder
const InView: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

// Main Collection Section Component
export const LuxuryCollectionSection: React.FC = () => {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  const allImageUrls = products.flatMap(product => [product.bottleImage, product.lifestyleImage]);
  useImagePreloader(allImageUrls);

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 }
    })
  };

  return (
    <BottleNexusProvider>
      <section className="relative py-20 sm:py-24 pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
        <InView className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[120px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pb-12">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  custom={index}
                  variants={cardVariants}
                  initial="initial"
                  animate="visible"
                >
                  <ProductCard
                    product={product}
                    onImageHover={() => setHoveredProductId(product.id)}
                    onImageLeave={() => setHoveredProductId(null)}
                    isDimmed={false}
                  />
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </InView>
      </section>
    </BottleNexusProvider>
  );
};

export default LuxuryCollectionSection;
