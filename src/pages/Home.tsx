import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3">Booking Management</h1>
          <p className="text-muted-foreground text-lg">Select your role to continue</p>
        </div>
        
        <div className="space-y-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/admin-login")}
            className="w-full h-16 text-lg border-2 hover:border-accent hover:text-accent transition-all duration-300"
          >
            <Shield className="mr-3 h-6 w-6" />
            Administrator
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/staff-login")}
            className="w-full h-16 text-lg border-2 hover:border-accent hover:text-accent transition-all duration-300"
          >
            <Users className="mr-3 h-6 w-6" />
            Staff
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
