"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSession } from '@/integrations/supabase/SessionContextProvider';

interface LandingPageHeaderProps {
  className?: string;
}

const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({ className }) => {
  const navigate = useNavigate();
  const { session } = useSession();

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleDashboardClick = () => {
    if (session) {
      navigate('/chat'); // Redirect to chat if authenticated
    } else {
      navigate('/login'); // Redirect to login if not authenticated
    }
  };

  return (
    <header className={cn("w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-50", className)}>
      <Link to="/" className="relative flex items-center font-bold text-xl text-gray-900 dark:text-white transition-colors">
        <img
          src={import.meta.env.BASE_URL + "bachelor-hat-icon.png"}
          alt="Teacheat Logo"
          className="absolute -top-6 right-0 h-10 w-10 transform rotate-12 dark:filter dark:invert"
        />
        <span className="mr-2">Teacheat</span>
      </Link>

      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700 dark:text-gray-300">
        <Link to="/pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</Link>
        <Link to="/enterprise" className="hover:text-gray-900 dark:hover:text-white transition-colors">Enterprise</Link>
        <Link to="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Blog</Link>
      </nav>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-4 py-2 h-auto text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={handleSignInClick}
        >
          Sign in
        </Button>
        <Button
          className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 rounded-md px-4 py-2 h-auto text-sm font-medium"
          onClick={handleDashboardClick}
        >
          Dashboard
        </Button>
      </div>
    </header>
  );
};

export default LandingPageHeader;