"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, FileText, EyeOff, BarChart2, Settings, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card className="flex flex-col items-start p-6 rounded-xl shadow-sm border border-border bg-card text-foreground h-full">
    <div className="mb-4 text-primary">
      {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8" })}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Card>
);

const FeaturesGridSection: React.FC = () => {
  const features = [
    {
      icon: <Sparkles />,
      title: "Real-time AI Answers",
      description: "Get instant, context-aware responses during your calls, meetings, or interviews.",
    },
    {
      icon: <FileText />,
      title: "Automated Meeting Notes",
      description: "Generate comprehensive summaries, action items, and key takeaways effortlessly.",
    },
    {
      icon: <EyeOff />,
      title: "Undetectable Mode",
      description: "AI assistance that's completely invisible to other participants in your calls.",
    },
    {
      icon: <BarChart2 />,
      title: "Post-Call Analytics",
      description: "Gain insights into performance, AI usage, and missed opportunities after every interaction.",
    },
    {
      icon: <Settings />,
      title: "Customizable AI Prompts",
      description: "Tailor AI behavior and responses to your specific workflow and industry needs.",
    },
    {
      icon: <Database />,
      title: "Knowledge Base Integration",
      description: "Connect Teacheat to your company's internal knowledge for smarter, more relevant AI.",
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
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGridSection;