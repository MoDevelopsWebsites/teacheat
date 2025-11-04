"use client";

import React, { useState, useEffect } from 'react';
import { Search, X, Plus, User, Calendar, BarChart2, CheckSquare, Clock, List, Grid, ArrowUpCircle, MessageSquareText, Sparkles, FileText, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import MeetingSummaryCard from './MeetingSummaryCard'; // Import the new MeetingSummaryCard
import { cn } from '@/lib/utils';

const WaitlistMockup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Delay for mockup animation after header

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className={cn(
      "relative w-full max-w-3xl h-[400px] bg-gray-100 dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden",
      "transition-all duration-800 ease-out",
      isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10"
    )}>
      <div className="flex items-center p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex space-x-1.5 ml-2">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-grow flex justify-center items-center relative mx-4">
          <Search className="absolute left-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search meetings or AI chats..."
            className="w-full max-w-xs pl-10 pr-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm"
            readOnly
          />
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 mr-2">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex space-x-2 mr-4">
          <Button variant="secondary" className="px-3 py-1 h-auto text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
            <List className="h-3 w-3 mr-1" /> All Meetings
          </Button>
          <Button variant="ghost" className="px-3 py-1 h-auto text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Sparkles className="h-3 w-3 mr-1" /> AI Chats
          </Button>
          <Button variant="ghost" className="px-3 py-1 h-auto text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <FileText className="h-3 w-3 mr-1" /> Notes
          </Button>
          <Button variant="ghost" className="px-3 py-1 h-auto text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Settings className="h-3 w-3 mr-1" /> Settings
          </Button>
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <Button variant="ghost" className="px-3 py-1 h-auto text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <ArrowUpCircle className="h-3 w-3 mr-1" /> Upgrade
          </Button>
          <Button className="px-3 py-1 h-auto text-xs font-medium rounded-md bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            <Plus className="h-3 w-3 mr-1" /> New Meeting
          </Button>
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardContent className="flex-grow p-4 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MeetingSummaryCard
            title="Client Onboarding Call"
            summary="AI-generated summary of key discussion points, including client needs for custom integrations and a follow-up on pricing tiers."
            icon={<MessageSquareText className="h-4 w-4 text-blue-500" />}
            date="Dec 12"
            time="10:00 AM"
            participants={3}
          />
          <MeetingSummaryCard
            title="Team Sync - Q4 Planning"
            summary="Notes on project milestones, resource allocation, and a new marketing campaign strategy. AI suggested a better approach for competitor analysis."
            icon={<FileText className="h-4 w-4 text-green-500" />}
            date="Nov 28"
            time="02:30 PM"
            participants={5}
          />
          <MeetingSummaryCard
            title="Interview Prep - Senior Dev"
            summary="AI provided real-time answers to technical questions and suggested follow-up questions based on candidate's responses. High confidence score."
            icon={<Sparkles className="h-4 w-4 text-purple-500" />}
            date="Nov 27"
            time="01:00 PM"
            participants={2}
          />
          <MeetingSummaryCard
            title="Sales Demo - Product X"
            summary="AI helped with objection handling regarding pricing and feature comparisons. Identified key pain points and suggested relevant case studies."
            icon={<MessageSquareText className="h-4 w-4 text-orange-500" />}
            date="Nov 26"
            time="11:00 AM"
            participants={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WaitlistMockup;