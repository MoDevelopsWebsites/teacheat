"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card"; // Assuming it uses shadcn Card

interface DisplayCardItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  iconClassName?: string;
  titleClassName?: string;
}

interface DisplayCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: DisplayCardItem[]; // Make items optional and provide a default
}

const DisplayCards = React.forwardRef<HTMLDivElement, DisplayCardsProps>(
  ({ className, items = [], ...props }, ref) => { // Default items to an empty array
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
          className
        )}
        {...props}
      >
        {items.map((item, index) => (
          <Card key={index} className="flex flex-col justify-between p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
              <div className={cn("rounded-full p-2", item.iconClassName)}>
                {item.icon}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
            </CardHeader>
            <CardContent className="p-0 mt-auto">
              <CardTitle className={cn("text-lg font-semibold", item.titleClassName)}>{item.title}</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
);
DisplayCards.displayName = "DisplayCards";

export default DisplayCards;