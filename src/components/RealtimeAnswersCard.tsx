"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Command, CornerDownLeft } from 'lucide-react';

const RealtimeAnswersCard: React.FC = () => {
  const backgroundWords = [
    "talk about code.", "How do you", "What's your", "component state,", "I use the", "role-based access control.",
    "closely with designers and", "GraphQL backend.", "top", "react testing", "data", "amid", "simple setups.",
    "to writing tests?", "jest, comp", "follow", "levels-unit", "build", "do you", "react", "component", "state",
    "I use the", "role-based", "access", "control", "closely", "with", "designers", "and", "GraphQL", "backend",
    "top", "react", "testing", "data", "amid", "simple", "setups", "to", "writing", "tests", "jest", "comp",
    "follow", "levels", "unit", "build", "do", "you", "react", "component", "state", "I", "use", "the", "role-based",
    "access", "control", "closely", "with", "designers", "and", "GraphQL", "backend", "top", "react", "testing",
    "data", "amid", "simple", "setups", "to", "writing", "tests", "jest", "comp", "follow", "levels", "unit",
    "build", "do", "you", "react", "component", "state", "I", "use", "the", "role-based", "access", "control",
  ];

  return (
    <Card className="relative w-full max-w-md h-64 bg-uiLightBlue dark:bg-uiDarkBlue rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 flex items-center justify-center">
      <div className="absolute inset-0 p-2 sm:p-4 text-gray-300 dark:text-gray-700 text-xs font-mono opacity-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-uiLightBlue via-uiLightBlue to-gray-200 dark:from-uiDarkBlue dark:via-uiDarkBlue dark:to-gray-900 opacity-80 z-10"></div>
        <div className="absolute inset-0 z-0" style={{
          transform: 'rotate(-15deg) scale(1.2)',
          whiteSpace: 'nowrap',
          lineHeight: '1.8',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
        }}>
          {backgroundWords.map((word, i) => (
            <span key={i} className="inline-block mx-1 sm:mx-2 my-0.5 sm:my-1 text-gray-300 dark:text-gray-700 opacity-70 text-[0.6rem] sm:text-xs">
              {word}
            </span>
          ))}
        </div>
      </div>

      <CardContent className="relative z-20 flex items-center justify-center p-0 space-x-1 sm:space-x-2">
        <div className="flex items-center justify-center w-24 h-12 sm:w-28 sm:h-16 bg-uiLightBlue dark:bg-uiDarkBlue rounded-lg shadow-md border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-semibold
                    cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 active:shadow-inner">
          <Command className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> command
        </div>
        <span className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-bold">+</span>
        <div className="flex items-center justify-center w-24 h-12 sm:w-28 sm:h-16 bg-uiLightBlue dark:bg-uiDarkBlue rounded-lg shadow-md border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-semibold
                    cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 active:shadow-inner">
          <CornerDownLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> return
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeAnswersCard;