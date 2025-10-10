"use client";

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  title: string;
  price: string;
  priceSuffix?: string;
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
  isMacButton?: boolean;
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
  isMacButton = false,
}) => {
  const handleButtonClick = () => {
    if (isEnterprise) {
      console.log("Enterprise plan: Talk to sales clicked.");
    } else if (priceId) {
      onSubscribe(priceId);
    } else {
      console.log(`Button clicked for ${title} plan.`);
    }
  };

  return (
    <Card className={cn(
      "relative flex flex-col p-4 sm:p-6 rounded-xl shadow-lg border border-pricing-card-border bg-pricing-card-bg",
      isPopular && "border-2 border-blue-500 shadow-xl",
      isEnterprise && "col-span-1 md:col-span-1"
    )}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <CardHeader className="p-0 pb-3 sm:pb-4">
        <CardTitle className="text-xl sm:text-2xl font-bold text-pricing-text-primary mb-1 sm:mb-2">{title}</CardTitle>
        <p className="text-4xl sm:text-5xl font-extrabold text-pricing-text-primary">
          {price}
          {priceSuffix && <span className="text-base sm:text-lg font-medium text-pricing-text-secondary"> {priceSuffix}</span>}
        </p>
        <p className="text-xs sm:text-sm text-pricing-text-secondary mt-1 sm:mt-2">{description}</p>
      </CardHeader>
      <CardContent className="flex-grow p-0 py-4 sm:py-6 border-y border-pricing-card-border/50 my-2 sm:my-4">
        <ul className="space-y-2 sm:space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-pricing-text-primary text-sm">
              <Check className="h-4 w-4 text-pricing-feature-check mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-0 pt-3 sm:pt-4">
        <Button
          className={cn(
            "w-full text-sm sm:text-base font-semibold py-2.5 sm:py-6 rounded-lg",
            isMacButton && "bg-gradient-to-br from-landing-button-gradient-start to-landing-button-gradient-end text-white hover:from-landing-button-gradient-hover-start hover:to-landing-button-gradient-hover-end shadow-button-glow-hover",
            !isMacButton && buttonVariant === "default" && "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800",
            buttonVariant === "outline" && "border border-pricing-button-default text-pricing-button-default bg-transparent hover:bg-pricing-button-default/10",
            isEnterprise && "bg-blue-500 text-white hover:bg-blue-600"
          )}
          {...(buttonVariant !== "default" && { variant: buttonVariant })}
          onClick={handleButtonClick}
          disabled={disabled || (isSubmitting && priceId !== null)}
        >
          {buttonIcon && React.cloneElement(buttonIcon, { className: cn("h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2", buttonIcon.props.className) })}
          {buttonText}
          {buttonIcon === <ChevronDown /> && <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1.5 sm:ml-2" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;