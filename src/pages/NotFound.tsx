import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/Header'; // Import the Header component


const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white dark:bg-gray-900">
      <Header className="absolute top-0 left-0 right-0" />
      <div className="text-center flex-grow flex flex-col justify-center items-center mt-24"> {/* Added mt-24 and flex-grow */}
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
      {/* Footer removed from here */}
    </div>
  );
};

export default NotFound;