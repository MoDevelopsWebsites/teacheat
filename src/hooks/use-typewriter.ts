"use client";

import React, { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  words: string[];
  speed?: number; // Typing speed in ms per character
  delay?: number; // Delay before starting next word/phrase
  loop?: boolean; // Whether to loop through words
  key?: number; // Optional key to reset the animation
}

export const useTypewriter = ({
  words,
  speed = 100,
  delay = 1500,
  loop = true,
  key = 0, // Default key to 0
}: UseTypewriterOptions) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset state when the key prop changes
  useEffect(() => {
    setCurrentWordIndex(0);
    setCurrentText('');
    setIsDeleting(false);
  }, [key]);

  useEffect(() => {
    // Guard clause to prevent errors if words array is empty or index is invalid
    if (!words || words.length === 0) {
      setCurrentText('');
      return;
    }
    if (currentWordIndex >= words.length) {
      setCurrentWordIndex(0); // Reset index if it somehow goes out of bounds
      return;
    }

    let timer: NodeJS.Timeout;
    const currentFullWord = words[currentWordIndex];

    const handleTyping = () => {
      if (isDeleting) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
      } else {
        setCurrentText((prev) => currentFullWord.substring(0, prev.length + 1));
      }
    };

    if (!isDeleting && currentText === currentFullWord) {
      // Finished typing, start deleting after a delay
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      // Finished deleting, move to next word after a delay
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (loop ? (prev + 1) % words.length : prev + 1));
      if (!loop && currentWordIndex === words.length - 1) {
        // If not looping and last word, stop
        clearTimeout(timer);
        return;
      }
      timer = setTimeout(handleTyping, speed); // Small delay before typing next word
    } else {
      // Continue typing or deleting
      const typingSpeed = isDeleting ? speed / 2 : speed; // Faster deleting
      timer = setTimeout(handleTyping, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentWordIndex, currentText, isDeleting, words, speed, delay, loop, key]); // Add key to dependencies

  return currentText;
};