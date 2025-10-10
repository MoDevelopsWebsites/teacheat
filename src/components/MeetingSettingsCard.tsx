"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Mic, Volume2, Waves, Wifi, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  status: string;
  checked: boolean;
  className?: string; // Added className prop
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, label, status, checked, className }) => (
  <div className={cn(
    "flex flex-col items-center text-center relative",
    "cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 active:shadow-inner", // Added interactive classes
    className
  )}>
    <div className="relative w-16 h-16 bg-uiLightBlue dark:bg-uiDarkBlue rounded-xl flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700">
      {icon}
      {checked && (
        <CheckCircle2 className="absolute -top-2 -right-2 h-6 w-6 text-blue-500 bg-white dark:bg-gray-900 rounded-full" fill="currentColor" />
      )}
    </div>
    <p className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400">{status}</p>
  </div>
);

const MeetingSettingsCard: React.FC = () => {
  return (
    <Card className="w-full max-w-md bg-uiLightBlue dark:bg-uiDarkBlue rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
          <Settings className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" /> Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6 p-6">
        <SettingItem
          icon={<Mic className="h-8 w-8 text-blue-500" />}
          label="Microphone"
          status="Connected"
          checked={true}
        />
        <SettingItem
          icon={<Volume2 className="h-8 w-8 text-blue-500" />}
          label="System Audio"
          status="Streaming"
          checked={true}
        />
        <SettingItem
          icon={<Waves className="h-8 w-8 text-blue-500" />}
          label="Voice Events"
          status="Capturing"
          checked={true}
        />
        <SettingItem
          icon={<Wifi className="h-8 w-8 text-blue-500" />}
          label="Network"
          status="Active"
          checked={true}
        />
      </CardContent>
    </Card>
  );
};

export default MeetingSettingsCard;