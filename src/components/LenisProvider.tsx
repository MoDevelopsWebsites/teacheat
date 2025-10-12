"use client";

import React, { createContext, useContext, useEffect, useLayoutEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

interface LenisContextType {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType | undefined>(undefined);

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (context === undefined) {
    throw new Error('useLenis must be used within a LenisProvider');
  }
  return context.lenis;
};

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const initialized = useRef(false);

  useLayoutEffect(() => {
    if (!initialized.current) {
      const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisInstance.on('scroll', (e: any) => {
        // You can add custom scroll event handling here if needed
        // console.log(e);
      });

      const raf = (time: DOMHighResTimeStamp) => {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      setLenis(lenisInstance);
      initialized.current = true;

      // Handle resize/orientationchange
      const handleResize = () => {
        lenisInstance.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        lenisInstance.destroy();
        window.removeEventListener('resize', handleResize);
        initialized.current = false;
      };
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      // Override anchor navigation
      const handleAnchorClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const anchor = target.closest('a[href^="#"]');
        if (anchor) {
          const id = anchor.getAttribute('href')?.substring(1);
          if (id) {
            const element = document.getElementById(id);
            if (element) {
              event.preventDefault();
              lenis.scrollTo(element, { offset: -50 }); // Adjust offset as needed
            }
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);

      return () => {
        document.removeEventListener('click', handleAnchorClick);
      };
    }
  }, [lenis]);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
};