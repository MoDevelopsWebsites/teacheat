"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const WaitlistMockup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Delay for mockup animation after header

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className={cn(
      "relative w-full max-w-5xl h-[500px] bg-white dark:bg-white rounded-xl flex flex-col overflow-hidden",
      "transition-all duration-800 ease-out",
      isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10"
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