
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MainLayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

const MainLayout = ({ children, showNavigation = true }: MainLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // This will be replaced with actual Supabase authentication after setup
  const handleLogout = () => {
    // We'll implement actual logout with Supabase later
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {showNavigation && (
        <header className="border-b bg-white shadow-sm">
          <div className="container flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold text-primary">FinJourney</h1>
            </Link>
            <nav className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </div>
        </header>
      )}
      <main className="flex-1">
        <div className="container py-6">{children}</div>
      </main>
      <footer className="border-t bg-white py-4 text-center text-sm text-gray-500">
        <div className="container">
          &copy; {new Date().getFullYear()} FinJourney - Your Financial Journey Planner
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
