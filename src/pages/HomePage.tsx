import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveBentoGallery } from '../components/ui/interactive-bento-gallery';
import { InView } from '../components/ui/in-view';
import type { MediaItemType } from '../components/ui/interactive-bento-gallery';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { AwardsSection } from '../components/AwardsSection';
// Keep Swiper CSS commented out until resolved
// import '../styles/vendor/swiper/swiper.css';
// import '../styles/vendor/swiper/pagination.css';
import { LuxuryCollectionSection } from '../components/Collections';
import { BrandStorySection } from '../components/BrandStorySection';
import { StoreLocatorSection } from '../components/StoreLocatorSection';
import { FeaturedHighlightsSection } from '../components/FeaturedHighlightsSection';

// --- Constants --- Use actual filenames provided
// Map feature images logically
const FEATURE_IMAGE_LEMON = "/images/home/features/feature_Lemon Drop.png";
const WIDE_IMAGE_URL = "/images/home/wide/all_bottle_wide.png";

// Update gallery image paths and spans
const galleryMediaItems: MediaItemType[] = [
  { id: 1, type: "image", title: "Urban Edge", desc: "Confidence in the city.", url: "/images/home/gallery/G1%20(1).png" },
  { id: 2, type: "image", title: "Sophisticated Night", desc: "Elegance after dark.", url: "/images/home/gallery/G1%20(2).png" },
  { id: 3, type: "image", title: "Modern Artistry", desc: "Where creativity meets style.", url: "/images/home/gallery/G1%20(3).png" },
  { id: 4, type: "image", title: "Golden Hour", desc: "Chic moments.", url: "/images/home/gallery/G1%20(4).png" },
  { id: 5, type: "image", title: "Individual Style", desc: "Express yourself.", url: "/images/home/gallery/G1%20(5).png" },
  { id: 6, type: "image", title: "Abstract Flow", desc: "Liquid inspiration.", url: "/images/home/gallery/G1%20(6).png" },
  { id: 7, type: "image", title: "Night Lights", desc: "City vibes.", url: "/images/home/gallery/G1%20(7).png" },
  { id: 8, type: "image", title: "Minimalist Detail", desc: "Subtle luxury.", url: "/images/home/gallery/G1%20(8).png" },
  // Repeat last images for items 9 and 10 as only 8 gallery images provided
  { id: 9, type: "image", title: "Shared Moment", desc: "Connect and indulge.", url: "/images/home/gallery/G1%20(7).png" },
  { id: 10, type: "image", title: "Texture & Tone", desc: "Sensory details.", url: "/images/home/gallery/G1%20(8).png" },
];


const HomePage: React.FC = () => {

  return (
    <main className="w-full">

      {/* Section 1: New Dynamic Hero Section */}
      <HeroSection />
      <AwardsSection />

      {/* Section 2: Featured Text (Brand Essence - Moved) */}
      <section className="py-8 sm:py-10 text-center bg-black">
        <InView className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-white">Bold. Authentic. Individual.</h2>
            <p className="mb-10 max-w-2xl mx-auto text-white/80">
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
                  <video autoPlay loop muted className="w-full h-full object-cover" poster={FEATURE_IMAGE_LEMON}> {/* Update poster image */}
                      <source src="/Models4.webm" type="video/webm" />
                      Your browser does not support the video tag.
                  </video>
              </div>
          </InView>
      </section>

<BrandStorySection />

<FeaturedHighlightsSection />


      {/* Section 6: Gallery */}
      <section className="py-8 sm:py-10">
         <InView viewOptions={{ once: true, margin: "0px 0px -20% 0px" }}>
              <InteractiveBentoGallery
                  mediaItems={galleryMediaItems}
                  title="Moments of Individuality"
                  description="Explore the essence of the Jayded AF lifestyle."
              />
         </InView>
      </section>

      <StoreLocatorSection />

      {/* Section 7: New Wide Image Section */}
       <section className="my-8 sm:my-12">
           <InView>
                <div className="aspect-[21/9] overflow-hidden bg-brand-dark/50">
                    <img src={WIDE_IMAGE_URL} alt="Jayded AF wide lifestyle" className="w-full h-full object-cover"/>
                </div>
           </InView>
        </section>

      {/* Section 9: Final CTA Section - Centered */}
      <section className="py-8 bg-brand-dark text-center">
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
