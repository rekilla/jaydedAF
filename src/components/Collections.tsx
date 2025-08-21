"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products, Product } from '../data/products';
import { SectionTitle } from './ui/SectionTitle';
import SizeChooser from './SizeChooser';
import { BN_IDS, baseOptions } from '../config/bnProducts';
import { BN_TOKEN } from '../config/bnRuntime';

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
  const productKey = (product.path.includes('lemon')
    ? 'lemon'
    : product.path.includes('lavender')
      ? 'lavender'
      : 'cucumber') as keyof typeof BN_IDS;

  // Override BN button styles for white background (black outline/text; hover fill black, text white)
  const makeLightOptions = (text: string) => ({
    ...baseOptions,
    buttonText: text,
    styles: {
      "[data-component='button']": {
        "background-color": "TRANSPARENT",
        "border": "solid 1px #000000",
        "color": "#000000"
      },
      "[data-component='button']:hover": {
        "background-color": "#000000",
        "color": "#FFFFFF",
        "border": "solid 1px #000000"
      }
    }
  });

  return (
    <motion.div
      className="relative flex flex-col items-center group pt-12 pb-12"
    >
      {/* Media Block */}
      <Link to={product.path} className="group">
        <div
          className="relative w-64 h-80 cursor-pointer"
        >
          <motion.img
            src={product.bottleImage}
            alt={`${product.name} bottle`}
            className="absolute inset-0 w-full h-full object-contain transform transition-transform duration-300 ease-in-out scale-125 origin-bottom group-hover:scale-[1.45]" // Slightly larger scale for visibility
          />
        </div>
      </Link>

      {/* Content Block */}
      <div className="text-center z-10">
        <p className="text-sm text-black/80 max-w-xs mx-auto mb-4 leading-relaxed">
          {product.description}
        </p>


        {/* Visible Size Chooser Purchase CTA (light theme for white background) */}
        <div className="mt-2">
          <SizeChooser
            id750={BN_IDS[productKey]["750"]}
            id375={BN_IDS[productKey]["375"]}
            token={BN_TOKEN}
            options750={makeLightOptions("PRE ORDER 750ML")}
            options375={makeLightOptions("PRE ORDER 375ML")}
            variant="light"
          />
        </div>
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
      <section className="relative py-20 sm:py-24 pb-0 bg-white">
        <InView className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[120px]">
            <div className="text-center mb-12">
              <SectionTitle flavor="lemon" lineWidth="40%" noUnderline>The Collection</SectionTitle>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="group"
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
  );
};

export default LuxuryCollectionSection;
