import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Import the new LandingPage
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import { SessionContextProvider } from "./integrations/supabase/SessionContextProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SessionContextProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Set LandingPage as the default route */}
            <Route path="/login" element={<Login />} />
            {/* Authenticated routes wrapped by Layout */}
            <Route element={<Layout />}>
              <Route path="/chat" element={<Chat />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SessionContextProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;