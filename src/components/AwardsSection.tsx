import React from 'react';
import awards from '../data/awards.json';

export const AwardsSection: React.FC = () => {
  return (
    <section className="py-8 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-light tracking-wider text-white text-center mb-8">
          Award-Winning Taste
        </h2>
        <div className="flex justify-center gap-8 sm:gap-12 md:gap-16">
          {awards.map((award, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img src={award.image} alt={award.title} className="h-24 w-24 mb-4" />
              <p className="text-white/80 tracking-widest">{award.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};