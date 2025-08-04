"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Spotlight } from './ui/spotlight';

// Import Swiper styles
import '../styles/vendor/swiper/swiper.css';
import '../styles/vendor/swiper/effect-fade.css';
import '../styles/vendor/swiper/navigation.css';

// --- Data ---
const flavors: {
  key: string;
  title: React.ReactNode;
  tagline: string;
  description: string;
  colorHex: string;
  image: string;
  video: string;
  ctaLink: string;
  bottleRenderImage: string;
  label: string;
}[] = [
  {
    key: "lemon",
    title: <>LEMON</>,
    label: "LEMON",
    tagline: "Classic, Sophisticated & Sinfully Edgy",
    description: "A vibrant twist on a classic. Sharp lemon zest meets smooth gin, balanced with a hint of sweetness.",
    colorHex: "#FFE34D",
    image: "/images/home/hero/hero_lemon.png",
    video: "/Lemon_hero.webm",
    ctaLink: "/cocktails/lemon-drop",
    bottleRenderImage: "/Leamon_Bottle_Render.png"
  },
  {
    key: "lavender",
    title: <>LAVENDER</>,
    label: "LAVENDER",
    tagline: "Floral, Soothing & Unapologetically Bold",
    description: "Smooth gin infused with lavender botanicals, offering a calming and luxurious drinking experience.",
    colorHex: "#C7B8FF",
    image: "/images/home/hero/hero_lavender.png",
    video: "/Lavender_hero.webm",
    ctaLink: "/cocktails/lavender",
    bottleRenderImage: "/Lavender_Bottle_Render.png"
  },
  {
    key: "cucumber",
    title: <>CUCUMBER</>,
    label: "CUCUMBER",
    tagline: "Centered, Poised & Effortlessly Cool",
    description: "Cool, crisp cucumber blended with premium gin for ultimate refreshment. An effortlessly cool choice.",
    colorHex: "#8BC34A",
    image: "/images/home/hero/hero_cucumber.png",
    video: "/Cucumber_hero.webm",
    ctaLink: "/cocktails/cucumber",
    bottleRenderImage: "/cucumber_Bottle_Render.png"
  },
];


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

  return (
<div className="relative min-h-screen w-full overflow-hidden bg-black">
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
            className="absolute top-0 left-0 w-screen h-screen object-cover"
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
            className="absolute top-0 left-0 w-screen h-screen object-cover"
          />
        )}
      </AnimatePresence>
      
      {/* Main Content Container */}
      <div className="relative h-screen w-full flex flex-col">
        
        {/* Content Area */}
        <div className="flex-1 flex items-center justify-center text-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 pt-16 pb-20 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20">
          <div className="w-full max-w-[1600px] mx-auto">
            <div className="relative w-full h-full">

              {/* Text Content */}
              <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center py-8 lg:py-0">
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
                    return (
                      <SwiperSlide key={flavor.key}>
                        {({ isActive }) => (
                          <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={isActive ? "show" : "hidden"}
                            className="space-y-4 md:space-y-6"
                          >
                            <motion.h1
                              variants={itemVariants}
                              className={`text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold lg:font-light leading-tight lg:leading-none tracking-tight text-white`}
                              style={{
                                textShadow: `0 0 40px ${currentFlavor.colorHex}30, 0px 2px 4px rgba(0, 0, 0, 0.5)`
                              }}
                            >
                              {flavor.title}
                            </motion.h1>
                            
                            <motion.p
                              variants={itemVariants}
                              className="hidden sm:block text-lg sm:text-xl italic text-white font-light tracking-wide"
                              style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
                            >
                              {flavor.tagline}
                            </motion.p>
                            
                            <motion.p
                              variants={itemVariants}
                              className="text-xl sm:text-lg leading-relaxed text-white font-light max-w-md mx-auto"
                              style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
                            >
                              {flavor.description}
                            </motion.p>

                            <motion.div
                              variants={itemVariants}
                              className="flex justify-center pt-2 sm:pt-4"
                            >
                              <Link to={flavor.ctaLink}>
                                <button
                                  className={`
                                    relative overflow-hidden
                                    px-8 sm:px-10 py-3 sm:py-3.5
                                    border border-transparent
                                    text-black
                                    font-light tracking-[0.15em] uppercase text-sm
                                    transition-all duration-500 ease-out
                                    group
                                    hover:shadow-2xl
                                  `}
                                  style={{
                                    backgroundColor: currentFlavor.colorHex,
                                    boxShadow: `0 0 30px ${currentFlavor.colorHex}40`,
                                    transition: 'box-shadow 0.5s ease-out, background-color 0.5s ease-out'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = `0 0 40px ${currentFlavor.colorHex}70`;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = `0 0 30px ${currentFlavor.colorHex}40`;
                                  }}
                                >
                                  {/* Button content */}
                                  <span className="relative flex items-center gap-3">
                                    <span className="transition-all duration-300 group-hover:tracking-[0.2em]">
                                      Explore This Flavor
                                    </span>
                                    <ChevronRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" />
                                  </span>
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

              {/* Background Media is now at the top level */}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HeroSection;
