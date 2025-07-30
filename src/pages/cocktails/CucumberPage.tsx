import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlavorHero } from '../../components/FlavorHero';
import { FlavorHeroMobile } from '../../components/FlavorHeroMobile';
import { CustomAddToCartButton } from '../../components/CustomAddToCartButton';
import { BottleNexusProvider } from '../../contexts/BottleNexusContext';

// Mock components for demonstration - replace with your actual imports
const InView: React.FC<{ children: React.ReactNode; as?: React.ElementType; className?: string }> = ({ children, as = 'div', className = '', ...props }) => {
  const Component = as;
  return <Component className={className} {...props}>{children}</Component>;
};

// Utility function
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// Flavor Data
const flavorData = {
  key: "cucumber",
  name: "Laxly Cucumber",
  tagline: "Centered, Poised & Effortlessly Cool",
  colorClass: "text-white",
  colorHex: "#FFFFFF",
};

// Serving Styles Data
const servingStyles = [
  {
    id: 'neat',
    title: 'Neat',
    temp: '16°C',
    glass: 'Highball',
    description: 'Pure & unfiltered cucumber essence'
  },
  {
    id: 'rocks',
    title: 'On the Rocks',
    temp: '4°C',
    glass: 'Rocks Glass',
    description: 'Chilled perfection over quality ice'
  },
  {
    id: 'signature',
    title: 'Cucumber Collins',
    temp: '2°C',
    glass: 'Collins',
    description: 'Signature serve with fresh cucumber & soda'
  }
];

// Ritual Steps Data
const ritualSteps = [
  {
    step: 1,
    title: 'Chill to Perfection',
    description: 'Find your quiet space',
    image: '/CX1.jpg'
  },
  {
    step: 2,
    title: 'Pour with Intention',
    description: 'Add fresh cucumber',
    image: '/CX2.jpg'
  },
  {
    step: 3,
    title: 'Savor the Moment',
    description: 'Breathe and savor',
    image: '/CX3.jpg'
  }
];

