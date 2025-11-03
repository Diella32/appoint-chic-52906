import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const NewBooking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [room, setRoom] = useState("");
  const [staffName, setStaffName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startPeriod, setStartPeriod] = useState("AM");
  const [endTime, setEndTime] = useState("");
  const [endPeriod, setEndPeriod] = useState("PM");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!room || !staffName || !date || !startTime || !endTime) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Get current user's staff ID
    const currentUser = localStorage.getItem("username") || "Unknown";
    
    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBooking = {
      id: Date.now(),
      staffId: currentUser,
      staffName,
      room,
      date,
      startTime: `${startTime} ${startPeriod}`,
      endTime: `${endTime} ${endPeriod}`,
      status: "Pending" as const,
    };
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    toast({
      title: "Success",
      description: "Booking created successfully",
    });

    navigate("/booking-completed");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 transition-all duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="bg-card p-8 rounded-lg shadow-[var(--shadow-elegant)] border border-border">
          <h1 className="text-3xl font-bold mb-6">New Booking</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Room:</Label>
              <Select value={room} onValueChange={setRoom}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BoardRoom">Board Room</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="LargeScreen">Large Screen</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="staffName">Staff Name:</Label>
              <Input
                id="staffName"
                type="text"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                placeholder="Enter staff name"
                className="transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date: (DD/MM/YYYY)</Label>
              <Input
                id="date"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="DD/MM/YYYY"
                className="transition-all duration-300"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time:</Label>
                <div className="flex gap-4 items-center">
                  <Input
                    id="startTime"
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="00:00"
                    className="max-w-[120px] transition-all duration-300"
                  />
                  <RadioGroup value={startPeriod} onValueChange={setStartPeriod} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="AM" id="start-am" />
                      <Label htmlFor="start-am">AM</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PM" id="start-pm" />
                      <Label htmlFor="start-pm">PM</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time:</Label>
                <div className="flex gap-4 items-center">
                  <Input
                    id="endTime"
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="00:00"
                    className="max-w-[120px] transition-all duration-300"
                  />
                  <RadioGroup value={endPeriod} onValueChange={setEndPeriod} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="AM" id="end-am" />
                      <Label htmlFor="end-am">AM</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PM" id="end-pm" />
                      <Label htmlFor="end-pm">PM</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
