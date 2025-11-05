"use client";

import React from 'react';

const WaitlistIllustration: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
      <svg
        width="80%"
        height="80%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-300 dark:text-gray-700"
      >
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" />
        <path d="M50 100C50 72.3858 72.3858 50 100 50C127.614 50 150 72.3858 150 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M100 50L100 150" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M50 100L150 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="100" cy="100" r="10" fill="currentColor" />
      </svg>
    </div>
  );
};

export default WaitlistIllustration;