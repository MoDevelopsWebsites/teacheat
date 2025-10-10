"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface InfiniteMovingLogosProps {
  items?: { src: string; alt: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

const defaultLogos = [
  { src: import.meta.env.BASE_URL + "microsoft-teams-logo.svg", alt: "Microsoft Teams" },
  { src: import.meta.env.BASE_URL + "webex-logo.svg", alt: "Webex" },
  { src: import.meta.env.BASE_URL + "slack-logo.svg", alt: "Slack" },
  { src: import.meta.env.BASE_URL + "zoom-logo.svg", alt: "Zoom" },
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

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      // Store the initial scrollWidth before duplication
      // This is the width of one set of logos
      const initialScrollWidth = scrollerRef.current.scrollWidth;
      setTotalWidthToScroll(initialScrollWidth);

      // Duplicate items to create the infinite loop effect
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );

      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);

      setStart(true);
    }
  }, [direction, speed]);

  useEffect(() => {
    // Use a timeout to ensure all elements are rendered before calculating width
    const timeout = setTimeout(() => {
      addAnimation();
    }, 100); // Small delay
    return () => clearTimeout(timeout);
  }, [addAnimation]);

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
            className="w-[150px] max-w-full relative flex-shrink-0 px-4 py-2 md:w-[200px]"
            key={item.alt + idx}
          >
            <img src={item.src} alt={item.alt} className="h-10 md:h-12 w-full object-contain opacity-70 grayscale hover:grayscale-0 transition-all duration-300" />
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