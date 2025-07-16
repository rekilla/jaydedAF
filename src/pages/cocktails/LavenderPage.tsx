"use client";
import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlavorHero } from '../../components/FlavorHero';
import { FlavorHeroMobile } from '../../components/FlavorHeroMobile';

// Mock components
const InView: React.FC<{ children: React.ReactNode; as?: React.ElementType; className?: string }> = ({ children, as = 'div', className = '', ...props }) => {
  const Component = as;
  return <Component className={className} {...props}>{children}</Component>;
};

const BottleNexusProvider: React.FC<{children: React.ReactNode}> = ({ children }) => <div>{children}</div>;

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// Flavor Data
const flavorData = {
  key: "lavender",
  name: "Laxly Lavender",
  tagline: "Elegant, Aromatic & Mysteriously Alluring",
  colorClass: "",
  colorHex: "#8A2BE2",
};

// Serving Styles Data
const servingStyles = [
  {
    id: 'neat',
    title: 'Neat',
    temp: '18°C',
    glass: 'Coupe',
    description: 'Pure & unfiltered floral essence'
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
    title: 'Lavender Haze Martini',
    temp: '2°C',
    glass: 'Martini',
    description: 'Signature serve with a twist of lemon'
  }
];

// Ritual Steps Data
const ritualSteps = [
  {
    step: 1,
    title: 'Find Your Sanctuary',
    description: 'Create your calm space',
    image: '/images/ritual/chill-lavender.jpg'
  },
  {
    step: 2,
    title: 'Pour with Grace',
    description: 'Add a sprig of lavender',
    image: '/images/ritual/pour-lavender.jpg'
  },
  {
    step: 3,
    title: 'Inhale the Aroma',
    description: 'Breathe deep and relax',
    image: '/images/ritual/savor-lavender.jpg'
  }
];

