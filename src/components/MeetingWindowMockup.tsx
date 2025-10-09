"use client";

import React, { useRef, useEffect } from 'react';
// Removed imports for Card, Button, Input, Search, MessageSquareText, Keyboard, Mic, Video, X as they are not used in this diagnostic step
import { useTypewriter } from '@/hooks/use-typewriter';

interface MeetingWindowMockupProps {
  currentAiResponse: string;
  typewriterKey: number;
  onButtonPositionsReady: (positions: { whatToSayNext: DOMRect | null; followUpQuestions: DOMRect | null }) => void;
}

const MeetingWindowMockup: React.FC<MeetingWindowMockupProps> = ({
  currentAiResponse, // Still needed for useTypewriter, but not displayed
  typewriterKey, // Still needed for useTypewriter, but not displayed
  onButtonPositionsReady, // Still needed for the parent component, but won't report positions in this diagnostic state
}) => {
  // Refs are not used in this diagnostic step, but keeping them for when we reintroduce the UI
  const whatToSayNextRef = useRef<HTMLButtonElement>(null);
  const followUpQuestionsRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // In this diagnostic phase, we won't report button positions as buttons are not rendered.
    // This function will be re-enabled when the UI is restored.
    // const getPositions = () => {
    //   onButtonPositionsReady({
    //     whatToSayNext: whatToSayNextRef.current?.getBoundingClientRect() || null,
    //     followUpQuestions: followUpQuestionsRef.current?.getBoundingClientRect() || null,
    //   });
    // };
    // getPositions();
    // window.addEventListener('resize', getPositions);
    // return () => window.removeEventListener('resize', getPositions);
  }, [onButtonPositionsReady]);

  // useTypewriter is still called to avoid breaking hooks order, but its output isn't used visually
  useTypewriter({
    words: [currentAiResponse],
    speed: 30,
    delay: 5000,
    loop: false,
    key: typewriterKey,
  });

  return (
    <div className="relative w-[90vw] max-w-[1000px] aspect-video rounded-xl shadow-2xl overflow-hidden border border-gray-300/50 backdrop-blur-lg">
      {/* Simulated Video Background - Now with full opacity and a distinct background for its container */}
      <div className="absolute inset-0 flex items-center justify-center bg-blue-200"> {/* Added bg-blue-200 for visibility check */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/Smart Young Woman Video Conference Interview.mp4"
          className="w-full h-full object-cover opacity-100" // Set opacity to 100%
        />
      </div>

      {/* The entire "Overlay Content" div is temporarily removed for diagnosis */}
    </div>
  );
};

export default MeetingWindowMockup;