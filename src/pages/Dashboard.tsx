import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, FileEdit, LogOut, Plus, User } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("userRole");
    const storedUsername = localStorage.getItem("username");
    
    if (!isAuthenticated || userRole !== "staff") {
      navigate("/");
      return;
    }
    
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const navItems = [
    { title: "New Booking", icon: Plus, path: "/new-booking", variant: "default" as const },
    { title: "Personal Bookings", icon: User, path: "/personal-bookings", variant: "secondary" as const },
    { title: "Calendar", icon: Calendar, path: "/calendar", variant: "secondary" as const },
    { title: "Edit / Cancel", icon: FileEdit, path: "/edit-cancel", variant: "secondary" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome{username ? `, ${username}` : ''}</h1>
          <p className="text-muted-foreground text-lg">Manage your bookings with ease</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={item.variant}
              size="lg"
              onClick={() => navigate(item.path)}
              className="h-24 text-lg transition-all duration-300 hover:shadow-[var(--shadow-hover)] flex items-center justify-center gap-3"
            >
              <item.icon className="h-6 w-6" />
              {item.title}
            </Button>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-accent hover:text-accent/80 inline-flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
