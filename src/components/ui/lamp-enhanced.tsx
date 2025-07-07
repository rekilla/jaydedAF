"use client";
import { CSSProperties } from "react";
import { motion } from "framer-motion";
// Simple className merger function
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const LampEffect = ({
  flavorColorHex = "#00FFFF",
  className,
}: {
  flavorColorHex?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 right-0 flex items-center justify-center overflow-hidden w-full h-full pointer-events-none z-30",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left Conic Gradient with Dynamic Color */}
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            "--tw-gradient-from": flavorColorHex + "EE",
            "--tw-gradient-to": "transparent",
          } as CSSProperties}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-[var(--tw-gradient-from)] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            animate={{ opacity: 1, width: "30rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          />
          <div className="absolute w-[100%] left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </div>

        {/* Right Conic Gradient with Dynamic Color */}
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            "--tw-gradient-from": "transparent",
            "--tw-gradient-to": flavorColorHex + "EE",
          } as CSSProperties}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-[var(--tw-gradient-to)] text-white [--conic-position:from_290deg_at_center_top]"
        >
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            animate={{ opacity: 1, width: "30rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          />
          <div className="absolute w-40 h-[100%] right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </div>

        {/* Background blur effect */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black"></div>

        {/* Central glow with dynamic color */}
        <div
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50"
          style={{ backgroundColor: flavorColorHex }}
        ></div>

        {/* Inner glow with dynamic color */}
        <motion.div
          initial={{ width: "8rem" }}
          animate={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full"
          style={{ backgroundColor: flavorColorHex }}
        ></motion.div>

        {/* Light Bar with Faded Edges */}
        <motion.div
          initial={{ width: "15rem", opacity: 0.7 }}
          animate={{ width: "30rem", opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${flavorColorHex} 20%, ${flavorColorHex} 80%, transparent 100%)`,
            boxShadow: `0 0 20px ${flavorColorHex}50, 0 0 40px ${flavorColorHex}30`,
          }}
        ></motion.div>

        {/* Top mask */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-black"></div>
      </div>
    </div>
  );
};