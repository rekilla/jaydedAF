// OurStoryCards.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useReducedMotion, useTransform } from 'framer-motion';

type StoryImage = { src: string; alt: string };
type StoryCard  = { id: string; title: string; subtitle: string; text: string; image: StoryImage };

interface OurStoryCardsProps {
  className?: string;
  cardsData?: StoryCard[];
}

const DEFAULT_CARDS: StoryCard[] = [
  {
    id: 'epiphany',
    title: 'Card 1 – The Epiphany',
    subtitle: 'The Epiphany',
    text:
      'Life gave her lemons, and she made a Martini. Alexa Jayde Fitzpatrick did not have the traditional pathway, rather an epiphany. On October 5th, 2020, a medical emergency led to her being figuratively, physically, emotionally, and creatively reborn. Alexa always knew her love of the eclectic, the unique, and the embrace of unbridled imagination would eventually lead her to this moment.',
    image: { src: '/images/story/1.jpg', alt: 'Alexa Jayde Fitzpatrick - The beginning of Jayded AF' }
  },
  {
    id: 'perfection',
    title: 'Card 2 – Crafted to Perfection',
    subtitle: 'Crafted to Perfection',
    text:
      'Little can compare to a perfect Martini. When great crafting produces a flavor profile so inspired and pointed, one can only applaud. Jayded AF Cocktails is the answer for consumers seeking libations outside of the cyclical.',
    image: { src: '/images/story/2.jpg', alt: 'Perfectly crafted cocktail' }
  },
  {
    id: 'vision',
    title: 'Card 3 – The Vision',
    subtitle: 'The Vision',
    text:
      `Was that a mouthful? Take another sip—there's more. Our vision is to disrupt paradigms of the liquor industry by enabling the discovery, embrace, and embodiment of uninhibited originality. Gin, anyone? We are reimagining this criminally underrated, yet perfectly harmonious spirit.`,
    image: { src: '/images/story/3.jpg', alt: 'Vision for reimagining gin cocktails' }
  },
  {
    id: 'mission',
    title: 'Card 4 – The Mission & Values',
    subtitle: 'The Mission & Values',
    text:
      'Our mission is to nourish an environment ripe for the flagrant expression of the modern consumer—unabashedly bold, layered, and authentic. Your voice mirrors our own: clear, concise, multifaceted, and definitive. Our values, like our flavors, are intentionally impactful, intrepid, bona fide, and filled to the brim with charisma.',
    image: { src: '/images/story/4.jpg', alt: 'Our mission and values representation' }
  },
  {
    id: 'future',
    title: 'Card 5 – The Future',
    subtitle: 'The Future',
    text: 'Where do we go from here? The stars.',
    image: { src: '/images/story/5.jpg', alt: 'Future aspirations - reaching for the stars' }
  }
];

/* ---------- Card content ---------- */
const CardContent: React.FC<{
  card: StoryCard;
  even: boolean;
}> = ({ card, even }) => (
  <article
    className="h-full w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-black border-2 border-yellow-400"
    aria-labelledby={`story-card-title-${card.id}`}
  >
    {/* Mobile stacked */}
    <div className="md:hidden flex flex-col h-full">
      <div className="flex-1 p-8 flex flex-col justify-center">
        <p className="text-yellow-400 text-sm uppercase tracking-[0.2em] mb-4">{card.title}</p>
        <h3 id={`story-card-title-${card.id}`} className="text-white text-3xl font-bold mb-6 leading-tight">
          {card.subtitle}
        </h3>
        <p className="text-gray-300 text-base leading-relaxed">{card.text}</p>
      </div>
      <div className="h-[40%]">
        <img src={card.image.src} alt={card.image.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>
    </div>

    {/* Desktop split, alternating sides */}
    <div className="hidden md:contents">
      <div className={`p-12 lg:p-16 flex flex-col justify-center ${even ? 'order-2' : 'order-1'}`}>
        <p className="text-yellow-400 text-sm uppercase tracking-[0.2em] mb-4">{card.title}</p>
        <h3 className="text-white text-4xl lg:text-5xl font-bold mb-8 leading-tight">{card.subtitle}</h3>
        <p className="text-gray-300 text-lg leading-relaxed">{card.text}</p>
      </div>
      <div className={`${even ? 'order-1' : 'order-2'}`}>
        <img src={card.image.src} alt={card.image.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>
    </div>
  </article>
);

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
            <div className="w-12 h-px bg-[#D4AF37] mx-auto mt-1" />
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
                  className="absolute inset-0"
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