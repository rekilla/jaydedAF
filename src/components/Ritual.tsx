import React from 'react';
import { motion } from 'framer-motion';

interface RitualStep {
  step: number;
  title: string;
  description: string;
  image: string;
}

interface RitualProps {
  flavor: {
    name: string;
    colorClass: string;
  };
  ritualSteps: RitualStep[];
}

const Ritual: React.FC<RitualProps> = ({ flavor, ritualSteps }) => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-4xl md:text-5xl font-bold text-center mb-16 ${flavor.colorClass}`}
        >
          The {flavor.name} Ritual
        </motion.h2>
        <div className="space-y-20">
          {ritualSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="relative group">
                <img src={step.image} alt={step.title} className="w-full h-auto rounded-lg shadow-2xl" />
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ritual;
