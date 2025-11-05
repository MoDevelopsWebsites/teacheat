"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const ScreenshotIllustration: React.FC = () => {
  const ScreenMockup: React.FC<{ className?: string; content?: React.ReactNode }> = ({ className, content }) => (
    <div className={cn(
      "absolute bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md overflow-hidden",
      className
    )}>
      <div className="flex items-center p-1 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-grow text-center text-[0.5rem] text-gray-600 dark:text-gray-400">
          teacheat.com
        </div>
        <div className="w-4 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
      </div>
      <div className="p-2 text-xs text-gray-500 dark:text-gray-400">
        {content || (
          <div className="space-y-1">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-2 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-2 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        )}
      </div>
    </div>
  );

  const GridBackground: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn(
      "absolute inset-0 pointer-events-none",
      "bg-[linear-gradient(to_right,#e0e0e0_1px,transparent_1px),linear-gradient(to_bottom,#e0e0e0_1px,transparent_1px)]",
      "dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)]",
      "bg-[size:20px_20px]",
      className
    )}></div>
  );

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden flex items-center justify-center">
      <GridBackground className="absolute inset-0 transform scale-150 rotate-[-15deg] opacity-30" />

      {/* Main illustration container */}
      <div className="absolute w-full h-full flex items-center justify-center">
        {/* Isometric screens */}
        <ScreenMockup
          className="w-48 h-32 md:w-64 md:h-40 lg:w-80 lg:h-52 transform rotate-[-15deg] skew-y-[-15deg] translate-x-[-100px] translate-y-[50px] md:translate-x-[-150px] md:translate-y-[70px] lg:translate-x-[-200px] lg:translate-y-[90px] opacity-80"
          content={<p className="text-gray-700 dark:text-gray-300 text-xs">Say goodbye to cluttered notes</p>}
        />
        <ScreenMockup
          className="w-48 h-32 md:w-64 md:h-40 lg:w-80 lg:h-52 transform rotate-[-15deg] skew-y-[-15deg] translate-x-[100px] translate-y-[-50px] md:translate-x-[150px] md:translate-y-[-70px] lg:translate-x-[200px] lg:translate-y-[-90px] opacity-80"
          content={<p className="text-gray-700 dark:text-gray-300 text-xs">Say goodbye to cluttered notes</p>}
        />
        <ScreenMockup
          className="w-56 h-36 md:w-72 md:h-48 lg:w-96 lg:h-64 transform rotate-[-15deg] skew-y-[-15deg] translate-x-0 translate-y-0 z-10"
          content={<p className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Teacheat AI Assistant</p>}
        />

        {/* Central "brain" icon */}
        <div className="absolute z-20 w-16 h-16 md:w-20 md:h-20 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center transform rotate-[-15deg] skew-y-[-15deg] shadow-lg">
          <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-white dark:text-gray-900 transform rotate-[15deg] skew-y-[15deg]" />
        </div>

        {/* Connecting lines (simplified) */}
        <div className="absolute w-24 h-0.5 bg-gray-400 dark:bg-gray-600 transform rotate-[-15deg] translate-x-[-60px] translate-y-[20px] md:translate-x-[-80px] md:translate-y-[30px]"></div>
        <div className="absolute w-24 h-0.5 bg-gray-400 dark:bg-gray-600 transform rotate-[-15deg] translate-x-[60px] translate-y-[-20px] md:translate-x-[80px] md:translate-y-[-30px]"></div>
      </div>
    </div>
  );
};

export default ScreenshotIllustration;