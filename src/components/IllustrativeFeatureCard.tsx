"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface IllustrativeFeatureCardProps {
  illustration: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const IllustrativeFeatureCard: React.FC<IllustrativeFeatureCardProps> = ({ illustration, title, description, className }) => {
  return (
    <Card className={cn(
      "flex flex-col p-4 sm:p-6 rounded-xl shadow-sm border border-border bg-card text-foreground h-full",
      className
    )}>
      <div className="flex-grow flex items-center justify-center mb-4">
        {illustration}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
};

export default IllustrativeFeatureCard;