"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AuthLogoProps {
  className?: string;
}

const AuthLogo: React.FC<AuthLogoProps> = ({ className }) => {
  return (
    <Link to="/" className={cn("relative flex items-center font-bold text-xl text-gray-900 dark:text-white transition-colors", className)}>
      <img
        src={import.meta.env.BASE_URL + "bachelor-hat-icon.png"}
        alt="Teacheat Logo"
        className="absolute -top-6 right-0 h-10 w-10 transform rotate-12 dark:filter dark:invert"
      />
      <span className="mr-2">Teacheat</span>
    </Link>
  );
};

export default AuthLogo;