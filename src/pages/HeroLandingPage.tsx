"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Apple } from 'lucide-react';
import Header from '@/components/Header';
import MeetingWindowMockup from '@/components/MeetingWindowMockup';
import FloatingMouseCursor from '@/components/FloatingMouseCursor';
import { useTypewriter } from '@/hooks/use-typewriter';
import GlitterEffect from '@/components/GlitterEffect';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const HeroLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [typewriterKey, setTypewriterKey] = useState(0); // Key to reset typewriter animation

  const aiResponses = [
    "The client is interested in a solution that integrates with their existing CRM and provides real-time analytics.",
    "They mentioned a preference for cloud-based solutions and a need for robust reporting features.",
    "Their current system lacks scalability, leading to data silos and inefficient workflows.",
    "Key decision-makers include the Head of Sales and the IT Director, both focused on ROI and data security.",
  ];

  const { currentText: currentAiResponse, isTypingComplete } = useTypewriter({
    words: aiResponses,
    speed: 50,
    delay: 2000,
    loop: true,
    key: typewriterKey,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      setShowCursor(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hide cursor after a period of inactivity
    let timeout: NodeJS.Timeout;
    const resetCursorTimeout = () => {
      clearTimeout(timeout);
      setShowCursor(true);
      timeout = setTimeout(() => setShowCursor(false), 3000); // Hide after 3 seconds of inactivity
    };

    window.addEventListener('mousemove', resetCursorTimeout);
    resetCursorTimeout(); // Initial call to set up the timeout

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', resetCursorTimeout);
      clearTimeout(timeout);
    };
  }, []);

  const handleJoinWaitlistClick = () => {
    navigate('/waitlist');
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL + "wallpaper6.jpg"})`,
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          opacity: 0.8,
          filter: 'blur(2px)',
        }}
      ></div>
      <GlitterEffect />

      <Header className="absolute top-0 left-0 right-0" isLandingPageHeader={true} />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:py-16 text-center mt-20 md:mt-24 relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 text-white font-display">
          #1 AI assistant for meetings
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto">
          Takes perfect notes, answers questions in real-time, and makes you the most prepared person on every call.
        </p>
        <Button
          className="bg-gradient-to-br from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 rounded-full px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={handleJoinWaitlistClick}
        >
          <Apple className="h-5 w-5 mr-2" /> Join waitlist
        </Button>

        {/* Meeting Window Mockup */}
        <div className="mt-16 sm:mt-24 w-full max-w-4xl h-[400px] sm:h-[500px] md:h-[600px] relative">
          <MeetingWindowMockup currentAiResponse={currentAiResponse} />
        </div>
      </main>

      {showCursor && (
        <FloatingMouseCursor x={mousePosition.x} y={mousePosition.y} isClicking={isClicking} />
      )}
    </div>
  );
};

export default HeroLandingPage;