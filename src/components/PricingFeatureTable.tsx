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
      return value ? <Check className="h-5 w-5 text-pricing-feature-check" /> : <X className="h-5 w-5 text-pricing-feature-cross" />;
    }
    return <span className="text-pricing-feature-coming-soon text-sm">{value}</span>;
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-pricing-card-bg rounded-xl shadow-lg border border-pricing-card-border overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            <th className="p-4 text-pricing-text-primary text-lg font-semibold w-1/3">Features</th>
            <th className="p-4 text-center text-pricing-text-primary text-lg font-semibold w-1/6">Starter</th>
            <th className="p-4 text-center text-pricing-text-primary text-lg font-semibold w-1/6">Pro</th>
            <th className="p-4 text-center text-pricing-text-primary text-lg font-semibold w-1/6">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <td colSpan={4} className="p-4 text-pricing-text-primary text-base font-semibold uppercase tracking-wider">
                  {category.name}
                </td>
              </tr>
              {category.features.map((feature, featureIndex) => (
                <tr key={featureIndex} className="border-t border-pricing-card-border/50">
                  <td className="p-4 text-pricing-text-primary text-sm">{feature.name}</td>
                  <td className="p-4 text-center">{renderFeatureValue(feature.starter)}</td>
                  <td className="p-4 text-center">{renderFeatureValue(feature.pro)}</td>
                  <td className="p-4 text-center">{renderFeatureValue(feature.enterprise)}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricingFeatureTable;