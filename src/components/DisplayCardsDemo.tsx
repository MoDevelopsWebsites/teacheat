"use client";

import React, { useState } from "react";
import { Sparkles, FileText, EyeOff } from "lucide-react";
import InteractiveDisplayCard from "./InteractiveDisplayCard";

const defaultCardsData = [
  {
    id: "instant-answers",
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Instant Answers",
    description: "Get real-time AI responses during calls.",
    date: "Just now",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    expandedContent: "Teacheat provides instant, context-aware answers to your questions during live meetings, ensuring you're always prepared and informed.",
  },
  {
    id: "smart-notetaking",
    icon: <FileText className="size-4 text-blue-300" />,
    title: "Smart Notetaking",
    description: "Automated, accurate meeting summaries.",
    date: "2 days ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    expandedContent: "Automatically generate accurate and concise meeting summaries, action items, and key decisions, so you never miss a detail.",
  },
  {
    id: "undetectable",
    icon: <EyeOff className="size-4 text-blue-300" />,
    title: "Undetectable",
    description: "AI assistance, completely invisible to others.",
    date: "Today",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    expandedContent: "Teacheat operates locally on your device, making it completely invisible to other meeting participants, screen shares, and recordings.",
  },
];

function DisplayCardsDemo() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <div className="flex min-h-[400px] w-full items-center justify-end py-20">
      <div className="w-full max-w-3xl relative h-[200px] sm:h-[250px] md:h-[300px] flex justify-center items-center gap-4">
        {defaultCardsData.map((card, index) => (
          <div
            key={card.id}
            className="w-1/3 h-full"
            style={{
              zIndex: hoveredCardId === card.id ? 30 : (defaultCardsData.length - index) * 10,
            }}
          >
            <InteractiveDisplayCard
              {...card}
              isHovered={hoveredCardId === card.id}
              onHoverChange={setHoveredCardId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export { DisplayCardsDemo };