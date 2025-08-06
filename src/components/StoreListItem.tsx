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
        "p-6 cursor-pointer transition-all duration-300 border-b border-gray-200",
        isSelected ? 'border-l-4 border-yellow-400 bg-gray-50' : 'border-l-4 border-transparent hover:border-yellow-400 hover:bg-gray-50'
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 5 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-light text-black mb-2 tracking-wider">
            {store.name}
          </h3>
          <p className="text-sm text-black/70 mb-1">{store.address}</p>
          <div className="space-y-1 text-xs text-black/60">
            <p>{store.hours ? `${formatTime(store.hours.open)} - ${formatTime(store.hours.close)}` : 'Hours not available'}</p>
            <p>{store.phone}</p>
          </div>
        </div>
        <div className={cn(
          "w-2.5 h-2.5 rounded-full mt-2 transition-all duration-300",
          isSelected ? 'bg-yellow-400' : 'bg-gray-300'
        )} />
      </div>
    </motion.div>
  );
};