"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import MeetingWindowMockup from './MeetingWindowMockup';
import InvisibleToScreenShareCard from './InvisibleToScreenShareCard';
import RealtimeAnswersCard from './RealtimeAnswersCard';
import MeetingRecapCard from './MeetingRecapCard';
import { MessageSquareText, Sparkles } from 'lucide-react';
import FloatingMouseCursor from './FloatingMouseCursor';

const ProductIllustration: React.FC = () => {
  const [typewriterKey, setTypewriterKey] = useState(0);
  const [currentAiResponse, setCurrentAiResponse] = useState("The client is interested in a solution that integrates with their existing CRM and provides real-time analytics.");
  const [activeSuggestionType, setActiveSuggestionType] = useState<'whatToSayNext' | 'followUpQuestions' | 'none'>('none');
  const [buttonPositions, setButtonPositions] = useState<{ whatToSayNext: DOMRect | null; followUpQuestions: DOMRect | null }>({
    whatToSayNext: null,
    followUpQuestions: null,
  });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  const handleButtonPositionsReady = (positions: { whatToSayNext: DOMRect | null; followUpQuestions: DOMRect | null }) => {
    setButtonPositions(positions);
  };

  const simulateInteraction = () => {
    // Simulate clicking "What to say next?"
    if (buttonPositions.whatToSayNext) {
      const { x, y, width, height } = buttonPositions.whatToSayNext;
      setCursorPosition({ x: x + width / 2, y: y + height / 2 });
      setIsClicking(true);
      setActiveSuggestionType('whatToSayNext');
      setTimeout(() => {
        setIsClicking(false);
        setCurrentAiResponse("Suggest a follow-up question about their current CRM integration challenges.");
        setTypewriterKey(prev => prev + 1);
      }, 500); // Click duration
    }

    // Then simulate clicking "Follow-up questions" after a delay
    setTimeout(() => {
      if (buttonPositions.followUpQuestions) {
        const { x, y, width, height } = buttonPositions.followUpQuestions;
        setCursorPosition({ x: x + width / 2, y: y + height / 2 });
        setIsClicking(true);
        setActiveSuggestionType('followUpQuestions');
        setTimeout(() => {
          setIsClicking(false);
          setCurrentAiResponse("Ask: 'What specific pain points are you experiencing with your current CRM's integration capabilities?'");
          setTypewriterKey(prev => prev + 1);
        }, 500); // Click duration
      }
    }, 3000); // Delay before second click
  };

  React.useEffect(() => {
    const interval = setInterval(simulateInteraction, 6000); // Repeat interaction every 6 seconds
    return () => clearInterval(interval);
  }, [buttonPositions]); // Re-run effect if button positions change

  return (
    <div className="relative w-full max-w-7xl h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center overflow-hidden p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 opacity-70 rounded-xl"></div>

      {/* Main Meeting Window Mockup (Central) */}
      <div className="absolute z-20 w-[90%] max-w-[900px] transform -rotate-3 translate-x-0 translate-y-0">
        <MeetingWindowMockup
          currentAiResponse={currentAiResponse}
          typewriterKey={typewriterKey}
          onButtonPositionsReady={handleButtonPositionsReady}
          activeSuggestionType={activeSuggestionType}
        />
      </div>

      {/* Invisible to Screen Share Card (Top Right) */}
      <div className="absolute z-30 w-[280px] md:w-[320px] lg:w-[360px] transform rotate-6 translate-x-[calc(50%+100px)] -translate-y-[calc(50%-50px)] md:translate-x-[calc(50%+150px)] md:-translate-y-[calc(50%-80px)] lg:translate-x-[calc(50%+200px)] lg:-translate-y-[calc(50%-100px)]">
        <InvisibleToScreenShareCard />
      </div>

      {/* Real-time Answers Card (Bottom Left) */}
      <div className="absolute z-30 w-[280px] md:w-[320px] lg:w-[360px] transform -rotate-6 -translate-x-[calc(50%+100px)] translate-y-[calc(50%-50px)] md:-translate-x-[calc(50%+150px)] md:translate-y-[calc(50%-80px)] lg:-translate-x-[calc(50%+200px)] lg:translate-y-[calc(50%-100px)]">
        <RealtimeAnswersCard />
      </div>

      {/* Meeting Recap Card (Bottom Right, slightly behind) */}
      <div className="absolute z-10 w-[300px] md:w-[350px] lg:w-[400px] transform rotate-12 translate-x-[calc(50%+50px)] translate-y-[calc(50%+50px)] md:translate-x-[calc(50%+80px)] md:translate-y-[calc(50%+80px)] lg:translate-x-[calc(50%+100px)] lg:translate-y-[calc(50%+100px)] opacity-80">
        <MeetingRecapCard />
      </div>

      {/* Floating Mouse Cursor */}
      {isClicking && (
        <FloatingMouseCursor x={cursorPosition.x} y={cursorPosition.y} isClicking={isClicking} />
      )}
    </div>
  );
};

export default ProductIllustration;