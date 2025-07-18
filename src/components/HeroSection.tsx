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
    image: "/images/home/hero/hero_lemon.png",
    video: "/Lemon_hero.mp4",
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
    image: "/images/home/hero/hero_lavender.png",
    video: "/Lavender_hero.mp4",
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
    image: "/images/home/hero/hero_cucumber.png",
    video: "/Cucumber_hero.mp4",
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

const mediaVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: "easeIn" } },
  exit: { opacity: 0, transition: { duration: 0.7, ease: "easeOut" } }
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
<div className="flex-1 flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 pt-16 pb-20 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20">
          <div className="w-full max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full gap-8 md:gap-12 lg:gap-16 xl:gap-20">
              
              {/* LEFT SIDE - Content */}
              <div className="w-full lg:w-[45%] text-center lg:text-left order-2 lg:order-1 py-8 lg:py-0">
                <Swiper
                  modules={[EffectFade, Autoplay]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  loop={true}
                  autoplay={{ delay: 7000, disableOnInteraction: false }}
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
                              className={`pb-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-none ${text}`}
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
                              <Link to={flavor.ctaLink}>
                                <button
                                  className={`
                                    relative overflow-hidden
                                    px-8 sm:px-10 py-3 sm:py-3.5
                                    border ${border}
                                    ${text}
                                    bg-transparent
                                    font-light tracking-[0.15em] uppercase text-sm
                                    transition-all duration-500 ease-out
                                    group
                                    hover:shadow-2xl
                                    hover:border-white
                                  `}
                                  style={{
                                    boxShadow: `0 0 30px ${currentFlavor.colorHex}10, inset 0 0 0 0 ${currentFlavor.colorHex}`,
                                    transition: 'box-shadow 0.5s ease-out, border-color 0.5s ease-out'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = `0 0 40px ${currentFlavor.colorHex}40, inset 0 0 20px 0 ${currentFlavor.colorHex}20`;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = `0 0 30px ${currentFlavor.colorHex}10, inset 0 0 0 0 ${currentFlavor.colorHex}`;
                                  }}
                                >
                                  {/* Gradient sweep effect */}
                                  <span
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                                  />
                                  
                                  {/* Button content */}
                                  <span className="relative flex items-center gap-3">
                                    <span className="transition-all duration-300 group-hover:tracking-[0.2em]">
                                      Explore This Flavor
                                    </span>
                                    <ChevronRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" />
                                  </span>
                                  
                                  {/* Bottom line accent */}
                                  <span
                                    className={`absolute bottom-0 left-0 w-0 h-[1px] ${border} group-hover:w-full transition-all duration-500 ease-out`}
                                    style={{ backgroundColor: currentFlavor.colorHex }}
                                  />
                                </button>
                              </Link>
                            </motion.div>
                          </motion.div>
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>

              {/* RIGHT SIDE - Media */}
              <div className="w-full lg:w-[55%] flex items-center justify-center order-1 lg:order-2 lg:h-full">
                <AnimatePresence mode="wait">
                  {currentFlavor.video ? (
                    <motion.video
                      key={`video-${currentFlavor.key}`}
                      variants={mediaVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      src={currentFlavor.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto max-h-[60vh] lg:max-h-[85vh] object-contain lg:scale-[1.15]"
                      style={{
                        filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.1))',
                        maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'
                      }}
                    />
                  ) : (
                    <motion.img
                      key={`image-${currentFlavor.key}`}
                      variants={mediaVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      src={currentFlavor.image}
                      alt={`Jayded AF ${currentFlavor.title}`}
                      className="w-full h-auto max-h-[60vh] lg:max-h-[85vh] object-contain lg:scale-[1.15]"
                      style={{ filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.1))' }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        
        {/* Flavor Selector - Part of hero section at bottom */}
<div className="relative pb-32 sm:pb-20 md:pb-24 lg:pb-28 px-6">
  <div className="flex justify-center">
    <div className="scale-90 sm:scale-100 md:scale-110 lg:scale-125 xl:scale-150 origin-bottom transition-transform duration-300">
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
