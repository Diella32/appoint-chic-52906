import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const BookingCompleted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-20 w-20 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Booking Completed!</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Your booking has been successfully created.
        </p>
        <Button
          onClick={() => navigate("/dashboard")}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default BookingCompleted;
