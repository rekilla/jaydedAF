"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import StyledButton from './StyledButton';

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
        <div className="absolute inset-0 z-20">
          <Swiper
            modules={[EffectFade, Autoplay]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={true}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-full"
            onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
          >
            {flavors.map((flavor) => {
              return (
                <SwiperSlide key={flavor.key}>
                  {({ isActive }) => (
                    <div className="w-full h-full flex justify-end items-end p-16">
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isActive ? "show" : "hidden"}
                      >
                        <motion.div
                          variants={itemVariants}
                        >
                          <Link to={flavor.ctaLink}>
                            <StyledButton>
                              DELVE
                            </StyledButton>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        
      </div>
    </div>
  );
};

export default HeroSection;
