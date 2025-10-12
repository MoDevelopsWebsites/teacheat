"use client";

import React from "react";
import DisplayCards from "@/components/ui/display-cards";
import { Sparkles, FileText, EyeOff } from "lucide-react";

const defaultCardsData = [
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Instant Answers",
    description: "Get real-time AI responses during calls.",
    date: "Just now",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
  },
  {
    icon: <FileText className="size-4 text-blue-300" />,
    title: "Smart Notetaking",
    description: "Automated, accurate meeting summaries.",
    date: "2 days ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
  },
  {
    icon: <EyeOff className="size-4 text-blue-300" />,
    title: "Undetectable",
    description: "AI assistance, completely invisible to others.",
    date: "Today",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
  },
];

function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-end py-20">
      <DisplayCards items={defaultCardsData} />
    </div>
  );
}

export { DisplayCardsDemo };