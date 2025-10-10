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
  const navigate = useNavigate();

  const features = [
    "Get access to unlimited AI responses and meeting notes.",
    "Receive real-time suggestions and insights during calls.",
    "Collaborate with your team and share meeting knowledge.",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <AuthLogo />
      </div>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
            Unlock your meeting potential with Teacheat.
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
            By signing up, I agree to the <Link to="/privacy-policy" className="underline hover:text-blue-600">Teacheat Privacy Policy</Link> and <Link to="/terms-of-service" className="underline hover:text-blue-600">Terms of Service</Link>.
          </p>

          <div className="space-y-4">
            <Auth
              supabaseClient={supabase}
              providers={[]}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      defaultButtonBackground: 'hsl(var(--primary))',
                      defaultButtonBackgroundHover: 'hsl(222.2 47.4% 8%)',
                      inputBackground: 'hsl(var(--background))',
                      defaultButtonText: 'hsl(var(--primary-foreground))',
                      inputText: 'hsl(var(--foreground))',
                      anchorText: 'rgb(37 99 235)',
                      anchorTextHover: 'rgb(29 78 216)',
                      inputBorder: 'hsl(var(--border))',
                      inputBorderHover: 'hsl(var(--ring))',
                      inputBorderFocus: 'hsl(var(--ring))',
                    },
                    radii: {
                      borderRadiusButton: '0.375rem',
                      borderRadiusInput: '0.375rem',
                    },
                    space: {
                      buttonPadding: '10px 14px',
                      inputPadding: '10px 14px',
                    }
                  },
                },
              }}
              theme="light"
              magicLink={true}
              initialView="sign_up"
            />
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto">
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