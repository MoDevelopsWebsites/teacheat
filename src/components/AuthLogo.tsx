"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AuthLogoProps {
  className?: string;
}

const AuthLogo: React.FC<AuthLogoProps> = ({ className }) => {
  return (
    <Link to="/" className={cn("relative flex items-center font-bold text-lg sm:text-xl text-gray-900 dark:text-white transition-colors", className)}> {/* Adjusted text size for mobile */}
      <img
        src={import.meta.env.BASE_URL + "bachelor-hat-icon.png"}
        alt="Teacheat Logo"
        className="absolute -top-5 right-0 h-8 w-8 sm:-top-6 sm:h-10 sm:w-10 transform rotate-12 dark:filter dark:invert" {/* Adjusted size/position for mobile */}
      />
      <span className="mr-2">Teacheat</span>
    </Link>
  );
};

export default AuthLogo;