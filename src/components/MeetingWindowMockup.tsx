"use client";

import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageSquareText, Keyboard, MicOff, VideoOff, PhoneOff, X } from 'lucide-react';
import { useTypewriter } from '@/hooks/use-typewriter';
import { cn } from '@/lib/utils';

interface MeetingWindowMockupProps {
  currentAiResponse: string;
  typewriterKey: number;
  onButtonPositionsReady: (positions: { whatToSayNext: DOMRect | null; followUpQuestions: DOMRect | null }) => void;
  activeSuggestionType: 'whatToSayNext' | 'followUpQuestions' | 'none';
}

const MeetingWindowMockup: React.FC<MeetingWindowMockupProps> = ({
  currentAiResponse,
  typewriterKey,
  onButtonPositionsReady,
  activeSuggestionType,
}) => {
  const whatToSayNextRef = useRef<HTMLButtonElement>(null);
  const followUpQuestionsRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const getPositions = () => {
      onButtonPositionsReady({
        whatToSayNext: whatToSayNextRef.current?.getBoundingClientRect() || null,
        followUpQuestions: followUpQuestionsRef.current?.getBoundingClientRect() || null,
      });
    };

    getPositions();
    window.addEventListener('resize', getPositions);
    return () => window.removeEventListener('resize', getPositions);
  }, [onButtonPositionsReady]);

  const animatedAiResponse = useTypewriter({
    words: [currentAiResponse],
    speed: 30,
    delay: 5000,
    loop: false,
    key: typewriterKey,
  });

  const getActiveSuggestionText = () => {
    switch (activeSuggestionType) {
      case 'whatToSayNext':
        return "What to say next";
      case 'followUpQuestions':
      default:
        return "AI Suggestions";
    }
  };

  return (
    <div className="relative w-[95vw] max-w-[1000px] aspect-video rounded-xl shadow-2xl overflow-hidden border border-gray-300/50 backdrop-blur-lg">
      <img
        src={import.meta.env.BASE_URL + "wallpaper.jpg"}
        alt="Meeting Background Wallpaper"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <div className="absolute inset-0 flex flex-col p-2 sm:p-4">
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <div className="flex space-x-1 sm:space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 text-gray-500 text-xs sm:text-sm">
            <span className="font-semibold">Meeting with Client</span>
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <X className="h-3 w-3 sm:h-4 sm:w-4 text-white/70" />
          </div>
        </div>

        <div className="flex-grow flex items-end justify-center p-2 sm:p-4">
          <Card className="w-full max-w-xl bg-uiLightBlue dark:bg-uiDarkBlue backdrop-blur-lg text-gray-800 dark:text-gray-200 border border-blue-500/50 rounded-xl p-3 sm:p-4 shadow-lg">
            <CardHeader className="p-0 pb-1 sm:pb-2 border-b border-gray-600/50 mb-2 sm:mb-4 flex-row items-center justify-between">
              <div className="flex items-center text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                <Search className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-500 dark:text-gray-400" /> Searched records
              </div>
              <Button variant="secondary" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-0.5 h-auto sm:px-3 sm:py-1" disabled>
                {getActiveSuggestionText()}
              </Button>
            </CardHeader>
            <CardContent className="p-0 mb-2 sm:mb-4">
              <p className="text-sm sm:text-lg font-bold leading-relaxed min-h-[30px] sm:min-h-[40px]">
                {animatedAiResponse.currentText}
              </p>
            </CardContent>
            <CardFooter className="p-0 flex flex-col space-y-1 sm:space-y-2">
              <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 w-full">
                <Button ref={whatToSayNextRef} variant="outline" className="flex-grow bg-gray-800 text-gray-100 border-gray-600 hover:bg-gray-700 text-xs h-7 sm:h-8" disabled>
                  <MessageSquareText className="h-3 w-3 mr-1" /> What should I say next?
                </Button>
                <Button ref={followUpQuestionsRef} variant="outline" className="flex-grow bg-gray-800 text-gray-100 border-gray-600 hover:bg-gray-700 text-xs h-7 sm:h-8" disabled>
                  <MessageSquareText className="h-3 w-3 mr-1" /> Follow-up questions
                </Button>
              </div>
              <div className="relative w-full">
                <Input
                  placeholder="Ask, ⌘ ⏎ to start typing"
                  className="w-full bg-gray-800 text-gray-100 border-gray-600 placeholder:text-gray-400 pl-8 sm:pl-10 pr-2 sm:pr-4 h-8 sm:h-10 text-xs sm:text-sm"
                  disabled
                />
                <Keyboard className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="flex justify-center items-center space-x-1 sm:space-x-2 bg-uiDarkBlue/70 backdrop-blur-md rounded-xl py-1 px-2 sm:py-2 sm:px-4 self-center mt-auto border border-gray-700/50">
          <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/20 hover:text-white rounded-md h-7 w-7 sm:h-8 sm:w-8" disabled>
            <MicOff className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/20 hover:text-white rounded-md h-7 w-7 sm:h-8 sm:w-8" disabled>
            <VideoOff className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button variant="destructive" size="icon" className="bg-red-500 hover:bg-red-600 text-white rounded-md h-7 w-7 sm:h-8 sm:w-8" disabled>
            <PhoneOff className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetingWindowMockup;