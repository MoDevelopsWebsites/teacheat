"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SendHorizonal, Bot, User } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/integrations/supabase/SessionContextProvider';
import { showSuccess, showError } from '@/utils/toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useSession();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;

      if (!accessToken) {
        showError('User not authenticated. Please log in.');
        setIsLoading(false);
        return;
      }

      // Construct the URL for the Edge Function
      const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID; // Get from environment variable
      const EDGE_FUNCTION_NAME = "chat";
      const edgeFunctionUrl = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/${EDGE_FUNCTION_NAME}`;

      const response = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from Edge Function:', errorData);
        showError(`Failed to get AI response: ${errorData.error || response.statusText}. Please check Supabase Edge Function logs.`);
        setMessages((prevMessages) => [...prevMessages, {
          id: Date.now().toString() + '-error',
          text: `Error: ${errorData.error || 'Could not get a response from the AI.'}`,
          sender: 'ai',
          timestamp: new Date(),
        }]);
      } else {
        const data = await response.json();
        if (data && data.error) { // Check for error returned by the Edge Function
          console.error('Edge Function returned error:', data.error);
          showError(`AI response error: ${data.error}. Please check Supabase Edge Function logs.`);
          setMessages((prevMessages) => [...prevMessages, {
            id: Date.now().toString() + '-error',
            text: `Error: ${data.error || 'Could not get a response from the AI.'}`,
            sender: 'ai',
            timestamp: new Date(),
          }]);
        } else {
          const aiResponse: Message = {
            id: Date.now().toString() + '-ai',
            text: data.response,
            sender: 'ai',
            timestamp: new Date(),
          };
          setMessages((prevMessages) => [...prevMessages, aiResponse]);
        }
      }
    } catch (err: any) {
      console.error('Network or unexpected error:', err);
      showError(`An unexpected error occurred: ${err.message || 'Please check your connection.'}`);
      setMessages((prevMessages) => [...prevMessages, {
        id: Date.now().toString() + '-catch-error',
        text: `Error: An unexpected error occurred: ${err.message || ''}`,
        sender: 'ai',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <Card className="flex flex-col flex-grow w-full h-full shadow-lg rounded-none border-none">
        <CardHeader className="border-b p-4">
          <CardTitle className="text-2xl font-semibold text-center">Teacheat AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-4 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none">
                    <p className="text-sm animate-pulse">Typing...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex w-full space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
              <SendHorizonal className="h-4 w-4 mr-2" /> Send
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chat;