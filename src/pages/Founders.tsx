"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const Founders: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-landing-background-start to-landing-background-end text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Background Image with Fade and Blur */}
      <div
        className="absolute top-0 left-0 w-full h-[900px] bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL + "wallpaper9.jpeg"})`,
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          opacity: 0.7,
          filter: 'blur(4px)',
        }}
      ></div>

      {/* Header - fixed and conditionally blurred */}
      <Header
        isLandingPageHeader={true}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled && "bg-black/10 backdrop-blur-md shadow-md"
        )}
      />

      {/* Placeholder Hero Section */}
      <section className="relative flex flex-col items-start text-left px-4 py-16 max-w-5xl z-10 mt-24 md:mt-32 flex-grow">
        <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-white/80 mb-4">
          Our Story
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white">
          Meet Our Visionary
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl">
          This is where the founder's content will go.
        </p>
      </section>

      {/* Placeholder for content below the hero section */}
      <div className="w-full h-[500px] bg-white dark:bg-gray-900 z-10 flex items-center justify-center">
        <p className="text-2xl text-gray-600 dark:text-gray-400">More content here...</p>
      </div>

      <Footer />
    </div>
  );
};

export default Founders;