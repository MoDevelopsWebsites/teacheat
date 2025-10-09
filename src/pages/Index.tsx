import { MadeWithDyad } from "@/components/made-with-dyad";
import { useSession } from "@/integrations/supabase/SessionContextProvider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-400">Loading session...</p>
      </div>
    );
  }

  if (!session) {
    // This case should ideally be handled by the SessionContextProvider redirect,
    // but as a fallback, we can show a message or redirect.
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-400">Please log in to access the app.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to Teacheat, {session.user?.email}!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Your AI assistant is ready to help you.
        </p>
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;