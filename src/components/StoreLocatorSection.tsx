"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Store {
  id: number;
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  featured?: boolean;
}

const stores: Store[] = [
  {
    id: 1,
    name: "Jayded AF Flagship",
    address: "123 Luxury Avenue",
    city: "New York, NY 10001",
    hours: "Mon-Sat: 10am-9pm",
    phone: "(212) 555-0100",
    featured: true
  },
  {
    id: 2,
    name: "Beverly Hills Boutique",
    address: "456 Rodeo Drive",
    city: "Beverly Hills, CA 90210",
    hours: "Mon-Sat: 10am-8pm",
    phone: "(310) 555-0200"
  },
  {
    id: 3,
    name: "Miami Beach Location",
    address: "789 Ocean Drive",
    city: "Miami Beach, FL 33139",
    hours: "Mon-Sun: 11am-10pm",
    phone: "(305) 555-0300"
  }
];

// InView component placeholder
const InView: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const StoreLocatorSection: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<Store>(stores[0]);
  const [isMapHovered, setIsMapHovered] = useState(false);

  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden" style={{ padding: '30px 0' }}>
      <InView className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-light tracking-wider text-white mb-2">
            Find Us
          </h2>
          <div className="w-12 h-px bg-[#D4AF37] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-white/60">
            Experience Jayded AF at our exclusive locations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Store List */}
          <div className="space-y-4">
            {stores.map((store, index) => (
              <motion.div
                key={store.id}
                className={`
                  p-4 sm:p-6 border rounded-lg cursor-pointer transition-all duration-300
                  ${selectedStore.id === store.id 
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5' 
                    : 'border-white/10 hover:border-white/20'
                  }
                `}
                onClick={() => setSelectedStore(store)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  transform: 'translateX(0px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(10px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0px)';
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-light text-white mb-1">
                      {store.name}
                      {store.featured && (
                        <span className="ml-2 text-xs text-[#D4AF37] uppercase tracking-wider">
                          Flagship
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-white/60 mb-1">{store.address}</p>
                    <p className="text-sm text-white/60 mb-3">{store.city}</p>
                    <div className="space-y-1">
                      <p className="text-xs text-white/40">{store.hours}</p>
                      <p className="text-xs text-white/40">{store.phone}</p>
                    </div>
                  </div>
                  
                  {/* Selection indicator */}
                  <div className={`
                    w-2 h-2 rounded-full mt-2 transition-all duration-300
                    ${selectedStore.id === store.id ? 'bg-[#D4AF37]' : 'bg-white/20'}
                  `} />
                </div>
              </motion.div>
            ))}
            
            {/* View All Button */}
            <motion.button
              className="w-full py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-light tracking-wider text-sm mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.4 }}
              style={{
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
            >
              VIEW ALL LOCATIONS
            </motion.button>
          </div>

          {/* Right Side - Map Preview */}
          <motion.div
            className="relative h-[300px] sm:h-[400px] lg:h-full min-h-[400px] bg-white/5 rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onMouseEnter={() => setIsMapHovered(true)}
            onMouseLeave={() => setIsMapHovered(false)}
          >
            {/* Map placeholder - replace with actual map integration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="mb-4 transition-all duration-300"
                  style={{
                    transform: isMapHovered 
                      ? 'scale(1.1) rotate(5deg)' 
                      : 'scale(1) rotate(0deg)'
                  }}
                >
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="mx-auto">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#D4AF37" opacity="0.3"/>
                  </svg>
                </div>
                <p className="text-sm text-white/40 mb-2">Interactive Map</p>
                <p className="text-xs text-white/30">Click to explore</p>
              </div>
            </div>
            
            {/* Overlay with store info */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6"
            >
              <h4 className="text-lg font-light text-white mb-1">
                {selectedStore.name}
              </h4>
              <p className="text-sm text-white/60">
                {selectedStore.address}, {selectedStore.city}
              </p>
              <button className="mt-3 text-xs text-[#D4AF37] hover:text-[#F4E4A0] transition-colors">
                Get Directions →
              </button>
            </div>
            
            {/* Corner accent */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#D4AF37]/30" />
          </motion.div>
        </div>
      </InView>
    </section>
  );
};

export default StoreLocatorSection;