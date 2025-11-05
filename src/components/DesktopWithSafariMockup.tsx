"use client";

import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import AnimatedInput from './AnimatedInput';
import placeholderImage from '/public/placeholder.svg';

interface DesktopWithSafariMockupProps {
  className?: string;
}

const DesktopWithSafariMockup: React.FC<DesktopWithSafariMockupProps> = ({ className }) => {
  const phrases = [
    "Stop 'looping in your tech guy' for every question.",
    "Get instant answers to complex questions.",
    "Automate your sales enablement.",
    "Empower your team with real-time knowledge.",
    "Close deals faster with AI-powered insights.",
  ];

  const dockIcons = [
    { src: import.meta.env.BASE_URL + "google.png", alt: "Google Chrome" },
    { src: import.meta.env.BASE_URL + "zoom.webp", alt: "Zoom" },
    { src: import.meta.env.BASE_URL + "recycle.jpg", alt: "Recycle Bin" },
  ];

  return (
    <div className={cn(
      "relative w-[95vw] max-w-5xl h-[350px] sm:h-[450px] md:h-[600px] rounded-xl shadow-2xl overflow-hidden",
      "bg-gray-900 border border-gray-700",
      className
    )}>
      <img
        src={import.meta.env.BASE_URL + "wallpaper5.jpg"} // Changed to wallpaper5.jpg
        alt="Desktop Wallpaper"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[75%] sm:w-[80%] sm:h-[70%] bg-white/80 backdrop-blur-md rounded-lg shadow-xl border border-gray-300 flex flex-col">
        <div className="flex items-center p-1.5 sm:p-2 border-b border-gray-300 bg-gray-100/80">
          <div className="flex space-x-1 sm:space-x-1.5">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-grow text-center text-[0.6rem] sm:text-xs font-medium text-gray-800">
            Safari
          </div>
          <div className="hidden sm:flex items-center space-x-1 sm:space-x-2 text-gray-800 text-xs">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>History</span>
            <span>Bookmarks</span>
            <span>Window</span>
            <span>Help</span>
          </div>
        </div>

        <div className="flex items-center justify-center flex-grow p-2 sm:p-4">
          <div className="relative w-full max-w-xl">
            <Sparkles className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            <AnimatedInput
              phrases={phrases}
              placeholder="Loading AI insights..."
              className="w-full pl-10 pr-3 py-2 sm:pl-12 sm:pr-4 sm:py-3 rounded-full bg-gray-900/70 border border-blue-500 text-white placeholder:text-gray-300 text-sm sm:text-base shadow-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 p-1.5 sm:p-2 bg-black/30 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
        {dockIcons.map((icon, index) => (
          <div key={index} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md overflow-hidden">
            <img src={icon.src} alt={icon.alt} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopWithSafariMockup;