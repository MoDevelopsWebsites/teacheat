"use client";

import React from "react";
import DisplayCards from "@/components/ui/display-cards";
import { Sparkles, FileText, EyeOff } from "lucide-react"; // Added FileText and EyeOff icons

const defaultCards = [
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Instant Answers",
    description: "Get real-time AI responses during calls.",
    date: "Just now", // Keeping date for consistency with DisplayCard component, but it can be ignored visually
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-[-12] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <FileText className="size-4 text-blue-300" />, // Changed icon
    title: "Smart Notetaking",
    description: "Automated, accurate meeting summaries.",
    date: "2 days ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-0 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <EyeOff className="size-4 text-blue-300" />, // Changed icon
    title: "Undetectable",
    description: "AI assistance, completely invisible to others.",
    date: "Today",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-20 hover:translate-y-10",
  },
];

function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={defaultCards} />
      </div>
    </div>
  );
}

export { DisplayCardsDemo };