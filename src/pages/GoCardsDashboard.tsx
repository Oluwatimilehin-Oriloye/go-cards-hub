import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import gtcoLogo from "@/assets/gtco-logo.png";

export default function GoCardsDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img src={gtcoLogo} alt="GTCO" className="h-12" />
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-gray-800">GO CARDS Dashboard</span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Internet Banking
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">GO CARDS DASHBOARD</h1>
          <p className="text-gray-600 mb-6">
            Welcome to the GO Cards management portal. Manage your virtual and physical cards here.
          </p>
          <Button
            onClick={() => navigate("/home")}
            className="bg-primary hover:bg-orange-600 text-white px-8 py-3"
          >
            Go to GO Cards App
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 text-sm absolute bottom-0 w-full">
        © 2025 Guaranty Trust Bank Limited. RC 152321 (Licensed by the Central Bank of Nigeria).
      </footer>
    </div>
  );
}
