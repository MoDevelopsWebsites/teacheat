"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ChevronDown, Bot } from 'lucide-react';

interface ParticipantProps {
  name: string;
  email: string;
  role: string;
  isOwner?: boolean;
  avatarUrl?: string;
}

const Participant: React.FC<ParticipantProps> = ({ name, email, role, isOwner, avatarUrl }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center space-x-3">
      <Avatar className="h-9 w-9">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="rounded-full" />
        ) : (
          <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-undetectable-text-primary">
          {name} {isOwner && <span className="text-xs text-undetectable-text-muted">(You)</span>}
        </span>
        <span className="text-xs text-undetectable-text-muted">{email}</span>
      </div>
    </div>
    <div className="flex items-center space-x-1 text-undetectable-text-muted text-sm">
      <span>{role}</span>
      <ChevronDown className="h-4 w-4" />
    </div>
  </div>
);

const MeetingParticipantsCard: React.FC = () => {
  return (
    <Card className="w-full max-w-sm bg-undetectable-card-background rounded-xl shadow-lg border border-undetectable-card-border overflow-hidden">
      <CardHeader className="p-4 border-b border-undetectable-card-border flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold text-undetectable-text-primary">
          Meeting participants <span className="text-undetectable-text-muted">(4)</span>
        </CardTitle>
        <Badge className="bg-undetectable-badge-visible text-undetectable-badge-visible-foreground px-2 py-1 text-xs font-medium flex items-center">
          <CheckCircle2 className="h-3 w-3 mr-1" /> No bots detected
        </Badge>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <Participant name="Gina Huels" email="ginahue65@cluely.com" role="Owner" isOwner={true} avatarUrl="/placeholder.svg" />
        <Participant name="Todd Cremin" email="todd.cremin@cluely.com" role="Speaker" avatarUrl="/placeholder.svg" />
        <Participant name="Holly Gleason" email="holly_gleaso1972@cluely.com" role="Speaker" avatarUrl="/placeholder.svg" />
        <Participant name="Tomas Hansen" email="tomas_hansen@cluely.com" role="Speaker" avatarUrl="/placeholder.svg" />
        <div className="flex items-center justify-center py-2 text-undetectable-text-muted text-sm">
          <Bot className="h-4 w-4 mr-2" /> Teacheat
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingParticipantsCard;