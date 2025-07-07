"use client";
import React from "react";
import { motion } from "framer-motion";

type SpotlightProps = {
  flavorColorHex?: string;
  flavorKey?: string;
  intensity?: number;
  pulseIntensity?: number;
  beamCount?: number;
  animationSpeed?: number;
  luxuryMode?: boolean;
};

export const Spotlight = ({
  flavorColorHex = "#FFD700",
  flavorKey = "default",
  intensity = 0.4,
  pulseIntensity = 0.6,
  beamCount = 3,
  animationSpeed = 8,
  luxuryMode = true,
}: SpotlightProps) => {
  // Create multiple beam configurations for luxury effect
  const beams = Array.from({ length: beamCount }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    scale: 1 - (i * 0.2),
    opacity: 1 - (i * 0.3),
  }));

  return (
    <motion.div
      key={flavorKey} // Force re-render on flavor change
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="pointer-events-none absolute inset-0 h-full w-full z-10 overflow-hidden"
    >
      {/* Ambient Glow Layer */}
      <motion.div
        animate={{
          opacity: [intensity * 0.3, intensity * 0.5, intensity * 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${flavorColorHex}20 0%, transparent 60%)`,
        }}
      />

      {/* Primary Spotlight Beams */}
      {beams.map((beam) => (
        <React.Fragment key={beam.id}>
          {/* Left Spotlight */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: [-50, 100, -50],
              opacity: [0, beam.opacity * intensity, 0],
            }}
            transition={{
              x: {
                duration: animationSpeed,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: beam.delay,
              },
              opacity: {
                duration: animationSpeed,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: beam.delay,
              },
            }}
            className="absolute top-0 left-0 w-[200%] h-[150%]"
            style={{
              transform: "rotate(-35deg) translateY(-30%)",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: `conic-gradient(from 90deg at 50% 0%, transparent 0deg, ${flavorColorHex}${Math.floor(intensity * 255).toString(16).padStart(2, '0')} 15deg, ${flavorColorHex}${Math.floor(intensity * 0.5 * 255).toString(16).padStart(2, '0')} 25deg, transparent 40deg, transparent 360deg)`,
                filter: luxuryMode ? `blur(${20 - beam.id * 5}px)` : "none",
                transform: `scale(${beam.scale})`,
              }}
            />
          </motion.div>

          {/* Right Spotlight */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{
              x: [50, -100, 50],
              opacity: [0, beam.opacity * intensity, 0],
            }}
            transition={{
              x: {
                duration: animationSpeed,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: beam.delay + 2,
              },
              opacity: {
                duration: animationSpeed,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: beam.delay + 2,
              },
            }}
            className="absolute top-0 right-0 w-[200%] h-[150%]"
            style={{
              transform: "rotate(35deg) translateY(-30%) translateX(-50%)",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: `conic-gradient(from -90deg at 50% 0%, transparent 0deg, ${flavorColorHex}${Math.floor(intensity * 255).toString(16).padStart(2, '0')} 15deg, ${flavorColorHex}${Math.floor(intensity * 0.5 * 255).toString(16).padStart(2, '0')} 25deg, transparent 40deg, transparent 360deg)`,
                filter: luxuryMode ? `blur(${20 - beam.id * 5}px)` : "none",
                transform: `scale(${beam.scale})`,
              }}
            />
          </motion.div>
        </React.Fragment>
      ))}

      {/* Center Stage Light */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [intensity * 0.2, intensity * 0.4, intensity * 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]"
      >
        <div
          className="w-full h-full"
          style={{
            background: `radial-gradient(ellipse at center, ${flavorColorHex}30 0%, ${flavorColorHex}15 20%, transparent 50%)`,
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Luxury Particle Effects */}
      {luxuryMode && (
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={`particle-${i}`}
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                opacity: 0,
              }}
              animate={{
                y: -100,
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
              className="absolute w-1 h-1"
              style={{
                left: `${Math.random() * 100}%`,
                background: flavorColorHex,
                boxShadow: `0 0 ${10 + Math.random() * 20}px ${flavorColorHex}`,
                filter: "blur(1px)",
              }}
            />
          ))}
        </div>
      )}

      {/* Pulse Rings */}
      <motion.div
        animate={{
          scale: [0.8, 2, 0.8],
          opacity: [0, pulseIntensity, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full"
        style={{
          border: `1px solid ${flavorColorHex}40`,
          filter: "blur(2px)",
        }}
      />

      <motion.div
        animate={{
          scale: [0.8, 2.5, 0.8],
          opacity: [0, pulseIntensity * 0.5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] rounded-full"
        style={{
          border: `1px solid ${flavorColorHex}20`,
          filter: "blur(3px)",
        }}
      />

      {/* Color Transition Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 mix-blend-screen"
        style={{
          background: `linear-gradient(135deg, transparent 0%, ${flavorColorHex}10 50%, transparent 100%)`,
        }}
      />
    </motion.div>
  );
};