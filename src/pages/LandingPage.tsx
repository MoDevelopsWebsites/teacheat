"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Header from '@/components/Header'; // Using the standard Header component
import ProductIllustration from '@/components/ProductIllustration'; // New product illustration component
import { InfiniteMovingLogos } from '@/components/InfiniteMovingLogos'; // Reusing existing logo carousel
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { Loader2 } from 'lucide-react'; // For loading spinner
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // Import Avatar components

const defaultLogos = [
  { src: import.meta.env.BASE_URL + "teams.png", alt: "Microsoft Teams Logo", label: "Microsoft Teams" },
  { src: import.meta.env.BASE_URL + "webex.png", alt: "Webex Logo", label: "Webex" },
  { src: import.meta.env.BASE_URL + "slack.png", alt: "Slack Logo", label: "Slack" },
  { src: import.meta.env.BASE_URL + "zoomm.png", alt: "Zoom Logo", label: "Zoom" },
];

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Removed waitlistCount state and useEffect for fetching count

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
        setEmail('');
      }
    } catch (err: any) {
      console.error("Error joining waitlist:", err.message);
      showError(`Failed to join waitlist: ${err.message || "An unexpected error occurred."}`);
    } finally {
      setIsLoading(false);
    }
  };

  const profileAvatars = [
    { src: "/placeholder.svg", fallback: "JD" },
    { src: "/placeholder.svg", fallback: "AS" },
    { src: "/placeholder.svg", fallback: "EM" },
    { src: "/placeholder.svg", fallback: "SK" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header className="absolute top-0 left-0 right-0" isLandingPageHeader={true} />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:py-16 text-center mt-20 md:mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          {/* Left Column: Text Content and Logos */}
          <div className="md:w-1/2 text-left flex flex-col items-center md:items-start px-4 md:px-0">
            <div className="relative flex items-center justify-center md:justify-start mb-4 text-sm text-gray-600 dark:text-gray-400">
              {profileAvatars.map((avatar, index) => (
                <Avatar
                  key={index}
                  className={cn(
                    "h-6 w-6 border-2 border-white dark:border-gray-900 absolute",
                    index === 0 && "-left-8 z-40",
                    index === 1 && "-left-12 z-30",
                    index === 2 && "-left-16 z-20",
                    index === 3 && "-left-20 z-10",
                    "opacity-80"
                  )}
                >
                  <img src={avatar.src} alt={avatar.fallback} className="object-cover" />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs">
                    {avatar.fallback}
                  </AvatarFallback>
                </Avatar>
              ))}
              <span className="ml-4">First 100 get a free yearly membership!</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-gray-900 dark:text-white text-center md:text-left">
              AI assistant for meetings - past or present.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto md:mx-0 text-center md:text-left">
              Get instant answers, automate note-taking, and streamline your workflow. Teacheat keeps you organized, calm, and moving forward.
            </p>

            <div className="flex w-full max-w-md mx-auto md:mx-0 space-x-2 mb-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 rounded-md border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:border-gray-400 h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Button
                className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 rounded-md px-6 h-10 text-base font-medium"
                onClick={handleJoinWaitlist}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join waitlist"}
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-8 md:mb-16 text-center md:text-left">
              *Join for free. No credit card required.
            </p>

            {/* Moved "Trusted by people working at" section here */}
            <div className="w-full text-center md:text-left">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
                Trusted by people working at
              </p>
              <InfiniteMovingLogos items={defaultLogos} speed="normal" className="justify-center md:justify-start" />
            </div>
          </div>

          {/* Right Column: Illustration */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <ProductIllustration />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;