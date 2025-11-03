import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ManageBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No booking selected</h1>
          <Button onClick={() => navigate("/admin-dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleApprove = () => {
    toast({
      title: "Booking Approved",
      description: "The booking has been approved successfully.",
    });
    navigate("/admin-dashboard");
  };

  const handleDecline = () => {
    toast({
      title: "Booking Declined",
      description: "The booking has been declined.",
      variant: "destructive",
    });
    navigate("/admin-dashboard");
  };

  const handleDelete = () => {
    toast({
      title: "Booking Deleted",
      description: "The booking has been permanently deleted.",
      variant: "destructive",
    });
    navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin-dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="bg-card p-8 rounded-lg border border-border">
          <h1 className="text-3xl font-bold mb-6">Manage Booking</h1>
          
          <div className="mb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff ID</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{booking.staffId}</TableCell>
                  <TableCell>{booking.room}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.startTime}</TableCell>
                  <TableCell>{booking.endTime}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
            
            <Button
              onClick={handleDecline}
              className="bg-accent hover:bg-accent/90"
            >
              <X className="mr-2 h-4 w-4" />
              Decline
            </Button>
            
            <Button
              onClick={handleDelete}
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;
