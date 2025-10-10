"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import AuthLogo from '@/components/AuthLogo';
import MinimalAuthFooter from '@/components/MinimalAuthFooter';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Assuming email/password signup for now
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // For a simple signup, we'll use a placeholder password or prompt the user later.
      // For now, let's assume a temporary password or a magic link flow.
      // The screenshot implies a direct email input, so a magic link is a good fit.
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/#/chat`, // Redirect to chat after magic link verification
        },
      });

      if (error) {
        throw error;
      }
      showSuccess("Check your email for a magic link to sign in!");
      // Optionally, redirect to a page informing the user to check their email
      navigate('/check-email'); 
    } catch (error: any) {
      console.error("Signup error:", error.message);
      showError(`Signup failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    "Get access to unlimited tasks, projects, and storage.",
    "See different views like list, board, and calendar.",
    "Invite your teammates to explore Teacheat.",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="absolute top-8 left-8">
        <AuthLogo />
      </div>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
            You're one click away <br /> from less busywork
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            By signing up, I agree to the <Link to="/privacy-policy" className="underline hover:text-blue-600">Teacheat Privacy Policy</Link> and <Link to="/terms-of-service" className="underline hover:text-blue-600">Terms of Service</Link>.
          </p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 rounded-md px-4 py-3 text-base font-semibold shadow-md"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <Link to="/login" className="underline hover:text-blue-600">Sign in</Link>
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
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