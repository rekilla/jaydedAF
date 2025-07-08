'use client';
import React, { ReactNode, useRef } from 'react';
import {
  motion,
  useInView,
  Variant,
  Transition,
  UseInViewOptions,
  HTMLMotionProps, // Import HTMLMotionProps for type safety with 'as'
} from 'framer-motion';

interface InViewProps {
  children: ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  className?: string;
  as?: React.ElementType; // Add 'as' prop type
}

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const defaultTransition = {
    duration: 0.5,
    ease: "easeInOut",
};

// Use a generic type for props to allow passing HTML attributes
type PolymorphicInViewProps = InViewProps & Omit<HTMLMotionProps<any>, keyof InViewProps>;

export function InView({
  children,
  variants = defaultVariants,
  transition = defaultTransition,
  viewOptions = { once: true, margin: "0px 0px -10% 0px" },
  className,
  as: Component = 'section', // Destructure 'as', default to 'section'
  ...rest // Capture remaining props
}: PolymorphicInViewProps) { // Use the polymorphic type
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  // Create the motion component dynamically based on the 'as' prop
  const MotionComponent = motion(Component);

  return (
    // Render the dynamic motion component
    <MotionComponent
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={className}
      {...rest} // Spread remaining props (like id, style, etc.)
    >
      {children}
    </MotionComponent>
  );
}
