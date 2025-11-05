"use client";

import React, { useState } from 'react';
import MeetingWindowMockup from './MeetingWindowMockup';

const ProductIllustration: React.FC = () => {
  // Static AI response for the simplified illustration
  const currentAiResponse = "The client is interested in a solution that integrates with their existing CRM and provides real-time analytics.";

  return (
    <div className="relative w-full max-w-7xl h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center p-4">
      {/* Main Meeting Window Mockup (Central, with diagonal angle) */}
      <div className="absolute z-20 w-full max-w-[900px] transform -rotate-3 translate-x-0 translate-y-0">
        <MeetingWindowMockup
          currentAiResponse={currentAiResponse}
        />
      </div>
    </div>
  );
};

export default ProductIllustration;