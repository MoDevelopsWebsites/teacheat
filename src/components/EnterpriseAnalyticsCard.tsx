"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search, Calendar, Clock, Trash2, MessageSquareText, CheckCircle2, ArrowLeft, Settings, Zap, SlidersHorizontal, User as UserIcon, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from '@/lib/utils';

const EnterpriseAnalyticsCard: React.FC = () => {
  return (
    <Card className="relative w-full max-w-6xl h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25} className="bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
              <span className="font-bold text-lg">Teacheat</span>
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input placeholder="Search" className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <nav className="space-y-2 text-sm font-medium flex-grow">
            <Button variant="ghost" className="w-full justify-start text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30">
              <Zap className="h-4 w-4 mr-2" /> My activity
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <SlidersHorizontal className="h-4 w-4 mr-2" /> Personalize
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
          </nav>
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  RL
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Roy Lee</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">roy@teacheat.com</span>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Content Area */}
        <ResizablePanel defaultSize={80} className="flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Button variant="ghost" className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <div className="flex space-x-4">
              <Button variant="ghost" className="rounded-none border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-2 -mb-px hover:border-gray-300 dark:hover:border-gray-600">
                See insights
              </Button>
              <Button variant="ghost" className="rounded-none border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold pb-2 -mb-px">
                Usage
              </Button>
              <Button variant="ghost" className="rounded-none border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-2 -mb-px hover:border-gray-300 dark:hover:border-gray-600">
                Missed opportunities
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            {/* Left Content Pane */}
            <div className="flex flex-col p-6 overflow-y-auto">
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Enterprise Teacheat client onboarding: initial consultation
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                  <MessageSquareText className="h-3 w-3 mr-1" /> Meeting
                </Badge>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-gray-500" /> May 23
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-gray-500" /> 11:00 AM - 4:00 PM
                </div>
                <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Times used</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">5</span>
                </div>
                <div className="flex flex-col p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Missed opportunities</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">6</span>
                </div>
                <div className="flex flex-col p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Success rate</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">75%</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Summary</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1 mb-6">
                <li>A new enterprise with <span className="font-semibold">600+ seats</span> and a <span className="font-semibold">$10M payment volume</span> is now onboarding.</li>
                <li>Teacheat Client struggled with migrating their team over. Google Suite <span className="font-semibold">Directory Sync</span> is needed to <span className="font-semibold">automatically add the team</span>.</li>
                <li>Teacheat began to demonstrate comfort with the platform, completing the key engagement steps of <span className="font-semibold">optimizing their first bill</span> and completing seat migration.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Action Items</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1">
                <li>Offer a backtest of payment optimization on our product vs. the old product.</li>
                <li>Continue to confirm and redefine success metrics for the enterprise onboarding experience.</li>
              </ul>
            </div>

            {/* Right Chat Pane */}
            <div className="flex flex-col p-6 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                  <span>Teacheat helped turn this moment around.</span>
                  <span>02:15</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-800 dark:text-gray-200">
                    <p>Honestly, bringing my whole team over has been a headache this week.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-800 dark:text-blue-200">
                    <p className="font-semibold mb-1">Teacheat's suggestion</p>
                    <p>I totally understand. I'd love to handle the rest of the process for you to get to product ROI faster.</p>
                  </div>
                </div>
                <div className="flex items-center justify-end text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Suggestion used
                </div>

                <Separator className="bg-gray-200 dark:bg-gray-700" />

                <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                  <span>Teacheat helped turn this moment around.</span>
                  <span>08:53</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-800 dark:text-gray-200">
                    <p>My team needs specific roles, but I'm not sure I have the bandwidth to change permissions manually.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-800 dark:text-blue-200">
                    <p className="font-semibold mb-1">Teacheat's suggestion</p>
                    <p>Let's use Google for directory role sync.</p>
                  </div>
                </div>
                <div className="flex items-center justify-end text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Suggestion used
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Card>
  );
};

export default EnterpriseAnalyticsCard;