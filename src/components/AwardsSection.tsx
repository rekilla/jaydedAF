import React from 'react';
import awards from '../data/awards.json';

export const AwardsSection: React.FC = () => {
  return (
    <section className="pt-8 pb-[0.4rem] bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-[40.5px] leading-tight sm:leading-[50px] font-light tracking-widest sm:tracking-[2.7px] text-black inline-block">
            Award-Winning
          </h2>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-2" />
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 sm:gap-x-8 md:gap-x-12 lg:gap-x-20">
          {awards.map((award, index) => (
            <div key={index} className="flex flex-col items-center text-center w-28 sm:w-32 md:w-36 lg:w-40">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center mb-3 sm:mb-4">
                <img src={award.image} alt={award.title} className="max-w-full max-h-full object-contain" />
              </div>
              <p className="text-sm sm:text-base md:text-lg text-black/80 tracking-wider sm:tracking-widest">{award.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
