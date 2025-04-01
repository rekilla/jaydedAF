import React from 'react';
import { motion } from 'framer-motion';
import { InView } from '../../components/ui/in-view';
import { ShimmerButton } from '../../components/ui/shimmer-button';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { AuroraBackground } from '../../components/ui/aurora-background'; // Import AuroraBackground

// --- Placeholder Data ---
const FLAVOR_NAME = "Laxly Cucumber";
const FLAVOR_TAGLINE = "Centered, Poised & Effortlessly Cool";
const FLAVOR_DESCRIPTION = "Cool, crisp cucumber blended with premium gin for ultimate refreshment. Its clean profile makes it an effortlessly cool choice for any relaxed occasion, perfect for sipping on a sunny afternoon.";
const FLAVOR_IMAGE_URL = "/images/cocktails/cucumber/bottle.png";
const FLAVOR_VIDEO_POSTER = "/images/cocktails/cucumber/video-poster.png";
const FLAVOR_COLOR_CLASS = "text-emerald-500";
const FLAVOR_COLOR_HEX = "#2FAF7D"; // Add hex for Aurora tint

const CucumberPage: React.FC = () => {
  return (
    // Use bg-black as requested
    <main className="w-full pt-20 bg-black text-brand-text">

      {/* Simplified Hero with Aurora Background */}
      <AuroraBackground flavorColorHex={FLAVOR_COLOR_HEX} showRadialGradient={true} className="pt-16 pb-16 md:pt-24 md:pb-24">
        <InView as="div" className="text-center container mx-auto px-4">
          <h1 className={cn("font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-4", FLAVOR_COLOR_CLASS)}>
            {FLAVOR_NAME}
          </h1>
          <p className="font-heading text-lg sm:text-xl italic text-brand-text/80">
            {FLAVOR_TAGLINE}
          </p>
        </InView>
      </AuroraBackground>

      {/* Main Content Section */}
      <InView as="section" className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
             className="aspect-square relative overflow-hidden rounded-lg shadow-xl"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
          >
            <img src={FLAVOR_IMAGE_URL} alt={`${FLAVOR_NAME} Bottle`} className="absolute inset-0 w-full h-full object-contain p-4 md:p-8" loading="lazy" />
          </motion.div>
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-gold mb-4">Taste Profile</h2>
            <p className="text-base sm:text-lg leading-relaxed text-brand-text/90">
              {FLAVOR_DESCRIPTION}
            </p>
          </div>
        </div>
      </InView>

      {/* Video Section Placeholder */}
       <InView as="section" className="py-12 md:py-20 bg-brand-dark/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-brand-gold">The Experience</h2>
              <div className="aspect-video max-w-4xl w-full mx-auto bg-black border border-brand-gold/20 rounded-lg flex items-center justify-center text-brand-text/50 shadow-lg overflow-hidden">
                  <video controls muted loop className="w-full h-full object-cover" poster={FLAVOR_VIDEO_POSTER}>
                      {/* <source src="YOUR_VIDEO_URL.mp4" type="video/mp4" /> */}
                      Your browser does not support the video tag.
                  </video>
              </div>
          </div>
      </InView>

       {/* CTA to other cocktails */}
       <section className="py-16 text-center">
         <InView>
           <h3 className="text-2xl font-semibold text-brand-gold mb-6">Explore Other Flavors</h3>
           <div className="flex justify-center gap-4">
              <Link to="/cocktails/lemon-drop">
                 <ShimmerButton background="rgba(191, 178, 58, 0.9)" shimmerColor="#FFFFFF">Lemon Drop</ShimmerButton>
              </Link>
               <Link to="/cocktails/lavender">
                 <ShimmerButton background="rgba(138, 43, 226, 0.8)" shimmerColor="#FFFFFF">Lavender</ShimmerButton>
              </Link>
           </div>
         </InView>
       </section>

    </main>
  );
};

export default CucumberPage;
