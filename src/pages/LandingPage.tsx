"use client";

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Settings, Sparkles, Apple, Windows, Cookie } from 'lucide-react';
import { useSession } from '@/integrations/supabase/SessionContextProvider';

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
    <div className="relative min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-landing-background-start to-landing-background-end text-landing-text-primary overflow-hidden">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="bg-landing-logo-bg text-landing-logo-fg rounded-md p-1.5 font-bold text-lg">T</div>
            <span className="text-xl font-bold text-landing-logo-text">Teacheat</span>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-landing-text-primary/80">
            <Link to="#" className="hover:text-landing-text-primary">Pricing</Link>
            <Link to="#" className="hover:text-landing-text-primary">Enterprise</Link>
            <Link to="#" className="flex items-center hover:text-landing-text-primary">
              Learn <ArrowDown className="ml-1 h-3 w-3" />
            </Link>
          </nav>
        </div>
        <Button asChild className="bg-landing-button-cta text-landing-button-cta-foreground hover:bg-landing-button-cta/90 rounded-lg px-6 py-2 text-sm font-semibold">
          <Link to="/login">Get Started for Free</Link>
        </Button>
      </header>

      {/* Floating Icons */}
      <div className="absolute top-24 left-24 p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 hidden lg:block">
        <ArrowUp className="h-6 w-6 text-landing-icon-color" />
      </div>
      <div className="absolute top-24 right-24 p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 hidden lg:block">
        <Settings className="h-6 w-6 text-landing-icon-color" />
      </div>
      <div className="absolute bottom-24 left-24 p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 hidden lg:block">
        <ArrowDown className="h-6 w-6 text-landing-icon-color" />
      </div>
      <div className="absolute bottom-24 right-24 p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 hidden lg:block">
        <Sparkles className="h-6 w-6 text-landing-icon-color" />
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-4 py-16 max-w-4xl z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-landing-text-primary">
          Invisible AI That <br /> Thinks for You
        </h1>
        <p className="text-lg md:text-xl text-landing-text-primary/80 mb-10 max-w-2xl">
          Teacheat is an undetectable desktop app that gives you the answers you didn't study for in every meeting and conversation.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button className="bg-landing-button-mac text-landing-button-mac-foreground hover:bg-landing-button-mac/90 rounded-lg px-8 py-3 text-base font-semibold shadow-md">
            <Apple className="h-5 w-5 mr-2" /> Get for Mac
          </Button>
          <Button className="bg-landing-button-windows text-landing-button-windows-foreground hover:bg-landing-button-windows/90 rounded-lg px-8 py-3 text-base font-semibold shadow-md">
            <Windows className="h-5 w-5 mr-2" /> Get for Windows
          </Button>
        </div>
      </section>

      {/* Interactive Card */}
      <Card className="w-full max-w-2xl p-6 bg-landing-card-background border-landing-card-border shadow-lg rounded-xl z-10 mb-24">
        <div className="flex items-center text-landing-text-primary/90 mb-4">
          <Sparkles className="h-5 w-5 mr-2 text-landing-icon-color" />
          <p className="font-semibold">Question: "Why would I even use Teacheat?"</p>
        </div>
        <ul className="list-disc list-inside text-landing-text-primary/70 space-y-2 text-sm pl-4">
          <li>When's the last time you froze in a meeting?</li>
          <li>Write an algorithm to merge K sorted lists</li>
        </ul>
        <p className="text-sm text-landing-text-primary/60 mt-6">
          Suggestion: Scroll down to see Teacheat in action.
        </p>
        <div className="flex justify-center mt-6 space-x-2">
          <span className="h-2 w-8 rounded-full bg-landing-button-mac"></span>
          <span className="h-2 w-2 rounded-full bg-gray-300"></span>
          <span className="h-2 w-2 rounded-full bg-gray-300"></span>
          <span className="h-2 w-2 rounded-full bg-gray-300"></span>
          <span className="h-2 w-2 rounded-full bg-gray-300"></span>
        </div>
      </Card>

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-landing-cookie-background text-landing-cookie-foreground p-4 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 z-20">
        <div className="flex items-center space-x-2 text-sm">
          <Cookie className="h-5 w-5" />
          <p>We use cookies to enhance your experience, analyze our traffic, and provide personalized content. <Link to="#" className="underline hover:text-landing-button-mac">Cookie preferences</Link></p>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" className="text-landing-cookie-foreground hover:bg-landing-cookie-background/80 border border-landing-cookie-foreground/50 rounded-lg px-4 py-2 text-sm">
            Reject non-essential
          </Button>
          <Button className="bg-landing-button-mac text-landing-button-mac-foreground hover:bg-landing-button-mac/90 rounded-lg px-4 py-2 text-sm">
            Accept all cookies
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;