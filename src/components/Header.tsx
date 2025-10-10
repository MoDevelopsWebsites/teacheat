"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/login');
  };

  return (
    <header className={cn("w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10", className)}>
      <div className="flex items-center space-x-12">
        <Link to="/" className="font-bold text-xl text-landing-logo-text hover:text-landing-logo-text/80 transition-colors">
          Teacheat
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium text-landing-text-primary/80">
          <Link to="/pricing" className="hover:text-landing-text-primary">Pricing</Link>
          <Link to="/enterprise" className="hover:text-landing-text-primary">Enterprise</Link>
          <Link to="#" className="hover:text-landing-text-primary">Careers</Link>
          <Link to="#" className="hover:text-landing-text-primary">Blog</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4"> {/* Container for Login and Sign up buttons */}
        <Button
          variant="ghost"
          className="text-landing-text-primary hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 text-sm font-semibold"
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