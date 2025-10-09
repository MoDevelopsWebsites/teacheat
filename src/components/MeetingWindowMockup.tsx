"use client";

import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageSquareText, Keyboard, MicOff, VideoOff, PhoneOff, X } from 'lucide-react';
import { useTypewriter } from '@/hooks/use-typewriter';
import { cn } from '@/lib/utils';
import placeholderImage from '/public/placeholder.svg'; // Import placeholder image

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
    <div className="relative w-[90vw] max-w-[1000px] aspect-video rounded-xl shadow-2xl overflow-hidden border border-gray-300/50 backdrop-blur-lg">
      {/* Simulated macOS Wallpaper Background */}
      <div className="absolute inset-0">
        <img
          src={placeholderImage} // Using the placeholder image
          alt="Placeholder Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col p-4">
        {/* Top bar with window controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 text-sm"> {/* Changed text-gray-200 to text-gray-500 */}
            <span className="font-semibold">Meeting with Client</span>
          </div>
          <div className="flex space-x-2">
            <X className="h-4 w-4 text-white/70" />
          </div>
        </div>

        {/* Main chat/records area */}
        <div className="flex-grow flex items-end justify-center p-4">
          <Card className="w-full max-w-xl bg-black/50 backdrop-blur-lg text-white border border-blue-500/50 rounded-xl p-4 shadow-lg">
            <CardHeader className="p-0 pb-2 border-b border-gray-600/50 mb-4 flex-row items-center justify-between">
              <div className="flex items-center text-sm font-semibold text-gray-200">
                <Search className="h-4 w-4 mr-2 text-gray-400" /> Searched records
              </div>
              <Button variant="secondary" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-auto" disabled>
                {getActiveSuggestionText()}
              </Button>
            </CardHeader>
            <CardContent className="p-0 mb-4">
              <p className="text-lg font-bold text-white leading-relaxed min-h-[40px]">
                {animatedAiResponse.currentText}
              </p>
            </CardContent>
            <CardFooter className="p-0 flex flex-col space-y-2">
              <div className="flex space-x-2 w-full">
                <Button ref={whatToSayNextRef} variant="outline" className="flex-grow bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 text-xs h-8" disabled>
                  <MessageSquareText className="h-3 w-3 mr-1" /> What should I say next?
                </Button>
                <Button ref={followUpQuestionsRef} variant="outline" className="flex-grow bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 text-xs h-8" disabled>
                  <MessageSquareText className="h-3 w-3 mr-1" /> Follow-up questions
                </Button>
              </div>
              <div className="relative w-full">
                <Input
                  placeholder="Ask, ⌘ ⏎ to start typing"
                  className="w-full bg-gray-800 text-gray-200 border-gray-600 placeholder:text-gray-400 pl-10 pr-4 h-10 text-sm"
                  disabled
                />
                <Keyboard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Bottom control bar (macOS style) */}
        <div className="flex justify-center items-center space-x-2 bg-gray-800/70 backdrop-blur-md rounded-xl py-2 px-4 self-center mt-auto border border-gray-700/50">
          <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/20 hover:text-white rounded-md" disabled>
            <MicOff className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/20 hover:text-white rounded-md" disabled>
            <VideoOff className="h-5 w-5" />
          </Button>
          <Button variant="destructive" size="icon" className="bg-red-500 hover:bg-red-600 text-white rounded-md" disabled>
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetingWindowMockup;