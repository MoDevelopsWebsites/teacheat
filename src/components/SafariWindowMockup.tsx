"use client";

import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SafariWindowMockupProps {
  className?: string;
}

const SafariWindowMockup: React.FC<SafariWindowMockupProps> = ({ className }) => {
  return (
    <div className={cn(
      "relative w-full max-w-3xl h-64 rounded-xl shadow-2xl overflow-hidden",
      "bg-white/20 backdrop-blur-xl border border-white/30", // Frosted glass effect
      className
    )}>
      {/* Top bar */}
      <div className="flex items-center p-2 border-b border-white/30 bg-white/10">
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-grow text-center text-xs font-medium text-gray-800 dark:text-gray-200">
          Safari
        </div>
        <div className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 text-xs">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>History</span>
          <span>Bookmarks</span>
          <span>Window</span>
          <span>Help</span>
        </div>
      </div>

      {/* Content area with search bar */}
      <div className="flex items-center justify-center h-full p-4">
        <div className="relative w-full max-w-xl">
          <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
          <Input
            placeholder="Stop 'looping in your tech guy' for every question."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/50 border border-white/50 text-gray-800 placeholder:text-gray-600 dark:text-gray-200 dark:placeholder:text-gray-400 text-base shadow-lg"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default SafariWindowMockup;