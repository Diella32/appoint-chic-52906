import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft } from "lucide-react";

const CalendarPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());

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
            />
          </div>

          {date && (
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Selected date: <span className="font-medium text-foreground">{date.toLocaleDateString('en-GB')}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
