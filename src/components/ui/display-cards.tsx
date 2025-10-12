"use client";

import React from "react";
import { Sparkles, FileText, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  iconClassName?: string;
  titleClassName?: string;
  className?: string;
}

interface DisplayCardsProps {
  cards: CardProps[];
}

const DisplayCards: React.FC<DisplayCardsProps> = ({ cards }) => {
  return (
    <div className="relative grid [grid-template-areas:'stack'] w-full h-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className={cn(
            "absolute top-0 left-0 h-full w-[250px] rounded-xl border border-border bg-card p-4 shadow-lg flex flex-col justify-between",
            card.className
          )}
          style={{ zIndex: 10 - index }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className={cn("p-1 rounded-full bg-blue-100", card.iconClassName)}>
              {card.icon}
            </div>
            <h3 className={cn("font-semibold", card.titleClassName)}>{card.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground flex-grow">{card.description}</p>
          <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
            <span>{card.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayCards;