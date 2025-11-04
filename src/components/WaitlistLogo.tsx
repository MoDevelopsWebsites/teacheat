"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface WaitlistLogoProps {
  className?: string;
}

const WaitlistLogo: React.FC<WaitlistLogoProps> = ({ className }) => {
  return (
    <Link to="/" className={cn("flex items-center justify-center w-10 h-10 rounded-lg bg-black dark:bg-white", className)}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L16.949 7.051L24 12L16.949 16.949L12 24L7.051 16.949L0 12L7.051 7.051L12 0Z" fill="white"/>
      </svg>
    </Link>
  );
};

export default WaitlistLogo;