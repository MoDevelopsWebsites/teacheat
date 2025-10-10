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

  // Base classes for navigation items to give them a button-like shape
  const navItemBaseClasses = "px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200";

  // Classes for navigation links (Pricing, Enterprise, Careers, Blog)
  const navLinkClasses = cn(
    navItemBaseClasses,
    isLandingPageHeader
      ? "text-white/80 hover:bg-white/20 hover:text-white hover:shadow-lg hover:shadow-white/70 hover:scale-105"
      : "text-landing-text-primary/80 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-landing-text-primary hover:shadow-lg hover:shadow-gray-300/70 dark:hover:shadow-gray-700/70 hover:scale-105"
  );

  // Classes for the Login button
  const loginButtonClasses = cn(
    navItemBaseClasses,
    isLandingPageHeader
      ? "text-white hover:bg-white/20 hover:shadow-lg hover:shadow-white/70 hover:scale-105"
      : "text-landing-text-primary hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-300/70 dark:hover:shadow-gray-700/70 hover:scale-105"
  );

  return (
    <header className={cn("w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10", className)}>
      <div className="flex items-center space-x-12">
        <Link to="/" className={cn("font-bold text-xl transition-colors", isLandingPageHeader ? "text-white" : "text-landing-text-primary")}>
          Teacheat
        </Link>
        <nav className="flex items-center space-x-2 text-sm font-medium"> {/* Adjusted space-x for button-like links */}
          <Link to="/pricing" className={navLinkClasses}>Pricing</Link>
          <Link to="/enterprise" className={navLinkClasses}>Enterprise</Link>
          <Link to="#" className={navLinkClasses}>Careers</Link>
          <Link to="#" className={navLinkClasses}>Blog</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          className={loginButtonClasses}
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