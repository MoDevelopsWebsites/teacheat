"use client";

import React, { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  words: string[];
  speed?: number;
  delay?: number;
  loop?: boolean;
  key?: number;
  revealImage?: boolean;
}

export const useTypewriter = ({
  words,
  speed = 100,
  delay = 1500,
  loop = true,
  key = 0,
  revealImage = false,
}: UseTypewriterOptions) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setCurrentWordIndex(0);
    setCurrentText('');
    setIsDeleting(false);
    setIsTypingComplete(false);
  }, [key]);

  useEffect(() => {
    if (!words || words.length === 0) {
      setCurrentText('');
      return;
    }
    if (currentWordIndex >= words.length) {
      if (!loop) {
        return;
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
      if (revealImage) {
        setIsTypingComplete(true);
        if (!loop) return;
      }
      if (!loop && words.length === 1) {
        clearTimeout(timer);
        return;
      }
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setIsTypingComplete(false);
      setCurrentWordIndex((prev) => (loop ? (prev + 1) % words.length : prev + 1));
      if (!loop && currentWordIndex === words.length - 1) {
        clearTimeout(timer);
        return;
      }
      timer = setTimeout(handleTyping, speed);
    } else {
      const typingSpeed = isDeleting ? speed / 2 : speed;
      timer = setTimeout(handleTyping, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentWordIndex, currentText, isDeleting, words, speed, delay, loop, key, revealImage]);

  return { currentText, isTypingComplete };
};