import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header'; // Import the Header component


const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-white dark:bg-gray-900">
      <Header className="absolute top-0 left-0 right-0" /> {/* Add the Header component */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mt-24 flex-grow flex flex-col justify-center"> {/* Added mt-24 to push content down */}
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Join Teacheat
        </h1>
        <Auth
          supabaseClient={supabase}
          providers={['google']} // Only Google provider is enabled now
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(var(--primary))',
                  brandAccent: 'hsl(var(--primary-foreground))',
                },
              },
            },
          }}
          theme="light" // You can change this to "dark" or dynamically based on theme
        />
      </div>
      {/* Footer removed from here */}
    </div>
  );
};

export default Login;