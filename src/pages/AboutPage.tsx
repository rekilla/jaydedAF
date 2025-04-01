import React from 'react';
import { Button } from '../components/ui/button';
import { InView } from '../components/ui/in-view';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { Timeline } from '../components/ui/timeline';
import { AuroraBackground } from '../components/ui/aurora-background'; // Import AuroraBackground

// --- Placeholder Data --- Use new image paths
const HERO_IMAGE_URL = "/images/about/hero.png";
const BOTANICALS_IMAGE_URL = "/images/about/timeline/botanicals.png";
const MAKER_IMAGE_URL = "/images/about/timeline/maker.png";
const CRAFT_IMAGE_URL = "/images/about/timeline/craft.png";
const ACCOLADES_IMAGE_URL = "/images/about/timeline/accolades.png";
const HERITAGE_IMAGE_URL = "/images/about/timeline/heritage.png";

const heritageContent = "Jayded AF was born from a moment of clarity, a desire to create something authentic in a world of imitation. Our roots are grounded in tradition, but our spirit is undeniably modern, reflecting the journey of our founder.";
const craftContent = "Every bottle of Jayded AF is a testament to meticulous craftsmanship. We use time-honored distillation techniques combined with innovative methods to ensure unparalleled smoothness and character. Quality is not just a goal; it's our foundation.";
const botanicalsContent = "We source the finest natural botanicals from around the globe, each selected for its unique contribution to our signature flavor profiles. From crisp juniper to exotic spices and vibrant citrus, nature's best is infused into every drop.";
const makerContent = "Alexa Jayde Fitzpatrick, the visionary behind Jayded AF, infused her eclectic taste and bold spirit into the brand. Inspired by the idea of the consumer as their own unique brand, she crafted a gin that celebrates individuality and confidence.";
const alexMessage = "Life gave me lemons, so I mixed them with gin and created something extraordinary. Jayded AF is for those who aren't afraid to stand out, who embrace their complexities, and who know their worth. This is more than a drink; it's an attitude.";

// --- Timeline Data ---
const timelineData = [
  {
    title: "Heritage",
    content: (
      <div>
        <p className="mb-6 text-base md:text-lg">{heritageContent}</p>
        <img src={HERITAGE_IMAGE_URL} alt="Distillery Heritage" className="rounded-lg shadow-md w-full object-cover max-h-96" loading="lazy"/>
      </div>
    ),
  },
  {
    title: "The Craft",
    content: (
      <div>
        <p className="mb-6 text-base md:text-lg">{craftContent}</p>
         <img src={CRAFT_IMAGE_URL} alt="Gin Crafting Process" className="rounded-lg shadow-md w-full object-cover max-h-96" loading="lazy"/>
      </div>
    ),
  },
   {
    title: "Botanicals",
    content: (
      <div>
        <p className="mb-6 text-base md:text-lg">{botanicalsContent}</p>
        <img src={BOTANICALS_IMAGE_URL} alt="Gin Botanicals" className="rounded-lg shadow-md w-full object-cover max-h-96" loading="lazy"/>
      </div>
    ),
  },
  {
    title: "The Visionary",
    content: (
      <div>
        <p className="mb-6 text-base md:text-lg">{makerContent}</p>
        <img src={MAKER_IMAGE_URL} alt="Alexa Jayde Fitzpatrick" className="rounded-lg shadow-md mb-6 w-full object-cover max-h-96" loading="lazy"/>
        <blockquote className="mt-8 p-6 border-l-4 border-brand-gold bg-brand-dark/40 italic text-lg md:text-xl text-brand-text/90 leading-relaxed font-heading">
            "{alexMessage}"
        </blockquote>
      </div>
    ),
  },
   {
    title: "Accolades",
    content: (
      <div>
        <p className="text-center text-brand-text/70 italic mb-6 text-base md:text-lg">
            [Testimonial Carousel Placeholder]
        </p>
         <img src={ACCOLADES_IMAGE_URL} alt="Awards and Recognition" className="rounded-lg shadow-md w-full object-cover max-h-96" loading="lazy"/>
         <p className="mt-4 text-center text-brand-text/80 text-sm md:text-base">"An exceptional gin that stands apart." - Gin Connoisseur Magazine</p>
      </div>
    ),
  },
];


// --- Main Page Component ---
const AboutPage: React.FC = () => {
  return (
    // Use bg-black for the main page background
    <main className="w-full pt-20 bg-black text-brand-text">

      {/* Intro Section with Aurora Background */}
      <AuroraBackground flavorColorHex="#bfb23a" showRadialGradient={true} className="pt-16 pb-16 md:pt-24 md:pb-24"> {/* Use new gold */}
        <InView as="div" className="text-center container mx-auto px-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold mb-4">Our Story</h1>
              <p className="text-lg text-brand-text/80 max-w-2xl mx-auto">
                  Jayded AF isn't just a gin; it's a philosophy born from heritage, crafted with passion, and dedicated to quality.
              </p>
        </InView>
      </AuroraBackground>

      {/* Timeline Component */}
      {/* Apply background color here if needed, or keep page background */}
      <div className="bg-brand-dark/20"> {/* Slightly different bg for contrast */}
        <Timeline data={timelineData} />
      </div>

      {/* Final CTA */}
      <section className="py-16 text-center">
        <InView>
          <Link to="/cocktails">
            <Button
              variant="default"
              size="lg"
              className="bg-brand-gold text-brand-dark hover:bg-brand-gold/90" // Use new gold
            >
              Discover Our Cocktails
            </Button>
          </Link>
        </InView>
      </section>

    </main>
  );
};

export default AboutPage;
