"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Apple } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // Import the Footer component
import DesktopWithSafariMockup from '@/components/DesktopWithSafariMockup'; // Updated import
import { useNavigate } from 'react-router-dom';

const EnterpriseLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleTalkToSalesClick = () => {
    console.log("Talk to sales clicked!");
    navigate('/pricing', { state: { defaultPlan: 'enterprise' } });
  };

  const handleGetForMacClick = () => {
    console.log("Get for Mac clicked!");
    navigate('/login');
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-landing-background-start to-landing-background-end text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Mountain Background Image with Fade (Enterprise specific) */}
      <div
        className="absolute top-0 left-0 w-full h-[600px] bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL + "wallpaper4.jpg"})`, // New wallpaper
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', // Fade to bottom
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', // For Webkit browsers
        }}
      ></div>

      {/* Header */}
      <Header isLandingPageHeader={true} className="absolute top-0 left-0 right-0" />

      {/* Hero Section */}
      <section className="relative flex flex-col items-start text-left px-4 py-16 max-w-5xl z-10 mt-24 md:mt-32 flex-grow"> {/* Added flex-grow */}
        <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-white/80 mb-4">
          Enterprise
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white">
          Imagine everyone knew as much about your company as you. <br className="hidden md:block" />
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl">
          Put all your company's knowledge at every rep's fingertips with AI-powered answers and objection handling in any conversation.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-start">
          <Button
            className="bg-gradient-to-br from-landing-button-gradient-start to-landing-button-gradient-end text-white hover:from-landing-button-gradient-hover-start hover:to-landing-button-gradient-hover-end rounded-lg px-8 py-3 text-base font-semibold shadow-button-glow-hover"
            onClick={handleTalkToSalesClick}
          >
            Talk to sales
          </Button>
        </div>
      </section>

      {/* Desktop with Safari Mockup */}
      <div className="mt-8 mb-24 z-10 w-full flex justify-center px-4">
        <DesktopWithSafariMockup />
      </div>

      {/* Placeholder for other sections if needed */}
      <div className="h-48"></div>
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export default EnterpriseLandingPage;