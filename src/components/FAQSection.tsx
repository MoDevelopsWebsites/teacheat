"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "Why real-time vs. a regular AI notetaker?",
      answer: "Teacheat provides answers and suggestions during your call, not just a recap afterwards. This means you can use AI to improve your performance in the moment, rather than just reviewing what happened."
    },
    {
      question: "Who is Teacheat for?",
      answer: "Teacheat is designed for anyone who wants to be more prepared and effective in their online meetings, sales calls, interviews, or even during homework sessions. It's your personal AI assistant for real-time support."
    },
    {
      question: "Is Teacheat free?",
      answer: "Teacheat offers a free tier with basic features, and premium plans for advanced functionalities and higher usage limits. Check our pricing page for more details!"
    },
    {
      question: "How is it undetectable in meetings?",
      answer: "Teacheat operates locally on your device and does not join your meetings as a participant. It captures audio and screen content without appearing in shared screens, recordings, or external meeting tools, making it completely invisible to others."
    },
    {
      question: "What languages and apps are supported?",
      answer: "Teacheat supports a wide range of languages for transcription and real-time assistance. It integrates seamlessly with popular meeting platforms like Zoom, Slack, Webex, and Microsoft Teams, and works across various applications on your desktop."
    },
    {
      question: "Can I talk to customer support?",
      answer: "Yes, absolutely! Our customer support team is available to assist you with any questions or issues you might have. You can reach us via email, chat, or through our dedicated support portal."
    },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-16 z-10 bg-white dark:bg-gray-900">
      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-12 text-center text-landing-text-primary">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-700">
            <AccordionTrigger className="text-lg font-medium text-landing-text-primary hover:no-underline py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-700 dark:text-gray-300 pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;