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

  const handleSignUpClick = () => {
    navigate('/login');
  };

  return (
    <header className={cn("w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10", className)}>
      <div className="flex items-center space-x-12"> {/* Increased space-x from 8 to 12 */}
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
      <Button
        className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-lg px-4 py-2 text-sm font-semibold shadow-md"
        onClick={handleSignUpClick}
      >
        Sign up
      </Button>
    </header>
  );
};

export default Header;