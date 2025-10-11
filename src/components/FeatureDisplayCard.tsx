"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface FeatureDisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  iconClassName?: string;
  titleClassName?: string;
}

const FeatureDisplayCard: React.FC<FeatureDisplayCardProps> = ({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title,
  description,
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}) => {
  return (
    <div
      className={cn(
        "relative flex h-36 w-full max-w-sm select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      {/* Removed date as it's not relevant for feature cards */}
    </div>
  );
};

export default FeatureDisplayCard;