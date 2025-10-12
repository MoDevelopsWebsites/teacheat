"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkles, FileText, EyeOff } from "lucide-react"; // Added for default icons if needed, though DisplayCardsDemo provides them

interface DisplayCardItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  iconClassName?: string;
  titleClassName?: string;
}

interface DisplayCardsProps {
  items?: DisplayCardItemProps[]; // Make items optional
}

const DisplayCards: React.FC<DisplayCardsProps> = ({ items = [] }) => { // Provide default empty array
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
      {items.map((item, index) => (
        <Card key={index} className="flex flex-col items-start p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
          <div className={cn("p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 mb-3", item.iconClassName)}>
            {item.icon}
          </div>
          <h3 className={cn("text-lg font-semibold text-gray-900 dark:text-white mb-1", item.titleClassName)}>
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {item.description}
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-500 mt-auto">
            {item.date}
          </span>
        </Card>
      ))}
    </div>
  );
};

export default DisplayCards;