import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner }
from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import HeroLandingPage from "./pages/HeroLandingPage"; // New default landing page
import WaitlistPage from "./pages/WaitlistPage"; // Renamed from LandingPage
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import EnterpriseLandingPage from "./pages/EnterpriseLandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Layout from "./components/Layout";
import { SessionContextProvider } from "./integrations/supabase/SessionContextProvider";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { LenisProvider } from "./components/LenisProvider";

const queryClient = new QueryClient();

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <SessionContextProvider>
          <Elements stripe={stripePromise}>
            <LenisProvider>
              <Routes>
                <Route path="/" element={<HeroLandingPage />} /> {/* New default landing page */}
                <Route path="/waitlist" element={<WaitlistPage />} /> {/* Dedicated waitlist page */}
                <Route path="/login" element={<Login />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/enterprise" element={<EnterpriseLandingPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route element={<Layout />}>
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </LenisProvider>
          </Elements>
        </SessionContextProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;