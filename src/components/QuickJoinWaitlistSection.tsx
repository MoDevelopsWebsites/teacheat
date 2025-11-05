"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { Loader2 } from 'lucide-react';
import WaitlistIllustration from './WaitlistIllustration'; // Import the new illustration component

const QuickJoinWaitlistSection: React.FC = () => {
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
    <section className="relative w-full py-20 sm:py-28 bg-black text-white rounded-3xl overflow-hidden mb-24 mx-auto max-w-7xl px-6">
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(135deg, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%),
            linear-gradient(-135deg, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
        }}
      ></div>

      {/* Illustration */}
      <WaitlistIllustration />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6">
          Join our waitlist for exclusive access.
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8 sm:mb-12">
          Be among the first to experience Teacheat's AI assistant. Get early access and updates.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-4 rounded-md border border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:ring-0 focus:border-blue-500 h-12 text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <Button
            className="bg-white text-gray-900 hover:bg-gray-200 rounded-md px-8 h-12 text-lg font-medium shadow-md"
            onClick={handleJoinWaitlist}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Join waitlist"}
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          *No credit card required.
        </p>
      </div>
    </section>
  );
};

export default QuickJoinWaitlistSection;