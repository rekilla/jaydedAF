"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { FlavorSelector } from './ui/flavor-selector';
import { Spotlight } from './ui/spotlight';

// Import Swiper styles
import '../styles/vendor/swiper/swiper.css';
import '../styles/vendor/swiper/effect-fade.css';
import '../styles/vendor/swiper/navigation.css';

// --- Data ---
const flavors = [
  {
    key: "lemon",
    title: "LEMON DROP",
    tagline: "Classic, Sophisticated & Sinfully Edgy",
    description: "A vibrant twist on a classic. Sharp lemon zest meets smooth gin, balanced with a hint of sweetness.",
    colorClass: "yellow-400",
    colorHex: "#FFD700",
    image: "/0120.png",
    video: "/lemon-bottle-alpha.webm",
    ctaLink: "/cocktails/lemon-drop",
    bottleRenderImage: "/Leamon_Bottle_Render.png"
  },
  {
    key: "lavender",
    title: "LAVENDER",
    tagline: "Floral, Soothing & Unapologetically Bold",
    description: "Smooth gin infused with lavender botanicals, offering a calming and luxurious drinking experience.",
    colorClass: "purple-500",
    colorHex: "#8A2BE2",
    image: "/0120.png",
    video: "/lavender-bottle-alpha.webm",
    ctaLink: "/cocktails/lavender",
    bottleRenderImage: "/Lavender_Bottle_Render.png"
  },
  {
    key: "cucumber",
    title: "LAXLY CUCUMBER",
    tagline: "Centered, Poised & Effortlessly Cool",
    description: "Cool, crisp cucumber blended with premium gin for ultimate refreshment. An effortlessly cool choice.",
    colorClass: "emerald-500",
    colorHex: "#2FAF7D",
    image: "/0120.png",
    video: "/cucumber-bottle-alpha.webm",
    ctaLink: "/cocktails/cucumber",
    bottleRenderImage: "/cucumber_Bottle_Render.png"
  },
];

// --- Helper to get dynamic classes ---
const getColorClasses = (color: string) => ({
  text: `text-${color}`,
  border: `border-${color}`,
  bgHover: `hover:bg-${color}`,
  textHover: "hover:text-black"
});

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const bottleVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
  show: { 
    opacity: 1, 
    scale: 1, 
    rotateY: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    rotateY: 15,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

// --- Main Component ---
const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const currentFlavor = flavors[activeIndex];

  // Handle flavor change from selector
  const handleFlavorChange = (index: number) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      
      {/* Epic Luxury Spotlight */}
      <Spotlight 
        flavorColorHex={currentFlavor.colorHex}
        flavorKey={currentFlavor.key}
        intensity={0.4}
        pulseIntensity={0.6}
        beamCount={3}
        animationSpeed={8}
        luxuryMode={true}
      />
      
      {/* Ambient Background Glow */}
      <div
        className="absolute inset-0 opacity-20 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 70% 50%, ${currentFlavor.colorHex}15 0%, transparent 70%)`
        }}
      />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
        }}
      />
      
      {/* Main Content Container */}
      <div className="relative h-screen w-full flex flex-col">
        
        {/* Content Area */}
