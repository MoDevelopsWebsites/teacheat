"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TestimonialAuthor {
  name: string;
  avatar: string; // URL to avatar image
  title?: string; // Optional title/role
}

interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  stars?: number; // Number of stars, default to 5 as per screenshot
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ author, text, stars = 5, className }) => {
  return (
    <Card className={cn(
      "flex flex-col rounded-xl shadow-md border border-gray-200 bg-gray-50 text-foreground min-w-[280px] max-w-[320px] h-auto",
      className
    )}>
      <div className="p-4 sm:p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p className="text-sm font-semibold text-gray-800">{author.name}</p>
            {author.title && <p className="text-xs text-muted-foreground">{author.title}</p>}
          </div>
        </div>
        {/* This is the new inner white box for stars and text */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-0.5 text-yellow-500 mb-2">
            {[...Array(stars)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </Card>
  );
};