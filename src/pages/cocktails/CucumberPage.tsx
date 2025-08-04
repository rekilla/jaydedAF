import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FlavorHero } from '../../components/FlavorHero';
import { FlavorHeroMobile } from '../../components/FlavorHeroMobile';
import { InteractiveBentoGallery, MediaItemType } from '../../components/ui/interactive-bento-gallery';
import FlavorRitual from '../../components/FlavorRitual';
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

const curatedMomentsMedia: MediaItemType[] = [
    { id: 'cu1', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_3d7bb4c753.jpg" },
    { id: 'cu2', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_43c68645c0.jpg" },
    { id: 'cu3', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_94f02a652d.jpg" },
    { id: 'cu4', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_407c1299b7.jpg" },
    { id: 'cu5', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_717dcefee8.jpg" },
    { id: 'cu6', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_735ceadfeb.jpg" },
    { id: 'cu7', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_aceae8968e.jpg" },
    { id: 'cu8', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_bcbd4f271b.jpg" }
];

const cucumberRitualData = {
  flavorName: 'Cucumber',
  subtext: 'The art of cool preparation. <br /> Each step centers you in a moment of zen.',
  ritualSteps: [
    {
      step: 1,
      title: 'Find Your Zen',
      description: 'Create your tranquil space',
    },
    {
      step: 2,
      title: 'Pour with Poise',
      description: 'Add a slice of cucumber',
    },
    {
      step: 3,
      title: 'Inhale the Calm',
      description: 'Breathe deep and find your center',
    },
  ],
  imageUrl: '/images/cucumber/Whisk_51343ac871.jpg',
  imageAlt: 'The Cucumber Ritual',
};



const CucumberPage = () => {
  // Memoize animations to prevent re-renders
  const heroAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: 0.5 }
  }), []);

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
                className="w-full h-full object-cover"
                src="/hero_cucumber_2.jpg"
                alt="Laxly Cucumber Hero"
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
                className="w-full h-full object-cover"
                src="/HC.jpg"
                alt="Laxly Cucumber Hero Mobile"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
              <motion.div {...heroAnimation}>
                <h1
                  className={cn(
                    "font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
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
            animate={{ y: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
          >
            <motion.div
              animate={{ y: 0 }}
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
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6">
                The Final Chapter
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white leading-relaxed px-2 sm:px-0">
                Centered, Poised and Effortlessly Cool. The Laxly Cucumber Martini Cocktail embodies the very essence of the Jayded AF brand.
                <br /><br />
                Artisan-designed with essences of Elderflower, Pear and a hint of Lime. For the woman who has arrived, who knows her worth, and radiates authenticity without trying. This is liquid zen with an edge.
                <br /><br />
              </p>
            </motion.div>
          </div>
        </InView>


        {/* Full-Width Lifestyle Moment */}
        <InView as="section" className="relative h-[50vh] xs:h-[55vh] sm:h-[60vh] min-h-[300px] sm:min-h-[400px] w-full overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover object-top"
            src="/images/cucumber/Whisk_9070bc219a.jpg"
            alt="Your Garden Party Moment"
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
                  Your Zenith Moment
                </h2>
                <p className="text-sm xs:text-base sm:text-lg text-white">
                  Where serenity meets strength
                </p>
              </motion.div>
            </div>
          </div>
        </InView>


        <FlavorRitual {...cucumberRitualData} />


        {/* Placeholder for New Call to Action */}
        <InView as="section" className="py-8 xs:py-10 sm:py-12 lg:py-16 bg-gray-900/20 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl mb-4">Spa-Fresh / Sophisticated</h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto px-4">
              Limited availability. Unlimited grace.
            </p>
            <CustomAddToCartButton productId={47037} colorHex="#FFFFFF" />
          </div>
        </InView>


        {/* Curated Moments */}
        <InView as="section" className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-black text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-12 lg:mb-16"
            >
              Curated Moments
            </motion.h2>
            {/* Full-width 16:9 image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full h-[50vh] min-h-[300px] rounded-lg overflow-hidden mb-8 lg:mb-12"
            >
              <img src="/images/cucumber/Whisk_73e915b469.jpg" alt="Curated Moments 16:9" className="w-full h-full object-cover" />
            </motion.div>

            <InteractiveBentoGallery mediaItems={curatedMomentsMedia} />
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
                    <div className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-white mb-1 sm:mb-2">{spec.value}</div>
                    <div className="text-xs xs:text-sm sm:text-base text-white">{spec.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </InView>

        {/* Closing CTA Section */}
        <InView as="section" className="relative py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/images/cucumber/Whisk_6a2ef6e3f3.jpg"
            alt="Ignite Your Night"
          />
          <div className="absolute inset-0 bg-black/60" /> {/* Overlay for text readability */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                Complete Your Journey
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto px-4">
                Limited availability. Unlimited grace.
              </p>
              <div className="flex justify-center items-center flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <CustomAddToCartButton
                  productId={47035}
                  colorHex="#FFFFFF"
                />
                <div className="hidden" data-bottlenexus-id={47035}>
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
