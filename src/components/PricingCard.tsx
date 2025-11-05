"use client";

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, ChevronRight } from 'lucide-react'; // Changed ChevronDown to ChevronRight
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface PricingCardProps {
  title: string;
  price: string; // Keeping price prop but user said to ignore content
  priceSuffix?: string; // Keeping priceSuffix prop
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link";
  buttonIcon?: React.ReactNode;
  isPopular?: boolean;
  isEnterprise?: boolean;
  priceId: string | null;
  onSubscribe: (priceId: string | null) => void;
  isSubmitting: boolean;
  disabled?: boolean;
  isMacButton?: boolean; // Not used in this redesign, but keeping for consistency
  iconComponent: React.ReactNode; // New prop for the icon at the top
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  priceSuffix,
  description,
  features,
  buttonText,
  buttonVariant = "default",
  buttonIcon,
  isPopular = false,
  isEnterprise = false,
  priceId,
  onSubscribe,
  isSubmitting,
  disabled = false,
  iconComponent, // Destructure new prop
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isEnterprise) {
      navigate('/enterprise');
    } else if (priceId) {
      onSubscribe(priceId);
    } else { // For Starter plan (no priceId)
      navigate('/waitlist');
    }
  };

  return (
    <Card className={cn(
      "relative flex flex-col p-6 rounded-xl shadow-lg border border-gray-200 bg-white text-foreground", // Base styling from screenshot
      isPopular && "border-pricing-popular-badge-bg", // Highlight border for popular card
    )}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pricing-popular-badge-bg text-pricing-popular-badge-fg text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <CardHeader className="p-0 pb-4">
        <div className="mb-4">
          {iconComponent}
        </div>
        <CardTitle className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{title}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">{description}</p> {/* Added whitespace-pre-line */}
      </CardHeader>
      <CardContent className="flex-grow p-0 py-6 border-y border-gray-200 dark:border-gray-700 my-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Included</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-0 pt-4 flex flex-col items-start">
        {/* Price display, styled to match screenshot */}
        <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          {price}
          {priceSuffix && <span className="text-base font-medium text-gray-600 dark:text-gray-400"> {priceSuffix}</span>}
        </p>
        <Button
          className={cn(
            "w-full text-base font-semibold py-3 rounded-lg",
            "bg-gradient-to-br from-pricing-button-gradient-start to-pricing-button-gradient-end text-white hover:from-pricing-button-gradient-end hover:to-pricing-button-gradient-start shadow-md", // Gradient button styling
          )}
          onClick={handleButtonClick}
          disabled={disabled || (isSubmitting && priceId !== null)}
        >
          {buttonText}
          <ChevronRight className="h-4 w-4 ml-2" /> {/* Right arrow icon */}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;