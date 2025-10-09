"use client";

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // Added useSearchParams
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Apple, ChevronDown, Bot } from 'lucide-react';
import PricingCard from '@/components/PricingCard';
import PricingFeatureTable from '@/components/PricingFeatureTable';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';
import { useStripe, useElements } from '@stripe/react-stripe-js';

const VITE_STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID; // Get from environment variable

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
      priceId: null,
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
      priceId: "price_1Pj234567890abcdef", // Placeholder: Replace with your actual Stripe Price ID for monthly Pro
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
      priceId: null,
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
      priceId: null,
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
      priceId: "price_1Pj234567890ghijkl", // Placeholder: Replace with your actual Stripe Price ID for annual Pro
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
      priceId: null,
    },
  ],
};

// Data for feature table (this part was not removed, so it should be the same)
const featureTableData = [
  {
    name: "Features",
    features: [
      { name: "Custom system prompt", starter: true, pro: true, enterprise: true },
      { name: "Pro Responses / day", starter: "Limited", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Token limit", starter: "Unlimited", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Model", starter: "GPT-5, Claude 4", pro: "GPT-5, Claude 4", enterprise: "Unlimited" },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [searchParams] = useSearchParams(); // Hook to read URL query parameters

  const currentPlans = pricingPlans[billingCycle];

  // Handle Stripe redirect success/cancel
  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success) {
      showSuccess("Subscription successful! Welcome to Pro!");
      // You might want to clear the query params or redirect to a dashboard
      // navigate('/dashboard');
    }

    if (canceled) {
      showError("Subscription canceled. You can try again anytime.");
    }
  }, [searchParams]);

  const handleSubscribe = async (priceId: string | null) => {
    if (!stripe || !elements || !priceId) {
      showError("Stripe is not initialized or price ID is missing.");
      return;
    }

    setIsSubmitting(true);
    try {
      const edgeFunctionUrl = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/create-checkout-session`;

      const response = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        showError(error.message || "Failed to redirect to Stripe Checkout.");
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      showError(`Subscription failed: ${error.message || "An unexpected error occurred."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <PricingCard
            key={index}
            {...plan}
            onSubscribe={handleSubscribe}
            isSubmitting={isSubmitting}
            buttonText={isSubmitting && plan.priceId ? "Processing..." : plan.buttonText}
            disabled={isSubmitting && plan.priceId !== null}
          />
        ))}
      </div>

      <PricingFeatureTable data={featureTableData} />
    </div>
  );
};

export default Pricing;