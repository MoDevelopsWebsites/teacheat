"use client";

import React from 'react';

const GlitterEffect = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-lg animate-glitter-pan"
      style={{
        background: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1%, transparent 10%),
                     radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1%, transparent 10%),
                     radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 1%, transparent 10%)`,
        backgroundSize: '200% 200%', // Make the gradient larger than the container
        zIndex: -1, // Ensure it's behind other content
      }}
    ></div>
  );
};

export default GlitterEffect;