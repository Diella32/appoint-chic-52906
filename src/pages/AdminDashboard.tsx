import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Booking {
  staffId: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "Pending" | "Approved" | "Declined";
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [bookings] = useState<Booking[]>([
    { staffId: "000001", room: "BoardRoom", date: "22/04/2025", startTime: "09:30 AM", endTime: "11:00 AM", status: "Pending" },
    { staffId: "000002", room: "Operations", date: "02/04/2025", startTime: "02:00 PM", endTime: "03:00 PM", status: "Approved" },
    { staffId: "000003", room: "Large Screen", date: "08/04/2025", startTime: "10:00 AM", endTime: "12:00 PM", status: "Declined" },
    { staffId: "000005", room: "Training", date: "07/04/2025", startTime: "08:30 AM", endTime: "10:00 AM", status: "Pending" },
  ]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("userRole");
    const storedUsername = localStorage.getItem("username");
    
    if (!isAuthenticated || userRole !== "admin") {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600";
      case "Approved":
        return "text-green-600";
      case "Declined":
        return "text-accent";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-accent hover:text-accent/80"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff ID</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell>{booking.staffId}</TableCell>
                  <TableCell>{booking.room}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.startTime}</TableCell>
                  <TableCell>{booking.endTime}</TableCell>
                  <TableCell className={getStatusColor(booking.status)}>
                    {booking.status}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      className="text-accent hover:text-accent/80 p-0"
                      onClick={() => navigate("/manage-booking", { state: { booking } })}
                    >
                      Manage Reservation
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
