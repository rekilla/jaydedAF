import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Quote, Newspaper, Award, TrendingUp, Mic } from 'lucide-react';

const PressPage: React.FC = () => {
  const pressItems = [
    {
      id: 1,
      publication: "PR%F The Magazine",
      title: "Featured in Summer/July/August Issue 2023",
      excerpt: "Spirits. Wine. Potations and Libations. Beverage Industry News.",
      date: "July 2023",
      link: "https://issuu.com/proofthemagazine/docs/proof-the-magazine_vol3_issue1_july2023",
      icon: <Newspaper className="w-6 h-6" />,
      featured: true
    },
    {
      id: 2,
      publication: "Authority Magazine",
      title: "Wisdom From The Women Leading the Wine & Spirits Industries",
      excerpt: "Less than 20% of winemakers and distillers are women. Traditionally, women were excluded from these industries. This number is slowly rising as more women choose to study this profession...",
      date: "July 2023",
      link: "https://medium.com/authority-magazine/wisdom-from-the-women-leading-the-wine-spirits-industries-with-alexa-fitzpatrick-of-jayded-af-f1bcbfd6ce88",
      icon: <Quote className="w-6 h-6" />,
      featured: true
    },
    {
      id: 3,
      publication: "Beverage Industry Magazine",
      title: "Jayded AF delivers RTD Gin Martinis - Podcast Feature",
      excerpt: "Alexa Fitzpatrick, founder and CEO of Jayded AF Ready-Serve Gin Martinis, discusses the trends driving the RTD market and what led to her founding of Jayded AF.",
      date: "2023",
      link: "https://www.bevindustry.com/media/podcasts/3856-beverage-industry-magazine-podcasts/play/124-jayded-af-delivers-rtd-gin-martinis",
      icon: <Mic className="w-6 h-6" />,
      featured: false
    },
    {
      id: 4,
      publication: "Lake Minnetonka Magazine",
      title: "Jayded AF Offers up Ready-Made Cocktails",
      excerpt: "A local woman's medical crisis kickstarted her business venture. When life gave her lemons, the Minnetonka resident says she made a Martini, and she means it quite literally.",
      date: "2023",
      link: "https://lakeminnetonkamag.com/jayded-af-offers-up-ready-made-cocktails/",
      icon: <TrendingUp className="w-6 h-6" />,
      featured: false
    },
    {
      id: 5,
      publication: "Mill City Times",
      title: "Small Business Spotlight: Black Business Month Feature",
      excerpt: "Meet Alexa Jayde Fitzpatrick, the imaginative creator and CEO behind Jayded AF ready-to-serve gin martinis. The name Jayded AF came from Alexa's middle name, Jayde...",
      date: "August 2023",
      link: "http://millcitytimes.com/news/small-business-spotlight-jayded-af-a-new-line-of-ready-to-se.html",
      icon: <Award className="w-6 h-6" />,
      featured: false
    },
    {
      id: 6,
      publication: "F&B 101",
      title: "Editor's Top Picks: Best in Class",
      excerpt: "Featured among the industry's finest innovations and game-changing products for mixologists and beverage professionals.",
      date: "January 2024",
      link: "https://www.fb101.com/140694-2/",
      icon: <Award className="w-6 h-6" />,
      featured: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="w-full min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-transparent to-white" />
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-6">
              In The Press
            </h1>
            <p className="text-xl sm:text-2xl text-black leading-relaxed">
              Making waves in the spirits industry with our ready-to-serve craft martinis
            </p>
            
            {/* Stats Bar */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-black">6+</div>
                <div className="text-sm text-black mt-1">Featured Publications</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-black">2023</div>
                <div className="text-sm text-black mt-1">Industry Recognition</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-black">Top</div>
                <div className="text-sm text-black mt-1">Editor's Pick 2024</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Press */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Featured Articles */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {pressItems.filter(item => item.featured).map((item) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold to-yellow-400" />
                  
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl text-black group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <ExternalLink className="w-5 h-5 text-black" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="font-semibold text-black">{item.publication}</span>
                        <span className="text-black">•</span>
                        <span className="text-black">{item.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-black transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-black line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Other Press */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressItems.filter(item => !item.featured).map((item) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-gray-100 rounded-lg text-black group-hover:bg-yellow-100 transition-all">
                      {item.icon}
                    </div>
                    <ExternalLink className="w-4 h-4 text-black" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-black">{item.publication}</div>
                    <h3 className="font-bold text-black transition-colors line-clamp-2 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-black">{item.date}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">
            For Media Inquiries
          </h2>
          <p className="text-lg mb-8 text-black">
            Interested in featuring Jayded AF? We'd love to hear from you.
          </p>
          <motion.a
            href="mailto:press@jaydedaf.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-brand-gold text-black font-bold rounded-full hover:shadow-xl hover:shadow-yellow-400/40 transition-all duration-300"
          >
            Contact Press Team
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
};

export default PressPage;