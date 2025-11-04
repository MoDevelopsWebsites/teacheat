"use client";

import React, { useState, useEffect } from 'react';
import { Search, X, Plus, User, LayoutGrid, List, Sparkles, FileText, Settings, Diamond } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import TaskCard from './TaskCard'; // Import the new TaskCard component
import { cn } from '@/lib/utils';

const WaitlistMockup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Delay for mockup animation after header

    return () => clearTimeout(timer);
  }, []);

  const kanbanColumns = [
    {
      id: 'todo',
      title: 'Todo',
      tasks: [
        { title: 'AI Meeting Summary', description: 'Generate concise summaries for all team meetings.', statusIcon: 'todo', date: 'Dec 12' },
        { title: 'Interview Prep - Senior Dev', description: 'Prepare AI-powered answers for common technical interview questions.', statusIcon: 'todo', date: 'Nov 28' },
        { title: 'Sales Call Analysis', description: 'Analyze sales calls for key insights and objection handling strategies.', statusIcon: 'todo', date: 'Nov 28' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { title: 'Client Onboarding Call', description: 'AI-generated summary of key discussion points, including client needs for custom integrations.', statusIcon: 'in-progress', date: 'Nov 28' },
        { title: 'Team Sync - Q4 Planning', description: 'Notes on project milestones, resource allocation, and new marketing campaign strategy.', statusIcon: 'in-progress', date: 'Nov 28' },
      ],
    },
    {
      id: 'completed',
      title: 'Completed',
      tasks: [
        { title: 'Product Feature Brainstorm', description: 'AI-assisted brainstorming session for new product features.', statusIcon: 'completed', date: 'Oct 21' },
        { title: 'Marketing Campaign Review', description: 'Review AI-generated insights from recent marketing campaign performance.', statusIcon: 'completed', date: 'Oct 21' },
      ],
    },
    {
      id: 'canceled',
      title: 'Canceled',
      tasks: [
        { title: 'Competitor Analysis', description: 'Initial AI-driven analysis of competitor strategies (postponed).', statusIcon: 'canceled', date: 'Oct 01' },
      ],
    },
  ];

  return (
    <Card className={cn(
      "relative w-full max-w-5xl h-[500px] bg-white dark:bg-white rounded-xl flex flex-col overflow-hidden",
      "transition-all duration-800 ease-out",
      isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10"
    )}>
      {/* Top Bar */}
      <div className="flex items-center p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex space-x-1.5 ml-2">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-grow flex justify-center items-center relative mx-4">
          <Search className="absolute left-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search tasks"
            className="w-full max-w-xs pl-10 pr-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm"
            readOnly
          />
        </div>
        <div className="flex items-center space-x-2 mr-2">
          <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 text-xs font-medium flex items-center">
            <Diamond className="h-3 w-3 mr-1 text-blue-500" /> Upgrade
          </Badge>
          <Button className="px-3 py-1 h-auto text-xs font-medium rounded-md bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            <Plus className="h-3 w-3 mr-1" /> New project
          </Button>
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Secondary Nav Bar */}
      <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex space-x-2 mr-4">
          <Button variant="secondary" className="px-3 py-1 h-auto text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center">
            <LayoutGrid className="h-3 w-3 mr-1" /> My projects
          </Button>
          {kanbanColumns.map(col => (
            <Button key={col.id} variant="ghost" className="px-3 py-1 h-auto text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
              {col.id === 'todo' && <List className="h-3 w-3 mr-1" />}
              {col.id === 'in-progress' && <Sparkles className="h-3 w-3 mr-1" />}
              {col.id === 'completed' && <FileText className="h-3 w-3 mr-1" />}
              {col.id === 'canceled' && <X className="h-3 w-3 mr-1" />}
              {col.title}
            </Button>
          ))}
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Area - Kanban Board */}
      <CardContent className="flex-grow p-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="h-full overflow-x-auto pb-4"> {/* Added pb-4 for horizontal scrollbar space */}
          <div className="flex space-x-4 h-full">
            {kanbanColumns.map(column => (
              <div key={column.id} className="flex-shrink-0 w-64 bg-gray-100 dark:bg-gray-800 rounded-md p-3 flex flex-col shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{column.title} ({column.tasks.length})</h3>
                  <Ellipsis className="h-4 w-4 text-gray-400 cursor-pointer" />
                </div>
                <div className="space-y-3 flex-grow overflow-y-auto pr-1 -mr-1"> {/* Added pr-1 -mr-1 for scrollbar */}
                  {column.tasks.map((task, index) => (
                    <TaskCard key={index} {...task} />
                  ))}
                  <Button variant="ghost" className="w-full justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs py-2 h-auto">
                    <Plus className="h-3 w-3 mr-1" /> Add card
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Overlay for fade-out effect at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent pointer-events-none"></div>
      </CardContent>
    </Card>
  );
};

export default WaitlistMockup;