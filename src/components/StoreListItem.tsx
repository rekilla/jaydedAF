import React from 'react';
import { motion } from 'framer-motion';
import { Location } from '../data/locations';
import { cn } from '../lib/utils';

interface StoreListItemProps {
  store: Location;
  isSelected: boolean;
  distance?: number;
  onClick: () => void;
}

const formatTime = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
};

export const StoreListItem: React.FC<StoreListItemProps> = ({ store, isSelected, onClick }) => {
  return (
    <motion.div
      className={cn(
        "p-4 sm:p-6 rounded-lg cursor-pointer transition-all duration-300 border-2",
        isSelected
          ? 'border-yellow-400 bg-transparent'
          : 'border-transparent hover:border-yellow-400'
      )}
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 10 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-black mb-1">
            {store.name}
            {store.featured && (
              <span className="ml-2 text-xs text-[#D4AF37] uppercase tracking-wider">
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
        <div className={cn(
          "w-2 h-2 rounded-full mt-2 transition-all duration-300",
          isSelected ? 'bg-yellow-400' : 'bg-gray-200'
        )} />
      </div>
    </motion.div>
  );
};