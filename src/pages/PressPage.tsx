import React from 'react';
import { motion } from 'framer-motion';

const PressPage: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-white text-black flex items-center justify-center pt-32 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md text-center"
      >
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
          Press
        </h1>
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-black mb-4">In the Press</h2>
          <p className="text-lg text-black/80 leading-relaxed">
            Check back soon for media features and brand highlights.
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default PressPage;