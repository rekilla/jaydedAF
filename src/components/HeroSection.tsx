import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AuroraBackground } from './ui/aurora-background';

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
    image: "/images/home/hero/hero_lemon.png", // Actual filename
    ctaLink: "/cocktails/lemon-drop"
  },
  {
    key: "lavender",
    title: "LAVENDER",
    tagline: "Floral, Soothing & Unapologetically Bold",
    description: "Smooth gin infused with lavender botanicals, offering a calming and luxurious drinking experience.",
    colorClass: "purple-500",
    colorHex: "#8A2BE2",
    image: "/images/home/hero/hero_lavender.png", // Actual filename
    ctaLink: "/cocktails/lavender"
  },
  {
    key: "cucumber",
    title: "LAXLY CUCUMBER",
    tagline: "Centered, Poised & Effortlessly Cool",
    description: "Cool, crisp cucumber blended with premium gin for ultimate refreshment. An effortlessly cool choice.",
    colorClass: "emerald-500",
    colorHex: "#2FAF7D",
    image: "/images/home/hero/hero_cucumber.png", // Actual filename
    ctaLink: "/cocktails/cucumber"
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
  },
  exit: {
      opacity: 0,
      transition: {
          duration: 0.3,
          staggerChildren: 0.05,
          staggerDirection: -1
      }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};


// --- Main Component ---
const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const currentFlavor = flavors[activeIndex];

  return (
    <AuroraBackground showRadialGradient={true} flavorColorHex={currentFlavor.colorHex} className="min-h-screen flex items-center relative isolate overflow-hidden">
        <Swiper
            modules={[EffectFade, Autoplay, Navigation]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
                nextEl: '.hero-swiper-next',
                prevEl: '.hero-swiper-prev',
            }}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-full"
            onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
        >
            {flavors.map((flavor) => {
                const { text, border, bgHover, textHover } = getColorClasses(flavor.colorClass);
                return (
                    <SwiperSlide key={flavor.key} className="w-full h-full flex items-center">
                        {({ isActive }) => (
                            <div className="container mx-auto px-6 md:px-16 h-full flex items-center py-10 md:py-0">
                                <div className="flex flex-col-reverse md:grid md:grid-cols-2 items-center gap-8 md:gap-12 lg:gap-16 w-full max-w-screen-xl mx-auto">

                                    {/* LEFT: Text - Animate based on isActive */}
                                    <motion.div
                                        key={flavor.key + "-text"} // Ensure key is unique
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate={isActive ? "show" : "hidden"} // Control animation via isActive
                                        className="text-center md:text-left space-y-4 max-w-lg mx-auto md:mx-0"
                                    >
                                        <motion.p variants={itemVariants} className="uppercase text-xs md:text-sm tracking-widest text-white/60 font-semibold font-body">
                                            GIN MARTINI
                                        </motion.p>
                                        <motion.h1
                                            variants={itemVariants}
                                            className={cn(
                                                "text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight",
                                                text
                                            )}
                                        >
                                            {flavor.title}
                                        </motion.h1>
                                        <motion.p variants={itemVariants} className="text-base md:text-lg italic text-white/70 font-heading">
                                            {flavor.tagline}
                                        </motion.p>
                                        <motion.p variants={itemVariants} className="text-sm md:text-base leading-relaxed text-white/80 font-body">
                                            {flavor.description}
                                        </motion.p>
                                        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }} className="inline-block mt-4">
                                            <Link to={flavor.ctaLink}>
                                                <button
                                                    className={cn(
                                                        "px-6 py-2 border rounded-full font-semibold tracking-wide w-fit transition-colors duration-300 ease-in-out",
                                                        border, text, bgHover, textHover
                                                    )}
                                                >
                                                    Explore This Flavor
                                                </button>
                                            </Link>
                                        </motion.div>
                                    </motion.div>

                                    {/* RIGHT: Animated Bottle Image */}
                                    <div className="w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] flex items-center justify-center order-first md:order-last">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={flavor.image} // Animate based on image source change
                                                src={flavor.image}
                                                alt={`${flavor.title} bottle`}
                                                className="object-contain h-[90%] w-auto max-w-full rounded-lg" // Increased height, added rounding
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                // Removed onError fallback
                                            />
                                        </AnimatePresence>
                                    </div>

                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                );
            })}

            {/* Custom Navigation Arrows */}
            <button className="hero-swiper-prev absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-50 p-2 bg-black/50 rounded-full hover:bg-black text-white transition">
                <ChevronLeft className={cn("w-6 h-6 md:w-8 md:h-8", `hover:text-${flavors[activeIndex].colorClass}`)} />
                <span className="sr-only">Previous Slide</span>
            </button>
            <button className="hero-swiper-next absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-50 p-2 bg-black/50 rounded-full hover:bg-black text-white transition">
                <ChevronRight className={cn("w-6 h-6 md:w-8 md:h-8", `hover:text-${flavors[activeIndex].colorClass}`)} />
                <span className="sr-only">Next Slide</span>
            </button>

        </Swiper>
    </AuroraBackground>
  );
};

export default HeroSection;
