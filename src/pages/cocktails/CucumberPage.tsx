import React, { useState, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Mock components for demonstration - replace with your actual imports
const InView: React.FC<{ children: React.ReactNode; as?: React.ElementType; className?: string }> = ({ children, as = 'div', className = '', ...props }) => {
  const Component = as;
  return <Component className={className} {...props}>{children}</Component>;
};

const BottleNexusButton: React.FC<{ id: number }> = ({ id }) => (
  <button className="px-4 sm:px-6 py-2 sm:py-3 bg-brand-gold text-black font-semibold rounded-lg hover:bg-brand-gold/90 transition-colors text-sm sm:text-base">
    Quick Order
  </button>
);

const CustomAddToCartButton: React.FC<{ productId: number; colorHex: string }> = ({ productId, colorHex }) => (
  <button
    className="px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors text-sm sm:text-base"
    style={{ backgroundColor: colorHex }}
  >
    Add to Cart
  </button>
);

const BottleNexusProvider: React.FC<{children: React.ReactNode}> = ({ children }) => <div>{children}</div>;

// Utility function
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// Flavor Data
const FLAVOR_NAME = "Laxly Cucumber";
const FLAVOR_TAGLINE = "Centered, Poised & Effortlessly Cool";
const FLAVOR_COLOR_CLASS = "text-emerald-500";

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
    image: '/images/ritual/chill-cucumber.jpg'
  },
  {
    step: 2,
    title: 'Pour with Intention',
    description: 'Add fresh cucumber',
    image: '/images/ritual/pour-cucumber.jpg'
  },
  {
    step: 3,
    title: 'Savor the Moment',
    description: 'Breathe and savor',
    image: '/images/ritual/savor-cucumber.jpg'
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
        
        {/* Hero Section with Static Background */}
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/HC.jpg"
              alt="Cucumber Gin Lifestyle"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>
          
          <div className="relative z-10 h-full flex items-center justify-center px-4">
            <div className="text-center w-full max-w-7xl mx-auto">
              <motion.div {...heroAnimation}>
                <h1 className={cn("font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-2 sm:mb-4", FLAVOR_COLOR_CLASS)}>
                  {FLAVOR_NAME}
                </h1>
                <p className="text-base xs:text-lg sm:text-xl md:text-2xl italic text-white/80 px-4">
                  {FLAVOR_TAGLINE}
                </p>
              </motion.div>
              
            </div>
          </div>
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
                Born from a Quest for Perfect Balance
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/70 leading-relaxed px-2 sm:px-0">
                Cool cucumber meets warm botanicals in a dance of refreshment and sophistication. 
                When you need to center yourself, when poise matters most, reach for effortless cool.
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
                { delay: 0.2, colorClasses: 'from-emerald-400/20 to-emerald-600/20', icon: '🥒', title: 'Initial', desc: 'Cool cucumber awakens your senses with crisp freshness' },
                { delay: 0.4, colorClasses: 'from-green-400/20 to-green-600/20', icon: '🌿', title: 'Heart', desc: 'Gentle botanicals and subtle mint create harmony' },
                { delay: 0.6, colorClasses: 'from-blue-400/20 to-blue-600/20', icon: '✨', title: 'Finish', desc: 'Lingering elegance with clean, refreshing clarity' }
              ].map((item, index) => (
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

        {/* Full-Width Lifestyle Moment */}
        <InView as="section" className="relative h-[50vh] xs:h-[55vh] sm:h-[60vh] min-h-[300px] sm:min-h-[400px] w-full overflow-hidden">
          <img
            src="/images/lifestyle/cucumber-garden-party.jpg"
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
                <p className="text-sm xs:text-base sm:text-lg text-white/80">
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
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-yellow-400 mb-4 sm:mb-6 lg:mb-8">
                  The Cucumber Ritual
                </h2>
                <p className="text-sm xs:text-base sm:text-lg text-white/80 mb-6 sm:mb-8 lg:mb-10">
                  The art of mindful preparation. Each step brings you closer to your moment of zen.
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
        <InView as="section" className="relative py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-black/80" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-yellow-400 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                Find Your Moment
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto px-4">
                Limited availability. Unlimited possibilities.
              </p>
              <div className="flex justify-center items-center flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <CustomAddToCartButton
                  productId={47037}
                  colorHex="#2dd4bf"
                />
                <div className="hidden" data-bottlenexus-id={47037}>
                  <BottleNexusButton id={47037} />
                </div>
              </div>
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

export default CucumberPage;
