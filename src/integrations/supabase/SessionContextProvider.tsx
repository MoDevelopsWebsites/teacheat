import React, { useState, useEffect, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './client';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setIsLoading(false);

        if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && currentSession) {
          const redirectTo = location.state?.redirectTo;
          if (redirectTo) {
            navigate(redirectTo, { state: { priceId: location.state.priceId, billingCycle: location.state.billingCycle }, replace: true });
          } else if (location.pathname === '/login') {
            navigate('/');
          }
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user || null);
      setIsLoading(false);

      if (initialSession && location.pathname === '/login') {
        const redirectTo = location.state?.redirectTo;
        if (redirectTo) {
          navigate(redirectTo, { state: { priceId: location.state.priceId, billingCycle: location.state.billingCycle }, replace: true });
        } else {
          navigate('/');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname, location.state]);

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