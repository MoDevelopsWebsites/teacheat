"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingSection6 from '@/components/ui/pricing-section-4'; // Import the new pricing section component

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white"> {/* Set overall background to black for the new design */}
      <Header className="absolute top-0 left-0 right-0" />
      <main className="flex-grow flex flex-col items-center justify-center">
        <PricingSection6 />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;