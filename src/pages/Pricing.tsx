"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingSection6 from '@/components/ui/pricing-section-4';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header className="absolute top-0 left-0 right-0" />
      <main className="flex-1"> {/* Changed to flex-1 to allow PricingSection6 to fill available space without extra centering */}
        <PricingSection6 />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;