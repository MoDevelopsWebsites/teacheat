"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Apple } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DesktopWithSafariMockup from '@/components/DesktopWithSafariMockup';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import EnterpriseAnalyticsCard from '@/components/EnterpriseAnalyticsCard'; // Import the new component

const EnterpriseLandingPage: React.FC = () => {
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

  const handleTalkToSalesClick = () => {
    console.log("Talk to sales clicked!");
    navigate('/pricing', { state: { defaultPlan: 'enterprise' } });
  };

  const handleGetForMacClick = () => {
    console.log("Get for Mac clicked!");
    navigate('/login');
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

      <Header
        isLandingPageHeader={true}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled && "bg-black/10 backdrop-blur-md shadow-md"
        )}
      />

      <main className="flex-grow flex flex-col items-center">
        <section className="relative flex flex-col items-start text-left px-4 py-12 max-w-5xl z-10 mt-20 md:mt-32">
          <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-white/80 mb-2 sm:mb-4">
            Enterprise
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 text-white">
            Imagine everyone knew as much about your company as you. <br className="hidden md:block" />
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-10 max-w-2xl">
            Put all your company's knowledge at every rep's fingertips with AI-powered answers and objection handling in any conversation.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-start">
            <Button
              className="bg-gradient-to-br from-landing-button-gradient-start to-landing-button-gradient-end text-white hover:from-landing-button-gradient-hover-start hover:to-landing-button-gradient-hover-end rounded-lg px-6 py-2.5 text-base font-semibold shadow-button-glow-hover sm:px-8 sm:py-3"
              onClick={handleTalkToSalesClick}
            >
              Talk to sales
            </Button>
          </div>
        </section>

        <div className="mt-8 mb-16 sm:mb-24 z-10 w-full flex justify-center px-4">
          <DesktopWithSafariMockup />
        </div>

        {/* New section for Enterprise Analytics */}
        <section className="w-full py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-blue-600 dark:text-blue-400 text-lg font-semibold mb-2">
              You can't see where your team is messing up
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-16">
              Understand exactly what your team is doing, and help them <br className="hidden md:block" /> perform better.
            </h2>

            <div className="flex justify-center w-full px-4 mb-16">
              <EnterpriseAnalyticsCard />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left mt-16">
              <div>
                <h3 className="text-xl font-bold mb-2">AI meeting summaries.</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Every meeting neatly summarized — no effort needed.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Usage analytics.</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  See when and how reps are using Teacheat effectively across calls.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI meeting coaching.</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Identify moments where Teacheat could've helped but wasn't used.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Cross-call AI chat.</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Teacheat answers questions across all your meetings using saved context.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="h-24 sm:h-48"></div>
      </main>
      <Footer />
    </div>
  );
};

export default EnterpriseLandingPage;