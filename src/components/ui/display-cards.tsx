"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DisplayCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  iconClassName?: string;
  titleClassName?: string;
}

// DisplayCard component defines the visual structure of a single card
const DisplayCard: React.FC<DisplayCardProps> = ({
  icon,
  title,
  description,
  date,
  iconClassName,
  titleClassName,
}) => {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2"
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-sm text-muted-foreground">{date}</p>
    </div>
  );
};

interface DisplayCardsProps {
  cards: (DisplayCardProps & { className?: string })[];
}

// DisplayCards component manages the layout and animation of multiple DisplayCard instances
const DisplayCards: React.FC<DisplayCardsProps> = ({ cards }) => {
  return (
    <div className="grid h-[300px] w-full grid-cols-1 grid-rows-1 place-items-center">
      {cards.map((card, index) => (
        <div // Reverted to div
          key={index}
          className={card.className}
        >
          <DisplayCard
            icon={card.icon}
            title={card.title}
            description={card.description}
            date={card.date}
            iconClassName={card.iconClassName}
            titleClassName={card.titleClassName}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayCards;