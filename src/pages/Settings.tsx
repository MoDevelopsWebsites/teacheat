"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-full bg-white dark:bg-gray-900">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            This is the settings page. More options will be available here soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;