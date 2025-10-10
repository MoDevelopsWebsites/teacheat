"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Apple, Command, CornerDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const CTABottomSection: React.FC = () => {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-br from-landing-cta-background-start to-landing-cta-background-end text-landing-cta-text-primary"> {/* Adjusted padding for mobile */}
      {/* Floating UI elements */}
      <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-landing-cta-floating-bg rounded-xl shadow-lg border border-landing-cta-floating-border flex items-center justify-center opacity-70 blur-sm z-0" style={{ transform: 'rotate(-15deg)' }}> {/* Adjusted size for mobile */}
        <Command className="h-12 w-12 sm:h-16 sm:w-16 text-landing-cta-floating-text/50" /> {/* Adjusted size for mobile */}
      </div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-landing-cta-floating-bg rounded-xl shadow-lg border border-landing-cta-floating-border flex items-center justify-center opacity-70 blur-sm z-0" style={{ transform: 'rotate(10deg)' }}> {/* Adjusted size for mobile */}
        <CornerDownLeft className="h-12 w-12 sm:h-16 sm:w-16 text-landing-cta-floating-text/50" /> {/* Adjusted size for mobile */}
      </div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 px-4 py-2 sm:px-6 sm:py-3 bg-gray-800 text-white text-xs sm:text-sm rounded-full shadow-md opacity-80 z-0"> {/* Adjusted padding/text size for mobile */}
        Record Entire Screen
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 sm:mb-6 text-landing-cta-text-primary"> {/* Adjusted text size and margin for mobile */}
          Meeting AI that helps during the call, not after.
        </h2>
        <p className="text-lg md:text-xl text-landing-cta-text-secondary mb-6 sm:mb-10"> {/* Adjusted text size and margin for mobile */}
          Try Teacheat on your next meeting today.
        </p>
        <Button className="bg-gradient-to-br from-landing-button-gradient-start to-landing-button-gradient-end text-white hover:from-landing-button-gradient-hover-start hover:to-landing-button-gradient-hover-end rounded-lg px-6 py-2.5 sm:px-8 sm:py-3 text-base font-semibold shadow-button-glow-hover"> {/* Adjusted padding for mobile */}
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default CTABottomSection;