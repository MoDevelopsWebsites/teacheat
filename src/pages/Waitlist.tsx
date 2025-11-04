"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import WaitlistHeader from '@/components/WaitlistHeader';
import WaitlistMockup from '@/components/WaitlistMockup';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';

const Waitlist: React.FC = () => {
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
        setEmail('');
      }
    } catch (err: any) {
      console.error("Error joining waitlist:", err.message);
      showError(`Failed to join waitlist: ${err.message || "An unexpected error occurred."}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <WaitlistHeader onJoinWaitlist={handleJoinWaitlist} isLoading={isLoading} />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:py-16 text-center mt-32"> {/* Increased mt to accommodate fixed header */}
        {/* Waitlist Count */}
        <div className="mb-12 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium">
          600+ people on waitlist
        </div>

        {/* Hero Section */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-4xl font-sans">
          The future of AI-powered meetings is here.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
          Teacheat is your intelligent AI assistant, designed to make you the most prepared person on every call, interview, or study session.
        </p>

        {/* Email Input and Button */}
        <div className="flex w-full max-w-md space-x-2 mb-24">
          <Input
            type="email"
            placeholder="Your email"
            className="flex-grow px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <Button
            className="bg-black text-white dark:bg-white dark:text-black rounded-lg px-6 py-2.5 h-auto text-base font-medium hover:bg-gray-800 dark:hover:bg-gray-200"
            onClick={handleJoinWaitlist}
            disabled={isLoading}
          >
            {isLoading ? "Joining..." : "Join waitlist"}
          </Button>
        </div>

        {/* Mockup */}
        <WaitlistMockup />
      </main>
    </div>
  );
};

export default Waitlist;