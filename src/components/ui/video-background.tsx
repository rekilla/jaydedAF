"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoBackgroundProps {
  imageSrc: string;
  isActive: boolean;
  flavorKey: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  imageSrc,
  isActive,
  flavorKey,
}) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={flavorKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 overflow-hidden z-10"
        >
          <img
            src={imageSrc}
            alt="Gin bottle"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const VideoBackgroundContainer: React.FC<{
  videos: Array<{ key: string; src: string }>;
  activeIndex: number;
}> = ({ videos, activeIndex }) => {
  return (
    <>
      {videos.map((video, index) => (
        <VideoBackground
          key={video.key}
          imageSrc={video.src}
          isActive={index === activeIndex}
          flavorKey={video.key}
        />
      ))}
    </>
  );
};