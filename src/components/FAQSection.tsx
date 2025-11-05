"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from 'lucide-react'; // Import Plus and Minus icons

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
    <section className="w-full px-4 py-12 sm:px-6 sm:py-16 z-10 bg-white dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 text-center text-landing-text-primary">
        Frequently asked questions
      </h2>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        Everything you need to know before taking your first step with Teacheat.
      </p>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4"> {/* Added space-y-4 for gap between items */}
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800" // Card styling
            >
              <AccordionTrigger className="group flex items-center justify-between p-4 text-base sm:text-lg font-medium text-gray-900 dark:text-white hover:no-underline [&>svg]:hidden">
                <span className="text-left">{faq.question}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors duration-200 dark:bg-gray-700 dark:text-gray-300 group-data-[state=open]:bg-gray-200 dark:group-data-[state=open]:bg-gray-600">
                  <Plus className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:hidden" />
                  <Minus className="h-5 w-5 transition-transform duration-200 group-data-[state=closed]:hidden" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;