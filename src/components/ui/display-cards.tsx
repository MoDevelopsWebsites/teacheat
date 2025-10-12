"use client";

import React, { useState } from "react";
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

const BASE_CARD_WIDTH_PX = 250; // Assumed base width of the cards
const EXPANSION_AMOUNT_PX = 150; // How much the card expands horizontally
const TRANSITION_DURATION_MS = 300; // Milliseconds for smooth transition

const DisplayCards: React.FC<DisplayCardsProps> = ({ cards }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative grid [grid-template-areas:'stack'] w-full h-full">
      {cards.map((card, index) => {
        // Extract existing translate-x and translate-y values from className
        // We need to remove these classes from the className prop to apply them dynamically via style,
        // ensuring our dynamic adjustments take precedence without overriding other classes.
        const existingTranslateXMatch = card.className?.match(/translate-x-(\d+)/);
        const existingTranslateYMatch = card.className?.match(/translate-y-(\d+)/);

        // Convert Tailwind units (e.g., translate-x-12) to pixels for calculation.
        // Tailwind's translate-x-N typically means N * 0.25rem. Assuming 1rem = 16px,
        // then N * 0.25 * 16 = N * 4px.
        let initialTranslateX = existingTranslateXMatch ? parseInt(existingTranslateXMatch[1]) * 4 : 0;
        let initialTranslateY = existingTranslateYMatch ? parseInt(existingTranslateYMatch[1]) * 4 : 0;

        let dynamicWidth = `${BASE_CARD_WIDTH_PX}px`;
        let dynamicTranslateX = initialTranslateX;
        let zIndex = 10 - index; // Default z-index for stacking order

        if (hoveredIndex !== null) {
          if (index === hoveredIndex) {
            dynamicWidth = `${BASE_CARD_WIDTH_PX + EXPANSION_AMOUNT_PX}px`;
            zIndex = 20; // Bring the hovered card to the front
          } else if (index > hoveredIndex) {
            // Push cards to the right of the hovered card
            dynamicTranslateX = initialTranslateX + EXPANSION_AMOUNT_PX;
          }
        }

        // Clean up className by removing translate-x and translate-y classes
        // as we are applying them via inline style to allow dynamic adjustments.
        const cleanedClassName = card.className
          ?.replace(/translate-x-\d+/g, '')
          .replace(/translate-y-\d+/g, '');

        return (
          <div
            key={index}
            className={cn(
              cleanedClassName, // Apply cleaned class names
              "absolute top-0 left-0 h-full rounded-xl border border-border bg-card p-4 shadow-lg flex flex-col justify-between",
              "transition-all ease-out" // Add transition for smooth changes
            )}
            style={{
              width: dynamicWidth,
              transform: `translateX(${dynamicTranslateX}px) translateY(${initialTranslateY}px)`,
              zIndex: zIndex,
              transitionDuration: `${TRANSITION_DURATION_MS}ms`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Existing card content */}
            <div className="flex items-center space-x-2 mb-2">
              <div className={cn("p-1 rounded-full bg-blue-100", card.iconClassName)}>
                {card.icon}
              </div>
              <h3 className={cn("font-semibold", card.titleClassName)}>{card.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground flex-grow">{card.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
              <span>{card.date}</span>
              {hoveredIndex === index && (
                <div className="expanded-content ml-4 text-sm text-gray-700 whitespace-nowrap">
                  {/* Placeholder for expanded content */}
                  More details here!
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayCards;