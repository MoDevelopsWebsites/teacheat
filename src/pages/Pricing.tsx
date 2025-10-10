"use client";

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom'; // Added useNavigate, useLocation
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Apple, ChevronDown, Bot } from 'lucide-react';
import PricingCard from '@/components/PricingCard';
import PricingFeatureTable from '@/components/PricingFeatureTable';
import Header from '@/components/Header'; // Import the new Header component
import Footer from '@/components/Footer'; // Import the Footer component
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useSession } from '@/integrations/supabase/SessionContextProvider'; // Import useSession

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
      isMacButton: true, // Added for the Mac button styling
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
      priceId: "price_1SGHowJGz5CboiG8FNzIDFz1", // Updated with provided monthly Pro Price ID
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
      isMacButton: true, // Added for the Mac button styling
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
      priceId: "price_1SGHqOJGz5CboiG8uBtvQ6he", // Updated with provided annual Pro Price ID
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { session, isLoading: isSessionLoading } = useSession(); // Get session and loading state

  const currentPlans = pricingPlans[billingCycle];

  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success) {
      showSuccess("Subscription successful! Welcome to Pro!");
      // Clear the query params
      navigate(location.pathname, { replace: true });
    }

    if (canceled) {
      showError("Subscription canceled. You can try again anytime.");
      // Clear the query params
      navigate(location.pathname, { replace: true });
    }
  }, [searchParams, navigate, location.pathname]);

  // Effect to handle automatic subscription after login
  useEffect(() => {
    if (!isSessionLoading && session && location.state?.priceId && location.state?.billingCycle) {
      const { priceId, billingCycle: storedBillingCycle } = location.state;
      setBillingCycle(storedBillingCycle); // Set the correct billing cycle
      handleSubscribe(priceId);
      // Clear the state after processing
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [isSessionLoading, session, location.state, navigate]);


  const handleSubscribe = async (priceId: string | null) => {
    if (!priceId) {
      showError("Price ID is missing.");
      return;
    }

    if (!session) {
      // If not logged in, redirect to login page, passing the intended priceId and billing cycle
      navigate('/login', { state: { redirectTo: '/pricing', priceId: priceId, billingCycle: billingCycle } });
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

      const { sessionUrl } = await response.json();

      if (sessionUrl) {
        window.location.assign(sessionUrl); // Redirect directly to the Stripe Checkout URL
      } else {
        throw new Error('Stripe Checkout Session URL not received.');
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      showError(`Subscription failed: ${error.message || "An unexpected error occurred."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900"> {/* Removed items-center and py-16 */}
      <Header className="absolute top-0 left-0 right-0" /> {/* Add the Header component */}
      <main className="flex-grow flex flex-col items-center py-12 px-4 text-pricing-text-primary sm:py-16"> {/* Adjusted padding for mobile */}
        <div className="text-center mb-12 mt-20 sm:mt-24 sm:mb-16"> {/* Adjusted margin for mobile */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 flex flex-col sm:flex-row items-center justify-center"> {/* Adjusted text sizes and flex for mobile */}
            Join the future of AI-powered productivity. <Bot className="h-10 w-10 sm:h-12 sm:w-12 mx-0 sm:mx-2 text-blue-500 mt-2 sm:mt-0" /> {/* Adjusted icon size and margin for mobile */}
          </h1>
          <p className="text-lg md:text-xl text-pricing-text-secondary max-w-2xl mx-auto">
            Unlock unlimited potential with our Pro and Enterprise plans, designed to elevate your workflow and insights.
          </p>
        </div>

        <Tabs
          defaultValue="monthly"
          className="mb-12 sm:mb-16"
          onValueChange={(value) => setBillingCycle(value as 'monthly' | 'annually')}
          value={billingCycle} // Control the Tabs component with state
        >
          <TabsList className="bg-pricing-toggle p-1 rounded-full">
            <TabsTrigger
              value="monthly"
              className={cn(
                "px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all", {/* Adjusted padding/text size for mobile */}
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
                "px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all", {/* Adjusted padding/text size for mobile */}
                billingCycle === 'annually'
                  ? "bg-pricing-toggle-active text-pricing-toggle-active-foreground shadow-sm"
                  : "text-pricing-text-secondary hover:text-pricing-text-primary"
              )}
            >
              Annually
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full mb-16 sm:mb-24 px-4"> {/* Adjusted gap and padding for mobile */}
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
      </main>
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export default Pricing;