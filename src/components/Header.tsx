"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10", className)}>
      <div className="flex items-center space-x-2">
        <Link to="/" className="font-bold text-xl text-landing-logo-text hover:text-landing-logo-text/80 transition-colors">
          Teacheat
        </Link>
      </div>
      <nav className="flex space-x-6 text-sm font-medium text-landing-text-primary/80">
        <Link to="/pricing" className="hover:text-landing-text-primary">Pricing</Link>
        <Link to="#" className="hover:text-landing-text-primary">Enterprise</Link>
        <Link to="#" className="hover:text-landing-text-primary">Careers</Link>
        <Link to="#" className="hover:text-landing-text-primary">Blog</Link>
      </nav>
    </header>
  );
};

export default Header;