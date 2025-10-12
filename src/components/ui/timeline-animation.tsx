"use client";

import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface TimelineContentProps extends MotionProps {
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement>;
  customVariants: any; // Using 'any' for simplicity, can be refined if needed
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  animationNum,
  timelineRef,
  customVariants,
  as: Component = motion.div,
  className,
  children,
  ...props
}) => {
  return (
    <Component
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ root: timelineRef, once: true, amount: 0.5 }}
      variants={customVariants}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};