import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const EditCancel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const currentUser = localStorage.getItem("username") || "";

  useEffect(() => {
    loadBookings();
  }, [currentUser]);

  const loadBookings = () => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const userBookings = allBookings.filter((b: Booking) => b.staffId === currentUser);
    setBookings(userBookings);
  };

  const handleDelete = (id: number) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = allBookings.filter((b: Booking) => b.id !== id);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    loadBookings();
    
    toast({
      title: "Booking Cancelled",
      description: "The booking has been successfully cancelled.",
    });
  };

  const handleEdit = (booking: Booking) => {
    // In a real app, this would navigate to an edit form
    toast({
      title: "Edit Booking",
      description: `Editing booking for ${booking.staffName}`,
    });
  };


  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 transition-all duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="bg-card p-8 rounded-lg shadow-[var(--shadow-elegant)] border border-border">
          <h1 className="text-3xl font-bold mb-6">Edit / Cancel Bookings</h1>
          
          {bookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No bookings to manage</p>
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
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id} className="transition-colors duration-200">
                      <TableCell>{booking.room}</TableCell>
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
                      <TableCell>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleDelete(booking.id)}
                          className="text-accent hover:text-accent/80 p-0"
                        >
                          Cancel
                        </Button>
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

export default EditCancel;
