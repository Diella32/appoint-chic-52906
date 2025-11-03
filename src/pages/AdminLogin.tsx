import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("userRole", "admin");
    
    toast({
      title: "Welcome back!",
      description: "Login successful",
    });
    
    navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Log In | Admin</h1>
          <p className="text-muted-foreground">Administrator access</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6 bg-card p-8 rounded-lg border border-border">
          <div className="space-y-2">
            <Label htmlFor="username">Username:</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="transition-all duration-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="transition-all duration-300"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
