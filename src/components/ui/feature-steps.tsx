"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
// Removed Image from "next/image"
import { cn } from "../../lib/utils"; // Revert to relative path

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number | null; // Allow null to disable autoplay
  imageHeight?: string
  imagePosition?: 'left' | 'right'; // Control image position
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000, // Default interval
  imageHeight = "h-[400px]",
  imagePosition = 'right', // Default image position
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  // Autoplay logic
  useEffect(() => {
    if (autoPlayInterval === null) return; // Don't run if interval is null

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval])

  // Function to handle clicking on a step
  const handleStepClick = (index: number) => {
      setCurrentFeature(index);
      setProgress(0); // Reset progress on manual change
  };

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Render title above the grid */}
        {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center text-brand-gold">
                {title}
            </h2>
        )}

        {/* Use grid layout, adjust column order based on imagePosition */}
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center", // Keep grid structure
        )}>
          {/* Text Content Area */}
          <div className={cn(
              "space-y-6 md:space-y-8",
              imagePosition === 'right' ? 'md:order-1' : 'md:order-2' // Text on left if image right, text on right if image left
          )}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 md:gap-6 cursor-pointer" // Make steps clickable
                initial={{ opacity: 0.5 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleStepClick(index)} // Handle click
              >
                {/* Step Indicator */}
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 mt-1", // Align icon better
                    index === currentFeature
                      ? "bg-brand-gold border-brand-gold text-brand-background scale-110" // Use brand colors
                      : "bg-brand-dark/50 border-brand-text/30 text-brand-text/70", // Muted state
                  )}
                  transition={{ duration: 0.2 }}
                >
                  {/* Checkmark or Number */}
                  <AnimatePresence mode="wait">
                    {index === currentFeature ? (
                       <motion.span
                          key="checkmark"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          className="text-lg font-bold"
                       >✓</motion.span>
                    ) : (
                       <motion.span
                          key="number"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          className="text-lg font-semibold"
                       >{index + 1}</motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className={cn(
                      "text-xl md:text-2xl font-semibold mb-1 transition-colors",
                      index === currentFeature ? "text-brand-gold" : "text-brand-text" // Highlight title
                  )}>
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-base text-brand-text/70"> {/* Adjusted text size/color */}
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image Area */}
          <div
            className={cn(
              "relative overflow-hidden rounded-lg shadow-lg w-full h-full", // Ensure container takes height
              imageHeight, // Apply dynamic height (might conflict with h-full, consider removing imageHeight prop or adjusting)
              imagePosition === 'right' ? 'md:order-2' : 'md:order-1' // Image on right or left based on prop
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ x: imagePosition === 'right' ? 100 : -100, opacity: 0 }} // Slide from correct side
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: imagePosition === 'right' ? -100 : 100, opacity: 0 }} // Slide to opposite side
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {/* Use standard img tag, ensure it covers */}
                      <img
                        src={feature.image}
                        alt={feature.title || feature.step}
                        className="w-full h-full object-cover object-center" // Added object-center
                        width={1000} // Provide indicative width/height
                        height={500}
                        loading="lazy"
                      />
                      {/* Optional gradient overlay */}
                      {/* <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-background to-transparent" /> */}
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
             {/* Progress Bar */}
             {autoPlayInterval !== null && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold/20 overflow-hidden">
                    <motion.div
                        className="h-full bg-brand-gold"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1, ease: 'linear' }}
                    />
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}
