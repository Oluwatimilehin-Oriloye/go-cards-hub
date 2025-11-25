import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { CardBalanceTabs } from "@/components/accounts/CardBalanceTabs";
import { AccountBalanceCard } from "@/components/accounts/AccountBalanceCard";
import { AccountActions } from "@/components/accounts/AccountActions";
import { PhysicalCardBanner } from "@/components/accounts/PhysicalCardBanner";
import { CardTransactions } from "@/components/accounts/CardTransactions";

export default function Accounts() {
  const [activeCard, setActiveCard] = useState("account-balance");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="p-6 space-y-6">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
          </div>

          {/* Card Balance Tabs & Details */}
          <div className="space-y-4">
            <CardBalanceTabs activeCard={activeCard} onCardChange={setActiveCard} />
            <AccountBalanceCard activeCard={activeCard} />
            <AccountActions />
          </div>

          {/* Physical Card Banner */}
          <PhysicalCardBanner />

          {/* Recent Transactions */}
          <CardTransactions activeCard={activeCard} />
        </main>
      </div>
    </div>
  );
}
