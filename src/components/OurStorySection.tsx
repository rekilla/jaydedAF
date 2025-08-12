import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './ui/SectionTitle';

const storyText = `Life gave her lemons, and she made a Martini. Alexa Jayde Fitzpatrick did not have the traditional pathway, rather an epiphany. When on October 5th 2020, a medical emergency led to her being figuratively, physically, emotionally and creatively reborn. Alexa always knew her love of the eclectic, the unique and the embrace of unbridled imagination would eventually lead her to this moment.

Little can compare to a perfect Martini. When great crafting produces a flavor profile so inspired and pointed, one can only applause. Jayded AF Cocktails is the answer for consumers seeking libations outside of the cyclical.

Was that a mouthful? Take another sip, there's more. Our Vision is to disrupt paradigms of the liquor industry by enabling the discovery, embrace and embodiment of uninhibited originality. Gin, anyone? We are reimaging this criminally underrated, yet perfectly harmonious Spirit. Our Mission is to nourish an environment ripe for the flagrant expression of the modern consumer. Unabashedly bold, layered and authentic.

Your voice, mirrors our own. Clear, concise, multifaceted and definitive. Our Values, like our flavors are intentionally Impactful, Intrepid, Bona Fide and filled to the brim with Charisma.

Where do we go from here? The Stars.`;

const OurStorySection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden pt-6 md:pt-8 pb-16 md:pb-24">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover scale-[1.02] will-change-transform animate-[slowZoom_20s_linear_infinite]"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        poster="/images/home/hero_poster.jpg"
      >
        <source src="/ice.webm" type="video/webm" />
        <source src="/ice.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/70 pointer-events-none" />

      {/* Content (single render, responsive styling) */}
      <div className="relative z-10 text-white px-8 md:px-16">
        <SectionTitle flavor="lemon" lineWidth="30%" className="text-center font-light tracking-wider mb-8">Our Story</SectionTitle>
        <motion.div
          className="mx-auto max-w-[960px] lg:max-w-[1100px] text-left px-6 md:px-8
                     bg-black/60 backdrop-blur-[2px] rounded-md
                     md:bg-transparent md:backdrop-blur-0 md:rounded-none
                     py-8 md:py-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-base md:text-lg leading-relaxed space-y-4 whitespace-pre-line">
            {storyText.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Reduce motion: stop zoom */}
      <style>{`
        @keyframes slowZoom { 
          0% { transform: scale(1.02); } 
          100% { transform: scale(1.04); } 
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-[slowZoom_20s_linear_infinite] { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default OurStorySection;