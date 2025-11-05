"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import { Loader2 } from 'lucide-react';

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
    <section className="relative w-full py-16 sm:py-20 bg-waitlist-cta-background text-waitlist-cta-text-primary rounded-t-3xl overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(135deg, transparent 74%, var(--waitlist-cta-pattern-color) 75%, var(--waitlist-cta-pattern-color) 76%, transparent 77%),
            linear-gradient(-135deg, transparent 74%, var(--waitlist-cta-pattern-color) 75%, var(--waitlist-cta-pattern-color) 76%, transparent 77%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 sm:mb-6">
          Join our waitlist for exclusive access.
        </h2>
        <p className="text-base md:text-lg text-waitlist-cta-text-secondary mb-6 sm:mb-10 max-w-2xl mx-auto">
          Be among the first to experience Teacheat's AI assistant. Get early access and updates.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-4 rounded-md border border-waitlist-cta-input-border bg-waitlist-cta-input-background text-waitlist-cta-input-text placeholder:text-waitlist-cta-input-placeholder focus:ring-0 focus:border-waitlist-cta-input-focus h-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <Button
            className="bg-waitlist-cta-button-background text-waitlist-cta-button-foreground hover:bg-waitlist-cta-button-hover rounded-md px-6 h-10 text-base font-medium shadow-md"
            onClick={handleJoinWaitlist}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join waitlist"}
          </Button>
        </div>
        <p className="text-xs text-waitlist-cta-text-secondary mt-4">
          *No credit card required.
        </p>
      </div>
    </section>
  );
};

export default QuickJoinWaitlistSection;