const LavenderPage = () => {
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
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 17.5%, black 82.5%, transparent 100%), linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 17.5%, black 82.5%, transparent 100%), linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
            >
              <img
                src="/HL.jpg"
                alt="Lavender Lifestyle"
                className="w-full h-full object-cover object-center"
                style={{
                  objectPosition: '50% 50%'
                }}
              />
            </div>
          </div>

          {/* Mobile Layout - Compact with minimal gap */}
          <div className="lg:hidden relative min-h-screen">
            {/* Enhanced Background for mobile */}
            <div className="absolute inset-0">
              <FlavorHeroMobile flavor={flavorData} />
            </div>
            
            {/* Content - Ultra tight spacing */}
            <div className="relative z-10 pt-16">
              {/* Text section with NO bottom padding */}
              <div className="px-6">
                <motion.div {...heroAnimation} className="text-center">
                  <h1
                    style={{color: flavorData.colorHex}}
                    className={cn(
                      "font-bold text-4xl xs:text-5xl sm:text-6xl",
                      "drop-shadow-2xl",
                      flavorData.colorClass
                    )}
                  >
                    {flavorData.name}
                  </h1>
                  <p className="text-lg xs:text-xl sm:text-2xl italic text-white/90">
                    {flavorData.tagline}
                  </p>
                </motion.div>
              </div>
              
              {/* Image section with negative margin to close gap */}
              <div className="h-[70vh] relative -mt-9">
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 5%, black 20%, black 80%, transparent 95%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 5%, black 20%, black 80%, transparent 95%)',
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in',
                  }}
                >
                  <img
                    src="/HL.jpg"
                    alt="Lavender Lifestyle"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
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
                        style={{color: flavorData.colorHex}}
                        className={cn(
                          "font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-2 sm:mb-4",
                          "drop-shadow-2xl",
                          flavorData.colorClass
                        )}
                      >
                        {flavorData.name}
                      </h1>
                      <p className="text-lg sm:text-xl md:text-2xl italic text-white/80 px-4">
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
              className="text-white/50"
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
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-yellow-400 mb-4 sm:mb-6">
                Crafted from Fields of Serenity
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/70 leading-relaxed px-2 sm:px-0">
                Lush lavender fields inspire a gin that's both calming and complex. 
                When you seek a moment of pure elegance, when tranquility is your desire, discover the allure of the mysterious.
              </p>
            </motion.div>
          </div>
        </InView>

        {/* Taste Journey */}
        <InView as="section" className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-900/10 to-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-center text-yellow-400 mb-8 sm:mb-12 lg:mb-16">
              The Taste Journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
              {[
                { delay: 0.2, colorClasses: 'from-purple-400/20 to-purple-600/20', icon: '🪻', title: 'Initial', desc: 'Delicate lavender and soft floral notes' },
                { delay: 0.4, colorClasses: 'from-pink-400/20 to-pink-600/20', icon: '🍯', title: 'Heart', desc: 'A hint of wild honey and subtle botanicals' },
                { delay: 0.6, colorClasses: 'from-indigo-400/20 to-indigo-600/20', icon: '✨', title: 'Finish', desc: 'Smooth, elegant, with a whisper of sweetness' }
              ].map((item) => (
                <motion.div
                  key={item.title}
                  className="text-center px-4 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay }}
                  viewport={{ once: true }}
                >
                  <div className={cn("w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br flex items-center justify-center", item.colorClasses)}>
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl text-yellow-400 mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-xs xs:text-sm sm:text-base text-white/70 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </InView>

        {/* Your Sunset Soiree Moment */}
        <section className="w-full bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white mb-2 sm:mb-4">
                Your Sunset Soiree Moment
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-white/80">
                Where elegance meets enchantment
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src="/Lwide.jpg"
              alt="Elegant lavender cocktail soiree"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>
        </section>

        {/* The Lavender Ritual - Scroll Triggered */}
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
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-yellow-400 mb-4 sm:mb-6 lg:mb-8">
                  The Lavender Ritual
                </h2>
                <p className="text-sm xs:text-base sm:text-lg text-white/80 mb-6 sm:mb-8 lg:mb-10">
                  The art of mindful preparation. Each step deepens the connection to your moment of peace.
                </p>
                
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {ritualSteps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      className={cn(
                        "flex items-center gap-3 sm:gap-4 cursor-pointer p-2 sm:p-3 rounded-lg transition-all duration-300",
                        currentRitualStep === index ? "bg-yellow-400/10" : "hover:bg-yellow-400/5"
                      )}
                      onClick={() => handleRitualStepChange(index)}
                      whileHover={{ x: 5 }}
                    >
                      <div className={cn(
                        "w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                        currentRitualStep === index ? "bg-yellow-400/20" : "bg-yellow-400/10"
                      )}>
                        <span className={cn(
                          "text-xs xs:text-sm sm:text-base font-semibold",
                          currentRitualStep === index ? "text-yellow-400" : "text-yellow-400/70"
                        )}>
                          {step.step}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className={cn(
                          "text-sm xs:text-base sm:text-lg font-semibold mb-0.5 sm:mb-1 transition-colors duration-300",
                          currentRitualStep === index ? "text-yellow-400" : "text-white"
                        )}>
                          {step.title}
                        </h3>
                        <p className="text-xs xs:text-sm sm:text-base text-white/70">{step.description}</p>
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
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-center text-yellow-400 mb-8 sm:mb-12 lg:mb-16">
              Your Perfect Serve
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 max-w-5xl mx-auto">
              {servingStyles.map((style, index) => (
                <motion.div
                  key={style.id}
                  className="text-center p-4 sm:p-6 rounded-lg bg-gray-900/10 hover:bg-gray-900/20 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg xs:text-xl sm:text-2xl text-yellow-400 mb-2 sm:mb-3">
                    {style.title}
                  </h3>
                  <div className="text-xs xs:text-sm sm:text-base text-white/70 space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                    <p><span className="text-yellow-400">{style.temp}</span> | {style.glass}</p>
                  </div>
                  <p className="text-xs xs:text-sm sm:text-base text-white/60 leading-relaxed">
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
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-center text-yellow-400 mb-8 sm:mb-12 lg:mb-16">
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
                    <div className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2">{spec.value}</div>
                    <div className="text-xs xs:text-sm sm:text-base text-white/70">{spec.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </InView>

        {/* Closing CTA Section */}
        <InView as="section" className="relative py-8 xs:py-10 sm:py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-black/80" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-yellow-400 mb-3 sm:mb-4 md:mb-6">
                Embrace the Allure
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                Limited availability. Unlimited tranquility.
              </p>
              <a
                href="/store-locator"
                className="text-xs xs:text-sm sm:text-base text-yellow-400 hover:text-yellow-400/80 transition-colors duration-200 inline-block"
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

export default LavenderPage;