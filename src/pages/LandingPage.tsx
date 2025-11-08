"use client";

import React from 'react';
import Footer from '@/components/Footer';
// import { InfiniteMovingLogos } from '@/components/InfiniteMovingLogos'; // No longer needed here
import UseCasesSection from '@/components/UseCasesSection';
import { TestimonialsSectionDemo } from '@/components/blocks/TestimonialsSectionDemo';
import FAQSection from '@/components/FAQSection';
import FeaturesGridSection from '@/components/FeaturesGridSection';
import HeroSection from '@/components/HeroSection';
import Header from '@/components/Header';

// const defaultLogos = [...] // No longer needed here

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans relative">
      <Header className="absolute top-0 left-0 right-0 z-20" isLandingPageHeader={true} />

      <HeroSection />

      <main className="flex-grow flex flex-col items-center relative z-10">
        {/* Features Grid Section */}
        <FeaturesGridSection />

        {/* Trusted By Section - InfiniteMovingLogos removed from here */}
        <section className="w-full py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
              {/* The logos are now in the HeroSection */}
            </p>
            {/* <InfiniteMovingLogos items={defaultLogos} speed="normal" className="justify-center" /> */}
          </div>
        </section>

        {/* Use Cases Section */}
        <UseCasesSection />

        {/* Testimonials Section */}
        <TestimonialsSectionDemo />

        {/* FAQ Section */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;