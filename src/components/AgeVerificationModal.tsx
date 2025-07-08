import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button'; // Use Shadcn Button

interface AgeVerificationModalProps {
  onVerified: () => void;
}

export const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ onVerified }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleYes = () => {
    onVerified();
  };

  const handleNo = () => {
    setIsExiting(true);
    setErrorMessage("Access denied. You must be 21 or older.");
  };

  return (
    <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4" // High z-index
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="bg-brand-dark border border-brand-gold/30 rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full text-center text-brand-text"
            >
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-gold mb-6">
                    Are you over the age of 21?
                </h2>

                {isExiting ? (
                    <p className="text-red-500 font-semibold text-lg">{errorMessage || "Access Denied."}</p>
                ) : (
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <Button variant="outline" onClick={handleNo} className="flex-1 border-white text-white hover:bg-white hover:text-black">
                            No
                        </Button>
                        <Button onClick={handleYes} className="flex-1 bg-brand-gold text-brand-dark hover:bg-brand-gold/90">
                            Yes
                        </Button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};
