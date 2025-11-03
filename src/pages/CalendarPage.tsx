import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft } from "lucide-react";

interface Booking {
  id: string;
  staffId: string;
  staffName: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "Pending" | "Approved" | "Declined";
}

const CalendarPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const loadBookings = () => {
      const stored = localStorage.getItem("bookings");
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    };
    
    loadBookings();
    window.addEventListener("focus", loadBookings);
    return () => window.removeEventListener("focus", loadBookings);
  }, []);

  const bookedDates = bookings.map(booking => {
    const [day, month, year] = booking.date.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 transition-all duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="bg-card p-8 rounded-lg shadow-[var(--shadow-elegant)] border border-border">
          <h1 className="text-3xl font-bold mb-6">Calendar</h1>
          
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                booked: bookedDates
              }}
              modifiersClassNames={{
                booked: "bg-primary/20 text-primary font-bold relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full"
              }}
            />
          </div>

          {date && (
            <div className="mt-6">
              <p className="text-muted-foreground text-center mb-4">
                Selected date: <span className="font-medium text-foreground">{date.toLocaleDateString('en-GB')}</span>
              </p>
              
              {bookings.filter(booking => {
                const [day, month, year] = booking.date.split('/');
                const bookingDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                return bookingDate.toDateString() === date.toDateString();
              }).length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-3">Bookings on this date:</h3>
                  <div className="space-y-2">
                    {bookings.filter(booking => {
                      const [day, month, year] = booking.date.split('/');
                      const bookingDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                      return bookingDate.toDateString() === date.toDateString();
                    }).map(booking => (
                      <div key={booking.id} className="p-3 border rounded-md bg-card">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{booking.room}</p>
                            <p className="text-sm text-muted-foreground">{booking.staffName}</p>
                            <p className="text-sm">{booking.startTime} - {booking.endTime}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            booking.status === 'Declined' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
