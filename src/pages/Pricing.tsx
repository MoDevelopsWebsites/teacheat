"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Apple, ChevronDown, Bot } from 'lucide-react';
import PricingCard from '@/components/PricingCard';
import PricingFeatureTable from '@/components/PricingFeatureTable';
import { cn } from '@/lib/utils';

// Data for pricing cards
const pricingPlans = {
  monthly: [
    {
      title: "Starter",
      price: "Free",
      description: "All essential features.",
      features: [
        "Limited AI responses",
        "Unlimited real-time meeting notetaking",
        "Customize instructions & upload files",
        "Ask AI about all your past meetings",
      ],
      buttonText: "Get for Mac",
      buttonIcon: <Apple />,
      buttonVariant: "default",
      isPopular: false,
    },
    {
      title: "Pro",
      price: "$20",
      priceSuffix: "/ month",
      description: "Unlimited access.",
      features: [
        "Everything in Starter, plus...",
        "Unlimited AI responses",
        "Unlimited access to latest AI models",
        "Priority support",
      ],
      buttonText: "Subscribe",
      buttonVariant: "default",
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Custom knowledge for teams.",
      features: [
        "Everything in Pro, plus...",
        "Post-call coaching and analytics",
        "RAG knowledge base",
        "User provisioning & role-based access",
        "Single sign-on & IDP Integration",
        "Enterprise security & no data training",
      ],
      buttonText: "Talk to sales",
      buttonVariant: "default",
      isEnterprise: true,
    },
  ],
  annually: [
    {
      title: "Starter",
      price: "Free",
      description: "All essential features.",
      features: [
        "Limited AI responses",
        "Unlimited real-time meeting notetaking",
        "Customize instructions & upload files",
        "Ask AI about all your past meetings",
      ],
      buttonText: "Get for Mac",
      buttonIcon: <Apple />,
      buttonVariant: "default",
      isPopular: false,
    },
    {
      title: "Pro",
      price: "$18",
      priceSuffix: "/ month", // $216 billed annually
      description: "Unlimited access. (Save 10%)",
      features: [
        "Everything in Starter, plus...",
        "Unlimited AI responses",
        "Unlimited access to latest AI models",
        "Priority support",
      ],
      buttonText: "Subscribe",
      buttonVariant: "default",
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Custom knowledge for teams.",
      features: [
        "Everything in Pro, plus...",
        "Post-call coaching and analytics",
        "RAG knowledge base",
        "User provisioning & role-based access",
        "Single sign-on & IDP Integration",
        "Enterprise security & no data training",
      ],
      buttonText: "Talk to sales",
      buttonVariant: "default",
      isEnterprise: true,
    },
  ],
};

// Data for feature table
const featureTableData = [
  {
    name: "Features",
    features: [
      { name: "Custom system prompt", starter: true, pro: true, enterprise: true },
      { name: "Pro Responses / day", starter: "Limited", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Token limit", starter: "Unlimited", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Model", starter: "GPT-5, Claude 4", pro: "GPT-5, Claude 4", enterprise: "GPT-5, Claude 4" },
      { name: "Single sign-on (IDP)", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    name: "Platform",
    features: [
      { name: "Conversations dashboard", starter: true, pro: true, enterprise: true },
      { name: "Advanced analytics", starter: false, pro: true, enterprise: true },
      { name: "Centralized billing", starter: false, pro: false, enterprise: true },
      { name: "Custom integrations", starter: "Coming soon", pro: "Coming soon", enterprise: true },
      { name: "User provisioning & role-based access", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    name: "Support",
    features: [
      { name: "Community support", starter: true, pro: true, enterprise: true },
      { name: "Priority support", starter: false, pro: true, enterprise: true },
      { name: "Customized onboarding", starter: false, pro: false, enterprise: true },
    ],
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  const currentPlans = pricingPlans[billingCycle];

  return (
    <div className="min-h-screen bg-pricing flex flex-col items-center py-16 px-4 text-pricing-text-primary">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 flex items-center justify-center">
          Start <Bot className="h-12 w-12 mx-2 text-blue-500" /> for free.
        </h1>
        <p className="text-lg md:text-xl text-pricing-text-secondary max-w-2xl mx-auto">
          Whether you're using Teacheat for meetings, homework, sales calls, or just curious, it's free to use.
        </p>
      </div>

      <Tabs
        defaultValue="monthly"
        className="mb-16"
        onValueChange={(value) => setBillingCycle(value as 'monthly' | 'annually')}
      >
        <TabsList className="bg-pricing-toggle p-1 rounded-full">
          <TabsTrigger
            value="monthly"
            className={cn(
              "px-6 py-2 rounded-full text-base font-medium transition-all",
              billingCycle === 'monthly'
                ? "bg-pricing-toggle-active text-pricing-toggle-active-foreground shadow-sm"
                : "text-pricing-text-secondary hover:text-pricing-text-primary"
            )}
          >
            Monthly
          </TabsTrigger>
          <TabsTrigger
            value="annually"
            className={cn(
              "px-6 py-2 rounded-full text-base font-medium transition-all",
              billingCycle === 'annually'
                ? "bg-pricing-toggle-active text-pricing-toggle-active-foreground shadow-sm"
                : "text-pricing-text-secondary hover:text-pricing-text-primary"
            )}
          >
            Annually
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-24">
        {currentPlans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>

      <PricingFeatureTable data={featureTableData} />
    </div>
  );
};

export default Pricing;