"use client";

import React, { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  words: string[];
  speed?: number; // Typing speed in ms per character
  delay?: number; // Delay before starting next word/phrase
  loop?: boolean; // Whether to loop through words
  key?: number; // Optional key to reset the animation
  revealImage?: boolean; // New option to enable image reveal effect
}

export const useTypewriter = ({
  words,
  speed = 100,
  delay = 1500,
  loop = true,
  key = 0, // Default key to 0
  revealImage = false, // Default to false
}: UseTypewriterOptions) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false); // New state for revealImage

  // Reset state when the key prop changes
  useEffect(() => {
    setCurrentWordIndex(0);
    setCurrentText('');
    setIsDeleting(false);
    setIsTypingComplete(false); // Reset for revealImage
  }, [key]);

  useEffect(() => {
    // Guard clause to prevent errors if words array is empty or index is invalid
    if (!words || words.length === 0) {
      setCurrentText('');
      return;
    }
    if (currentWordIndex >= words.length) {
      // If not looping and we've gone past the last word, stop.
      // If looping, reset to 0.
      if (!loop) {
        return; // Stop animation if not looping and all words processed
      }
      setCurrentWordIndex(0);
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
      // Finished typing
      if (revealImage) {
        setIsTypingComplete(true); // Mark typing as complete for reveal effect
        if (!loop) return; // If revealImage and not looping, stop here.
      }
      if (!loop && words.length === 1) { // If not looping and only one word, stop after typing it
        return;
      }
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      // Finished deleting, move to next word after a delay
      setIsDeleting(false);
      setIsTypingComplete(false); // Reset for revealImage
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
  }, [currentWordIndex, currentText, isDeleting, words, speed, delay, loop, key, revealImage]); // Add revealImage to dependencies

  return { currentText, isTypingComplete };
};