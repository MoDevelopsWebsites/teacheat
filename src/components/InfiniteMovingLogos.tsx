"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface InfiniteMovingLogosProps {
  items?: { src: string; alt: string; label: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

const defaultLogos = [
  { src: import.meta.env.BASE_URL + "teams.png", alt: "Microsoft Teams Logo", label: "Microsoft Teams" },
  { src: import.meta.env.BASE_URL + "webex.png", alt: "Webex Logo", label: "Webex" },
  { src: import.meta.env.BASE_URL + "slack.png", alt: "Slack Logo", label: "Slack" },
  { src: import.meta.env.BASE_URL + "zoomm.png", alt: "Zoom Logo", label: "Zoom" },
];

export const InfiniteMovingLogos: React.FC<InfiniteMovingLogosProps> = ({
  items = defaultLogos,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [totalWidthToScroll, setTotalWidthToScroll] = useState(0);
  const hasDuplicated = useRef(false); // Use a ref to track if duplication has already occurred

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      // Only duplicate if not already duplicated
      if (!hasDuplicated.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);
        
        let calculatedWidth = 0;
        scrollerContent.forEach((item, index) => {
          calculatedWidth += item.getBoundingClientRect().width;
          // Add gap for all but the last item in the original set (gap-8 is 32px)
          if (index < scrollerContent.length - 1) {
            calculatedWidth += 32; 
          }
        });
        setTotalWidthToScroll(calculatedWidth);

        // Duplicate items
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });
        hasDuplicated.current = true; // Mark as duplicated
      }

      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );

      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);

      setStart(true);
    }
  }, [direction, speed]); // Dependencies for useCallback

  useEffect(() => {
    // This effect should only run once on mount to set up the animation
    // and duplicate items.
    const timeoutId = setTimeout(() => {
      addAnimation();
    }, 100); // Delay to ensure DOM elements are rendered and have their correct width
    return () => clearTimeout(timeoutId);
  }, [addAnimation]); // Only re-run if addAnimation itself changes (which it won't with static deps)

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[200px] max-w-full relative flex-shrink-0 px-4 py-2 md:w-[250px] flex items-center space-x-3"
            key={item.alt + idx}
          >
            <img src={item.src} alt={item.alt} className="h-10 md:h-12 w-auto object-contain opacity-70 grayscale hover:grayscale-0 transition-all duration-300" />
            <span className="text-lg font-medium text-undetectable-text-primary">{item.label}</span>
          </li>
        ))}
      </ul>
      {/* Inline style for keyframes */}
      <style>{`
        @keyframes scroll {
          to {
            transform: translateX(-${totalWidthToScroll}px);
          }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration) var(--animation-direction) linear infinite;
        }
      `}</style>
    </div>
  );
};