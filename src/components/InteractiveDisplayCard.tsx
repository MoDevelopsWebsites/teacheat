"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InteractiveDisplayCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  iconClassName?: string;
  titleClassName?: string;
  expandedContent: string;
  isHovered: boolean;
  onHoverChange: (id: string | null) => void;
}

const InteractiveDisplayCard: React.FC<InteractiveDisplayCardProps> = ({
  id,
  icon,
  title,
  description,
  date,
  iconClassName,
  titleClassName,
  expandedContent,
  isHovered,
  onHoverChange,
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-full cursor-pointer rounded-xl overflow-hidden",
        "transition-all duration-300 ease-in-out",
        isHovered ? "z-20" : "z-10" // Bring hovered card to front
      )}
      onMouseEnter={() => onHoverChange(id)}
      onMouseLeave={() => onHoverChange(null)}
    >
      {/* Original Card Content - slides out to the left */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        initial={{ x: 0 }}
        animate={{ x: isHovered ? "-100%" : 0 }} // Slides out to the left
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
          <div className={cn("rounded-full p-2", iconClassName)}>
            {icon}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
        </CardHeader>
        <CardContent className="p-0 mt-auto">
          <CardTitle className={cn("text-lg font-semibold", titleClassName)}>{title}</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </CardContent>
      </motion.div>

      {/* Expanded Content - slides in from the right */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center p-4 rounded-xl shadow-lg border border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
        initial={{ x: "100%" }} // Starts off-screen to the right
        animate={{ x: isHovered ? 0 : "100%" }} // Slides in to 0, or slides out to 100%
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <CardTitle className="text-lg font-semibold mb-2">{title}</CardTitle>
        <p className="text-sm">{expandedContent}</p>
      </motion.div>
    </div>
  );
};

export default InteractiveDisplayCard;