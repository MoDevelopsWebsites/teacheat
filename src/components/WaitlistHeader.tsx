"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface WaitlistHeaderProps {
  onJoinWaitlist: () => void;
  isLoading: boolean;
}

const WaitlistHeader: React.FC<WaitlistHeaderProps> = ({ onJoinWaitlist, isLoading }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after a short delay to simulate loading
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300); // Adjust delay as needed for the "loading" effect

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-8">
      <div className={cn(
        "flex items-center justify-between px-6 py-3 rounded-full", // Removed shadow-lg
        "bg-white/80 backdrop-blur-md border border-gray-200 dark:border-gray-700",
        "w-full max-w-md sm:max-w-lg md:max-w-xl",
        "transition-all duration-700 ease-out", // Smooth transition for animation
        isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0" // Animation states
      )}>
        <Link to="/" className="relative flex items-center font-bold text-xl text-gray-900 dark:text-white transition-colors">
          <img
            src={import.meta.env.BASE_URL + "bachelor-hat-icon.png"}
            alt="Teacheat Logo"
            className="absolute -top-6 right-0 h-10 w-10 transform rotate-12 dark:filter dark:invert"
          />
          <span className="mr-2">Teacheat</span>
        </Link>
        <Button
          variant="outline"
          className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-full px-4 py-2 h-auto text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={onJoinWaitlist}
          disabled={isLoading}
        >
          Join waitlist
        </Button>
      </div>
    </header>
  );
};

export default WaitlistHeader;