"use client";

import React from 'react';
import { Search, X, Plus, User, Calendar, BarChart2, CheckSquare, Clock, List, Grid, ArrowUpCircle } from 'lucide-react'; // Replaced Upgrade with ArrowUpCircle
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  title: string;
  description: string;
  statusIcon: React.ReactNode;
  date: string;
  isCompleted?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, statusIcon, date, isCompleted = false }) => (
  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        {statusIcon}
        <span className="font-medium text-gray-900 dark:text-gray-100">{title}</span>
      </div>
      <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="sr-only">Options</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="1" fill="currentColor"/>
          <circle cx="8" cy="3" r="1" fill="currentColor"/>
          <circle cx="8" cy="13" r="1" fill="currentColor"/>
        </svg>
      </Button>
    </div>
    <p className="text-gray-600 dark:text-gray-400 mb-3">{description}</p>
    <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-xs">
      {isCompleted ? <CheckSquare className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
      <BarChart2 className="h-3 w-3" />
      <User className="h-3 w-3" />
      <Calendar className="h-3 w-3" />
      <span>{date}</span>
    </div>
  </Card>
);

const WaitlistMockup: React.FC = () => {
  return (
    <Card className="relative w-full max-w-4xl h-[450px] bg-gray-100 dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
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
        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 mr-2">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex space-x-2 mr-4">
          <Button variant="secondary" className="px-3 py-1 h-auto text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
            <Grid className="h-3 w-3 mr-1" /> My projects
          </Button>
          <Button variant="ghost" className="px-3 py-1 h-auto text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Clock className="h-3 w-3 mr-1" /> Todo
          </Button>
          <Button variant="ghost" className="px-3 py-1 h-auto text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <BarChart2 className="h-3 w-3 mr-1" /> In Progress
          </Button>
          <Button variant="ghost" className="px-3 py-1 h-auto text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <CheckSquare className="h-3 w-3 mr-1" /> Completed
          </Button>
          <Button variant="ghost" className="px-3 py-1 h-auto text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="h-3 w-3 mr-1" /> Canceled
          </Button>
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <Button variant="ghost" className="px-3 py-1 h-auto text-xs font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <ArrowUpCircle className="h-3 w-3 mr-1" /> Upgrade
          </Button>
          <Button className="px-3 py-1 h-auto text-xs font-medium rounded-md bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            <Plus className="h-3 w-3 mr-1" /> New project
          </Button>
          <Avatar className="h-6 w-6">
            <span className="sr-only">User Avatar</span>
            <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </Avatar>
        </div>
      </div>

      <CardContent className="flex-grow p-4 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-medium mb-2">
              <Clock className="h-3 w-3 mr-1" /> Todo
            </div>
            <TaskCard
              title="Lunan - Mobile App Dev"
              description="Lunan is a full-service app development agency"
              statusIcon={<Clock className="h-3 w-3 text-gray-500 dark:text-gray-400" />}
              date="Dec 12"
            />
            <TaskCard
              title="Slane - Web design"
              description="Slane is a minimalist productivity app for individuals"
              statusIcon={<Clock className="h-3 w-3 text-gray-500 dark:text-gray-400" />}
              date="Nov 28"
            />
            <TaskCard
              title="Slane - Web design"
              description="Slane is a minimalist productivity app for individuals"
              statusIcon={<Clock className="h-3 w-3 text-gray-500 dark:text-gray-400" />}
              date="Nov 28"
            />
            <Button variant="ghost" className="w-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-medium mb-2">
              <BarChart2 className="h-3 w-3 mr-1" /> In progress
            </div>
            <TaskCard
              title="Halite - iOS App Design"
              description="Halite is a cloud storage solution for iOS"
              statusIcon={<BarChart2 className="h-3 w-3 text-blue-500" />}
              date="Nov 28"
            />
            <TaskCard
              title="Ponto - UX Research"
              description="Ponto is a social network for connecting researchers"
              statusIcon={<BarChart2 className="h-3 w-3 text-blue-500" />}
              date="Nov 28"
            />
            <TaskCard
              title="Ponto - UX Research"
              description="Ponto is a social network for connecting researchers"
              statusIcon={<BarChart2 className="h-3 w-3 text-blue-500" />}
              date="Nov 28"
            />
            <Button variant="ghost" className="w-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-medium mb-2">
              <CheckSquare className="h-3 w-3 mr-1" /> Completed
            </div>
            <TaskCard
              title="Ponto - UX Research"
              description="Ponto is a social network for connecting researchers"
              statusIcon={<CheckSquare className="h-3 w-3 text-green-500" />}
              date="Oct 01"
              isCompleted={true}
            />
            <TaskCard
              title="Skara - Backend Infrastructure"
              description="Skara provides tools for managing backend infrastructure"
              statusIcon={<CheckSquare className="h-3 w-3 text-green-500" />}
              date="Oct 01"
              isCompleted={true}
            />
            <Button variant="ghost" className="w-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-medium mb-2">
              <X className="h-3 w-3 mr-1" /> Canceled
            </div>
            <TaskCard
              title="Skara - Backend Infrastructure"
              description="Skara provides tools for managing backend infrastructure"
              statusIcon={<X className="h-3 w-3 text-red-500" />}
              date="Oct 01"
              isCompleted={true}
            />
            <Button variant="ghost" className="w-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaitlistMockup;