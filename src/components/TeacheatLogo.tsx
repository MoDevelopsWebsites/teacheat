"use client";

import React from 'react';

interface TeacheatLogoProps {
  className?: string;
}

const TeacheatLogo: React.FC<TeacheatLogoProps> = ({ className }) => {
  return (
    <img
      src="/bachelor-hat-icon.png"
      alt="Teacheat Logo"
      className={className}
    />
  );
};

export default TeacheatLogo;