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
    <footer className={cn("w-full py-8 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8", className)}>
      <div className="flex items-center space-x-2">
        <Globe className="h-4 w-4" />
        <span>English</span>
      </div>
      <div className="flex space-x-4">
        <Link to="/terms-of-service" className="hover:underline">Terms</Link>
        <Link to="/privacy-policy" className="hover:underline">Privacy</Link>
      </div>
    </footer>
  );
};

export default MinimalAuthFooter;