"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react'; // Import a spinner icon

interface WaitlistHeaderProps {
  onJoinWaitlist: () => void;
  isLoading: boolean; // This prop is for the actual waitlist submission, not the initial animation
}

const WaitlistHeader: React.FC<WaitlistHeaderProps> = ({ onJoinWaitlist, isLoading }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isButtonAnimationActive, setIsButtonAnimationActive] = useState(true); // New state for button animation

  useEffect(() => {
    // Header wide-opener animation
    const headerTimer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 300); // Header starts opening after 300ms

    // Button loading animation
    const buttonLoadingTimer = setTimeout(() => {
      setIsButtonAnimationActive(false); // End button loading animation after 2.5 seconds
    }, 2500); // 2.5 seconds for the loading animation

    return () => {
      clearTimeout(headerTimer);
      clearTimeout(buttonLoadingTimer);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-8">
      <div className={cn(
        "flex items-center justify-between px-6 py-3 rounded-full",
        "bg-white/80 backdrop-blur-md border border-gray-200 dark:border-gray-700",
        "w-full max-w-md sm:max-w-lg md:max-w-xl",
        "transition-all duration-700 ease-out",
        isHeaderVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
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
          className={cn(
            "border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-full px-4 py-2 h-auto text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800",
            "transition-all duration-500 ease-out", // Add transition for button
            isButtonAnimationActive ? "w-10 h-10 p-0 flex items-center justify-center" : "w-auto px-4" // Collapse to spinner, then expand
          )}
          onClick={onJoinWaitlist}
          disabled={isLoading || isButtonAnimationActive} // Disable during animation or initial animation
        >
          {isButtonAnimationActive ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Join waitlist"
          )}
        </Button>
      </div>
    </header>
  );
};

export default WaitlistHeader;