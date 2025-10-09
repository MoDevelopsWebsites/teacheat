"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Apple } from 'lucide-react';
import Header from '@/components/Header';
import SafariWindowMockup from '@/components/SafariWindowMockup';
import { useNavigate } from 'react-router-dom';

const EnterpriseLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleTalkToSalesClick = () => {
    // This could navigate to a contact form or an external sales page
    console.log("Talk to sales clicked!");
    // For now, let's navigate to the pricing page with the enterprise plan selected
    navigate('/pricing', { state: { defaultPlan: 'enterprise' } });
  };

  const handleGetForMacClick = () => {
    // This could navigate to a download page or login/signup
    console.log("Get for Mac clicked!");
    navigate('/login'); // Assuming 'Get for Mac' leads to login/signup
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Header */}
      <Header className="absolute top-0 left-0 right-0" />

      {/* Hero Section */}
      <section className="relative flex flex-col items-start text-left px-4 py-16 max-w-5xl z-10 mt-24 md:mt-32">
        <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
          Enterprise
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-gray-100">
          Imagine everyone knew as much about your company as you. <br className="hidden md:block" />
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl">
          Put all your company's knowledge at every rep's fingertips with AI-powered answers and objection handling in any conversation.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-end"> {/* Added w-full and justify-end */}
          <Button
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-lg px-8 py-3 text-base font-semibold shadow-lg"
            onClick={handleTalkToSalesClick}
          >
            Talk to sales
          </Button>
        </div>
      </section>

      {/* Safari Window Mockup */}
      <div className="mt-8 mb-24 z-10 w-full flex justify-center px-4"> {/* Changed mt-16 to mt-8 */}
        <SafariWindowMockup />
      </div>

      {/* Placeholder for other sections if needed */}
      <div className="h-48"></div> {/* Just some space at the bottom */}
    </div>
  );
};

export default EnterpriseLandingPage;