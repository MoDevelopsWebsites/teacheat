"use client";

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  DollarSign, Star, Building, // Icons for Pricing
  Briefcase, Megaphone, LifeBuoy, Settings // Icons for Enterprise
} from 'lucide-react'; // Import lucide-react icons

interface HeaderProps {
  className?: string;
  isLandingPageHeader?: boolean;
}

// Helper component for list items within dropdowns
const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>, // Changed to Link element type
  React.ComponentPropsWithoutRef<typeof Link> & { title: string; icon?: React.ReactNode; } // Changed to Link props
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link // Changed from <a> to Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none"> {/* Flex container for icon and title */}
            {icon && <span className="mr-2 text-muted-foreground">{icon}</span>} {/* Render icon if provided */}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const MOBILE_BREAKPOINT = 768; // Define mobile breakpoint

const Header: React.FC<HeaderProps> = ({ className, isLandingPageHeader }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false); // State to track mobile status

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile); // Listen for resize events

    return () => window.removeEventListener('resize', checkMobile); // Cleanup
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/login');
  };

  return (
    <header className={cn("w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-50", className)}>
      <div className="flex items-center space-x-4 md:space-x-12"> {/* Adjusted spacing for mobile */}
        <Link to="/" className={cn("relative flex items-center font-bold text-xl transition-colors", isLandingPageHeader ? "text-white" : "text-landing-text-primary")}>
          <img
            src={import.meta.env.BASE_URL + "bachelor-hat-icon.png"}
            alt="Teacheat Logo"
            className={cn(
              "absolute -top-6 right-0 h-10 w-10 transform rotate-12",
              isLandingPageHeader ? "filter invert" : ""
            )}
          />
          <span className="mr-2">Teacheat</span>
        </Link>
        {!isMobile && ( // Conditionally render NavigationMenu on non-mobile
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "bg-transparent", isLandingPageHeader ? "text-white/80 hover:text-white hover:bg-white/20" : "text-landing-text-primary/80 hover:text-landing-text-primary hover:bg-gray-200 dark:hover:bg-gray-700")}>Pricing</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/pricing"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Teacheat Pricing
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Find the perfect plan for your needs, from free to enterprise.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem to="/pricing" title="Starter" icon={<DollarSign className="h-4 w-4" />}>
                      Limited AI responses, unlimited notetaking.
                    </ListItem>
                    <ListItem to="/pricing" title="Pro" icon={<Star className="h-4 w-4" />}>
                      Unlimited AI, advanced models, priority support.
                    </ListItem>
                    <ListItem to="/pricing" title="Enterprise" icon={<Building className="h-4 w-4" />}>
                      Custom solutions for teams, advanced analytics.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "bg-transparent", isLandingPageHeader ? "text-white/80 hover:text-white hover:bg-white/20" : "text-landing-text-primary/80 hover:text-landing-text-primary hover:bg-gray-200 dark:hover:bg-gray-700")}>Enterprise</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem to="/enterprise" title="Sales Teams" icon={<Briefcase className="h-4 w-4" />}>
                      Close deals faster with AI-powered insights.
                    </ListItem>
                    <ListItem to="/enterprise" title="Marketing Teams" icon={<Megaphone className="h-4 w-4" />}>
                      Understand customer needs and optimize campaigns.
                    </ListItem>
                    <ListItem to="/enterprise" title="Support Teams" icon={<LifeBuoy className="h-4 w-4" />}>
                      Improve customer satisfaction with instant answers.
                    </ListItem>
                    <ListItem to="/enterprise" title="Custom Solutions" icon={<Settings className="h-4 w-4" />}>
                      Tailored AI solutions for unique business needs.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="#" className={cn(navigationMenuTriggerStyle(), "bg-transparent", isLandingPageHeader ? "text-white/80 hover:text-white hover:bg-white/20" : "text-landing-text-primary/80 hover:text-landing-text-primary hover:bg-gray-200 dark:hover:bg-gray-700")}>
                  Blog
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        )}
      </div>
      <div className="flex items-center space-x-2 md:space-x-4"> {/* Adjusted spacing for mobile */}
        <Button
          variant="ghost"
          className={cn(isLandingPageHeader ? "text-white hover:bg-white/20" : "text-landing-text-primary hover:bg-gray-200 dark:hover:bg-gray-700", "px-3 py-1 h-auto text-sm md:px-4 md:py-2")} /* Adjusted button padding/height */
          onClick={handleLoginClick}
        >
          Login
        </Button>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-3 py-1 h-auto text-sm font-semibold shadow-md md:px-4 md:py-2" /* Adjusted button padding/height */
          onClick={handleSignUpClick}
        >
          Sign up
        </Button>
      </div>
    </header>
  );
};

export default Header;