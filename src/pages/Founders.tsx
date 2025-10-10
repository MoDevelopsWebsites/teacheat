"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sparkles, Code, Rocket, Lightbulb } from 'lucide-react';

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
        className="absolute top-0 left-0 w-full h-[900px] bg-cover bg-center z-0" // Increased height to 900px for more fade room
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL + "wallpaper9.jpeg"})`, // Using wallpaper9.jpeg
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', // Consistent fade
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          opacity: 0.7,
          filter: 'blur(4px)',
        }}
      ></div>

      {/* Floating Background Elements (from previous Founders.tsx) */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000 z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000 z-0"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-green-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-6000 z-0"></div>

      {/* Header - fixed and conditionally blurred */}
      <Header
        isLandingPageHeader={true}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled && "bg-black/10 backdrop-blur-md shadow-md"
        )}
      />

      {/* Hero Section */}
      <section className="relative flex flex-col items-start text-left px-4 py-16 max-w-5xl z-10 mt-24 md:mt-32 flex-grow">
        <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-white/80 mb-4">
          Our Story
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white">
          Meet Our Visionary
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl">
          The mind behind Teacheat, dedicated to revolutionizing productivity with AI.
        </p>
        {/* Removed buttons from hero section */}
      </section>

      {/* Muhammad's Profile Section */}
      <section className="relative w-full py-16 bg-white dark:bg-gray-900 z-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start gap-12">
          <div className="relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-blue-500 transform transition-transform duration-500 hover:scale-105 animate-pulse-border">
            <img
              src={import.meta.env.BASE_URL + "stunna.jpg"}
              alt="Muhammad - CEO & Full Stack Software Engineer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
              <p className="text-xl font-bold">Muhammad</p>
              <p className="text-sm">CEO & Full Stack Software Engineer</p>
            </div>
          </div>

          <div className="flex-grow text-center md:text-left">
            <h2 className="text-4xl font-bold text-landing-text-primary mb-4 animate-fade-in-right animation-delay-1000">
              A Vision for the Future
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 animate-fade-in-right animation-delay-1200">
              Muhammad, the driving force behind Teacheat, is a passionate innovator with a deep understanding of both cutting-edge AI and robust software engineering. His vision is to empower individuals and teams by seamlessly integrating intelligent assistance into daily workflows, making complex tasks simpler and productivity effortless.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 animate-fade-in-right animation-delay-1400">
              With a background in full-stack development, Muhammad meticulously crafts every aspect of Teacheat, ensuring a powerful, reliable, and user-friendly experience. He believes in building tools that not only solve problems but also inspire new ways of working.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 animate-fade-in-right animation-delay-1600">
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium">
                <Sparkles className="h-5 w-5" />
                <span>AI Innovation</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 font-medium">
                <Code className="h-5 w-5" />
                <span>Engineering Excellence</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 font-medium">
                <Lightbulb className="h-5 w-5" />
                <span>User-Centric Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for other founders or a call to action */}
      <section className="w-full py-24 text-center z-10">
        <h2 className="text-4xl font-bold text-landing-text-primary mb-6 animate-fade-in-up animation-delay-2000">
          Join Our Journey
        </h2>
        <p className="text-lg text-landing-text-primary/80 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-2200">
          We're always looking for passionate individuals to contribute to our mission. While this page highlights our founder, our team is growing!
        </p>
        {/* You can add a button here to link to a general "About Us" or "Contact" page if needed */}
      </section>

      <Footer />
    </div>
  );
};

export default Founders;