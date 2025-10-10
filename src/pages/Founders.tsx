"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Founders: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust scroll threshold as needed
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
      {/* Mountain Background Image with Fade */}
      <div
        className="absolute top-0 left-0 w-full h-[600px] bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL + "wallpaper9.jpeg"})`, // Using wallpaper9.jpeg for Founders
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', // Fade to bottom
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', // For Webkit browsers
          opacity: 0.7, // Added opacity
          filter: 'blur(4px)', // Added blur effect
        }}
      ></div>

      {/* Header - now fixed and conditionally blurred */}
      <Header
        isLandingPageHeader={true}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled && "bg-black/10 backdrop-blur-md shadow-md" // Changed background to a subtle transparent black
        )}
      />

      {/* Hero Section */}
      <section className="relative flex flex-col items-start text-left px-4 py-16 max-w-5xl z-10 mt-24 md:mt-32 flex-grow"> {/* Added flex-grow */}
        <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-white/80 mb-4">
          Our Story
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white">
          Meet Our Visionary
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl">
          The mind behind Teacheat, dedicated to revolutionizing productivity with AI.
        </p>
        {/* Removed buttons from hero section as per previous request */}
      </section>

      {/* Placeholder for content below the hero section */}
      <div className="w-full h-[500px] bg-white dark:bg-gray-900 z-10 flex items-center justify-center">
        <p className="text-2xl text-gray-600 dark:text-gray-400">More content here...</p>
      </div>

      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export default Founders;