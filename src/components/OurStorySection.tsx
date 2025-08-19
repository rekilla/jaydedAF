// OurStoryCards.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useReducedMotion, useTransform } from 'framer-motion';
import FadedImage from './FadedImage';

type StoryImage = { src: string; alt: string };
type StoryCard  = { id: string; subtitle: string; text: string; image?: StoryImage };

interface OurStoryCardsProps {
  className?: string;
  cardsData?: StoryCard[];
}

const DEFAULT_CARDS: StoryCard[] = [
  {
    id: 'epiphany',
    subtitle: 'The Epiphany',
    text:
      'Life gave her lemons, and she made a Martini. Alexa Jayde Fitzpatrick did not have the traditional pathway, rather an epiphany. On October 5th, 2020, a medical emergency led to her being figuratively, physically, emotionally, and creatively reborn. Emphasizing love of the eclectic and unique, along with unbridled imagination, would lead to this moment.',
    image: { src: '/images/ALEXA/A woman sits in a chair in the shadows drinking a martini.jpg', alt: 'Alexa Jayde Fitzpatrick - The beginning of Jayded AF' }
  },
  {
    id: 'vision',
    subtitle: 'The Vision',
    text:
      `Was that a mouthful? Take another sip—there's more. Our vision is to disrupt paradigms of the liquor industry by enabling the discovery, embrace, and embodiment of uninhibited originality. Gin, anyone? We are reimagining this criminally underrated, yet perfectly harmonious spirit.`
  },
  {
    id: 'perfection',
    subtitle: 'The Craft',
    text:
      'Little can compare to a perfect Martini. When great crafting produces a flavor profile so inspired and pointed, one can only applaud. Jayded AF Cocktails is the answer for consumers seeking libations outside of the cyclical.',
    image: { src: '/images/ALEXA/A woman in a pink dress holds a martini glass in the shadows.jpg', alt: 'Perfectly crafted cocktail' }
  },
  {
    id: 'mission',
    subtitle: 'The Mission & Values',
    text:
      'Our mission is to nourish an environment ripe for the flagrant expression of the modern consumer—unabashedly bold, layered, and authentic. Your voice mirrors our own: clear, concise, multifaceted, and definitive. Our values, like our flavors, are intentionally impactful, intrepid, bona fide, and filled to the brim with charisma.'
  },
  {
    id: 'future',
    subtitle: 'The Future',
    text: 'Where do we go from here? The stars.',
    image: { src: '/images/ALEXA/A women in white dress holding a lemon drop martini.jpg', alt: 'Future aspirations - reaching for the stars' }
  }
];

/* ---------- Card content ---------- */
const CardContent: React.FC<{
  card: StoryCard;
  even: boolean;
}> = ({ card, even }) => {
  const borderColor = '#212529';
  const headingColor = '#F9F02F';

  return (
    <article
      className={`h-full w-full grid grid-cols-1 ${card.image ? 'md:grid-cols-2' : 'md:grid-cols-1'} overflow-hidden bg-black border-2`}
      style={{ borderColor }}
      aria-labelledby={`story-card-title-${card.id}`}
    >
      {/* Mobile View */}
      <div className="md:hidden flex flex-col">
        {card.image && (
          <div className="grid grid-cols-2 items-center">
            <div className="p-8">
              <h3 id={`story-card-title-${card.id}-mobile`} className="text-3xl font-bold leading-tight" style={{ color: headingColor }}>
                {card.subtitle}
              </h3>
            </div>
            <div className="aspect-w-1 aspect-h-1">
              <FadedImage src={card.image.src} alt={card.image.alt} className="w-full h-full object-cover" />
            </div>
          </div>
        )}
        <div className="p-8">
          {!card.image && (
            <h3 id={`story-card-title-${card.id}-mobile`} className="text-3xl font-bold mb-6 leading-tight" style={{ color: headingColor }}>
              {card.subtitle}
            </h3>
          )}
          <p className="text-gray-300 text-base leading-relaxed">{card.text}</p>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:contents">
        <div className={`p-12 lg:p-16 flex flex-col justify-center ${even && card.image ? 'order-2' : 'order-1'} ${!card.image ? 'text-center' : ''}`}>
          <h3 id={`story-card-title-${card.id}-desktop`} className="text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ color: headingColor }}>
            {card.subtitle}
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">{card.text}</p>
        </div>
        {card.image && (
          <div className={`${even ? 'order-1' : 'order-2'}`}>
            <FadedImage src={card.image.src} alt={card.image.alt} className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </article>
  );
};

/* ---------- Main Component ---------- */
const OurStoryCards: React.FC<OurStoryCardsProps> = ({
  className = '',
  cardsData = DEFAULT_CARDS,
}) => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      className={`relative ${className} bg-black`}
      aria-labelledby="our-story-heading"
      style={{ height: reduceMotion ? 'auto' : `${(cardsData.length + 1) * 75}vh` }}
    >
      {/* Header */}
      <div className="relative pt-16 pb-40">
        <header className="container mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 id="our-story-heading" className="text-white text-[40.5px] leading-[50px] font-light tracking-[2.7px] inline-block">
              Our Story
            </h2>
            <div className="w-12 h-px bg-brand-lemon mx-auto mt-1" />
          </div>
        </header>
      </div>

      {/* Reduced motion: simple vertical stack */}
      {reduceMotion ? (
        <div className="container mx-auto max-w-7xl px-6 space-y-6 pb-16">
          {cardsData.map((card, i) => (
            <div key={card.id} className="h-[70vh]">
              <CardContent card={card} even={i % 2 === 1} />
            </div>
          ))}
        </div>
      ) : (
        // Sticky container for cards
        <div className="sticky top-8 -mt-8 h-[70vh] mb-32">
          <div className="relative h-full container mx-auto max-w-7xl px-6">
            {cardsData.map((card, i) => {
              const cardCount = cardsData.length;
              const cardProgress = 1 / cardCount;
              
              // Each card's timing
              const start = i * cardProgress;
              const end = (i + 1) * cardProgress;
              
              // Y transform: slide up from bottom
              const y = useTransform(
                scrollYProgress,
                [start, start + 0.1, end - 0.1, end],
                [i === 0 ? '0%' : '100%', '0%', '0%', '10%']
              );
              
              // Scale: back cards are smaller
              const scale = useTransform(
                scrollYProgress,
                [start, start + 0.1, end - 0.1, end + 0.1],
                [1, 1, 1, 0.95]
              );
              
              // Opacity for fade in/out
              const opacity = useTransform(
                scrollYProgress,
                [start - 0.05, start, end + 0.2, end + 0.3],
                [0, 1, 1, 0]
              );
              
              // Z-index: later cards on top
              const zIndex = i + 1;

              return (
                <motion.div
                  key={card.id}
                  className="absolute inset-y-0 inset-x-4 md:inset-x-0"
                  style={{
                    zIndex,
                    y,
                    scale,
                    opacity
                  }}
                >
                  <CardContent card={card} even={i % 2 === 1} />
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default OurStoryCards;
