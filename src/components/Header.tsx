"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  className?: string;
  variant?: 'default' | 'landing'; // Add variant prop
}

const Header: React.FC<HeaderProps> = ({ className, variant = 'default' }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/login');
  };

  const isLandingVariant = variant === 'landing';

  const headerClasses = cn(
    "w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10",
    {
      "bg-white shadow-sm": isLandingVariant, // White background for landing variant
      "bg-transparent": !isLandingVariant, // Transparent background for default
    },
    className
  );

  const logoClasses = cn(
    "font-bold text-xl transition-colors",
    {
      "text-gray-800 hover:text-gray-900": isLandingVariant, // Dark text for landing variant
      "text-landing-logo-text hover:text-landing-logo-text/80": !isLandingVariant, // Original text color
    }
  );

  const navLinkClasses = cn(
    "text-sm font-medium transition-colors",
    {
      "text-gray-700 hover:text-gray-900": isLandingVariant, // Dark text for landing variant
      "text-landing-text-primary/80 hover:text-landing-text-primary": !isLandingVariant, // Original text color
    }
  );

  const loginButtonClasses = cn(
    "px-4 py-2 text-sm font-semibold",
    {
      "text-gray-800 hover:bg-gray-100": isLandingVariant, // Dark text for landing variant
      "text-landing-text-primary hover:bg-gray-100 dark:hover:bg-gray-800": !isLandingVariant, // Original text color
    }
  );

  return (
    <header className={headerClasses}>
      <div className="flex items-center space-x-12">
        <Link to="/" className={logoClasses}>
          Teacheat
        </Link>
        <nav className="flex items-center space-x-6">
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