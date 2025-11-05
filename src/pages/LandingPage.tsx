"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Apple, CalendarDays } from 'lucide-react'; // Added CalendarDays
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DesktopWithSafariMockup from '@/components/DesktopWithSafariMockup'; // Re-added
import MeetingParticipantsCard from '@/components/MeetingParticipantsCard'; // Re-added
import GlitterEffect from '@/components/GlitterEffect'; // Re-added
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleJoinWaitlistClick = () => {
    navigate('/waitlist');
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-landing-background-start to-landing-background-end text-gray-900 dark:text-gray-100 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-screen bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL + "wallpaper4.jpg"})`,
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          opacity: 0.7,
          filter: 'blur(4px)',
        }}
      ></div>
      <GlitterEffect /> {/* Added glitter effect */}

      <Header
        isLandingPageHeader={true}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled && "bg-black/10 backdrop-blur-md shadow-md"
        )}
      />

      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center text-center px-4 py-12 max-w-5xl z-10 mt-20 md:mt-32">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight mb-4 sm:mb-6 text-white">
            #1 AI assistant for meetings
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-10 max-w-2xl">
            Takes perfect notes, answers questions in real-time, and makes you the most prepared person on every call.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center">
            <Button
              className="bg-gradient-to-br from-landing-button-gradient-start to-landing-button-gradient-end text-white hover:from-landing-button-gradient-hover-start hover:to-landing-button-gradient-hover-end rounded-lg px-6 py-2.5 text-base font-semibold shadow-button-glow-hover sm:px-8 sm:py-3"
              onClick={handleJoinWaitlistClick}
            >
              <Apple className="h-5 w-5 mr-2" /> Join waitlist
            </Button>
          </div>
          <div className="absolute bottom-0 right-0 -mr-16 -mb-16 hidden md:flex items-center justify-center w-24 h-24 bg-red-500 rounded-full text-white text-center font-bold text-lg transform rotate-12 shadow-lg">
            <CalendarDays className="h-10 w-10" />
            <span className="absolute text-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">JUN 23</span>
          </div>
        </section>

        {/* Product Mockups Section */}
        <section className="w-full py-16 sm:py-24 flex justify-center relative z-10">
          <div className="relative w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8 px-4">
            <DesktopWithSafariMockup className="relative z-10 w-full max-w-4xl" />
            <MeetingParticipantsCard className="relative z-20 lg:absolute lg:top-1/2 lg:left-[calc(50%+150px)] lg:-translate-x-1/2 lg:-translate-y-1/2 w-full max-w-sm mt-8 lg:mt-0" />
          </div>
        </section>

        <div className="h-24 sm:h-48"></div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;