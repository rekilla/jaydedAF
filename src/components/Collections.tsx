"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BottleNexusButton } from './BottleNexusButton';
import { useCart } from '../contexts/CartContext';

// Product data type
interface Product {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  bottleImage: string;
  lifestyleImage: string;
  colorHex: string;
  colorClass: string;
  bottleNexusId?: number;
  inStock?: boolean;
}

// Products data
const products: Product[] = [
  {
    id: 1,
    name: "LEMON DROP",
    subtitle: "COCKTAIL",
    description: "A vibrant twist on a classic. Sharp lemon zest meets smooth gin.",
    price: "$24.99",
    bottleImage: "/Leamon_Bottle_Render.png",
    lifestyleImage: "/asc.jpg",
    colorHex: "#FFD700",
    colorClass: "from-yellow-600/20 to-yellow-400/5",
    bottleNexusId: 47035,
    inStock: true
  },
  {
    id: 2,
    name: "LAVENDER",
    subtitle: "COCKTAIL", 
    description: "Smooth gin infused with lavender botanicals for a calming experience.",
    price: "$24.99",
    bottleImage: "/Lavender_Bottle_Render.png",
    lifestyleImage: "/asc.jpg",
    colorHex: "#8A2BE2",
    colorClass: "from-purple-600/20 to-purple-400/5",
    bottleNexusId: 47036,
    inStock: true
  },
  {
    id: 3,
    name: "LAXLY CUCUMBER",
    subtitle: "COCKTAIL",
    description: "Cool, crisp cucumber blended with premium gin for ultimate refreshment.",
    price: "$24.99",
    bottleImage: "/cucumber_Bottle_Render.png",
    lifestyleImage: "/asc.jpg",
    colorHex: "#2FAF7D",
    colorClass: "from-emerald-600/20 to-emerald-400/5",
    bottleNexusId: 47037,
    inStock: true
  }
];

// Custom Add to Cart Button Component
const CustomAddToCartButton: React.FC<{
  productId: number;
  productName: string;
  inStock?: boolean;
  colorHex: string;
}> = ({ productId, productName, inStock = true, colorHex }) => {
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
      className="relative px-8 py-3 border border-white/80 text-white
                 hover:border-[#faed23] hover:text-[#faed23]
                 transition-all duration-300
                 uppercase tracking-wider text-sm font-light group
                 overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        boxShadow: `0 0 20px ${colorHex}10`
      }}
    >
      <span className={`relative z-10 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        Add to Cart
      </span>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-5 h-5 border-2 border-[#faed23] border-t-transparent 
                          rounded-full animate-spin" />
        </div>
      )}
      
      {/* Animated fill background */}
      <motion.div 
        className="absolute inset-0 bg-[#faed23]"
        initial={{ y: "100%" }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

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
}> = ({ product, onImageHover, onImageLeave, isDimmed }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { openCart } = useCart();

  return (
    <motion.div 
      className="relative flex flex-col items-center"
      animate={{
        opacity: isDimmed ? 0.4 : 1,
        filter: isDimmed ? 'grayscale(50%)' : 'grayscale(0%)'
      }}
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
        className="relative z-10 w-64 h-80 mb-8 cursor-pointer"
        onMouseEnter={() => { setIsHovered(true); onImageHover(); }}
        onMouseLeave={() => { setIsHovered(false); onImageLeave(); }}
      >
        <motion.img
          src={product.bottleImage}
          alt={`${product.name} bottle`}
          className="absolute inset-0 w-full h-full object-contain"
          animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.95 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ filter: `drop-shadow(0 25px 50px ${product.colorHex}20)` }}
        />
        <motion.img
          src={product.lifestyleImage}
          alt={`${product.name} lifestyle`}
          className="absolute inset-0 w-full h-full object-contain"
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.95 }}
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
        <h3 className="text-2xl font-light tracking-wider mb-1" style={{ color: product.colorHex }}>
          {product.name}
        </h3>
        <p className="text-sm text-white/60 tracking-widest mb-3">{product.subtitle}</p>
        <p className="text-sm text-white/80 max-w-xs mx-auto mb-4 leading-relaxed">
          {product.description}
        </p>
        <p className="text-xl text-white mb-6">{product.price}</p>

        {/* Hidden BottleNexus button */}
        <div className="hidden" data-bottlenexus-id={product.bottleNexusId}>
          {product.bottleNexusId && (
            <BottleNexusButton id={product.bottleNexusId} onCartOpen={openCart} />
          )}
        </div>

        {/* Visible Custom Button */}
        <CustomAddToCartButton 
          productId={product.bottleNexusId || product.id}
          productName={product.name}
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
    <section className="relative py-20 sm:py-24 pb-32 bg-[#1a1a1a] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      <InView className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[120px]">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl sm:text-5xl font-light tracking-wider text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              The Collection
            </motion.h2>
            <motion.p 
              className="text-lg text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Choose your expression of liquid opulence
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
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
                  isDimmed={hoveredProductId !== null && hoveredProductId !== product.id}
                />
              </motion.div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </InView>
    </section>
  );
};

export default LuxuryCollectionSection;
