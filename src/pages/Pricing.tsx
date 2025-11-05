"use client";

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Apple, ChevronDown, Star, Zap, Award, Check } from 'lucide-react'; // Added Star, Zap, Award, Check icons
import PricingCard from '@/components/PricingCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useSession } from '@/integrations/supabase/SessionContextProvider';
import TeacheatLogo from '@/components/TeacheatLogo'; // Keeping for potential future use, but not in main title

const VITE_STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;

const pricingPlans = {
  monthly: [
    {
      title: "Start",
      description: "For early-stage founders & small teams\nPerfect if you're just getting started and want a professional design presence without going all-in.",
      features: [
        "Custom landing page or 3 key screens (web/app)",
        "Conversion-focused design system",
        "Framer or Webflow build (responsive)",
        "1 round of revisions",
        "Email & chat support",
      ],
      buttonText: "Book a Demo",
      buttonIcon: <ChevronDown className="h-4 w-4" />, // Using ChevronDown as a right arrow placeholder
      isPopular: false,
      priceId: null,
      iconComponent: <Star className="h-8 w-8 text-gray-700 dark:text-gray-300" />,
    },
    {
      title: "Growth",
      description: "For funded startups & scaling products\nIdeal for teams ready to grow fast with on-demand design & dev support to ship faster.",
      features: [
        "Complete website or 5-7 app screens",
        "UX audit & conversion optimization",
        "Framer + Webflow development with animations",
        "Priority support & feedback calls",
        "2 active design requests at a time",
      ],
      buttonText: "Book a Demo",
      buttonIcon: <ChevronDown className="h-4 w-4" />,
      isPopular: true,
      priceId: "price_1SGHowJGz5CboiG8FNzIDFz1", // Original Pro monthly price ID
      iconComponent: <Zap className="h-8 w-8 text-gray-700 dark:text-gray-300" />,
    },
    {
      title: "Scale",
      description: "For product-led teams & agencies\nA dedicated design partner for continuous growth, from new features to full product redesigns.",
      features: [
        "Unlimited design & development requests",
        "Dedicated designer + developer",
        "Strategy & creative direction calls",
        "Advanced motion & prototype design",
        "Priority 24h response",
      ],
      buttonText: "Book a Demo",
      buttonIcon: <ChevronDown className="h-4 w-4" />,
      isEnterprise: true,
      priceId: null,
      iconComponent: <Award className="h-8 w-8 text-gray-700 dark:text-gray-300" />,
    },
  ],
  // Keeping annually data for reference, but it won't be displayed with the new design
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
      buttonText: "Join waitlist",
      buttonIcon: undefined,
      buttonVariant: "default",
      isPopular: false,
      priceId: null,
      isMacButton: false,
      iconComponent: <Star className="h-8 w-8 text-gray-700 dark:text-gray-300" />,
    },
    {
      title: "Pro",
      price: "$18",
      priceSuffix: "/ month",
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
      priceId: "price_1SGHqOJGz5CboiG8uBtvQ6he",
      iconComponent: <Zap className="h-8 w-8 text-gray-700 dark:text-gray-300" />,
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
      iconComponent: <Award className="h-8 w-8 text-gray-700 dark:text-gray-300" />,
    },
  ],
};

// Removed featureTableData as it's no longer used in the new design

const Pricing = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { session, isLoading: isSessionLoading } = useSession();

  // Always use monthly plans for the new design as there's no billing cycle toggle
  const currentPlans = pricingPlans.monthly;

  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success) {
      showSuccess("Subscription successful! Welcome to Pro!");
      navigate(location.pathname, { replace: true });
    }

    if (canceled) {
      showError("Subscription canceled. You can try again anytime.");
      navigate(location.pathname, { replace: true });
    }
  }, [searchParams, navigate, location.pathname]);

  useEffect(() => {
    // This logic is for handling redirects after login for subscription.
    // Since the design no longer has a billing cycle toggle, we'll assume monthly if a priceId is present.
    if (!isSessionLoading && session && location.state?.priceId) {
      const { priceId } = location.state;
      handleSubscribe(priceId);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [isSessionLoading, session, location.state, navigate]);


  const handleSubscribe = async (priceId: string | null) => {
    if (!priceId) {
      // For Starter and Enterprise, we navigate to other pages
      if (currentPlans[0].priceId === priceId) { // Starter
        navigate('/waitlist');
      } else if (currentPlans[2].priceId === priceId) { // Enterprise
        navigate('/enterprise');
      } else {
        showError("Price ID is missing for subscription.");
      }
      return;
    }

    if (!session) {
      // Redirect to login, passing current pricing page as redirectTo and priceId
      navigate('/login', { state: { redirectTo: '/pricing', priceId: priceId } });
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
        window.location.assign(sessionUrl);
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
    <div className="min-h-screen flex flex-col bg-pricing-background-pattern text-foreground">
      <Header className="absolute top-0 left-0 right-0" />
      <main className="flex-grow flex flex-col items-center py-12 px-4 sm:py-16">
        <div className="text-center mb-12 mt-20 sm:mt-24 sm:mb-16 relative">
          <span className="inline-block bg-pricing-badge-bg text-pricing-badge-fg text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Pricing
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-white font-display">
            Invest in design that drives results
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Flexible plans for startups and brands who value strategy, creativity, and seamless execution.
          </p>
        </div>

        {/* Removed Tabs component */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full mb-16 sm:mb-24 px-4">
          {currentPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price || "$0"} // Placeholder price, will be ignored by user
              priceSuffix={plan.priceSuffix || "/mo"} // Placeholder suffix
              description={plan.description}
              features={plan.features}
              buttonText={isSubmitting && plan.priceId ? "Processing..." : plan.buttonText}
              buttonIcon={plan.buttonIcon}
              isPopular={plan.isPopular}
              isEnterprise={plan.isEnterprise}
              priceId={plan.priceId}
              onSubscribe={handleSubscribe}
              isSubmitting={isSubmitting}
              disabled={isSubmitting && plan.priceId !== null}
              iconComponent={plan.iconComponent}
            />
          ))}
        </div>

        {/* Removed PricingFeatureTable */}
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;