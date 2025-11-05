"use client";

import React, { useState } from 'react';
import MeetingWindowMockup from './MeetingWindowMockup';
import MeetingSummaryCard from './MeetingSummaryCard'; // Import MeetingSummaryCard
import TaskCard from './TaskCard'; // Import TaskCard
import { MessageSquareText, Sparkles } from 'lucide-react'; // Import icons for cards
import IsometricGridBackground from './IsometricGridBackground'; // Import the new background component

const ProductIllustration: React.FC = () => {
  // Static AI response for the simplified illustration
  const currentAiResponse = "The client is interested in a solution that integrates with their existing CRM and provides real-time analytics.";

  return (
    <div className="relative w-full max-w-full h-[700px] md:h-[800px] lg:h-[900px] flex items-center justify-center p-4">
      {/* Isometric Grid Background */}
      <IsometricGridBackground className="absolute inset-0" />

      {/* Floating Meeting Summary Card (Top Left) */}
      <div className="absolute top-10 left-10 z-10 w-64 transform -rotate-6 animate-float">
        <MeetingSummaryCard
          title="Client Onboarding"
          summary="Discussed CRM integration and real-time analytics needs for the new client."
          icon={<MessageSquareText className="h-4 w-4 text-blue-500" />}
          date="May 23"
          time="11:00 AM"
          participants={3}
        />
      </div>

      {/* Floating Task Card (Bottom Right) */}
      <div className="absolute bottom-10 right-10 z-10 w-56 transform rotate-3 animate-float delay-1000">
        <TaskCard
          title="Follow up on CRM integration"
          description="Send resources and schedule a deep-dive session with the client's tech team."
          statusIcon="in-progress"
          date="May 25"
        />
      </div>

      {/* Main Meeting Window Mockup (Central, with diagonal angle) */}
      <div className="absolute z-20 w-full max-w-[1000px] h-full max-h-[625px] transform -rotate-3 translate-x-0 translate-y-0">
        <MeetingWindowMockup
          currentAiResponse={currentAiResponse}
        />
      </div>
    </div>
  );
};

export default ProductIllustration;