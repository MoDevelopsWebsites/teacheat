"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Apple } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductIllustration from './ProductIllustration';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleWaitlistClick = () => {
    navigate('/waitlist');
  };

  const handleLearnMoreClick = () => {
    // Scroll to the next section or navigate to a features section
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#features-section'); // Fallback for navigation
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Background image for the right side, similar to the screenshot */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-center bg-no-repeat z-0 hidden lg:block"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/apple-m1-chipset-imac-2021-default-stock-wallpaper-macos-grey-light-mode-30-10-2024-1730341405-hd-wallpaper.jpg)`,
          maskImage: 'linear-gradient(to left, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, black 70%, transparent 100%)',
          opacity: 0.7,
        }}
      ></div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-7xl mx-auto flex-grow">
        {/* Left Column: Hero Text, and CTAs */}
        <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-8 lg:p-12 xl:p-16 pt-24 md:pt-32 lg:pt-40"> {/* Adjusted top padding */}
          {/* Hero Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-grow justify-center pb-12 lg:pb-0">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium mb-6 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-blue-500" /> Powered by Teacheat AI Assistant
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-4 text-black dark:text-white max-w-4xl">
              The All In One Platform For Smarter <span className="text-gray-500 dark:text-gray-400">Decisions.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
              Track earnings, manage expenses, and visualize performance – all without the rhe noise.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-sm sm:max-w-none">
              <Button
                className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg px-8 py-3 text-base font-semibold shadow-md"
                onClick={handleWaitlistClick}
              >
                <Apple className="h-5 w-5 mr-2" /> Join waitlist
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 rounded-lg px-8 py-3 text-base font-semibold shadow-sm"
                onClick={handleLearnMoreClick}
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Product Illustration */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-12 xl:p-16">
          <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
            <ProductIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;