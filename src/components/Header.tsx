"use client";

import React, { useState, useEffect } from 'react';
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
  DollarSign, Star, Building,
  Briefcase, Megaphone, LifeBuoy, Settings,
  Menu, User as UserIcon, LogOut
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSession } from '@/integrations/supabase/SessionContextProvider';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  className?: string;
  isLandingPageHeader?: boolean;
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string; icon?: React.ReactNode; }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon && <span className="mr-2 text-muted-foreground">{icon}</span>}
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

const MOBILE_BREAKPOINT = 768;

const Header: React.FC<HeaderProps> = ({ className, isLandingPageHeader }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, isLoading: isSessionLoading } = useSession();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/login');
  };

  const handleWaitlistClick = () => {
    navigate('/waitlist'); // Navigate to the new /waitlist route
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      showSuccess("Logged out successfully!");
      // The Layout component will handle redirection to /login
    } catch (error: any) {
      console.error("Logout error:", error.message);
      showError("Failed to log out. Please try again.");
    }
  };

  // Define common text and hover styles for navigation items
  const navItemClasses = "text-landing-text-primary/80 hover:text-landing-text-primary hover:bg-gray-200 dark:text-white/80 dark:hover:text-white dark:hover:bg-gray-700";
  const logoTextClasses = "text-landing-text-primary dark:text-white";
  const logoImageClasses = "absolute -top-6 right-0 h-10 w-10 transform rotate-12 dark:filter dark:invert";

  return (
    <header className={cn("w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-50", className)}>
      {isMobile ? (
        <>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("text-landing-text-primary hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700")}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 bg-background dark:bg-gray-900">
              <div className="flex flex-col h-full p-4">
                <Link to="/" className={cn("relative flex items-center font-bold text-xl mb-6", logoTextClasses)} onClick={() => setIsSheetOpen(false)}>
                  <img
                    src={import.meta.env.BASE_URL + "bachelor-hat-icon.png"}
                    alt="Teacheat Logo"
                    className={logoImageClasses}
                  />
                  <span className="mr-2">Teacheat</span>
                </Link>
                <nav className="flex-grow space-y-2">
                  <Button asChild variant="ghost" className={cn("w-full justify-start", navItemClasses)} onClick={() => setIsSheetOpen(false)}>
                    <Link to="/pricing">Pricing</Link>
                  </Button>
                  <Button asChild variant="ghost" className={cn("w-full justify-start", navItemClasses)} onClick={() => setIsSheetOpen(false)}>
                    <Link to="/enterprise">Enterprise</Link>
                  </Button>
                  <Button asChild variant="ghost" className={cn("w-full justify-start", navItemClasses)} onClick={() => setIsSheetOpen(false)}>
                    <Link to="#">Blog</Link>
                  </Button>
                </nav>
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
                  {!isSessionLoading && user ? (
                    <>
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-center", navItemClasses)}
                        onClick={() => { navigate('/settings'); setIsSheetOpen(false); }}
                      >
                        <UserIcon className="h-4 w-4 mr-2" /> Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-center text-destructive hover:bg-destructive/10", navItemClasses)}
                        onClick={() => { handleLogout(); setIsSheetOpen(false); }}
                      >
                        <LogOut className="h-4 w-4 mr-2" /> Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-center", navItemClasses)}
                        onClick={() => { handleWaitlistClick(); setIsSheetOpen(false); }}
                      >
                        Waitlist
                      </Button>
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-center", navItemClasses)}
                        onClick={() => { handleLoginClick(); setIsSheetOpen(false); }}
                      >
                        Login
                      </Button>
                      <Button
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold shadow-md"
                        onClick={() => { handleSignUpClick(); setIsSheetOpen(false); }}
                      >
                        Sign up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/" className={cn("relative flex items-center font-bold text-xl transition-colors", logoTextClasses)}>
            <img
              src={import.meta.env.BASE_URL + "bachelor-hat-icon.png"}
              alt="Teacheat Logo"
              className={logoImageClasses}
            />
            <span className="mr-2">Teacheat</span>
          </Link>
          <div className="w-10"></div>
        </>
      ) : (
        <>
          <div className="flex items-center space-x-4 md:space-x-12">
            <Link to="/" className={cn("relative flex items-center font-bold text-xl transition-colors", logoTextClasses)}>
              <img
                src={import.meta.env.BASE_URL + "bachelor-hat-icon.png"}
                alt="Teacheat Logo"
                className={logoImageClasses}
              />
              <span className="mr-2">Teacheat</span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent", navItemClasses)}
                    onClick={() => navigate('/pricing')}
                  >
                    Pricing
                  </NavigationMenuTrigger>
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
                  <NavigationMenuTrigger
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent", navItemClasses)}
                    onClick={() => navigate('/enterprise')}
                  >
                    Enterprise
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            to="/enterprise"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Teacheat for Enterprise
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Discover custom solutions for your business needs.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
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
                  <Link to="#" className={cn(navigationMenuTriggerStyle(), "bg-transparent", navItemClasses)}>
                    Blog
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuViewport />
            </NavigationMenu>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {!isSessionLoading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={cn(navItemClasses, "px-3 py-1 h-auto text-sm md:px-4 md:py-2 flex items-center space-x-2")}>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user.email ? user.email[0].toUpperCase() : <UserIcon className="h-3 w-3" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className={cn(navItemClasses, "px-3 py-1 h-auto text-sm md:px-4 md:py-2")}
                  onClick={handleWaitlistClick}
                >
                  Waitlist
                </Button>
                <Button
                  variant="ghost"
                  className={cn(navItemClasses, "px-3 py-1 h-auto text-sm md:px-4 md:py-2")}
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-3 py-1 h-auto text-sm font-semibold shadow-md md:px-4 md:py-2"
                  onClick={handleSignUpClick}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;