"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search, Calendar, Clock, Trash2, MessageSquareText, CheckCircle2, ArrowLeft, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const MeetingRecapCard: React.FC = () => {
  return (
    <Card className="relative w-full max-w-5xl h-auto md:h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-800 md:border-r border-gray-200 dark:border-gray-700 flex flex-col p-4">
        <div className="flex items-center justify-between mb-4 md:mb-6"> {/* Adjusted margin for mobile */}
          <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <span className="font-bold text-lg">Teacheat</span>
            <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        <div className="relative mb-4 md:mb-6"> {/* Adjusted margin for mobile */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input placeholder="Search" className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
        </div>
        <nav className="space-y-2 text-sm font-medium">
          <Button variant="ghost" className="w-full justify-start text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30">
            <MessageSquareText className="h-4 w-4 mr-2" /> My activity
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <CheckCircle2 className="h-4 w-4 mr-2" /> Personalize
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Settings className="h-4 w-4 mr-2" /> Settings
          </Button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col p-4 md:p-6 overflow-y-auto"> {/* Adjusted padding for mobile */}
        <div className="flex items-center mb-4 md:mb-6"> {/* Adjusted margin for mobile */}
          <Button variant="ghost" className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        </div>

        <CardHeader className="p-0 mb-4 md:mb-6"> {/* Adjusted margin for mobile */}
          <CardTitle className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2"> {/* Adjusted text sizes for mobile */}
            Parent-tutor consultation on educational services
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400"> {/* Adjusted spacing for mobile */}
            <div className="flex items-center">
              <MessageSquareText className="h-4 w-4 mr-1 text-blue-500" /> Meeting
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-gray-500" /> May 23
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-gray-500" /> 11:00 AM - 1:00 PM
            </div>
            <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </CardHeader>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"> {/* Adjusted grid and gap for mobile */}
          {/* Left Column: Summary & Action Items */}
          <div className="col-span-1 md:col-span-2 flex flex-col"> {/* Adjusted col-span for mobile */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Times used</span>
                <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">2</span> {/* Adjusted text sizes for mobile */}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Missed opportunities</span>
                <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">6</span> {/* Adjusted text sizes for mobile */}
              </div>
            </div>

            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">Summary</h3> {/* Adjusted text sizes for mobile */}
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1 mb-4 md:mb-6"> {/* Adjusted margin for mobile */}
              <li>Mrs. Rivera seeks <span className="font-semibold">tutoring for her first-grade daughter, Mia</span>, who struggles with early reading and phonics.</li>
              <li>The assistant highlighted their personalized, high-quality tutoring with <span className="font-semibold">experienced tutors</span>, session recordings, and support tools.</li>
              <li>Mrs. Rivera's concerns about online tutoring were eased by explaining the interactive, <span className="font-semibold">engaging session format</span>.</li>
            </ul>

            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">Action items</h3> {/* Adjusted text sizes for mobile */}
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1">
              <li>Send Mrs. Rivera the intake form, pricing information, and short videos</li>
            </ul>
          </div>

          {/* Right Column: Usage & Missed Opportunities */}
          <div className="col-span-1 md:border-l border-gray-200 dark:border-gray-700 md:pl-6 pt-4 md:pt-0 flex flex-col"> {/* Adjusted padding for mobile */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <Button variant="ghost" className="rounded-none border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold pb-2 -mb-px">
                Usage
              </Button>
              <Button variant="ghost" className="rounded-none text-gray-600 dark:text-gray-400 pb-2 -mb-px">
                Missed opportunities
              </Button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                <span>Teacheat helped turn this moment around.</span>
                <span>02:15</span>
              </div>
              <div className="flex items-start space-x-2">
                <MessageSquareText className="h-4 w-4 text-gray-400 dark:text-gray-500 mt-1" />
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-800 dark:text-gray-200">
                  <p>Thanks for calling. I've just been trying to find help for my daughter Mia.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MessageSquareText className="h-4 w-4 text-blue-500 mt-1" />
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-800 dark:text-blue-200">
                  <p>Discovery Q: "What feedback has Mia's teacher shared about phonics benchmarks?"</p>
                </div>
              </div>
              <div className="flex items-center justify-end text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4 mr-1" /> Suggestion used
              </div>

              <Separator className="bg-gray-200 dark:bg-gray-700" />

              <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                <span>Teacheat helped turn this moment around.</span>
                <span>07:34</span>
              </div>
              <div className="flex items-start space-x-2">
                <MessageSquareText className="h-4 w-4 text-gray-400 dark:text-gray-500 mt-1" />
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-800 dark:text-gray-200">
                  <p>She gets upset when she can't read the words, and I don't know how to help her at home.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MeetingRecapCard;