"use client";

import { useEffect, useRef, RefObject } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number; // Delay in milliseconds before animation starts
}

export const useScrollAnimation = <T extends HTMLElement>(
  ref: RefObject<T>,
  animationClass: string = 'animate-fade-in-up',
  options?: UseScrollAnimationOptions
) => {
  const { threshold = 0.1, rootMargin = '0px', delay = 0 } = options || {};
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setTimeout(() => {
              element.classList.add(animationClass);
            }, delay);
            hasAnimated.current = true;
            observer.unobserve(element); // Stop observing once animated
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, animationClass, threshold, rootMargin, delay]);
};