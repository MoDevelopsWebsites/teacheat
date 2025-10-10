"use client";

import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input'; // Keep Input for reference if needed elsewhere, but AnimatedInput will use it internally
import { cn } from '@/lib/utils';
import AnimatedInput from './AnimatedInput'; // Import the new AnimatedInput component
import placeholderImage from '/public/placeholder.svg'; // Using existing placeholder for wallpaper and generic icons

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
    { src: import.meta.env.BASE_URL + "zoom-logo.svg", alt: "Zoom" },
    { src: import.meta.env.BASE_URL + "slack-logo.svg", alt: "Slack" },
    { src: import.meta.env.BASE_URL + "webex-logo.svg", alt: "Webex" },
    { src: import.meta.env.BASE_URL + "microsoft-teams-logo.svg", alt: "Microsoft Teams" },
    { src: import.meta.env.BASE_URL + "placeholder.svg", alt: "App 1" }, // Generic app icon
    { src: import.meta.env.BASE_URL + "placeholder.svg", alt: "App 2" }, // Generic app icon
  ];

  return (
    <div className={cn(
      "relative w-full max-w-5xl h-[600px] rounded-xl shadow-2xl overflow-hidden", // Increased size
      "bg-gray-900 border border-gray-700", // Darker background for the "laptop" frame
      className
    )}>
      {/* Wallpaper Background */}
      <img
        src={import.meta.env.BASE_URL + "wallpaper5.jpg"} // Using the new wallpaper5.jpg
        alt="Desktop Wallpaper"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Simulated Safari Browser Window */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-white/80 backdrop-blur-md rounded-lg shadow-xl border border-gray-300 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center p-2 border-b border-gray-300 bg-gray-100/80">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-grow text-center text-xs font-medium text-gray-800">
            Safari
          </div>
          <div className="flex items-center space-x-2 text-gray-800 text-xs">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>History</span>
            <span>Bookmarks</span>
            <span>Window</span>
            <span>Help</span>
          </div>
        </div>

        {/* Content area with search bar */}
        <div className="flex items-center justify-center flex-grow p-4">
          <div className="relative w-full max-w-xl">
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
            <AnimatedInput
              phrases={phrases}
              placeholder="Loading AI insights..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-900/70 border border-blue-500 text-white placeholder:text-gray-300 text-base shadow-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Simulated macOS Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 p-2 bg-black/30 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
        {dockIcons.map((icon, index) => (
          <div key={index} className="w-10 h-10 flex items-center justify-center rounded-md overflow-hidden">
            <img src={icon.src} alt={icon.alt} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopWithSafariMockup;