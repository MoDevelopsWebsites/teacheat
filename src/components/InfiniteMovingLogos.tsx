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
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [totalWidthToScroll, setTotalWidthToScroll] = useState(0);
  const hasDuplicated = useRef(false);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      if (!hasDuplicated.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);
        
        let calculatedWidth = 0;
        scrollerContent.forEach((item, index) => {
          calculatedWidth += item.getBoundingClientRect().width;
          if (index < scrollerContent.length - 1) {
            calculatedWidth += 16; // Adjusted gap for calculation
          }
        });
        setTotalWidthToScroll(calculatedWidth);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });
        hasDuplicated.current = true;
      }

      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );

      // Adjusted duration for "fast" to make it more noticeable
      const duration =
        speed === "fast" ? "7s" : speed === "normal" ? "40s" : "80s"; // Changed from 15s to 7s
      containerRef.current.style.setProperty("--animation-duration", duration);

      setStart(true);
    }
  }, [direction, speed]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      addAnimation();
    }, 100);
    return () => clearTimeout(timeoutId);
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
          "flex min-w-full shrink-0 gap-4 py-2 w-max flex-nowrap", // Reduced gap and padding
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[120px] max-w-full relative flex-shrink-0 px-2 py-1 md:w-[160px] flex items-center space-x-2" // Reduced width and padding
            key={item.alt + idx}
          >
            <img src={item.src} alt={item.alt} className="h-6 md:h-8 w-auto object-contain opacity-70 grayscale hover:grayscale-0 transition-all duration-300" /> {/* Reduced image height */}
            <span className="text-xs md:text-sm font-medium text-undetectable-text-primary">{item.label}</span> {/* Reduced text size */}
          </li>
        ))}
      </ul>
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