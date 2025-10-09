"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface MeetingPlatformLogosProps {
  className?: string;
}

const MeetingPlatformLogos: React.FC<MeetingPlatformLogosProps> = ({ className }) => {
  const logos = [
    { src: "/zoom-logo.svg", alt: "Zoom Logo", label: "Zoom" },
    { src: "/slack-logo.svg", alt: "Slack Logo", label: "Slack" },
    { src: "/webex-logo.svg", alt: "Webex Logo", label: "Webex" },
    { src: "/microsoft-teams-logo.svg", alt: "Microsoft Teams Logo", label: "Microsoft Teams" },
  ];

  return (
    <div className={cn("flex flex-wrap justify-center gap-x-12 gap-y-8", className)}>
      {logos.map((logo, index) => (
        <div key={index} className="flex items-center space-x-3">
          <img src={logo.src} alt={logo.alt} className="h-6 w-6" />
          <span className="text-lg font-medium text-undetectable-text-primary">{logo.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MeetingPlatformLogos;