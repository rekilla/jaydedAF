import React from 'react';
import { SectionTitle } from './ui/SectionTitle';

export const MessageFromAlexa: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionTitle flavor="lemon" lineWidth="100px" className="text-gray-800">
          Message from Our Founder
        </SectionTitle>
        <p className="mt-8 text-lg text-gray-600 max-w-3xl mx-auto">
          “Wherever you are, reimagine, reinvigorate, rebrand. While you’re at it, make the Martini your new love language. Grab a glass, sugar the rim and vibe."
        </p>
      </div>
    </section>
  );
};