"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { MessageSquareText, Sparkles, Calendar, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MeetingSummaryCardProps {
  title: string;
  summary: string;
  icon: React.ReactNode;
  date: string;
  time: string;
  participants?: number;
  className?: string;
}

const MeetingSummaryCard: React.FC<MeetingSummaryCardProps> = ({
  title,
  summary,
  icon,
  date,
  time,
  participants = 1,
  className,
}) => {
  return (
    <Card className={cn("bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm shadow-sm", className)}>
      <div className="flex items-center space-x-2 mb-2">
        {icon}
        <span className="font-medium text-gray-900 dark:text-gray-100">{title}</span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">{summary}</p>
      <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-xs">
        <Calendar className="h-3 w-3" />
        <span>{date}</span>
        <Clock className="h-3 w-3" />
        <span>{time}</span>
        <User className="h-3 w-3" />
        <span>{participants}</span>
      </div>
    </Card>
  );
};

export default MeetingSummaryCard;