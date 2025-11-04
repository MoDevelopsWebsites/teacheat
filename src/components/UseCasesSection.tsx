"use client";

import React from 'react';
import { RefreshCcw, Users, Code, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UseCaseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-start text-left">
    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
      {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5 text-gray-700 dark:text-gray-300" })}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const UseCasesSection: React.FC = () => {
  return (
    <section className="w-full py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
          Teacheat Use Cases
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-16">
          One AI assistant, endless ways to <span className="text-blue-600">excel</span><span className="text-accent-orange">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <UseCaseCard
            icon={<RefreshCcw />}
            title="Boost productivity, think clearer."
            description="Get instant answers, automate note-taking, and streamline your workflow. Teacheat keeps you organized, calm, and moving forward."
          />
          <UseCaseCard
            icon={<Users />}
            title="Collaborate without clutter."
            description="Share meeting insights, assign action items, and communicate in real-time – all in one focused space. No dashboards, no noise – just flow."
          />
          <UseCaseCard
            icon={<Code />}
            title="Ace interviews, land the job."
            description="Turn interview questions into instant answers, connect with your knowledge base, and let AI prioritize what matters most. Everything you need, nothing you don't."
          />
          <UseCaseCard
            icon={<Edit />}
            title="Create without distractions."
            description="Organize ideas, plan projects, and automate your research with AI assistance. Focus on creating – Teacheat handles the rest."
          />
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;