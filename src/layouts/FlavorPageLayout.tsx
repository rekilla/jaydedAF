"use client";
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CocktailBentoGallery, MediaItemType } from '../components/ui/cocktail-bento-gallery';
import { CustomAddToCartButton } from '../components/CustomAddToCartButton';
import { BottleNexusProvider } from '../contexts/BottleNexusContext';
import { SectionTitle } from '../components/ui/SectionTitle';
import { PerfectServeSection } from '../components/PerfectServeSection';
import FlavorHeroMobile from '../components/FlavorHeroMobile';

// Mock InView for now
const InView: React.FC<{ children: React.ReactNode; as?: React.ElementType; className?: string }> = ({ children, as = 'div', className = '', ...props }) => {
  const Component = as;
  return <Component className={className} {...props}>{children}</Component>;
};

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

interface FlavorData {
  key: string;
  name: string;
  heroImage?: string;
  tagline: string;
  colorClass: string;
  colorHex: string;
}

interface PerfectServeData {
  title: string;
  serveStyles: {
    id: number;
    title: string;
    description: string;
  }[];
}

interface FlavorPageLayoutProps {
  flavorData: FlavorData;
  perfectServeData: PerfectServeData;
  curatedMomentsMedia: MediaItemType[];
  interimTitle: string;
  interimDescription: React.ReactNode;
  lifestyleMoment: {
    image: string;
    title: string;
    subtitle: string;
  };
  unlockCta: {
    title: string;
    productId: number;
  };
  curatedMoments: {
    title: string;
    wideImage: string;
  };
  specifications: {
    title: string;
    details: {
      delay: number;
      value: string;
      label: string;
      icon: string;
    }[];
  };
  closingCta: {
    title: string;
    image: string;
    productId: number;
  };
}

const FlavorPageLayout: React.FC<FlavorPageLayoutProps> = ({
  flavorData,
  perfectServeData,
  curatedMomentsMedia,
  interimTitle,
  interimDescription,
  lifestyleMoment,
  unlockCta,
  curatedMoments,
  specifications,
  closingCta,
}) => {
  const heroAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: 0.5 }
  }), []);

  return (
    <BottleNexusProvider>
      <main className="w-full bg-black text-white overflow-x-hidden">
        
        <FlavorHeroMobile flavorData={flavorData} />
        {/* Enhanced Hero Section */}
        <section className="relative h-auto py-24 sm:py-32 lg:py-40 w-full flex-col items-center justify-center bg-black hidden sm:flex">
          <div className="relative z-10 text-center">
            <motion.div {...heroAnimation}>
              {flavorData.heroImage ? (
                <img
                  src={flavorData.heroImage}
                  alt={`${flavorData.name} title`}
                  className="w-full max-w-4xl mx-auto transform scale-150"
                />
              ) : (
                <h1
                  className={cn(
                    "font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
                    "drop-shadow-2xl",
                    flavorData.colorClass,
                  )}
                >
                  {flavorData.name}
                </h1>
              )}
            </motion.div>
          </div>
        </section>

        {/* The Interim Section */}
        <InView as="section" className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black to-gray-900/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="mb-8">
                <SectionTitle flavor={flavorData.key as any} lineWidth="40%">{interimTitle}</SectionTitle>
              </div>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white leading-relaxed px-2 sm:px-0 mb-8">
                {interimDescription}
              </p>
            </motion.div>
          </div>
        </InView>

        {/* Full-Width Lifestyle Moment */}
        <InView as="section" className="relative h-[50vh] xs:h-[55vh] sm:h-[60vh] min-h-[300px] sm:min-h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              src={lifestyleMoment.image}
              alt="Lifestyle Moment"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="max-w-lg"
              >
                <SectionTitle flavor={flavorData.key as any} className="text-4xl sm:text-5xl" noUnderline>{lifestyleMoment.title}</SectionTitle>
                <p className="text-lg xs:text-xl sm:text-2xl text-white">
                  {lifestyleMoment.subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </InView>

        <PerfectServeSection {...perfectServeData} flavor={flavorData.key as any} />

        {/* Call to Action */}
        <InView as="section" className="py-8 xs:py-10 sm:py-12 lg:py-16 bg-gray-900/20 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <SectionTitle flavor={flavorData.key as any} lineWidth="40%" noUnderline>{unlockCta.title}</SectionTitle>
            </div>
            <CustomAddToCartButton productId={unlockCta.productId} />
          </div>
        </InView>

        {/* Curated Moments */}
        <InView as="section" className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-black text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <SectionTitle flavor={flavorData.key as any} lineWidth="40%">{curatedMoments.title}</SectionTitle>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full h-[50vh] min-h-[300px] overflow-hidden mb-8 lg:mb-12"
            >
              <img
                src={curatedMoments.wideImage}
                alt="Curated Moments Wide"
                className="w-full h-full object-cover object-[center_30%]"
              />
            </motion.div>
            <CocktailBentoGallery mediaItems={curatedMomentsMedia} />
          </div>
        </InView>

        {/* Specifications */}
        <InView as="section" className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <SectionTitle flavor={flavorData.key as any} className="text-center" lineWidth="40%">{specifications.title}</SectionTitle>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {specifications.details.map((spec) => (
                  <motion.div
                    key={spec.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: spec.delay }}
                    viewport={{ once: true }}
                  >
                    <img src={spec.icon} alt={spec.label} className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-8 opacity-80" />
                    <div className={`${spec.label === '' ? "text-xs xs:text-sm sm:text-base text-white" : "text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-white mb-1 sm:mb-2"} mb-8`}>{spec.value}</div>
                    {spec.label && <div className="text-xs xs:text-sm sm:text-base text-white mt-2">{spec.label}</div>}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </InView>

        {/* Closing CTA Section */}
        <InView as="section" className="relative py-12 xs:py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              src={closingCta.image}
              alt="Closing CTA"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <SectionTitle flavor={flavorData.key as any} lineWidth="40%" noUnderline>{closingCta.title}</SectionTitle>
              </div>
              <div className="flex justify-center items-center flex-col sm:flex-row gap-3 sm:gap-4">
                <CustomAddToCartButton
                  productId={closingCta.productId}
                />
                <div className="hidden" data-bottlenexus-id={closingCta.productId}>
                  {/* This div is intentionally left empty for BottleNexus to populate */}
                </div>
              </div>
            </motion.div>
          </div>
        </InView>

      </main>
    </BottleNexusProvider>
  );
};

export default FlavorPageLayout;