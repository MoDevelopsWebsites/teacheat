"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface AnimatedInputProps {
  phrases: string[];
  className?: string;
  placeholder?: string;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({ phrases, className, placeholder }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[currentPhraseIndex];

    const type = () => {
      setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
    };

    const erase = () => {
      setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
    };

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      // Typing
      timer = setTimeout(type, 100); // Typing speed
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      // Pause at end of typing
      timer = setTimeout(() => setIsDeleting(true), 2000); // Pause duration
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timer = setTimeout(erase, 50); // Deleting speed
    } else if (isDeleting && displayedText.length === 0) {
      // Pause at end of deleting, then move to next phrase
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
      }, 500); // Pause before next phrase
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <Input
      value={displayedText}
      placeholder={placeholder}
      className={className}
      readOnly
    />
  );
};

export default AnimatedInput;