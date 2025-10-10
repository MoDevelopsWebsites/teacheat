"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinimalAuthFooterProps {
  className?: string;
}

const MinimalAuthFooter: React.FC<MinimalAuthFooterProps> = ({ className }) => {
  return (
    <footer className={cn("w-full py-6 sm:py-8 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8", className)}>
      <div className="flex items-center space-x-1.5 sm:space-x-2">
        <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span>English</span>
      </div>
      <div className="flex space-x-3 sm:space-x-4">
        <Link to="/terms-of-service" className="hover:underline">Terms</Link>
        <Link to="/privacy-policy" className="hover:underline">Privacy</Link>
      </div>
    </footer>
  );
};

export default MinimalAuthFooter;