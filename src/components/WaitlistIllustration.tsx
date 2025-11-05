"use client";

import React from 'react';

const WaitlistIllustration: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] text-gray-400 animate-svg-float"
        style={{ animationDuration: '10s', animationIterationCount: 'infinite' }}
      >
        <circle
          cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2"
          style={{
            strokeDasharray: '566',
            strokeDashoffset: '566',
            animation: 'svg-draw 3s ease-out forwards',
            animationDelay: '0s'
          }}
        />
        <path
          d="M50 100C50 72.3858 72.3858 50 100 50C127.614 50 150 72.3858 150 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{
            strokeDasharray: '79',
            strokeDashoffset: '79',
            animation: 'svg-draw 2s ease-out forwards',
            animationDelay: '1s'
          }}
        />
        <path
          d="M100 50L100 150" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{
            strokeDasharray: '100',
            strokeDashoffset: '100',
            animation: 'svg-draw 1.5s ease-out forwards',
            animationDelay: '2s'
          }}
        />
        <path
          d="M50 100L150 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{
            strokeDasharray: '100',
            strokeDashoffset: '100',
            animation: 'svg-draw 1.5s ease-out forwards',
            animationDelay: '2.5s'
          }}
        />
        <circle
          cx="100" cy="100" r="10" fill="currentColor"
          style={{
            opacity: 0,
            animation: 'svg-fade-in 1s ease-out forwards',
            animationDelay: '3.5s'
          }}
        />
      </svg>
    </div>
  );
};

export default WaitlistIllustration;