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
    <Card className="relative w-full max-w-sm h-[400px] bg-undetectable-card-background rounded-xl shadow-lg border border-undetectable-card-border overflow-hidden flex flex-col">
      {/* Top bar with window controls and AI Response */}
      <div className="flex justify-between items-center p-3 border-b border-undetectable-card-border">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex items-center text-sm font-semibold text-undetectable-text-primary">
          <Sparkles className="h-4 w-4 mr-2 text-blue-500" /> AI Response
        </div>
      </div>

      {/* Main content area with image gallery */}
      <CardContent className="flex-grow p-4 overflow-hidden">
        <div className="grid grid-cols-3 gap-2 h-full">
          {images.map((src, index) => (
            <div key={index} className="relative w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
              <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover" />
              {index === 0 && ( // Example for a badge on one image
                <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">18</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>

      {/* Bottom navigation */}
      <div className="p-3 border-t border-undetectable-card-border flex items-center justify-center space-x-2 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-center w-16 h-8 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-undetectable-card-border text-undetectable-text-primary text-xs font-semibold">
          <Command className="h-3 w-3 mr-1" /> command
        </div>
        <div className="flex space-x-1">
          <button className="p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-undetectable-card-border text-undetectable-text-primary hover:bg-gray-100 dark:hover:bg-gray-600">
            <ArrowUp className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-undetectable-card-border text-undetectable-text-primary hover:bg-gray-100 dark:hover:bg-gray-600">
            <ArrowDown className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-undetectable-card-border text-undetectable-text-primary hover:bg-gray-100 dark:hover:bg-gray-600">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-undetectable-card-border text-undetectable-text-primary hover:bg-gray-100 dark:hover:bg-gray-600">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NeverInYourWayCard;