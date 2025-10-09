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
    <Card className="relative w-full max-w-sm h-[400px] bg-undetectable-card-background rounded-xl shadow-lg border border-undetectable-card-border overflow-hidden flex flex-col">
      {/* Top bar with window controls and visibility badges */}
      <div className="flex justify-between items-center p-3 border-b border-undetectable-card-border">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex space-x-2">
          <Badge className="bg-undetectable-badge-visible text-undetectable-badge-visible-foreground px-2 py-1 text-xs font-medium">
            Visible to you
          </Badge>
          <Badge className="bg-undetectable-badge-invisible text-undetectable-badge-invisible-foreground px-2 py-1 text-xs font-medium">
            Invisible to others
          </Badge>
        </div>
      </div>

      {/* AI Response Header */}
      <CardHeader className="p-3 border-b border-undetectable-card-border flex flex-row items-center justify-between">
        <div className="flex items-center text-sm font-semibold text-undetectable-text-primary">
          <Sparkles className="h-4 w-4 mr-2 text-blue-500" /> AI Response
        </div>
        <div className="flex items-center space-x-2 text-undetectable-text-muted text-xs">
          <span>Add a check for missing <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">userData</span></span>
          <span>Also handle <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">data.name</span> safely</span>
        </div>
      </CardHeader>

      {/* Code Editor Mockup */}
      <CardContent className="flex-grow p-0 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 border-b border-undetectable-card-border">
          <div className="flex items-center space-x-2 text-undetectable-text-muted text-sm">
            <ChevronLeft className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-undetectable-text-muted" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-7 pr-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 border border-undetectable-card-border focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-undetectable-text-muted">
            <Code className="h-4 w-4" />
            <Copy className="h-4 w-4" />
            <Play className="h-4 w-4" />
            <Settings className="h-4 w-4" />
          </div>
        </div>
        <div className="flex-grow flex text-xs font-mono bg-gray-50 dark:bg-gray-900 text-undetectable-text-primary overflow-auto">
          <div className="w-8 text-right pr-2 py-2 text-undetectable-text-muted border-r border-undetectable-card-border">
            {Array.from({ length: codeSnippet.split('\n').length }, (_, i) => i + 1).map(num => (
              <div key={num} className="h-[18px] leading-[18px]">{num}</div>
            ))}
          </div>
          <pre className="flex-grow p-2">
            {codeSnippet.split('\n').map((line, index) => (
              <div key={index} className="h-[18px] leading-[18px]">
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