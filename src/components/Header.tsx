"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  className?: string;
  isLandingPageHeader?: boolean; // New prop
}

const Header: React.FC<HeaderProps> = ({ className, isLandingPageHeader }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/login');
  };

  const textColorClass = isLandingPageHeader ? "text-white" : "text-landing-text-primary";
  const navLinkColorClass = isLandingPageHeader ? "text-white/80 hover:text-white" : "text-landing-text-primary/80 hover:text-landing-text-primary";
  const loginButtonClass = isLandingPageHeader ? "text-white hover:bg-white/10" : "text-landing-text-primary hover:bg-gray-100 dark:hover:bg-gray-800";

  return (
    <header className={cn("w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10", className)}>
      <div className="flex items-center space-x-12">
        <Link to="/" className={cn("font-bold text-xl transition-colors", textColorClass)}>
          Teacheat
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/pricing" className={navLinkColorClass}>Pricing</Link>
          <Link to="/enterprise" className={navLinkColorClass}>Enterprise</Link>
          <Link to="#" className={navLinkColorClass}>Careers</Link>
          <Link to="#" className={navLinkColorClass}>Blog</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          className={cn("px-4 py-2 text-sm font-semibold", loginButtonClass)}
          onClick={handleLoginClick}
        >
          Login
        </Button>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-semibold shadow-md"
          onClick={handleSignUpClick}
        >
          Sign up
        </Button>
      </div>
    </header>
  );
};

export default Header;