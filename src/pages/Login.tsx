"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import AuthLogo from '@/components/AuthLogo';
import MinimalAuthFooter from '@/components/MinimalAuthFooter';

const Login = () => {
  const navigate = useNavigate(); // Keep navigate for potential future redirects

  const features = [
    "Get access to unlimited AI responses and meeting notes.",
    "Receive real-time suggestions and insights during calls.",
    "Collaborate with your team and share meeting knowledge.",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8"> {/* Adjusted position for mobile */}
        <AuthLogo />
      </div>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:py-16"> {/* Adjusted padding for mobile */}
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4"> {/* Adjusted text sizes for mobile */}
            Unlock your meeting potential with Teacheat.
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 sm:mb-8"> {/* Adjusted text sizes and margin for mobile */}
            By signing up, I agree to the <Link to="/privacy-policy" className="underline hover:text-blue-600">Teacheat Privacy Policy</Link> and <Link to="/terms-of-service" className="underline hover:text-blue-600">Terms of Service</Link>.
          </p>

          <div className="space-y-4">
            <Auth
              supabaseClient={supabase}
              providers={[]} // No social providers to match the screenshot's email-focused design
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      // Backgrounds
                      defaultButtonBackground: 'hsl(var(--primary))', // Dark button background
                      defaultButtonBackgroundHover: 'hsl(222.2 47.4% 8%)', // Slightly darker primary for hover
                      inputBackground: 'hsl(var(--background))', // White in light mode, dark gray in dark mode
                      // Text colors
                      defaultButtonText: 'hsl(var(--primary-foreground))', // White text on dark button
                      inputText: 'hsl(var(--foreground))', // Dark text in light mode, light text in dark mode
                      anchorText: 'rgb(37 99 235)', // Tailwind blue-600
                      anchorTextHover: 'rgb(29 78 216)', // Tailwind blue-700
                      // Borders
                      inputBorder: 'hsl(var(--border))', // Light gray border
                      inputBorderHover: 'hsl(var(--ring))', // Ring color on hover
                      inputBorderFocus: 'hsl(var(--ring))', // Ring color on focus
                    },
                    radii: {
                      borderRadiusButton: '0.375rem', // rounded-md
                      borderRadiusInput: '0.375rem', // rounded-md
                    },
                    space: {
                      buttonPadding: '10px 14px', // Adjusted padding for mobile
                      inputPadding: '10px 14px', // Adjusted padding for mobile
                    }
                  },
                },
              }}
              theme="light" // You can change this to "dark" or dynamically based on theme
              magicLink={true} // Enable magic link for email-based authentication
              initialView="sign_up" // Default to signup view
            />
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto"> {/* Adjusted margin and gap for mobile */}
            {features.map((feature, index) => (
              <div key={index} className="flex items-start text-left space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MinimalAuthFooter />
    </div>
  );
};

export default Login;