<div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-[120px] pt-16 pb-20 sm:pt-20 sm:pb-6 md:pt-24 md:pb-8">
          <div className="w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* LEFT SIDE - Content */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <Swiper
                  modules={[EffectFade, Autoplay]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  loop={true}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  slidesPerView={1}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  className="w-full"
                  onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
                >
                  {flavors.map((flavor) => {
                    const { text, border } = getColorClasses(flavor.colorClass);
                    return (
                      <SwiperSlide key={flavor.key}>
                        {({ isActive }) => (
                          <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={isActive ? "show" : "hidden"}
                            className="space-y-4 sm:space-y-6"
                          >
                            <motion.p 
                              variants={itemVariants} 
                              className="uppercase text-xs sm:text-sm tracking-[0.2em] text-white/60 font-light"
                            >
                              PREMIUM GIN MARTINI
                            </motion.p>
                            
                            <motion.h1
                              variants={itemVariants}
                              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-none ${text}`}
                              style={{
                                textShadow: `0 0 40px ${currentFlavor.colorHex}30`
                              }}
                            >
                              {flavor.title}
                            </motion.h1>
                            
                            <motion.p 
                              variants={itemVariants} 
                              className="text-lg sm:text-xl italic text-white/70 font-light tracking-wide"
                            >
                              {flavor.tagline}
                            </motion.p>
                            
                            <motion.p 
                              variants={itemVariants} 
                              className="text-base sm:text-lg leading-relaxed text-white/80 font-light max-w-md mx-auto lg:mx-0"
                            >
                              {flavor.description}
                            </motion.p>

                            <motion.div 
                              variants={itemVariants}
                              className="flex justify-center lg:justify-start pt-2 sm:pt-4"
                            >
                              <motion.div 
                                whileHover={{ scale: 1.05 }} 
                                transition={{ type: 'spring', stiffness: 400 }}
                              >
                                <Link to={flavor.ctaLink}>
                                  <button
                                    className={`px-6 sm:px-8 py-2.5 sm:py-3 border-2 ${border} ${text} bg-transparent hover:bg-white hover:text-black transition-all duration-300 font-medium tracking-wide text-sm sm:text-base`}
                                    style={{
                                      boxShadow: `0 0 20px ${currentFlavor.colorHex}20`
                                    }}
                                  >
                                    <span className="flex items-center gap-2">
                                      Explore This Flavor
                                      <ChevronRight className="w-4 h-4" />
                                    </span>
                                  </button>
                                </Link>
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>

              {/* RIGHT SIDE - Bottle Display */}
<div className="relative order-1 lg:order-2 flex items-center justify-center h-[30vh] sm:h-[50vh] lg:h-[60vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFlavor.key}
                    variants={bottleVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="relative h-full flex items-center justify-center"
                    style={{ perspective: '1000px' }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = (e.clientX - rect.left) / rect.width - 0.5;
                      const y = (e.clientY - rect.top) / rect.height - 0.5;
                      e.currentTarget.style.transform = `
                        rotateY(${x * 10}deg) 
                        rotateX(${-y * 10}deg) 
                        scale(1.02)
                      `;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
                    }}
                  >
                    {/* Bottle Image or Video */}
                    {currentFlavor.video ? (
                      <video
                        key={currentFlavor.video}
                        src={currentFlavor.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-auto object-contain max-w-full"
                        style={{
                          filter: `drop-shadow(0 20px 40px ${currentFlavor.colorHex}20)`,
                          maxHeight: '100%'
                        }}
                      />
                    ) : (
                      <img
                        src={currentFlavor.image}
                        alt={`${currentFlavor.title} bottle`}
                        className="h-full w-auto object-contain max-w-full"
                        style={{
                          filter: `drop-shadow(0 20px 40px ${currentFlavor.colorHex}20)`,
                          maxHeight: '100%'
                        }}
                      />
                    )}

                    {/* Floating Botanicals/Ingredients */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full opacity-30"
                          style={{ 
                            backgroundColor: currentFlavor.colorHex,
                            left: `${20 + (i * 15)}%`,
                            top: `${30 + (i * 10)}%`
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 3 + (i * 0.5),
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        
        {/* Flavor Selector - Part of hero section at bottom */}
<div className="relative pb-8 sm:pb-6 md:pb-8 px-4">
          <div className="flex justify-center">
            <div className="scale-[1.6] origin-bottom">
              <FlavorSelector
                flavors={flavors.map(f => ({
                  key: f.key,
                  title: f.title,
                  colorHex: f.colorHex,
                  colorClass: f.colorClass,
                  bottleRenderImage: f.bottleRenderImage
                }))}
                activeIndex={activeIndex}
                onFlavorChange={handleFlavorChange}
                className="flex flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
