"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';
import { Button } from '@/components/ui/button';
import { Apple } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion'; // Import motion for the toggle animation

// Placeholder Price IDs - REPLACE WITH YOUR ACTUAL STRIPE PRICE IDs
const STARTER_MONTHLY_PRICE_ID = 'price_1Pj1234567890abcdef'; // Example: Replace with your Starter Monthly Price ID
const PRO_MONTHLY_PRICE_ID = 'price_1Pj1234567890ghijkl'; // Example: Replace with your Pro Monthly Price ID
const STARTER_YEARLY_PRICE_ID = 'price_1Pj1234567890mnopqr'; // Example: Replace with your Starter Yearly Price ID
const PRO_YEARLY_PRICE_ID = 'price_1Pj1234567890stuvwx'; // Example: Replace with your Pro Yearly Price ID

const Pricing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isYearly, setIsYearly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('success')) {
      showSuccess('Subscription successful! Welcome to Teacheat Pro.');
      navigate('/pricing', { replace: true }); // Clear params
    }
    if (params.get('canceled')) {
      showError('Subscription canceled. You can try again anytime.');
      navigate('/pricing', { replace: true }); // Clear params
    }
  }, [location.search, navigate]);

  const handleSubscribe = async (priceId: string | null) => {
    if (!priceId) {
      console.log("Enterprise plan: Talk to sales clicked.");
      // For enterprise, we might navigate to a contact form or just log
      return;
    }

    setSelectedPriceId(priceId);
    setIsSubmitting(true);
    const toastId = showLoading('Redirecting to checkout...');

    try {
      const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const EDGE_FUNCTION_NAME = "create-checkout-session";
      const edgeFunctionUrl = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/${EDGE_FUNCTION_NAME}`;

      const response = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session.');
      }

      const { sessionUrl } = await response.json();
      window.location.href = sessionUrl; // Redirect to Stripe Checkout
    } catch (error: any) {
      dismissToast(toastId);
      showError(`Error: ${error.message}`);
      console.error('Stripe checkout error:', error);
    } finally {
      setIsSubmitting(false);
      setSelectedPriceId(null);
    }
  };

  const pricingPlans = [
    {
      title: "Starter",
      price: isYearly ? "$99" : "$12",
      priceSuffix: isYearly ? "/year" : "/month",
      description: "Limited AI responses, unlimited notetaking.",
      features: [
        "50 AI responses/month",
        "Unlimited meeting notes",
        "Basic analytics",
        "Email support",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      isPopular: false,
      isEnterprise: false,
      priceId: isYearly ? STARTER_YEARLY_PRICE_ID : STARTER_MONTHLY_PRICE_ID,
      buttonIcon: <Apple />, // Assuming "Get Started" uses the Apple icon
      isMacButton: true,
    },
    {
      title: "Pro",
      price: isYearly ? "$399" : "$48",
      priceSuffix: isYearly ? "/year" : "/month",
      description: "Unlimited AI, advanced models, priority support.",
      features: [
        "Unlimited AI responses",
        "Advanced AI models",
        "Priority customer support",
        "Team collaboration features",
        "Custom integrations",
      ],
      buttonText: "Buy Now",
      buttonVariant: "default" as const,
      isPopular: true,
      isEnterprise: false,
      priceId: isYearly ? PRO_YEARLY_PRICE_ID : PRO_MONTHLY_PRICE_ID,
      buttonIcon: <Apple />, // Assuming Pro also uses the Apple icon for "Buy Now"
      isMacButton: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      priceSuffix: "",
      description: "Custom solutions for teams, advanced analytics.",
      features: [
        "All Pro features",
        "Dedicated account manager",
        "On-premise deployment options",
        "Custom security & compliance",
        "Volume discounts",
      ],
      buttonText: "Talk to Sales",
      buttonVariant: "default" as const,
      isPopular: false,
      isEnterprise: true,
      priceId: null, // No Stripe price ID for enterprise
      isMacButton: false, // Enterprise button might not use the Mac style
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Header className="absolute top-0 left-0 right-0" />
      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that's right for you. Upgrade, downgrade, or cancel anytime.
          </p>
        </section>

        <div className="flex justify-center mb-8">
          <div className="relative z-10 mx-auto flex w-fit rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
                !isYearly ? "text-white" : "text-gray-700 dark:text-gray-300",
              )}
            >
              {!isYearly && (
                <motion.span
                  layoutId={"pricing-switch"}
                  className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative">Monthly</span>
            </button>

            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
                isYearly ? "text-white" : "text-gray-700 dark:text-gray-300",
              )}
            >
              {isYearly && (
                <motion.span
                  layoutId={"pricing-switch"}
                  className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">Yearly</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              onSubscribe={handleSubscribe}
              isSubmitting={isSubmitting && selectedPriceId === plan.priceId}
              disabled={isSubmitting && selectedPriceId !== plan.priceId}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;