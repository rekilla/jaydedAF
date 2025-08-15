import React from 'react';
import awards from '../data/awards.json';

export const AwardsSection: React.FC = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-[40.5px] leading-[50px] font-light tracking-[2.7px] text-black inline-block">
            Award-Winning
          </h2>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-1" />
        </div>
        <div className="flex justify-center gap-8 sm:gap-12 md:gap-16">
          {awards.map((award, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img src={award.image} alt={award.title} className="h-24 w-24 mb-4" />
              <p className="text-black/80 tracking-widest">{award.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
