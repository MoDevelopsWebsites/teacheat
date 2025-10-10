"use client";

import * as React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, MessageSquare, Settings, LogOut, PlusCircle, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/integrations/supabase/SessionContextProvider";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, onClick }) => (
  <Button
    asChild
    variant="ghost"
    className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    onClick={onClick}
  >
    <Link to={to}>
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  </Button>
);

const Layout: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const { user, isLoading, session } = useSession();
  const navigate = useNavigate();

  // Redirect unauthenticated users from protected routes to the login page
  React.useEffect(() => {
    if (!isLoading && !session) {
      navigate('/login');
    }
  }, [isLoading, session, navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      showSuccess("Logged out successfully!");
      navigate('/login');
    } catch (error: any) {
      console.error("Logout error:", error.message);
      showError("Failed to log out. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-400">Loading application...</p>
      </div>
    );
  }

  const sidebarContent = (
    <div className="flex h-full flex-col bg-sidebar p-4 text-sidebar-foreground">
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="text-xl font-bold text-sidebar-foreground hover:text-sidebar-foreground/80 transition-colors">
          <h2>Teacheat AI</h2>
        </Link>
        {!isMobile && (
          <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <PlusCircle className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="flex-grow space-y-2">
        <NavLink to="/chat" icon={<MessageSquare className="h-5 w-5" />} label="Chat" onClick={() => isMobile && setIsSheetOpen(false)} />
        <NavLink to="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" onClick={() => isMobile && setIsSheetOpen(false)} />
        <NavLink to="/pricing" icon={<UserIcon className="h-5 w-5" />} label="Pricing" onClick={() => isMobile && setIsSheetOpen(false)} />
        
        <Separator className="my-4 bg-sidebar-border" />
        <h3 className="text-sm font-semibold text-sidebar-foreground/80 mb-2">Recent Chats</h3>
        {/* Placeholder for recent chats */}
        <div className="text-sm text-sidebar-foreground/60">No recent chats</div>
      </div>

      <div className="mt-auto pt-4 border-t border-sidebar-border">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                  <UserIcon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-sidebar-foreground">{user.email}</span>
                <span className="text-xs text-sidebar-foreground/70">User</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="text-sm text-sidebar-foreground/70">Loading user...</div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="flex h-screen flex-col">
        <header className="flex items-center justify-between p-4 border-b bg-background">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              {sidebarContent}
            </SheetContent>
          </Sheet>
          <Link to="/" className="text-lg font-semibold hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <h1>Teacheat AI</h1>
          </Link>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </header>
        <main className="flex-grow overflow-auto">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen items-stretch"
    >
      <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
        {sidebarContent}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <main className="flex-grow overflow-auto h-full">
          <Outlet />
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Layout;