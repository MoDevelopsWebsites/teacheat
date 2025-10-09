"use client";

import React from 'react';
import { MousePointerClick } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingMouseCursorProps {
  x: number;
  y: number;
  isClicking: boolean;
}

const FloatingMouseCursor: React.FC<FloatingMouseCursorProps> = ({ x, y, isClicking }) => {
  return (
    <div
      className={cn(
        "absolute z-50 transition-all duration-700 ease-in-out pointer-events-none",
        isClicking && "scale-90 opacity-70" // Simple click animation
      )}
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)', // Center the cursor on the coordinates
      }}
    >
      <MousePointerClick className="h-8 w-8 text-blue-500 drop-shadow-lg" />
    </div>
  );
};

export default FloatingMouseCursor;