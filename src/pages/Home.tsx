import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import gtcoLogo from "@/assets/gtco-logo.png";

const Home = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-64">
        <TopNav />

        <main className="p-6 space-y-8">
          {/* GT Logo */}
          <div className="flex justify-end">
            <img src={gtcoLogo} alt="GTCO Logo" className="h-12 w-auto" />
          </div>

          {/* Hero Section */}
          <HeroSection />

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Transactions */}
          <RecentTransactions />
        </main>
      </div>
    </div>
  );
};

export default Home;
