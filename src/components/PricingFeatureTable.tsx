"use client";

import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Feature {
  name: string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface FeatureCategory {
  name: string;
  features: Feature[];
}

interface PricingFeatureTableProps {
  data: FeatureCategory[];
}

const PricingFeatureTable: React.FC<PricingFeatureTableProps> = ({ data }) => {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? <Check className="h-4 w-4 text-pricing-feature-check" /> : <X className="h-4 w-4 text-pricing-feature-cross" />; {/* Adjusted icon size for mobile */}
    }
    return <span className="text-pricing-feature-coming-soon text-xs">{value}</span>; {/* Adjusted text size for mobile */}
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-pricing-card-bg rounded-xl shadow-lg border border-pricing-card-border overflow-hidden px-4"> {/* Added px-4 for mobile padding */}
      <div className="overflow-x-auto"> {/* Added for horizontal scrolling on small screens */}
        <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-[600px]"> {/* Adjusted min-w for mobile */}
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="p-3 sm:p-4 text-pricing-text-primary text-base sm:text-lg font-semibold w-1/3">Features</th> {/* Adjusted padding/text size for mobile */}
              <th className="p-3 sm:p-4 text-center text-pricing-text-primary text-base sm:text-lg font-semibold w-1/6">Starter</th> {/* Adjusted padding/text size for mobile */}
              <th className="p-3 sm:p-4 text-center text-pricing-text-primary text-base sm:text-lg font-semibold w-1/6">Pro</th> {/* Adjusted padding/text size for mobile */}
              <th className="p-3 sm:p-4 text-center text-pricing-text-primary text-base sm:text-lg font-semibold w-1/6">Enterprise</th> {/* Adjusted padding/text size for mobile */}
            </tr>
          </thead>
          <tbody>
            {data.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <td colSpan={4} className="p-3 sm:p-4 text-pricing-text-primary text-sm sm:text-base font-semibold uppercase tracking-wider"> {/* Adjusted padding/text size for mobile */}
                    {category.name}
                  </td>
                </tr>
                {category.features.map((feature, featureIndex) => (
                  <tr key={featureIndex} className="border-t border-pricing-card-border/50">
                    <td className="p-3 sm:p-4 text-pricing-text-primary text-sm">{feature.name}</td> {/* Adjusted padding/text size for mobile */}
                    <td className="p-3 sm:p-4 text-center">{renderFeatureValue(feature.starter)}</td> {/* Adjusted padding for mobile */}
                    <td className="p-3 sm:p-4 text-center">{renderFeatureValue(feature.pro)}</td> {/* Adjusted padding for mobile */}
                    <td className="p-3 sm:p-4 text-center">{renderFeatureValue(feature.enterprise)}</td> {/* Adjusted padding for mobile */}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingFeatureTable;