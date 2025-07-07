"use client";
import React from "react";
import { motion } from "framer-motion";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
  flavorColorHex?: string;
  fadeInOut?: boolean;
  intensity?: number;
};

export const Spotlight = ({
  gradientFirst,
  gradientSecond,
  gradientThird,
  translateY = -200,
  width = 400,
  height = 1200,
  smallWidth = 180,
  duration = 6,
  xOffset = 80,
  flavorColorHex = "#FFD700",
  fadeInOut = true,
  intensity = 0.15,
}: SpotlightProps = {}) => {
  // Dynamic gradients based on flavor color with adjustable intensity
  const defaultFirst = gradientFirst || `radial-gradient(68.54% 68.72% at 55.02% 31.46%, ${flavorColorHex}33 0%, ${flavorColorHex}11 50%, transparent 80%)`;
  const defaultSecond = gradientSecond || `radial-gradient(50% 50% at 50% 50%, ${flavorColorHex}22 0%, ${flavorColorHex}08 80%, transparent 100%)`;
  const defaultThird = gradientThird || `radial-gradient(50% 50% at 50% 50%, ${flavorColorHex}15 0%, ${flavorColorHex}05 80%, transparent 100%)`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeInOut ? [0, 1, 0.7, 1] : 1 }}
      transition={{
        duration: fadeInOut ? 4 : 1.5,
        repeat: fadeInOut ? Infinity : 0,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="pointer-events-none absolute inset-0 h-full w-full z-20"
    >
      {/* Left Spotlight */}
      <motion.div
        animate={{
          x: [0, xOffset, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: defaultFirst,
            width: `${width}px`,
            height: `${height}px`,
            maskImage: "linear-gradient(45deg, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(45deg, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)",
          }}
          className="absolute top-0 left-0"
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: defaultSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
            maskImage: "linear-gradient(45deg, transparent 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(45deg, transparent 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, transparent 100%)",
          }}
          className="absolute top-0 left-0 origin-top-left"
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: defaultThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
            maskImage: "linear-gradient(45deg, transparent 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(45deg, transparent 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, transparent 100%)",
          }}
          className="absolute top-0 left-0 origin-top-left"
        />
      </motion.div>

      {/* Right Spotlight */}
      <motion.div
        animate={{
          x: [0, -xOffset, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: defaultFirst,
            width: `${width}px`,
            height: `${height}px`,
            maskImage: "linear-gradient(-45deg, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(-45deg, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)",
          }}
          className="absolute top-0 right-0"
        />

        <div
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: defaultSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
            maskImage: "linear-gradient(-45deg, transparent 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(-45deg, transparent 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, transparent 100%)",
          }}
          className="absolute top-0 right-0 origin-top-right"
        />

        <div
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: defaultThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
            maskImage: "linear-gradient(-45deg, transparent 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(-45deg, transparent 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, transparent 100%)",
          }}
          className="absolute top-0 right-0 origin-top-right"
        />
      </motion.div>
    </motion.div>
  );
};
