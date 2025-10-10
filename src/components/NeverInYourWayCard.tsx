"use client";

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Command, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

const NeverInYourWayCard: React.FC = () => {
  const images = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ];

  return (
    <Card className="relative w-full max-w-sm h-[350px] sm:h-[400px] bg-undetectable-card-background rounded-xl shadow-lg border border-undetectable-card-border overflow-hidden flex flex-col"> {/* Adjusted height for mobile */}
      {/* Top bar with window controls and AI Response */}
      <div className="flex justify-between items-center p-2 sm:p-3 border-b border-undetectable-card-border"> {/* Adjusted padding for mobile */}
        <div className="flex space-x-1 sm:space-x-2"> {/* Adjusted spacing for mobile */}
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div> {/* Adjusted size for mobile */}
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div> {/* Adjusted size for mobile */}
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div> {/* Adjusted size for mobile */}
        </div>
        <div className="flex items-center text-xs sm:text-sm font-semibold text-undetectable-text-primary"> {/* Adjusted text size for mobile */}
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-blue-500" /> AI Response
        </div>
      </div>

      {/* Main content area with image gallery */}
      <CardContent className="flex-grow p-2 sm:p-4 overflow-hidden"> {/* Adjusted padding for mobile */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 h-full"> {/* Adjusted gap for mobile */}
          {images.map((src, index) => (
            <div key={index} className="relative w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
              <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover" />
              {index === 0 && ( /* Example for a badge on one image */
                <div className="absolute top-0.5 left-0.5 bg-black/50 text-white text-[0.6rem] px-0.5 rounded sm:top-1 sm:left-1 sm:text-xs sm:px-1">18</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>

      {/* Bottom navigation */}
      <div className="p-2 sm:p-3 border-t border-undetectable-card-border flex items-center justify-center space-x-1 sm:space-x-2 bg-gray-50 dark:bg-gray-800"> {/* Adjusted padding/spacing for mobile */}
        <div className="flex items-center justify-center w-14 h-7 sm:w-16 sm:h-8 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-undetectable-card-border text-undetectable-text-primary text-xs font-semibold"> {/* Adjusted size/text for mobile */}
          <Command className="h-3 w-3 mr-1" /> command
        </div>
        <div className="flex space-x-0.5 sm:space-x-1"> {/* Adjusted spacing for mobile */}
          <button className="p-1.5 sm:p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-undetectable-card-border text-undetectable-text-primary hover:bg-gray-100 dark:hover:bg-gray-600"> {/* Adjusted padding for mobile */}
            <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4" /> {/* Adjusted size for mobile */}
          </button>
          <button className="p-1.5 sm:p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-undetectable-card-border text-undetectable-text-primary hover:bg-gray-100 dark:hover:bg-gray-600"> {/* Adjusted padding for mobile */}
            <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4" /> {/* Adjusted size for mobile */}
          </button>
          <button className="p-1.5 sm:p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-undetectable-card-border text-undetectable-text-primary hover:bg-gray-100 dark:hover:bg-gray-600"> {/* Adjusted padding for mobile */}
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" /> {/* Adjusted size for mobile */}
          </button>
          <button className="p-1.5 sm:p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-undetectable-card-border text-undetectable-text-primary hover:bg-gray-100 dark:hover:bg-gray-600"> {/* Adjusted padding for mobile */}
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" /> {/* Adjusted size for mobile */}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NeverInYourWayCard;