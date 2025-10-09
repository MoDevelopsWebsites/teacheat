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
      timer = setTimeout(type, 50); // Typing speed (reduced from 100)
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      // Pause at end of typing
      timer = setTimeout(() => setIsDeleting(true), 1000); // Pause duration (reduced from 2000)
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timer = setTimeout(erase, 25); // Deleting speed (reduced from 50)
    } else if (isDeleting && displayedText.length === 0) {
      // Pause at end of deleting, then move to next phrase
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
      }, 250); // Pause before next phrase (reduced from 500)
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