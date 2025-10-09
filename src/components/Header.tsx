"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // Import Button
import { Apple } from 'lucide-react'; // Import Apple icon

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleGetForMacClick = () => {
    navigate('/login'); // Assuming 'Get for Mac' leads to login/signup
  };

  return (
    <header className={cn("w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10", className)}>
      <div className="flex items-center space-x-2">
        <Link to="/" className="font-bold text-xl text-landing-logo-text hover:text-landing-logo-text/80 transition-colors">
          Teacheat
        </Link>
      </div>
      <nav className="flex items-center space-x-6 text-sm font-medium text-landing-text-primary/80">
        <Link to="/pricing" className="hover:text-landing-text-primary">Pricing</Link>
        <Link to="/enterprise" className="hover:text-landing-text-primary">Enterprise</Link> {/* Added Enterprise link */}
        <Link to="#" className="hover:text-landing-text-primary">Careers</Link>
        <Link to="#" className="hover:text-landing-text-primary">Blog</Link>
        <Button
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-lg px-4 py-2 text-sm font-semibold shadow-md ml-4" // Adjusted styling
          onClick={handleGetForMacClick}
        >
          <Apple className="h-4 w-4 mr-2" /> Get for Mac
        </Button>
      </nav>
    </header>
  );
};

export default Header;