const CucumberPage = () => {
  const [currentRitualStep, setCurrentRitualStep] = useState(0);

  // Memoize animations to prevent re-renders
  const heroAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: 0.5 }
  }), []);


  // Optimize ritual step handler
  const handleRitualStepChange = useCallback((index: number) => {
    setCurrentRitualStep(index);
  }, []);

  return (
    <BottleNexusProvider>
      <main className="w-full bg-black text-white overflow-x-hidden">
        
        {/* Enhanced Hero Section with Better Layout */}
        <section className="relative h-auto lg:h-screen w-full flex flex-col lg:block">
          {/* Background Container - Split layout on mobile */}
          <div className="absolute inset-0 w-full h-full lg:block hidden">
            <FlavorHero flavor={flavorData} />
            <div className="absolute inset-0 w-full h-full">
              <img
                src="/HC.jpg"
                alt="Cucumber Lifestyle"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Mobile Layout - Correct Layering */}
          <div className="lg:hidden relative h-screen w-full">
            {/* Background Effects */}
            <FlavorHeroMobile flavor={flavorData} />

            {/* Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="/HC.jpg"
                alt="Cucumber Lifestyle"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
              <motion.div {...heroAnimation}>
                <h1
                  className={cn(
                    "font-bold text-5xl sm:text-6xl",
                    "drop-shadow-2xl",
                    "text-white"
                  )}
                >
                  {flavorData.name}
                </h1>
                <p className="text-xl sm:text-2xl italic text-white mt-4">
                  {flavorData.tagline}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Desktop Text Content - Original layout */}
          <div className="relative z-10 h-full items-center justify-center lg:justify-start hidden lg:flex">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              <div className="w-full max-w-xl text-center lg:text-left">
                <motion.div {...heroAnimation}>
                  <div className="relative">
                    <div className="absolute inset-0 -inset-x-8 -inset-y-4 bg-black/20 backdrop-blur-sm rounded-2xl lg:hidden" />
                    <div className="relative">
                      <h1
                        className={cn(
                          "font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-2 sm:mb-4",
                          "drop-shadow-2xl",
                          "text-white"
                        )}
                      >
                        {flavorData.name}
                      </h1>
                      <p className="text-lg sm:text-xl md:text-2xl italic text-white px-4">
                        {flavorData.tagline}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator - Hide on mobile since hero is shorter */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* The Moment - Text Only Section */}
        <InView as="section" className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black to-gray-900/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6">
                The Final Chapter
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white leading-relaxed px-2 sm:px-0">
                Centered, Poised and Effortlessly Cool. The Laxly Cucumber Martini Cocktail embodies the vibe of the brand. Refreshingly boasting the essences of Elderflower, Pear and a hint of Lime.
              </p>
            </motion.div>
          </div>
        </InView>


        {/* Full-Width Lifestyle Moment */}
        <InView as="section" className="relative h-[50vh] xs:h-[55vh] sm:h-[60vh] min-h-[300px] sm:min-h-[400px] w-full overflow-hidden">
          <img
            src="/C2wide.jpg"
            alt="Garden Party Moment"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="max-w-lg"
              >
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white mb-2 sm:mb-4">
                  Your Garden Party Moment
                </h2>
                <p className="text-sm xs:text-base sm:text-lg text-white">
                  Where sophistication meets serenity
                </p>
              </motion.div>
            </div>
          </div>
        </InView>

        {/* The Cucumber Ritual - Scroll Triggered */}
        <InView as="section" className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black to-gray-900/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
              
              {/* Image Side */}
              <div className="relative h-[300px] xs:h-[350px] sm:h-[450px] lg:h-[500px] rounded-lg overflow-hidden order-2 lg:order-1">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentRitualStep}
                    src={ritualSteps[currentRitualStep].image}
                    alt={ritualSteps[currentRitualStep].title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    loading="lazy"
                  />
                </AnimatePresence>
              </div>

              {/* Content Side */}
              <div className="order-1 lg:order-2">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6 lg:mb-8">
                  The Cucumber Ritual
                </h2>
                <p className="text-sm xs:text-base sm:text-lg text-white mb-6 sm:mb-8 lg:mb-10">
                  The art of mindful preparation. Each step brings you closer to your moment of zen.
                </p>
                
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {ritualSteps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      className={cn(
                        "flex items-center gap-3 sm:gap-4 cursor-pointer p-2 sm:p-3 rounded-lg transition-all duration-300",
                        currentRitualStep === index ? "bg-white/10" : "hover:bg-white/5"
                      )}
                      onClick={() => handleRitualStepChange(index)}
                      whileHover={{ x: 5 }}
                    >
                      <div className={cn(
                        "w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                        currentRitualStep === index ? "bg-white/20" : "bg-white/10"
                      )}>
                        <span className={cn(
                          "text-xs xs:text-sm sm:text-base font-semibold",
                          currentRitualStep === index ? "text-white" : "text-white"
                        )}>
                          {step.step}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className={cn(
                          "text-sm xs:text-base sm:text-lg font-semibold mb-0.5 sm:mb-1 transition-colors duration-300",
                          currentRitualStep === index ? "text-white" : "text-white"
                        )}>
                          {step.title}
                        </h3>
                        <p className="text-xs xs:text-sm sm:text-base text-white">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </InView>

        {/* Serving Styles - Text Focused */}
        <InView as="section" className="py-12 xs:py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-center text-white mb-8 sm:mb-12 lg:mb-16">
              Your Perfect Serve
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 max-w-5xl mx-auto">
              {servingStyles.map((style) => (
                <motion.div
                  key={style.id}
                  className="text-center p-4 sm:p-6 rounded-lg bg-gray-900/10 hover:bg-gray-900/20 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg xs:text-xl sm:text-2xl text-white mb-2 sm:mb-3">
                    {style.title}
                  </h3>
                  <div className="text-xs xs:text-sm sm:text-base text-white space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                    <p><span className="text-white">{style.temp}</span> | {style.glass}</p>
                  </div>
                  <p className="text-xs xs:text-sm sm:text-base text-white leading-relaxed">
                    {style.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </InView>

        {/* Specifications - The Details */}
        <InView as="section" className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-center text-white mb-8 sm:mb-12 lg:mb-16">
                The Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {[
                  { delay: 0.1, value: '12%', label: 'ABV' },
                  { delay: 0.2, value: '90', label: 'Calories' },
                  { delay: 0.3, value: '5g', label: 'Sugar' },
                  { delay: 0.4, value: '750ml', label: 'Volume' }
                ].map((spec) => (
                  <motion.div 
                    key={spec.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: spec.delay }}
                    viewport={{ once: true }}
                  >
                    <div className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{spec.value}</div>
                    <div className="text-xs xs:text-sm sm:text-base text-white">{spec.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </InView>

        {/* Closing CTA Section */}
        <InView as="section" className="relative py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-black/80" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                Find Your Moment
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto px-4">
                Limited availability. Unlimited possibilities.
              </p>
              <div className="flex justify-center items-center flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <CustomAddToCartButton
                  productId={47037}
                  colorHex="#FFFFFF"
                />
                <div className="hidden" data-bottlenexus-id={47037}>
                  {/* This div is intentionally left empty for BottleNexus to populate */}
                </div>
              </div>
              <a
                href="/store-locator"
                className="text-xs xs:text-sm sm:text-base text-white hover:text-white transition-colors duration-200 inline-block"
              >
                Find a retailer near you →
              </a>
            </motion.div>
          </div>
        </InView>

      </main>
    </BottleNexusProvider>
  );
};

export default CucumberPage;