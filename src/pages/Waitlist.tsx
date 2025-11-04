"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import WaitlistHeader from '@/components/WaitlistHeader';
import WaitlistMockup from '@/components/WaitlistMockup';
import UseCasesSection from '@/components/UseCasesSection';
import MinimalWaitlistFooter from '@/components/MinimalWaitlistFooter';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { Loader2 } from 'lucide-react'; // Import Loader2 here for the loading spinner

const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true); // State to control spinner visibility
  const [showNavbar, setShowNavbar] = useState(false); // State to control navbar visibility and animation

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

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setShowLoadingSpinner(false); // Hide spinner after 2.5 seconds
      setShowNavbar(true); // Then, trigger navbar animation
    }, 2500); // 2.5 seconds for the loading spinner

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Conditional rendering for loading spinner or WaitlistHeader */}
      {showLoadingSpinner && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-8">
          <div className="flex items-center justify-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 w-24 h-10 transition-all duration-300">
            <Loader2 className="h-5 w-5 animate-spin text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      )}
      {showNavbar && (
        <WaitlistHeader onJoinWaitlist={handleJoinWaitlist} isLoading={isLoading} isHeaderVisible={true} />
      )}

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:py-16 text-center mt-32">
        {/* Waitlist Count */}
        <div className="mb-12 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium">
          First 100 get a free yearly membership!
        </div>

        {/* Hero Section */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 max-w-4xl font-sans">
          The future of AI-powered meetings is here.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium mb-12 max-w-2xl">
          Teacheat is your intelligent AI assistant, designed to make you the most prepared person on every call, interview, or study session.
        </p>

        {/* Email Input and Button */}
        <div className="flex w-full max-w-md space-x-2 mb-24">
          <Input
            type="email"
            placeholder="Your email"
            className="flex-grow px-4 rounded-full border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:border-gray-400 h-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <Button
            className="bg-white text-black rounded-full px-6 h-10 text-base font-medium border border-black hover:bg-gray-50"
            onClick={handleJoinWaitlist}
            disabled={isLoading}
          >
            {isLoading ? "Joining..." : "Join waitlist"}
          </Button>
        </div>

        {/* Mockup */}
        <WaitlistMockup />
      </main>

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* Minimalist Footer */}
      <MinimalWaitlistFooter onJoinWaitlist={handleJoinWaitlist} isLoading={isLoading} />
    </div>
  );
};

export default Waitlist;