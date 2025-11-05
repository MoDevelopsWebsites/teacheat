"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Apple } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductIllustration from '@/components/ProductIllustration';
import { InfiniteMovingLogos } from '@/components/InfiniteMovingLogos';
import UseCasesSection from '@/components/UseCasesSection';
import { TestimonialsSectionDemo } from '@/components/blocks/TestimonialsSectionDemo';
import FAQSection from '@/components/FAQSection';
import FloatingGetStartedButton from '@/components/FloatingGetStartedButton';
import FeaturesGridSection from '@/components/FeaturesGridSection';
import { useNavigate } from 'react-router-dom';

const defaultLogos = [
  { src: import.meta.env.BASE_URL + "teams.png", alt: "Microsoft Teams Logo", label: "Microsoft Teams" },
  { src: import.meta.env.BASE_URL + "webex.png", alt: "Webex Logo", label: "Webex" },
  { src: import.meta.env.BASE_URL + "slack.png", alt: "Slack Logo", label: "Slack" },
  { src: import.meta.env.BASE_URL + "zoomm.png", alt: "Zoom Logo", label: "Zoom" },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans relative">
      <Header className="absolute top-0 left-0 right-0 z-20" isLandingPageHeader={true} />
      <FloatingGetStartedButton />

      {/* Background Image Container */}
      <div
        className="absolute top-0 left-0 w-full h-[150vh] z-0 bg-cover bg-center bg-no-repeat opacity-70 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/apple-m1-chipset-imac-2021-default-stock-wallpaper-macos-grey-light-mode-30-10-2024-1730341405-hd-wallpaper.jpg)`,
        }}
      >
        {/* Gradient overlay for fade-out effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-80% to-white dark:to-gray-900"></div>
      </div>

      <main className="flex-grow flex flex-col items-center relative z-10">
        {/* Hero Section */}
        <section className="relative w-full flex flex-col items-center justify-center text-center px-4 py-12 sm:py-16 mt-20 md:mt-24">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-4 text-black dark:text-white max-w-4xl">
            Your AI assistant for every meeting.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
            Takes perfect notes, answers questions in real-time, and makes you the most prepared person on every call.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              className="bg-gradient-to-br from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 rounded-lg px-8 py-3 text-lg font-semibold shadow-lg"
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-8 py-3 text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => navigate('/waitlist')}
            >
              <Apple className="h-5 w-5 mr-2" /> Join waitlist
            </Button>
          </div>
        </section>

        {/* Product Illustration Section */}
        <section className="w-full py-16 sm:py-24">
          <ProductIllustration />
        </section>

        {/* Features Grid Section (New) */}
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

        {/* CTA Bottom Section - REMOVED */}
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;