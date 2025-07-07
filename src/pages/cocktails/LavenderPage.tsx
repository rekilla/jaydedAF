import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { InView } from '../../components/ui/in-view';
import { BottleNexusButton } from '../../components/BottleNexusButton';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Play, X } from 'lucide-react';

// Flavor Data
const FLAVOR_NAME = "Lavender";
const FLAVOR_TAGLINE = "Floral, Soothing & Unapologetically Bold";
const FLAVOR_COLOR_CLASS = "text-purple-400";

// Lifestyle Gallery Data
const lifestyleScenes = [
  {
    id: 'intimate',
    title: 'Evening Soiree',
    subtitle: 'Elegant sips, enchanting conversations',
    image: '/images/lifestyle/intimate-dinner.jpg', // Placeholder
    video: '/videos/intimate-dinner.mp4' // Placeholder
  },
  {
    id: 'celebration',
    title: 'Rooftop Sunset',
    subtitle: 'Celebrate the golden hour',
    image: '/images/lifestyle/rooftop-celebration.jpg', // Placeholder
    video: '/videos/rooftop-celebration.mp4' // Placeholder
  },
  {
    id: 'personal',
    title: 'Creative Flow',
    subtitle: 'Your moment of inspiration',
    image: '/images/lifestyle/quiet-nightcap.jpg', // Placeholder
    video: '/videos/quiet-nightcap.mp4' // Placeholder
  }
];

// Serving Styles Data
const servingStyles = [
  {
    id: 'neat',
    title: 'Neat',
    temp: '18°C',
    glass: 'Coupe',
    image: '/images/serving/neat.jpg' // Placeholder
  },
  {
    id: 'rocks',
    title: 'On the Rocks',
    temp: '4°C',
    glass: 'Rocks Glass',
    image: '/images/serving/on-rocks.jpg' // Placeholder
  },
  {
    id: 'martini',
    title: 'Lavender Haze Martini',
    temp: '0°C',
    glass: 'Martini Glass',
    image: '/images/serving/martini.jpg' // Placeholder
  },
  {
    id: 'signature',
    title: 'Signature Serve',
    temp: '2°C',
    glass: 'Nick & Nora',
    image: '/images/serving/signature.jpg' // Placeholder
  }
];

// Destination Data
const destinations = [
  { id: 'miami', name: 'Parisian Night', video: '/videos/miami-nights.mp4' }, // Placeholder
  { id: 'manhattan', name: 'London Speakeasy', video: '/videos/manhattan-rooftop.mp4' }, // Placeholder
  { id: 'malibu', name: 'Milan Fashion Week', video: '/videos/malibu-sunset.mp4' } // Placeholder
];

