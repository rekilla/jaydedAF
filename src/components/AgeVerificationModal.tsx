import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button'; // Use Shadcn Button
import { Input } from './ui/input';
import { Label } from './ui/label';

interface AgeVerificationModalProps {
  onVerified: () => void;
  // We might not need isOpen if it manages its own visibility based on localStorage check in App.tsx
}

export const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ onVerified }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false); // State for exit message

  const handleVerify = () => {
    setErrorMessage(null); // Clear previous errors

    // Basic Validation
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    // Removed log

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum) ||
        dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 ||
        year.length !== 4 || yearNum > new Date().getFullYear()) {
      // Removed log
      setErrorMessage("Please enter a valid date (MM/DD/YYYY).");
      return;
    }

    try {
        // Construct date carefully (month is 0-indexed in JS Date)
        const birthDate = new Date(yearNum, monthNum - 1, dayNum);
        // Check if the constructed date is valid (accounts for days in month)
        if (birthDate.getFullYear() !== yearNum ||
            birthDate.getMonth() !== monthNum - 1 ||
            birthDate.getDate() !== dayNum) {
             // Removed log
             setErrorMessage("Please enter a valid date.");
             return;
        }

        const today = new Date();
        const thresholdDate = new Date(today.getFullYear() - 21, today.getMonth(), today.getDate());
        // Removed log

        if (birthDate <= thresholdDate) {
            // Removed log
            onVerified(); // Call the success callback
        } else {
            // Removed log
            setErrorMessage("You must be 21 years or older to enter.");
        }
    } catch (e) {
        setErrorMessage("An error occurred validating the date.");
        console.error("Date validation error:", e); // Keep error log
    }
  };

  const handleExit = () => {
    // Display an exit message instead of closing the window
    setIsExiting(true);
    setErrorMessage("Access denied. You must be 21 or older.");
    // Optionally, redirect after a delay or provide a link elsewhere
    // window.location.href = 'https://google.com'; // Example redirect
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
                className="bg-brand-dark border border-brand-gold/30 rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full text-center text-brand-text" // Ensure base text is white/brand-text
            >
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-gold mb-4">Verify Your Age</h2>
                <p className="text-brand-text/80 mb-6 text-sm sm:text-base">
                    Please enter your date of birth to confirm you are 21 years or older to access this site.
                </p>

                {isExiting ? (
                     <p className="text-red-500 font-semibold text-lg">{errorMessage || "Access Denied."}</p>
                ) : (
                    <>
                        <div className="flex justify-center items-end gap-2 sm:gap-3 mb-4">
                            <div className="flex-1">
                                <Label htmlFor="month" className="sr-only">Month</Label>
                                <Input
                                    id="month"
                                    type="text" // Use text for better control
                                    inputMode="numeric"
                                    maxLength={2}
                                    placeholder="MM"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value.replace(/[^0-9]/g, ''))}
                                    className="text-center bg-black/30 border-brand-text/30 focus:border-brand-gold focus:ring-brand-gold placeholder:text-brand-text/50 text-brand-text" // Added text color
                                    aria-label="Birth month"
                                />
                            </div>
                            <span className="text-brand-text/50 text-xl pb-1">/</span>
                            <div className="flex-1">
                                <Label htmlFor="day" className="sr-only">Day</Label>
                                <Input
                                    id="day"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={2}
                                    placeholder="DD"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value.replace(/[^0-9]/g, ''))}
                                    className="text-center bg-black/30 border-brand-text/30 focus:border-brand-gold focus:ring-brand-gold placeholder:text-brand-text/50 text-brand-text" // Added text color
                                    aria-label="Birth day"
                                />
                            </div>
                            <span className="text-brand-text/50 text-xl pb-1">/</span>
                            <div className="flex-[1.5]"> {/* Wider year input */}
                                <Label htmlFor="year" className="sr-only">Year</Label>
                                <Input
                                    id="year"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={4}
                                    placeholder="YYYY"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value.replace(/[^0-9]/g, ''))}
                                    className="text-center bg-black/30 border-brand-text/30 focus:border-brand-gold focus:ring-brand-gold placeholder:text-brand-text/50 text-brand-text" // Added text color
                                    aria-label="Birth year"
                                />
                            </div>
                        </div>

                        {errorMessage && (
                            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            {/* Exit Button: White border/text, black text on hover */}
                            <Button variant="outline" onClick={handleExit} className="flex-1 border-white text-white hover:bg-white hover:text-black">
                                Exit
                            </Button>
                            {/* Verify Button: Gold bg, dark text */}
                            <Button onClick={handleVerify} className="flex-1 bg-brand-gold text-brand-dark hover:bg-brand-gold/90">
                                Verify Age
                            </Button>
                        </div>
                    </>
                )}
            </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};
