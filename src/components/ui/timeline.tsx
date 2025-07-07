"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import { cn } from "../../lib/utils"; // Correct relative path

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      // Calculate height based on the content container inside ref
      const contentContainer = ref.current.querySelector(':scope > div'); // Select direct child div
      if (contentContainer) {
          const rect = contentContainer.getBoundingClientRect();
          // We might need a more robust way if content height changes dynamically
          // For now, using scrollHeight might be better if available and accurate
          setHeight(contentContainer.scrollHeight || rect.height);
      } else {
          const rect = ref.current.getBoundingClientRect();
          setHeight(rect.height); // Fallback
      }
    }
  }, [ref, data]); // Recalculate if data changes

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    // Removed default bg-white/dark:bg-neutral-950 to inherit page background
    <div
      className="w-full font-sans md:px-10"
      ref={containerRef}
    >
      {/* Removed Title/Description section, assuming page provides context */}
      {/* <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10"> ... </div> */}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {/* Map over data */}
        {data.map((item, index) => (
          <div
            key={index}
            // Removed pt-10 md:pt-40, spacing handled by grid/gap or parent
            className="flex justify-start md:gap-10"
          >
            {/* Sticky Title Column */}
            <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start w-full md:w-auto max-w-xs lg:max-w-sm"> {/* Adjusted z-index */}
              {/* Dot Indicator */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-brand-background flex items-center justify-center"> {/* Use brand bg */}
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              {/* Title (Desktop) */}
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl lg:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            {/* Content Column */}
            <div className="relative pl-20 pr-4 md:pl-0 pt-8 md:pt-0 w-full pb-10 md:pb-40"> {/* Added padding bottom */}
              {/* Title (Mobile) */}
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {/* Render content which might include images */}
              <div className="prose prose-invert prose-lg max-w-none text-brand-text/80">
                 {item.content}
              </div>
            </div>
          </div>
        ))}
        {/* Animated Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            // Use brand gold for the animated line
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-brand-gold via-brand-gold/80 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
