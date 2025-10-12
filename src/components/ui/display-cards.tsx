"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  date: string;
  iconClassName?: string;
  titleClassName?: string;
}

const DisplayCard: React.FC<DisplayCardProps> = ({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title,
  description,
  date,
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}) => {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[26rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
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
  cards: DisplayCardProps[];
}

const DisplayCards: React.FC<DisplayCardsProps> = ({ cards }) => {
  return (
    <div className="grid w-full grid-cols-1 grid-rows-1 items-center justify-center gap-6 [grid-template-areas:'stack']">
      {cards.map((card, i) => (
        <DisplayCard key={i} {...card} />
      ))}
    </div>
  );
};

export default DisplayCards;