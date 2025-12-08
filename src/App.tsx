import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Accounts from "./pages/Accounts";
import Payments from "./pages/Payments";
import Transactions from "./pages/Transactions";
import Cards from "./pages/Cards";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import LandingIndex from "./pages/LandingIndex";
import GTBankDashboard from "./pages/GTBankDashboard";
import GoCardsDashboard from "./pages/GoCardsDashboard";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingIndex />} />
          <Route path="/home" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<GTBankDashboard />} />
          <Route path="/go-cards-dashboard" element={<GoCardsDashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
