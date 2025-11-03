import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import StaffLogin from "./pages/StaffLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import NewBooking from "./pages/NewBooking";
import BookingCompleted from "./pages/BookingCompleted";
import PersonalBookings from "./pages/PersonalBookings";
import CalendarPage from "./pages/CalendarPage";
import EditCancel from "./pages/EditCancel";
import ManageBooking from "./pages/ManageBooking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-booking" element={<NewBooking />} />
          <Route path="/booking-completed" element={<BookingCompleted />} />
          <Route path="/personal-bookings" element={<PersonalBookings />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/edit-cancel" element={<EditCancel />} />
          <Route path="/manage-booking" element={<ManageBooking />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
