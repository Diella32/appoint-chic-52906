import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, LogOut } from "lucide-react";

interface Booking {
  id: number;
  staffId: string;
  staffName: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "Pending" | "Approved" | "Declined";
}

const PersonalBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const currentUser = localStorage.getItem("username") || "";

  useEffect(() => {
    const loadBookings = () => {
      const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const userBookings = allBookings.filter((b: Booking) => b.staffId === currentUser);
      setBookings(userBookings);
    };

    loadBookings();
    
    window.addEventListener("focus", loadBookings);
    return () => window.removeEventListener("focus", loadBookings);
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-accent hover:text-accent/80"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="bg-card p-8 rounded-lg shadow-[var(--shadow-elegant)] border border-border">
          <h1 className="text-3xl font-bold mb-6">Personal Bookings</h1>
          
          {bookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No bookings found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
            <TableRow>
              <TableHead>Room</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id} className="transition-colors duration-200">
                      <TableCell className="font-medium">{booking.room}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>{booking.startTime}</TableCell>
                      <TableCell>{booking.endTime}</TableCell>
                      <TableCell>
                        <span className={
                          booking.status === "Approved" ? "text-green-600" :
                          booking.status === "Declined" ? "text-accent" :
                          "text-yellow-600"
                        }>
                          {booking.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalBookings;
