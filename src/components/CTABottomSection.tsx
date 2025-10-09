"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Apple, Command, CornerDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const CTABottomSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-landing-cta-background-start to-landing-cta-background-end text-landing-cta-text-primary overflow-hidden"> {/* Re-added overflow-hidden */}
      {/* Floating UI elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-landing-cta-floating-bg rounded-xl shadow-lg border border-landing-cta-floating-border flex items-center justify-center opacity-70 blur-sm z-0" style={{ transform: 'rotate(-15deg)' }}>
        <Command className="h-16 w-16 text-landing-cta-floating-text/50" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-landing-cta-floating-bg rounded-xl shadow-lg border border-landing-cta-floating-border flex items-center justify-center opacity-70 blur-sm z-0" style={{ transform: 'rotate(10deg)' }}>
        <CornerDownLeft className="h-16 w-16 text-landing-cta-floating-text/50" />
      </div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-800 text-white text-sm rounded-full shadow-md opacity-80 z-0">
        Record Entire Screen
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-landing-cta-text-primary">
          Meeting AI that helps during the call, not after.
        </h2>
        <p className="text-lg md:text-xl text-landing-cta-text-secondary mb-10">
          Try Teacheat on your next meeting today.
        </p>
        <Button className="bg-gradient-to-br from-landing-button-gradient-start to-landing-button-gradient-end text-white hover:from-landing-button-gradient-start/90 hover:to-landing-button-gradient-end/90 rounded-lg px-8 py-3 text-base font-semibold shadow-md">
          <Apple className="h-5 w-5 mr-2" /> Get for Mac
        </Button>
      </div>
    </section>
  );
};

export default CTABottomSection;