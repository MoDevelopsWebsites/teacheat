import { useSession } from "@/integrations/supabase/SessionContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        navigate('/chat'); // Redirect to chat if authenticated
      } else {
        navigate('/login'); // Redirect to login if not authenticated
      }
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-400">Loading session...</p>
      </div>
    );
  }

  // This component should ideally not be rendered for long, as it redirects.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <p className="text-xl text-gray-600 dark:text-gray-400">Redirecting...</p>
    </div>
  );
};

export default Index;