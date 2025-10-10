"use client";

import React from 'react';
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
  NavigationMenuViewport, // Import NavigationMenuViewport
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  className?: string;
  isLandingPageHeader?: boolean;
}

// Helper component for list items within dropdowns
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Header: React.FC<HeaderProps> = ({ className, isLandingPageHeader }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/login');
  };

  // Base classes for navigation items to give them a button-like shape
  const navItemBaseClasses = "px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200";

  // Classes for navigation links (Blog)
  const navLinkClasses = cn(
    navItemBaseClasses,
    isLandingPageHeader
      ? "text-white/80 hover:bg-white/20 hover:text-white hover:shadow-lg hover:shadow-white/70 hover:scale-105"
      : "text-landing-text-primary/80 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-landing-text-primary hover:shadow-lg hover:shadow-gray-300/70 dark:hover:shadow-gray-700/70 hover:scale-105"
  );

  // Classes for the Login button
  const loginButtonClasses = cn(
    navItemBaseClasses,
    isLandingPageHeader
      ? "text-white hover:bg-white/20 hover:shadow-lg hover:shadow-white/70 hover:scale-105"
      : "text-landing-text-primary hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-landing-text-primary hover:shadow-lg hover:shadow-gray-300/70 dark:hover:shadow-gray-700/70 hover:scale-105"
  );

  // Dynamic text color for NavigationMenuTrigger
  const triggerTextColorClass = isLandingPageHeader ? "text-white/80 hover:text-white" : "text-landing-text-primary/80 hover:text-landing-text-primary";
  const triggerHoverBgClass = isLandingPageHeader ? "hover:bg-white/20" : "hover:bg-gray-200 dark:hover:bg-gray-700";


  return (
    <header className={cn("w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-50", className)}>
      <div className="flex items-center space-x-12">
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
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(triggerTextColorClass, triggerHoverBgClass)}>Pricing</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/pricing"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Teacheat Pricing
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Find the perfect plan for your needs, from free to enterprise.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/pricing" title="Starter">
                    Limited AI responses, unlimited notetaking.
                  </ListItem>
                  <ListItem href="/pricing" title="Pro">
                    Unlimited AI, advanced models, priority support.
                  </ListItem>
                  <ListItem href="/pricing" title="Enterprise">
                    Custom solutions for teams, advanced analytics.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(triggerTextColorClass, triggerHoverBgClass)}>Enterprise</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/enterprise" title="Sales Teams">
                    Close deals faster with AI-powered insights.
                  </ListItem>
                  <ListItem href="/enterprise" title="Marketing Teams">
                    Understand customer needs and optimize campaigns.
                  </ListItem>
                  <ListItem href="/enterprise" title="Support Teams">
                    Improve customer satisfaction with instant answers.
                  </ListItem>
                  <ListItem href="/enterprise" title="Custom Solutions">
                    Tailored AI solutions for unique business needs.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="#" className={cn(navigationMenuTriggerStyle(), navLinkClasses)}>
                Blog
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport /> {/* Add the viewport here */}
        </NavigationMenu>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          className={loginButtonClasses}
          onClick={handleLoginClick}
        >
          Login
        </Button>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-semibold shadow-md"
          onClick={handleSignUpClick}
        >
          Sign up
        </Button>
      </div>
    </header>
  );
};

export default Header;