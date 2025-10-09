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
  // Removed priceId and onSubscribe props
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
  // Removed priceId and onSubscribe from destructuring
}) => {
  const handleButtonClick = () => {
    if (isEnterprise) {
      // Handle "Talk to sales" or other enterprise specific action
      console.log("Enterprise plan: Talk to sales clicked.");
      // You might navigate to a contact form or open a modal here
    } else {
      // For other plans, we'll just log for now or show a generic message
      console.log(`Button clicked for ${title} plan.`);
    }
  };

  return (
    <Card className={cn(
      "relative flex flex-col p-6 rounded-xl shadow-lg border border-pricing-card-border bg-pricing-card-bg",
      isPopular && "border-2 border-blue-500 shadow-xl", // Highlight for popular plan
      isEnterprise && "col-span-1 md:col-span-1" // Ensure enterprise takes full width on mobile, but 1/3 on desktop
    )}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-2xl font-bold text-pricing-text-primary mb-2">{title}</CardTitle>
        <p className="text-5xl font-extrabold text-pricing-text-primary">
          {price}
          {priceSuffix && <span className="text-lg font-medium text-pricing-text-secondary"> {priceSuffix}</span>}
        </p>
        <p className="text-sm text-pricing-text-secondary mt-2">{description}</p>
      </CardHeader>
      <CardContent className="flex-grow p-0 py-6 border-y border-pricing-card-border/50 my-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-pricing-text-primary text-sm">
              <Check className="h-4 w-4 text-pricing-feature-check mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-0 pt-4">
        <Button
          className={cn(
            "w-full text-base font-semibold py-6 rounded-lg",
            buttonVariant === "default" && "bg-pricing-button-default text-pricing-button-foreground hover:bg-pricing-button-default/90",
            buttonVariant === "outline" && "border border-pricing-button-default text-pricing-button-default bg-transparent hover:bg-pricing-button-default/10",
            isEnterprise && "bg-blue-500 text-white hover:bg-blue-600"
          )}
          variant={buttonVariant}
          onClick={handleButtonClick}
          // Removed disabled prop logic related to priceId
        >
          {buttonIcon && React.cloneElement(buttonIcon, { className: cn("h-5 w-5 mr-2", buttonIcon.props.className) })}
          {buttonText}
          {buttonIcon === <ChevronDown /> && <ChevronDown className="h-4 w-4 ml-2" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;