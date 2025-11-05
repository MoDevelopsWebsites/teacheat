"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TextFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const TextFeatureCard: React.FC<TextFeatureCardProps> = ({ icon, title, description, className }) => (
  <Card className={cn(
    "flex flex-col items-start p-4 sm:p-6 rounded-xl shadow-sm border border-border bg-card text-foreground h-full",
    className
  )}>
    <div className="mb-4 text-primary">
      {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 sm:h-8 sm:w-8" })}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Card>
);

export default TextFeatureCard;