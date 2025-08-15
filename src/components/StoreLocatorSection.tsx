"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { locations, Location } from '../data/locations';

// InView component placeholder
const InView: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

// --- Time Conversion Utility ---
const formatTime = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
};

export const StoreLocatorSection: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<Location>(locations[0]);
  const [isMapHovered, setIsMapHovered] = useState(false);

  return (
    <section className="relative bg-white text-black overflow-hidden" style={{ padding: '30px 0' }}>
      <InView className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[120px]">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[40.5px] leading-[50px] font-light tracking-[2.7px] text-black mb-2">
            Our Locations
          </h2>
          <div className="w-12 h-px bg-brand-gold mx-auto mb-4" />
          <p className="text-sm sm:text-base text-black">
            Experience Jayded AF at our exclusive locations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Store List */}
          <div className="space-y-4">
            {locations.slice(0, 3).map((store, index) => (
              <React.Fragment key={store.id}>
                <motion.div
                  className={`
                    p-4 sm:p-6 rounded-lg cursor-pointer transition-all duration-300 border-2
                    ${selectedStore.id === store.id
                      ? 'border-brand-gold bg-transparent'
                      : 'border-transparent hover:border-brand-gold'
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
                      <h3 className="text-lg sm:text-xl font-light text-black mb-1">
                        {store.name}
                        {store.featured && (
                          <span className="ml-2 text-xs text-brand-gold uppercase tracking-wider">
                            Flagship
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-black mb-1">{store.address}</p>
                      <div className="space-y-1">
                        <p className="text-xs text-black">{store.hours ? `${formatTime(store.hours.open)} - ${formatTime(store.hours.close)}` : 'Hours not available'}</p>
                        <p className="text-xs text-black">{store.phone}</p>
                      </div>
                    </div>
                    
                    {/* Selection indicator */}
                    <div className={`
                      w-2 h-2 rounded-full mt-2 transition-all duration-300
                      ${selectedStore.id === store.id ? 'bg-brand-gold' : 'bg-gray-200'}
                    `} />
                  </div>
                </motion.div>
                {index < locations.slice(0, 3).length - 1 && (
                  <div className="border-b border-gray-200"></div>
                )}
              </React.Fragment>
            ))}
            
            {/* View All Button */}
            <Link to="/store-locator" className="block w-full mt-6">
              <motion.button
                className="w-full py-3 bg-gray-200 text-black hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-300 font-light tracking-wider text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.4 }}
              >
                VIEW ALL LOCATIONS
              </motion.button>
            </Link>
          </div>

          {/* Right Side - Map Preview */}
          <motion.div
            className="relative h-[300px] sm:h-[400px] lg:h-full min-h-[400px] bg-gray-100 rounded-lg overflow-hidden"
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
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#F9F02F" opacity="0.3"/>
                  </svg>
                </div>
                <p className="text-sm text-black mb-2">Interactive Map</p>
                <p className="text-xs text-black">Click to explore</p>
              </div>
            </div>
            
            {/* Overlay with store info */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/80 to-transparent p-6"
            >
              <h4 className="text-lg font-light text-black mb-1">
                {selectedStore.name}
              </h4>
              <p className="text-sm text-black">
                {selectedStore.address}
              </p>
              <button className="mt-3 text-xs text-brand-gold hover:text-yellow-500 transition-colors">
                Get Directions →
              </button>
            </div>
            
            {/* Corner accent */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-brand-gold/30" />
          </motion.div>
        </div>
      </InView>
    </section>
  );
};

export default StoreLocatorSection;
