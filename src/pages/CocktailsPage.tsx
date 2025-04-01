import React from 'react';
import { motion } from 'framer-motion';
import { InView } from '../components/ui/in-view';
import { cn } from '../lib/utils';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { Link } from 'react-router-dom';
import { AuroraBackground } from '../components/ui/aurora-background'; // Import AuroraBackground

// --- Data (Update recipeLink to point to specific pages) ---
const cocktailsData = [
  {
    id: 'lemon',
    name: 'The Genesis',
    tagline: 'Classic, Sophisticated and Sinfully Edgy.',
    description: 'The Lemon Drop Martini Cocktail is simply the prototype of the art of a cocktail. Consisting of deliciously tart Meyer Lemons, Juniper Berries and Triple Sec',
    imageUrl: '/images/cocktails/collection/lemon-drop.png',
    recipeLink: '/cocktails/lemon-drop',
  },
  {
    id: 'lavender',
    name: 'The Interim',
    tagline: 'Sexy, Subtle and Incredibly Chic.',
    description: 'Demanding of your attention, the Lavender Martini Cocktail excites the senses with the wicked flavor of the vibrant flower. Ending naturally on the sweet note of Mandarin Orange',
    imageUrl: '/images/cocktails/collection/lavender.png',
    recipeLink: '/cocktails/lavender',
  },
  {
    id: 'cucumber',
    name: 'The Final Chapter',
    tagline: 'Centered, Poised and Effortlessly Cool.',
    description: 'The Laxly Cucumber Martini Cocktail embodies the vibe of the brand. Refreshingly boasting the essences of Elderflower, Pear and a hint of Lime.',
    imageUrl: '/images/cocktails/collection/cucumber.png',
    recipeLink: '/cocktails/cucumber',
  },
];

// --- Cocktail Section Component ---
const CocktailSection: React.FC<typeof cocktailsData[0] & { index: number }> = ({
  id, name, tagline, description, imageUrl, recipeLink, index
}) => {
  const isEven = index % 2 === 0;

  return (
    <InView as="section" className="py-16 sm:py-24 border-b border-brand-gold/10 last:border-b-0">
      <div className={cn(
          "container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
      )}>
        {/* Image Column */}
        <motion.div
          className={cn("relative aspect-[4/5] overflow-hidden rounded-lg shadow-xl", isEven ? 'md:order-2' : 'md:order-1')}
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Text Column */}
        <div className={cn("text-center md:text-left", isEven ? 'md:order-1' : 'md:order-2')}>
          <InView><h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-gold mb-3">{name}</h2></InView>
          <InView><p className="font-heading text-lg sm:text-xl italic text-brand-text/80 mb-6">{tagline}</p></InView>
          <InView><p className="text-base sm:text-lg text-brand-text/90 leading-relaxed mb-8">{description}</p></InView>
          {/* Add Learn More Button */}
          <InView>
            <Link to={recipeLink}>
                <ShimmerButton
                    background="transparent"
                    shimmerColor="#bfb23a" // Use new gold hex
                    className="border border-brand-gold text-brand-gold" // Style as secondary/outline
                >
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-brand-gold">
                        Learn More
                    </span>
                </ShimmerButton>
            </Link>
          </InView>
        </div>
      </div>
    </InView>
  );
};


// --- Main Page Component ---
const CocktailsPage: React.FC = () => {
  // Define a subtle mixed gradient for the collection page Aurora
  const collectionAuroraStyle = {
    '--aurora': `repeating-linear-gradient(100deg, var(--brand-lemon)_10%, var(--brand-lavender)_25%, var(--brand-cucumber)_40%, var(--brand-gold)_55%)`
  } as React.CSSProperties;


  return (
    // Use bg-black for the main page background
    <main className="w-full pt-20 bg-black text-brand-text">
       {/* Intro Section with Aurora Background */}
       <AuroraBackground style={collectionAuroraStyle} showRadialGradient={true} className="pt-16 pb-16 md:pt-24 md:pb-24">
            <InView as="div" className="text-center container mx-auto px-4">
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold mb-4">The Collection</h1>
                <p className="text-lg text-brand-text/80 max-w-2xl mx-auto">
                    Discover the distinct personalities within the Jayded AF family. Each blend is crafted with premium gin and natural flavors, offering a unique taste of liquid opulence.
                </p>
            </InView>
       </AuroraBackground>

       {/* Render each cocktail section */}
       {cocktailsData.map((cocktail, index) => (
         <CocktailSection key={cocktail.id} {...cocktail} index={index} />
       ))}

    </main>
  );
};

export default CocktailsPage;
