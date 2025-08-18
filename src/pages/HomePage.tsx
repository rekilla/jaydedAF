import React from 'react';
import { Seo } from '../seo/Seo';
import { motion } from 'framer-motion';
import { InteractiveBentoGallery } from '../components/ui/interactive-bento-gallery';
import { InView } from '../components/ui/in-view';
import type { MediaItemType } from '../components/ui/interactive-bento-gallery';
import { Link } from 'react-router-dom';
import StyledButton from '../components/StyledButton';
import HeroSection from '../components/HeroSection';
import { AwardsSection } from '../components/AwardsSection';
// Keep Swiper CSS commented out until resolved
// import '../styles/vendor/swiper/swiper.css';
// import '../styles/vendor/swiper/pagination.css';
import { LuxuryCollectionSection } from '../components/Collections';
import OurStorySection from '../components/OurStorySection';
import { StoreLocatorSection } from '../components/StoreLocatorSection';
import { FeaturedHighlightsSection } from '../components/FeaturedHighlightsSection';
import { MessageFromAlexa } from '../components/MessageFromAlexa';

// --- Constants ---
// Update gallery image paths and spans
const galleryMediaItems: MediaItemType[] = [
    { id: 1, type: 'image', title: '', desc: '', url: '/images/home/GX/G1%20(5).png' },
    { id: 3, type: 'image', title: 'Lemon Drop', desc: '', url: '/Product Shot of Jayded AF-2.jpg' },
    { id: 2, type: 'image', title: '', desc: '', url: '/images/home/GX/G1%20(2).png' },
    { id: 12, type: 'image', title: '', desc: '', url: '/images/home/GX/Whisk_d497ed3c74.jpg' },
    { id: 7, type: 'image', title: '', desc: '', url: '/images/home/GX/Whisk_69ab59d35a.jpg' },
    { id: 9, type: 'image', title: '', desc: '', url: '/images/home/GX/Whisk_7372d1a620.jpg' },
    { id: 11, type: 'image', title: '', desc: '', url: '/images/home/GX/Whisk_c38b2e7e1c.jpg' },
    { id: 14, type: 'image', title: '', desc: '', url: '/images/home/GX/Whisk_c31d294d3a.jpg' },
    { id: 6, type: 'image', title: '', desc: '', url: '/images/home/GX/G1%20(3).png' },
    { id: 10, type: 'image', title: 'Lavender Bottle', desc: '', url: '/Product Shot of Jayded AF-1.jpg' },
    { id: 13, type: 'image', title: 'Man in Museum', desc: '', url: '/images/cucumber/grid/Whisk_94f02a652d.jpg' },
    { id: 4, type: 'image', title: '', desc: '', url: '/images/home/GX/G1%20(6).png' },
    { id: 8, type: 'image', title: '', desc: '', url: '/images/home/GX/Whisk_4f54a30070.jpg' },
    { id: 15, type: 'image', title: '', desc: '', url: '/images/home/GX/Whisk_e6e7cad612.jpg' },
    { id: 16, type: 'image', title: 'Cucumber Bottle', desc: '', url: '/Product Shot of Jayded AF-3.jpg' },
    { id: 5, type: 'image', title: '', desc: '', url: '/images/home/GX/Whisk_5843d695ae.jpg' },
];


const HomePage: React.FC = () => {

  return (
    <>
      <Seo
        title="Jayded AF - Home"
        description="Welcome to Jayded AF, your go-to place for amazing cocktails."
        path="/"
      />
      <main className="w-full">

        {/* Section 1: New Dynamic Hero Section */}
      <HeroSection />
      <AwardsSection />


<LuxuryCollectionSection />

<MessageFromAlexa />

      {/* Section 5: Placeholder Video Section */}
      <section>
          <InView>
              <div className="aspect-[21/9] w-full bg-brand-dark/50 overflow-hidden">
                  <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                      <iframe
                          src="https://player.vimeo.com/video/799286520?h=f2363332ee&badge=0&autopause=0&autoplay=1&player_id=0&app_id=58479&muted=1&loop=1&controls=0"
                          frameBorder="0"
                          allow="autoplay; picture-in-picture; clipboard-write; encrypted-media; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                          title="Website Banner All Brands.mp4"
                      ></iframe>
                  </div>
              </div>
          </InView>
      </section>

<OurStorySection />

<FeaturedHighlightsSection />


      {/* Section 6: Gallery */}
      <section className="py-8 sm:py-10">
         <InView viewOptions={{ once: true, margin: "0px 0px -20% 0px" }}>
              <InteractiveBentoGallery
                  mediaItems={galleryMediaItems}
                  title="Set Apart"
                  description=""
              />
         </InView>
      </section>

      <StoreLocatorSection />

      {/* Section 7: New Wide Image Section */}
       <section className="my-8 sm:my-12">
           <InView>
                <div className="aspect-[21/9] w-full bg-brand-dark/50 overflow-hidden">
                    <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                        <iframe
                            src="https://player.vimeo.com/video/861812568?h=bb6f4fcff1&badge=0&autopause=0&autoplay=1&player_id=0&app_id=58479&muted=1&loop=1&controls=0"
                            frameBorder="0"
                            allow="autoplay; picture-in-picture; clipboard-write; encrypted-media; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            title="Website Banner All Brands.mp4"
                        ></iframe>
                    </div>
                </div>
           </InView>
        </section>

      {/* Section 9: Final CTA Section - Centered */}
      <section className="py-20 bg-brand-dark text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Link to="/store-locator">
                  <StyledButton>Purchase</StyledButton>
                </Link>
              </motion.div>
          </div>
      </section>

      {/* Section 10: Footer is handled globally in App.tsx */}

      </main>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </>
  );
};

export default HomePage;
