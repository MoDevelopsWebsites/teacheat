"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface IsometricGridBackgroundProps {
  className?: string;
}

const IsometricGridBackground: React.FC<IsometricGridBackgroundProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 overflow-hidden",
        "bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900", // Base background gradient
        className
      )}
      style={{
        // Isometric grid lines
        backgroundImage: `
          linear-gradient(105deg, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%),
          linear-gradient(-105deg, transparent 74%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05) 76%, transparent 77%),
          linear-gradient(15deg, transparent 49%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0.03) 51%, transparent 52%),
          linear-gradient(-15deg, transparent 49%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0.03) 51%, transparent 52%)
        `,
        backgroundSize: '40px 40px', // Adjust grid cell size
        backgroundPosition: '0 0',
        opacity: 0.6, // Make it subtle
      }}
    >
      {/* Optional: Add subtle shaded squares for more depth, similar to the image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0,0,0,0.02) 1%, transparent 10%),
            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.02) 1%, transparent 10%)
          `,
          backgroundSize: '80px 80px', // Larger pattern for subtle shading
          opacity: 0.8,
        }}
      ></div>
    </div>
  );
};

export default IsometricGridBackground;