const LavenderPage: React.FC = () => {
  const [selectedScene, setSelectedScene] = useState<string | null>(null);
  const { scrollY } = useScroll();
  
  // Parallax for hero
  const heroParallax = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <main className="w-full bg-black text-brand-text overflow-x-hidden">
      
      {/* Hero Section with Video Background */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        <motion.div 
          style={{ y: heroParallax }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-rooftop-bar.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className={cn("font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4", FLAVOR_COLOR_CLASS)}>
                {FLAVOR_NAME}
              </h1>
              <p className="font-heading text-lg sm:text-xl md:text-2xl italic text-brand-text/80">
                {FLAVOR_TAGLINE}
              </p>
            </motion.div>
            
            <motion.div
              className="absolute bottom-10 left-1/2 sm:left-1/3 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <img 
                src="/images/cocktails/lavender/bottle-hero.png" 
                alt="Lavender Bottle"
                className="h-[35vh] sm:h-[40vh] md:h-[50vh] object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Moment - Emotional Video Section */}
      <InView as="section" className="relative py-16 sm:py-20 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 sm:opacity-50"
        >
          <source src="/videos/lemon-peel-spray.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-gold mb-4">
            Every Drop Tells a Story
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-brand-text/70 max-w-2xl mx-auto">
            From the first floral aroma to the last smooth finish, experience a journey crafted for those who dare to be different.
          </p>
        </div>
      </InView>

      {/* Taste Journey */}
      <InView as="section" className="py-20 bg-gradient-to-b from-black to-brand-dark/20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl sm:text-5xl text-center text-brand-gold mb-16">
            The Taste Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/20 flex items-center justify-center">
                <span className="text-3xl">🪻</span>
              </div>
              <h3 className="font-heading text-xl text-brand-gold mb-2">Initial</h3>
              <p className="text-brand-text/70">Delicate lavender invites you in</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/20 flex items-center justify-center">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="font-heading text-xl text-brand-gold mb-2">Heart</h3>
              <p className="text-brand-text/70">A chorus of wild botanicals</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-heading text-xl text-brand-gold mb-2">Finish</h3>
              <p className="text-brand-text/70">Smooth, elegant, and unforgettable</p>
            </motion.div>
          </div>
        </div>
      </InView>

      {/* Lifestyle Gallery */}
      <InView as="section" className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-center text-brand-gold mb-8 sm:mb-12 md:mb-16">
            Your Jayded Moments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {lifestyleScenes.map((scene, index) => (
              <motion.div
                key={scene.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedScene(scene.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative h-[300px] sm:h-[350px] md:h-[400px]">
                  <img 
                    src={scene.image} 
                    alt={scene.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                    <h3 className="font-heading text-xl sm:text-2xl text-brand-gold mb-1">{scene.title}</h3>
                    <p className="text-sm sm:text-base text-brand-text/70">{scene.subtitle}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-12 h-12 sm:w-16 sm:h-16 text-white/80" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </InView>

      {/* The Ritual - Split Video/Text */}
      <InView as="section" className="py-16 sm:py-20 bg-brand-dark/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden order-2 lg:order-1">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/perfect-pour.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-gold mb-4 sm:mb-6">
                The Perfect Ritual
              </h2>
              <p className="text-base sm:text-lg text-brand-text/80 mb-6 sm:mb-8">
                The art of the pour, the anticipation of the first sip. Each bottle of Lavender is an invitation to slow down and savor life's golden moments.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold text-sm sm:text-base">1</span>
                  </div>
                  <p className="text-sm sm:text-base text-brand-text/70">Chill to perfection</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold text-sm sm:text-base">2</span>
                  </div>
                  <p className="text-sm sm:text-base text-brand-text/70">Pour with intention</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold text-sm sm:text-base">3</span>
                  </div>
                  <p className="text-sm sm:text-base text-brand-text/70">Savor the moment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InView>

      {/* Serving Styles - Horizontal Scroll */}
      <InView as="section" className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-center text-brand-gold mb-8 sm:mb-12 md:mb-16">
            Your Perfect Serve
          </h2>
          <div className="relative">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              {servingStyles.map((style) => (
                <motion.div
                  key={style.id}
                  className="flex-shrink-0 w-[250px] sm:w-[280px] md:w-[300px]"
                  whileHover={{ y: -10 }}
                >
                  <div className="relative h-[350px] sm:h-[380px] md:h-[400px] rounded-lg overflow-hidden group">
                    <img 
                      src={style.image} 
                      alt={style.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                      <h3 className="font-heading text-xl sm:text-2xl text-brand-gold mb-2">{style.title}</h3>
                      <div className="text-xs sm:text-sm text-brand-text/70 space-y-1">
                        <p>Temperature: {style.temp}</p>
                        <p>Glass: {style.glass}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </InView>

      {/* Social Moments Grid */}
      <InView as="section" className="py-16 sm:py-20 bg-brand-dark/20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-center text-brand-gold mb-2 sm:mb-4">
            #JaydedMoments
          </h2>
          <p className="text-center text-sm sm:text-base text-brand-text/70 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Join the celebration. Share your Jayded AF moments.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                className="relative h-[150px] sm:h-[200px] md:h-[250px] rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <img 
                  src={`/images/social/moment-${i}.jpg`} 
                  alt={`Social moment ${i}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </InView>

      {/* Specifications - Elegant Grid */}
      <InView as="section" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl sm:text-5xl text-center text-brand-gold mb-16">
              The Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-heading text-brand-gold mb-2">12%</div>
                <div className="text-brand-text/70">ABV</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading text-brand-gold mb-2">90</div>
                <div className="text-brand-text/70">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading text-brand-gold mb-2">5g</div>
                <div className="text-brand-text/70">Sugar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading text-brand-gold mb-2">750ml</div>
                <div className="text-brand-text/70">Volume</div>
              </div>
            </div>
          </div>
        </div>
      </InView>

      {/* Destinations Section */}
      <InView as="section" className="py-20 bg-gradient-to-b from-brand-dark/20 to-black">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl sm:text-5xl text-center text-brand-gold mb-4">
            Where Will Lavender Take You?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
            {destinations.map((dest) => (
              <motion.div
                key={dest.id}
                className="relative h-[300px] rounded-lg overflow-hidden group"
                whileHover={{ scale: 1.02 }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={dest.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-heading text-2xl text-white">{dest.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </InView>

      {/* Closing CTA Section */}
      <InView as="section" className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 sm:opacity-30"
        >
          <source src="/videos/elegant-party.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-gold mb-4 sm:mb-6 md:mb-8">
            Find Your Moment
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-brand-text/80 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto">
            Limited availability. Unlimited possibilities.
          </p>
          <div className="mb-6 sm:mb-8">
            <BottleNexusButton id={47036} />
          </div>
          <Link 
            to="/store-locator" 
            className="text-sm sm:text-base text-brand-gold hover:text-brand-gold/80 transition-colors duration-200 inline-block"
          >
            Find a retailer near you →
          </Link>
        </div>
      </InView>

      {/* Video Modal for Lifestyle Scenes */}
      {selectedScene && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedScene(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              autoPlay
              controls
              className="w-full h-full rounded-lg"
            >
              <source src={lifestyleScenes.find(s => s.id === selectedScene)?.video} type="video/mp4" />
            </video>
            <button
              onClick={() => setSelectedScene(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white/80 hover:text-white bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
};

export default LavenderPage;
