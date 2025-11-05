"use client";

import React from 'react';
import { MessageSquareText, Sparkles } from 'lucide-react';
import Typewriter from './Typewriter'; // Import the new Typewriter component

interface MeetingWindowMockupProps {
  currentAiResponse: string;
}

const MeetingWindowMockup: React.FC<MeetingWindowMockupProps> = ({
  currentAiResponse,
}) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Meeting with Client</span>
        <div className="w-12"></div> {/* Spacer */}
      </div>

      {/* Main Content Area */}
      <div className="flex h-[500px]">
        {/* Left: Meeting Participants/Video (simplified) */}
        <div className="w-2/3 bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-400 dark:text-gray-600 text-sm">
          Video Call Area
        </div>

        {/* Right: AI Assistant Panel */}
        <div className="w-1/3 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4 flex flex-col">
          <div className="flex items-center mb-4">
            <Sparkles className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Teacheat AI</h3>
          </div>

          <div className="flex-grow overflow-y-auto space-y-4">
            {/* User Prompt */}
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm text-gray-800 dark:text-gray-200">
              "Tell me about the client's CRM integration needs."
            </div>

            {/* AI Response */}
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-sm text-gray-800 dark:text-gray-200">
              <Typewriter text={currentAiResponse} />
            </div>
          </div>

          {/* Suggestions */}
          <div className="mt-4 space-y-2">
            <button
              className="w-full flex items-center justify-center p-2 rounded-md text-sm transition-colors
                bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 border border-transparent"
            >
              <MessageSquareText className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" /> What to say next?
            </button>
            <button
              className="w-full flex items-center justify-center p-2 rounded-md text-sm transition-colors
                bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 border border-transparent"
            >
              <Sparkles className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" /> Follow-up questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingWindowMockup;