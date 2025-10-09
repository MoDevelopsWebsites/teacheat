"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageSquareText, Keyboard, Mic, MicOff, Video, VideoOff, X } from 'lucide-react';
import { useTypewriter } from '@/hooks/use-typewriter';

const initialAiResponse = "So just to recap—you need new cabinets and lighting. I'll send you a quote within the hour. Let's do a kickoff call next Wednesday if that works for you?";
const nextSuggestionResponse = "Based on their interest in new cabinets, you could suggest a premium wood finish or smart storage solutions to upsell.";
const followUpQuestionsResponse = "Here are some follow-up questions: 1. What's your budget for the new lighting? 2. Are there any specific cabinet styles you prefer? 3. What's your ideal timeline for project completion?";

const MeetingWindowMockup: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true); // true means mic is off, button says "Unmute"
  const [isVideoOff, setIsVideoOff] = useState(true); // true means video is off, button says "Start Video"
  const [aiResponseContent, setAiResponseContent] = useState(initialAiResponse);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [typewriterKey, setTypewriterKey] = useState(0); // Key to reset typewriter animation

  const animatedAiResponse = useTypewriter({
    words: [aiResponseContent],
    speed: 30,
    delay: 5000,
    loop: false,
    key: typewriterKey, // Pass key to reset animation
  });

  const simulateAiThinking = (newContent: string) => {
    setShowTypingIndicator(true);
    setAiResponseContent(''); // Clear current text to show typing indicator
    setTimeout(() => {
      setAiResponseContent(newContent);
      setShowTypingIndicator(false);
      setTypewriterKey(prev => prev + 1); // Increment key to restart typewriter
    }, 1500); // Simulate AI thinking for 1.5 seconds
  };

  const handleWhatToSayNext = () => {
    simulateAiThinking(nextSuggestionResponse);
  };

  const handleFollowUpQuestions = () => {
    simulateAiThinking(followUpQuestionsResponse);
  };

  const handleToggleMic = () => {
    setIsMuted((prev) => !prev);
  };

  const handleToggleVideo = () => {
    setIsVideoOff((prev) => !prev);
  };

  const handleEndMeeting = () => {
    // For a mockup, we can reset the state or show a simple message
    setAiResponseContent(initialAiResponse);
    setIsMuted(true);
    setIsVideoOff(true);
    setShowTypingIndicator(false);
    setTypewriterKey(prev => prev + 1);
    // In a real app, this would end the call
  };

  return (
    <div className="relative w-[90vw] max-w-[1000px] aspect-video rounded-xl shadow-2xl overflow-hidden border border-gray-300/50 backdrop-blur-lg">
      {/* Simulated Video Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-70 flex items-center justify-center">
        {/* Placeholder for video content - could be an image or actual video */}
        <img src="/placeholder.svg" alt="Meeting participants" className="w-full h-full object-cover opacity-50" />
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
          <div className="flex items-center space-x-2 text-white text-sm">
            <span className="font-semibold">Meeting with Client</span>
          </div>
          <div className="flex space-x-2">
            <X className="h-4 w-4 text-white/70" />
          </div>
        </div>

        {/* Main chat/recordings area */}
        <div className="flex-grow flex items-end justify-center p-4">
          <Card className="w-full max-w-xl bg-black/70 backdrop-blur-lg text-white border-none rounded-xl p-4 shadow-lg">
            <CardHeader className="p-0 pb-2 border-b border-gray-600/50 mb-4 flex-row items-center justify-between">
              <div className="flex items-center text-sm font-semibold text-gray-200">
                <Search className="h-4 w-4 mr-2 text-gray-400" /> Searched records
              </div>
              <Button variant="secondary" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-auto" onClick={handleWhatToSayNext}>
                What do I say next?
              </Button>
            </CardHeader>
            <CardContent className="p-0 mb-4">
              <p className="text-sm text-gray-100 leading-relaxed min-h-[40px]">
                {showTypingIndicator ? <span className="animate-pulse">Typing...</span> : animatedAiResponse}
              </p>
            </CardContent>
            <CardFooter className="p-0 flex flex-col space-y-2">
              <div className="flex space-x-2 w-full">
                <Button variant="outline" className="flex-grow bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 text-xs h-8" onClick={handleWhatToSayNext}>
                  <MessageSquareText className="h-3 w-3 mr-1" /> What should I say next?
                </Button>
                <Button variant="outline" className="flex-grow bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 text-xs h-8" onClick={handleFollowUpQuestions}>
                  <MessageSquareText className="h-3 w-3 mr-1" /> Follow-up questions
                </Button>
              </div>
              <div className="relative w-full">
                <Input
                  placeholder="Ask, ⌘ ⏎ to start typing"
                  className="w-full bg-gray-800 text-gray-200 border-gray-600 placeholder:text-gray-400 pl-10 pr-4 h-10 text-sm"
                />
                <Keyboard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Bottom control bar */}
        <div className="flex justify-center items-center space-x-6 bg-black/70 backdrop-blur-lg rounded-full py-2 px-6 self-center mt-auto">
          <Button variant="ghost" className="text-white/80 hover:text-white text-sm" onClick={handleToggleMic}>
            {isMuted ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
            {isMuted ? 'Unmute' : 'Mute'}
          </Button>
          <Button variant="ghost" className="text-white/80 hover:text-white text-sm" onClick={handleToggleVideo}>
            {isVideoOff ? <VideoOff className="h-4 w-4 mr-2" /> : <Video className="h-4 w-4 mr-2" />}
            {isVideoOff ? 'Start Video' : 'Stop Video'}
          </Button>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-full" onClick={handleEndMeeting}>
            End
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetingWindowMockup;