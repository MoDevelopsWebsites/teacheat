"use client";

import React from 'react';
import Footer from '@/components/Footer';
import { InfiniteMovingLogos } from '@/components/InfiniteMovingLogos';
import UseCasesSection from '@/components/UseCasesSection';
import { TestimonialsSectionDemo } from '@/components/blocks/TestimonialsSectionDemo';
import FAQSection from '@/components/FAQSection';
import FeaturesGridSection from '@/components/FeaturesGridSection';
import HeroSection from '@/components/HeroSection'; // Import the new HeroSection

const defaultLogos = [
  { src: import.meta.env.BASE_URL + "teams.png", alt: "Microsoft Teams Logo", label: "Microsoft Teams" },
  { src: import.meta.env.BASE_URL + "webex.png", alt: "Webex Logo", label: "Webex" },
  { src: import.meta.env.BASE_URL + "slack.png", alt: "Slack Logo", label: "Slack" },
  { src: import.meta.env.BASE_URL + "zoomm.png", alt: "Zoom Logo", label: "Zoom" },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans relative">
      {/* The HeroSection now includes its own navigation, replacing the global Header for this page */}
      <HeroSection />

      <main className="flex-grow flex flex-col items-center relative z-10">
        {/* Features Grid Section */}
        <FeaturesGridSection />

        {/* Trusted By Section */}
        <section className="w-full py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
              Trusted by people working at
            </p>
            <InfiniteMovingLogos items={defaultLogos} speed="normal" className="justify-center" />
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