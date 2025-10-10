"use client";

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Sparkles, ChevronLeft, ChevronRight, Search, Code, Copy, Play, Settings, Folder, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const InvisibleToScreenShareCard: React.FC = () => {
  const codeSnippet = `// Fetch data from API and display results
import axios from 'axios';

async function fetchUserData(userId: string) {
  try {
    const response = await axios.get(\`/api/users/\${userId}\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
`;

  return (
    <Card className="relative w-full max-w-sm h-[350px] sm:h-[400px] bg-undetectable-card-background rounded-xl shadow-lg border border-undetectable-card-border overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-2 sm:p-3 border-b border-undetectable-card-border">
        <div className="flex space-x-1 sm:space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex space-x-1 sm:space-x-2">
          <Badge className="bg-undetectable-badge-visible text-undetectable-badge-visible-foreground px-1.5 py-0.5 text-[0.6rem] sm:text-xs font-medium">
            Visible to you
          </Badge>
          <Badge className="bg-undetectable-badge-invisible text-undetectable-badge-invisible-foreground px-1.5 py-0.5 text-[0.6rem] sm:text-xs font-medium">
            Invisible to others
          </Badge>
        </div>
      </div>

      <CardHeader className="p-2 sm:p-3 border-b border-undetectable-card-border flex flex-row items-center justify-between">
        <div className="flex items-center text-xs sm:text-sm font-semibold text-undetectable-text-primary">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-blue-500" /> AI Response
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 text-undetectable-text-muted text-[0.6rem] sm:text-xs">
          <span>Add a check for missing <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">userData</span></span>
          <span>Also handle <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">data.name</span> safely</span>
        </div>
      </CardHeader>

      <CardContent className="flex-grow p-0 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-1.5 sm:p-2 bg-gray-50 dark:bg-gray-800 border-b border-undetectable-card-border">
          <div className="flex items-center space-x-1 sm:space-x-2 text-undetectable-text-muted text-xs sm:text-sm">
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <div className="relative">
              <Search className="absolute left-1.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 sm:h-3 sm:w-3 text-undetectable-text-muted" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-6 pr-1.5 py-0.5 text-[0.6rem] sm:text-xs rounded-md bg-gray-100 dark:bg-gray-700 border border-undetectable-card-border focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 text-undetectable-text-muted">
            <Code className="h-3 w-3 sm:h-4 sm:w-4" />
            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
            <Play className="h-3 w-3 sm:h-4 sm:w-4" />
            <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
        </div>
        <div className="flex-grow flex text-[0.6rem] sm:text-xs font-mono bg-gray-50 dark:bg-gray-900 text-undetectable-text-primary overflow-auto">
          <div className="w-6 sm:w-8 text-right pr-1 sm:pr-2 py-1 sm:py-2 text-undetectable-text-muted border-r border-undetectable-card-border">
            {Array.from({ length: codeSnippet.split('\n').length }, (_, i) => i + 1).map(num => (
              <div key={num} className="h-[14px] sm:h-[18px] leading-[14px] sm:leading-[18px]">{num}</div>
            ))}
          </div>
          <pre className="flex-grow p-1 sm:p-2">
            {codeSnippet.split('\n').map((line, index) => (
              <div key={index} className="h-[14px] sm:h-[18px] leading-[14px] sm:leading-[18px]">
                {line.split(' ').map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={cn(
                      word.includes('import') || word.includes('from') || word.includes('async') || word.includes('function') || word.includes('try') || word.includes('catch') || word.includes('return') || word.includes('throw') ? 'text-purple-500 dark:text-purple-400' :
                      word.includes('axios') || word.includes('response') || word.includes('console') || word.includes('error') ? 'text-blue-500 dark:text-blue-400' :
                      word.includes('get') || word.includes('data') ? 'text-green-500 dark:text-green-400' :
                      word.includes('userId') || word.includes('string') ? 'text-orange-500 dark:text-orange-400' :
                      'text-undetectable-text-primary'
                    )}
                  >
                    {word}{' '}
                  </span>
                ))}
              </div>
            ))}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvisibleToScreenShareCard;