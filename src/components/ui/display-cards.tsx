"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DisplayCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  iconClassName?: string;
  titleClassName?: string;
}

// DisplayCard component defines the visual structure of a single card
const DisplayCard: React.FC<DisplayCardProps> = ({ // Removed Omit<..., 'className'>
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
  cards: (DisplayCardProps & { className?: string })[]; // Re-added className to card type for the wrapper
}

// DisplayCards component manages the layout and animation of multiple DisplayCard instances
const DisplayCards: React.FC<DisplayCardsProps> = ({ cards }) => {
  return (
    <div className="grid h-[300px] w-full grid-cols-1 grid-rows-1 place-items-center">
      {cards.map((card, index) => (
        <motion.div // Wrap each card with motion.div for animation
          key={index}
          initial={{ opacity: 0, y: 50 }} // Start invisible and slightly below
          whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position when in view
          viewport={{ once: true, amount: 0.5 }} // Trigger animation once when 50% of the element is visible
          transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }} // Smooth transition with staggered delay
          className={card.className} // Apply the stacking/positioning className here
        >
          <DisplayCard
            icon={card.icon}
            title={card.title}
            description={card.description}
            date={card.date}
            iconClassName={card.iconClassName}
            titleClassName={card.titleClassName}
            // className is no longer passed directly to DisplayCard, it's for the motion.div wrapper
          />
        </motion.div>
      ))}
    </div>
  );
};

export default DisplayCards;