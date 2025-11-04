"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { X, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthLogo from '@/components/AuthLogo';
import { cn } from '@/lib/utils';

interface MinimalWaitlistFooterProps {
  onJoinWaitlist: () => void;
  isLoading: boolean;
}

const MinimalWaitlistFooter: React.FC<MinimalWaitlistFooterProps> = ({ onJoinWaitlist, isLoading }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="mb-8">
        <AuthLogo className="text-3xl" />
      </div>
      <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8">
        Teacheat is your AI assistant for meetings.
      </p>
      <Button
        variant="outline"
        className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-full px-6 py-2 h-auto text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 mb-8"
        onClick={onJoinWaitlist}
        disabled={isLoading}
      >
        {isLoading ? "Joining..." : "Join waitlist"}
      </Button>
      <div className="flex space-x-4 mb-12">
        <Link to="#" aria-label="X (Twitter)" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </Link>
        <Link to="#" aria-label="LinkedIn" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <Linkedin className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </Link>
      </div>
      <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 max-w-md">
        <p>&copy; {currentYear} Teacheat, Inc.</p>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default MinimalWaitlistFooter;