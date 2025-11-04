"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Ellipsis, BarChart2, User, Calendar, Circle, CheckSquare, XSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  title: string;
  description: string;
  statusIcon: 'todo' | 'in-progress' | 'completed' | 'canceled';
  date?: string;
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, statusIcon, date, className }) => {
  const renderStatusIcon = () => {
    switch (statusIcon) {
      case 'todo':
        return <Circle className="h-3 w-3 text-gray-400" />;
      case 'in-progress':
        return <Circle className="h-3 w-3 text-blue-500 fill-blue-500" />;
      case 'completed':
        return <CheckSquare className="h-3 w-3 text-green-500 fill-green-500" />;
      case 'canceled':
        return <XSquare className="h-3 w-3 text-red-500 fill-red-500" />;
      default:
        return <Circle className="h-3 w-3 text-gray-400" />;
    }
  };

  return (
    <Card className={cn(
      "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 text-sm shadow-none",
      className
    )}>
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 leading-tight">{title}</h4>
        <Ellipsis className="h-4 w-4 text-gray-400 cursor-pointer" />
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{description}</p>
      <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-xs">
        {renderStatusIcon()}
        <BarChart2 className="h-3 w-3" />
        <User className="h-3 w-3" />
        {date && (
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;