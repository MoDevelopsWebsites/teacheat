"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const FloatingGetStartedButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleGetStartedClick = () => {
    navigate('/pricing');
  };

  return (
    <Button
      className={cn(
        "fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out",
        "bg-gradient-to-br from-landing-button-gradient-start to-landing-button-gradient-end text-white hover:from-landing-button-gradient-hover-start hover:to-landing-button-gradient-hover-end rounded-lg px-6 py-2 text-sm font-semibold shadow-button-glow-hover",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}
      onClick={handleGetStartedClick}
    >
      <Apple className="h-4 w-4 mr-2" /> Get Started
    </Button>
  );
};

export default FloatingGetStartedButton;