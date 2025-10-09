import React, { useState, useEffect, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './client';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

interface SessionContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to access state

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setIsLoading(false);

        if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && currentSession) {
          // Check if there's a redirectTo path in the state
          const redirectTo = location.state?.redirectTo;
          if (redirectTo) {
            navigate(redirectTo, { state: { priceId: location.state.priceId, billingCycle: location.state.billingCycle }, replace: true });
          } else if (location.pathname === '/login') {
            navigate('/'); // Default redirect to home if no specific path
          }
        }
        // Removed SIGNED_OUT redirection from here, Layout will handle protected routes
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user || null);
      setIsLoading(false);

      // If authenticated and currently on the login page, redirect to root
      if (initialSession && location.pathname === '/login') {
        const redirectTo = location.state?.redirectTo;
        if (redirectTo) {
          navigate(redirectTo, { state: { priceId: location.state.priceId, billingCycle: location.state.billingCycle }, replace: true });
        } else {
          navigate('/');
        }
      }
      // Removed unauthenticated redirection from here, Layout will handle protected routes
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname, location.state]); // Add location.state to dependencies

  return (
    <SessionContext.Provider value={{ session, user, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};