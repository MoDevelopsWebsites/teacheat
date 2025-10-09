"use client";

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Apple } from 'lucide-react';
import { useSession } from '@/integrations/supabase/SessionContextProvider';
import MeetingWindowMockup from '@/components/MeetingWindowMockup'; // Import the new component

const LandingPage = () => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && session) {
      navigate('/chat'); // Redirect to chat if authenticated
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-landing-background-start to-landing-background-end">
        <p className="text-xl text-landing-text-primary">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-landing-background-start to-landing-background-end text-landing-text-primary overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000 z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000 z-0"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-green-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-6000 z-0"></div>


      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          {/* Using 'T' for Teacheat as a placeholder for the Cluely logo */}
          <div className="font-bold text-xl text-landing-logo-text">Teacheat</div>
        </div>
        <nav className="flex space-x-6 text-sm font-medium text-landing-text-primary/80">
          <Link to="#" className="hover:text-landing-text-primary">Pricing</Link>
          <Link to="#" className="hover:text-landing-text-primary">Enterprise</Link>
          <Link to="#" className="hover:text-landing-text-primary">Careers</Link>
          <Link to="#" className="hover:text-landing-text-primary">Blog</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-4 py-16 max-w-4xl z-10 mt-12">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-landing-text-primary">
          #1 AI assistant <br /> for meetings
        </h1>
        <p className="text-lg md:text-xl text-landing-text-primary/80 mb-10 max-w-2xl">
          Takes perfect notes, answers questions in real-time, and <br /> makes you the most prepared person on every call.
        </p>
        <Button className="bg-landing-button-mac text-landing-button-mac-foreground hover:bg-landing-button-mac/90 rounded-lg px-8 py-3 text-base font-semibold shadow-md">
          <Apple className="h-5 w-5 mr-2" /> Get for Mac
        </Button>
      </section>

      {/* Meeting Window Mockup */}
      <div className="mt-16 mb-24 z-10">
        <MeetingWindowMockup />
      </div>

      {/* Removed floating icons and cookie banner */}
    </div>
  );
};

export default LandingPage;