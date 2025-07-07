import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { GlareCard } from '../components/ui/glare-card';
import { TightGallery, DemoGallery } from '../components/ui/interactive-bento-gallery';
import { InView } from '../components/ui/in-view';
import { FeatureSteps } from '../components/ui/feature-steps';
import type { MediaItemType } from '../components/ui/interactive-bento-gallery';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
// Keep Swiper CSS commented out until resolved
// import '../styles/vendor/swiper/swiper.css';
// import '../styles/vendor/swiper/pagination.css';
import { cn } from '../lib/utils';
import { LuxuryCollectionSection } from '../components/Collections';
import { BrandStorySection } from '../components/BrandStorySection';
import { StoreLocatorSection } from '../components/StoreLocatorSection';
import { FeaturedHighlightsSection } from '../components/FeaturedHighlightsSection';

// --- Constants --- Use actual filenames provided
const LEMON_IMAGE_URL = "/Leamon_Bottle_Render.png";
const LAVENDER_IMAGE_URL = "/Lavender_Bottle_Render.png";
const CUCUMBER_IMAGE_URL = "/Cucumber_Bottle_Render.png";
// Map feature images logically
const FEATURE_IMAGE_LEMON = "/images/home/features/feature_Lemon Drop.png";
const FEATURE_IMAGE_LAVENDER = "/images/home/features/features_Lavender.png";
const FEATURE_IMAGE_CUCUMBER = "/images/home/features/features_ Cucumber.png"; // Note space in filename
const FEATURE_IMAGE_WOMEN = "/images/home/features/women.png";
const FEATURE_IMAGE_CLOSEUP = "/images/home/features/closeup.png";
const FEATURE_IMAGE_PPL = "/images/home/features/ppl.png";
const WIDE_IMAGE_URL = "/images/home/wide/all_bottle_wide.png";

// Update gallery image paths and spans
const galleryMediaItems: MediaItemType[] = [
  { id: 1, type: "image", title: "Urban Edge", desc: "Confidence in the city.", url: "/images/home/gallery/G1 (1).png" },
  { id: 2, type: "image", title: "Sophisticated Night", desc: "Elegance after dark.", url: "/images/home/gallery/G1 (2).png" },
  { id: 3, type: "image", title: "Modern Artistry", desc: "Where creativity meets style.", url: "/images/home/gallery/G1 (3).png" },
  { id: 4, type: "image", title: "Golden Hour", desc: "Chic moments.", url: "/images/home/gallery/G1 (4).png" },
  { id: 5, type: "image", title: "Individual Style", desc: "Express yourself.", url: "/images/home/gallery/G1 (5).png" },
  { id: 6, type: "image", title: "Abstract Flow", desc: "Liquid inspiration.", url: "/images/home/gallery/G1 (6).png" },
  { id: 7, type: "image", title: "Night Lights", desc: "City vibes.", url: "/images/home/gallery/G1 (7).png" },
  { id: 8, type: "image", title: "Minimalist Detail", desc: "Subtle luxury.", url: "/images/home/gallery/G1 (8).png" },
  // Repeat last images for items 9 and 10 as only 8 gallery images provided
  { id: 9, type: "image", title: "Shared Moment", desc: "Connect and indulge.", url: "/images/home/gallery/G1 (7).png" },
  { id: 10, type: "image", title: "Texture & Tone", desc: "Sensory details.", url: "/images/home/gallery/G1 (8).png" },
];

// Update feature section data with specific images
const featureSection1Data = [
    { step: "01", title: "Premium Ingredients", content: "Crafted with real gin and all-natural flavors for an authentic taste.", image: FEATURE_IMAGE_LEMON }, // Use new constant
    { step: "02", title: "Ready To Indulge", content: "Perfectly mixed and ready to drink. Simply chill, pour, and enjoy.", image: FEATURE_IMAGE_LAVENDER }, // Use new constant
    { step: "03", title: "Sophisticated Flavors", content: "Unique profiles designed for the modern palate.", image: FEATURE_IMAGE_CUCUMBER }, // Use new constant
];

