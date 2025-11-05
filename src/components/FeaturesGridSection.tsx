"use client";

import React from 'react';
import { Code, EyeOff, LayoutDashboard, Filter } from 'lucide-react'; // Added LayoutDashboard and Filter
import { cn } from '@/lib/utils';
import IllustrativeFeatureCard from './IllustrativeFeatureCard';
import TextFeatureCard from './TextFeatureCard';

const FeaturesGridSection: React.FC = () => {
  const featuresData = [
    {
      type: 'illustrative',
      title: "Comprehensive Meeting Overviews",
      description: "Get detailed transcripts, summaries, and action items from every call.",
      illustration: (
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
      ),
      gridClasses: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3"
    },
    {
      type: 'text',
      title: "Distraction-Free Environment",
      description: "Focus on your meeting with AI assistance that stays out of your way.",
      icon: <EyeOff />,
      gridClasses: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2"
    },
    {
      type: 'illustrative',
      title: "Flexible Export Options",
      description: "Export your meeting data in various formats for easy sharing and integration.",
      illustration: (
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="8" y1="12" x2="16" y2="12"></line>
          <line x1="8" y1="16" x2="16" y2="16"></line>
          <line x1="10" y1="20" x2="14" y2="20"></line>
        </svg>
      ),
      gridClasses: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3"
    },
    {
      type: 'text',
      title: "Clean & Intuitive Interface",
      description: "A minimalist design ensures you get insights without visual clutter.",
      icon: <LayoutDashboard />,
      gridClasses: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3"
    },
    {
      type: 'illustrative',
      title: "Adaptive AI Display",
      description: "Teacheat's interface seamlessly adapts to your screen size and workflow.",
      illustration: (
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
          <rect x="16" y="10" width="6" height="8" rx="1" ry="1"></rect>
        </svg>
      ),
      gridClasses: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-5"
    },
    {
      type: 'text',
      title: "Tailored AI Prompts",
      description: "Customize AI behavior and responses to fit your specific needs.",
      icon: <Code />,
      gridClasses: "lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-4"
    },
    {
      type: 'illustrative',
      title: "Seamless Dark Mode Integration",
      description: "Enjoy Teacheat in your preferred theme, day or night.",
      illustration: (
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          <path d="M19 10h-2"></path>
          <path d="M12 21v-2"></path>
          <path d="M5 10H3"></path>
          <path d="M12 3v2"></path>
          <path d="M17.2 6.8l-1.4 1.4"></path>
          <path d="M6.8 17.2l-1.4 1.4"></path>
          <path d="M18.6 18.6l-1.4-1.4"></path>
          <path d="M8.2 8.2l-1.4-1.4"></path>
        </svg>
      ),
      gridClasses: "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-5"
    },
    {
      type: 'text',
      title: "Personalized View",
      description: "Adjust what Teacheat shows you for a truly custom experience.",
      icon: <Filter />,
      gridClasses: "lg:col-start-2 lg:col-end-3 lg:row-start-4 lg:row-end-5"
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
          Smart features for flawless meetings
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-12 sm:mb-16">
          Everything you need — from real-time assistance to comprehensive analytics and custom knowledge integration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuresData.map((feature, index) => {
            if (feature.type === 'illustrative') {
              return (
                <IllustrativeFeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  illustration={feature.illustration}
                  className={feature.gridClasses}
                />
              );
            } else {
              return (
                <TextFeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  className={feature.gridClasses}
                />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGridSection;