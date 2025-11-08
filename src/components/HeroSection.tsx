"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sparkles, Apple, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductIllustration from './ProductIllustration';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { InfiniteMovingLogos } from '@/components/InfiniteMovingLogos';

const defaultLogos = [
  { src: import.meta.env.BASE_URL + "teams.png", alt: "Microsoft Teams Logo", label: "Microsoft Teams" },
  { src: import.meta.env.BASE_URL + "webex.png", alt: "Webex Logo", label: "Webex" },
  { src: import.meta.env.BASE_URL + "slack.png", alt: "Slack Logo", label: "Slack" },
  { src: import.meta.env.BASE_URL + "zoomm.png", alt: "Zoom Logo", label: "Zoom" },
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinWaitlist = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('waitlist_entries')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique violation code
          showError("This email is already on the waitlist!");
        } else {
          throw error;
        }
      } else {
        showSuccess("You've been added to the waitlist!");
        setEmail(''); // Clear email input on success
      }
    } catch (err: any) {
      console.error("Error joining waitlist:", err.message);
      showError(`Failed to join waitlist: ${err.message || "An unexpected error occurred."}`);
    } finally {
      setIsLoading(false);
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
        <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-8 lg:p-12 xl:p-16 pt-24 md:pt-32 lg:pt-40">
          {/* Hero Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-grow justify-center pb-12 lg:pb-0">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium mb-6 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-blue-500" /> Powered by Teacheat AI Assistant
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-4 text-black dark:text-white max-w-4xl">
              Unlock Your Potential with <span className="text-gray-500 dark:text-gray-400">Teacheat.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
              Teacheat is your AI-powered assistant for smarter learning and enhanced productivity. Get instant answers, personalized insights, and streamline your workflow.
            </p>

            {/* Waitlist Input and Button */}
            <div className="flex w-full max-w-md space-x-2 mb-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:border-gray-400 h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Button
                className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg px-6 h-12 text-base font-semibold shadow-md"
                onClick={handleJoinWaitlist}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Join waitlist"}
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-8 md:mb-16 text-center lg:text-left">
              *Join for free. No credit card required.
            </p>

            {/* Infinite Moving Logos */}
            <div className="w-full max-w-md lg:max-w-none mt-8">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 text-center lg:text-left">
                Trusted by people working at
              </p>
              <InfiniteMovingLogos items={defaultLogos} speed="normal" className="justify-center lg:justify-start" />
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