const featureSection2Data = [
    { step: "A", title: "The Visionary", content: "Founded by Alexa Jayde Fitzpatrick, Jayded AF embodies individuality and modern luxury.", image: FEATURE_IMAGE_WOMEN }, // Use new constant
    { step: "B", title: "Our Promise", content: "Delivering liquid opulence and a statement of confidence in every bottle.", image: FEATURE_IMAGE_CLOSEUP }, // Use new constant
    { step: "C", title: "Unapologetically You", content: "Celebrating authenticity and the spirit of those who define their own world.", image: FEATURE_IMAGE_PPL }, // Use new constant
];

// --- Flavor Card Component ---
const FlavorCard: React.FC<{ name: string; imageUrl: string; className?: string }> = ({ name, imageUrl, className }) => (
    <motion.div
        className="group"
        whileHover={{ scale: 1.05, zIndex: 10 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <GlareCard className={cn(
            "flex flex-col items-center justify-end p-4 bg-black w-[280px] sm:w-[300px] md:w-[300px] lg:w-[320px]",
            "transition-transform duration-300 ease-in-out",
            className
        )}>
            <img src={imageUrl} alt={`${name} Flavor`} className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-85 transition-opacity"/>
            <h3 className="relative z-10 text-xl font-semibold text-white mt-2 bg-black/60 px-3 py-1 rounded backdrop-blur-sm">{name}</h3>
        </GlareCard>
    </motion.div>
);


const HomePage: React.FC = () => {

  return (
    <main className="w-full">

      {/* Section 1: New Dynamic Hero Section */}
      <HeroSection />

      {/* Section 2: Featured Text (Brand Essence - Moved) */}
      <section className="py-16 sm:py-20 text-center bg-black">
        <InView className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-brand-gold">Bold. Authentic. Individual.</h2>
            <p className="mb-10 max-w-2xl mx-auto text-brand-text/80">
              Jayded AF is more than a cocktail; it's a statement. We celebrate the confidence of the modern individual.
            </p>
            {/* Removed blockquote */}
        </InView>
      </section>

<LuxuryCollectionSection />

      {/* Section 5: Placeholder Video Section */}
      <section>
          <InView>
              <div className="aspect-[21/9] w-full bg-brand-dark/50 overflow-hidden">
                  <video controls muted loop className="w-full h-full object-cover" poster={FEATURE_IMAGE_LEMON}> {/* Update poster image */}
                      {/* <source src="YOUR_VIDEO_URL.mp4" type="video/mp4" /> */}
                      Your browser does not support the video tag.
                  </video>
              </div>
          </InView>
      </section>

<BrandStorySection />

<FeaturedHighlightsSection />

<StoreLocatorSection />

      {/* Section 6: Gallery */}
      <section className="py-16 sm:py-20">
         <InView viewOptions={{ once: true, margin: "0px 0px -20% 0px" }}>
              <TightGallery
                  mediaItems={galleryMediaItems}
                  title="Moments of Individuality"
                  description="Explore the essence of the Jayded AF lifestyle."
              />
         </InView>
      </section>

      {/* Section 7: New Wide Image Section */}
       <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24">
           <InView>
                <div className="aspect-[21/9] overflow-hidden rounded-lg shadow-xl bg-brand-dark/50">
                    <img src={WIDE_IMAGE_URL} alt="Jayded AF wide lifestyle" className="w-full h-full object-cover"/>
                </div>
           </InView>
        </section>

      {/* Section 9: Final CTA Section - Centered */}
      <section className="py-16 bg-brand-dark text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Link to="/store-locator">
                  <ShimmerButton>
                      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-brand-dark dark:text-brand-dark lg:text-base">
                          Find Jayded AF Near You
                      </span>
                  </ShimmerButton>
                </Link>
              </motion.div>
          </div>
      </section>

      {/* Section 10: Footer is handled globally in App.tsx */}

    </main>
  );
};

export default HomePage;
