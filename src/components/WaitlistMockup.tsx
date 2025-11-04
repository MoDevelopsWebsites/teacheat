"use client";

import React from 'react'; // Removed useState, useEffect as they are no longer needed for animation
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const WaitlistMockup: React.FC = () => {
  // Removed isVisible state and useEffect for animation

  return (
    <Card className={cn(
      "relative w-full max-w-5xl h-[500px] bg-white dark:bg-white rounded-xl flex flex-col overflow-hidden",
      "border-0 ring-0" // Explicitly remove border and ring
      // Directly applying visible styles, removed conditional classes
    )}>
      <div className="relative w-full h-full">
        <img
          src={import.meta.env.BASE_URL + "mockup.png"}
          alt="Waitlist Mockup"
          className="absolute inset-0 w-full h-full object-cover object-top scale-105"
          style={{
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            filter: 'blur(2px)', // Apply a slight blur
          }}
        />
      </div>
    </Card>
  );
};

export default WaitlistMockup;