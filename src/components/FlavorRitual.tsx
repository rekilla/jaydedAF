import React from 'react';
import { motion } from 'framer-motion';

interface RitualStep {
  step: number;
  title: string;
  description: string;
}

import { FlavorNavigation } from './FlavorNavigation';

interface FlavorRitualProps {
  flavorName: string;
  subtext: string;
  ritualSteps: RitualStep[];
  imageUrl: string;
  imageAlt: string;
  currentProductId: number;
}

const FlavorRitual: React.FC<FlavorRitualProps> = ({
  flavorName,
  subtext,
  ritualSteps,
  imageUrl,
  imageAlt,
  currentProductId,
}) => {
  return (
    <>
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Column on Desktop */}
            <div className="md:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2
                  className="text-4xl md:text-5xl font-serif mb-4 text-white"
                >
                  The {flavorName} Ritual
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8" dangerouslySetInnerHTML={{ __html: subtext }} />
                <ol className="space-y-6">
                  {ritualSteps.map((step, index) => (
                    <motion.li
                      key={step.step}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 bg-white text-black"
                      >
                        <span className="font-bold">{step.step}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {step.title}
                        </h3>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            </div>

            {/* Image - Right Column on Desktop */}
            <div className="md:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-auto rounded-lg shadow-2xl"
                  style={{
                    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <FlavorNavigation currentProductId={currentProductId} />
    </>
  );
};

export default FlavorRitual;