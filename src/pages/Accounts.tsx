/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { Sidebar } from "@/components/dashboard/Sidebar";
// import { TopNav } from "@/components/dashboard/TopNav";
// import { CardBalanceTabs } from "@/components/accounts/CardBalanceTabs";
// import { AccountBalanceCard } from "@/components/accounts/AccountBalanceCard";
// import { AccountActions } from "@/components/accounts/AccountActions";
// import { PhysicalCardBanner } from "@/components/accounts/PhysicalCardBanner";
// import { CardTransactions } from "@/components/accounts/CardTransactions";

// export default function Accounts() {
//   const [activeCard, setActiveCard] = useState("account-balance");

//   return (
//     <div className="flex min-h-screen bg-background">
//       <Sidebar />

//       <div className="flex-1 ml-64">
//         <TopNav />

//         <main className="p-6 space-y-6">
//           {/* Page Title */}
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
//           </div>

//           {/* Card Balance Tabs & Details */}
//           <div className="space-y-4">
//             <CardBalanceTabs activeCard={activeCard} onCardChange={setActiveCard} />
//             <AccountBalanceCard activeCard={activeCard} />
//             <AccountActions />
//           </div>

//           {/* Physical Card Banner */}
//           <PhysicalCardBanner />

//           {/* Recent Transactions */}
//           <CardTransactions activeCard={activeCard} />
//         </main>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react"; // 🚨 Added useEffect for data fetching
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { CardBalanceTabs } from "@/components/accounts/CardBalanceTabs";
import { AccountBalanceCard } from "@/components/accounts/AccountBalanceCard";
import { AccountActions } from "@/components/accounts/AccountActions";
import { PhysicalCardBanner } from "@/components/accounts/PhysicalCardBanner";
import { CardTransactions } from "@/components/accounts/CardTransactions";
// 🚨 NEW IMPORTS for data fetching
import {
  getAccountSummary,
  AccountSummaryData,
} from "@/services/accountService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

export default function Accounts() {
  const [activeCard, setActiveCard] = useState("account-balance");
  // 🚨 NEW STATE: To hold the fetched account summary data
  const [summaryData, setSummaryData] = useState<AccountSummaryData | null>(
    null
  );
  // 🚨 NEW STATE: To track loading status
  const [loading, setLoading] = useState(true);
  // 🚨 NEW STATE: To handle errors during fetching
  const [error, setError] = useState<string | null>(null);

  // 🚨 Data Fetching Logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAccountSummary();
        setSummaryData(data);
      } catch (err: any) {
        // Log the full error for debugging but show a friendly message
        console.error("API Fetch Error:", err);
        setError(
          err.message || "Failed to load account data. Please log in again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

          {/* 🚨 Loading State */}
          {loading && (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
              <span className="text-lg text-muted-foreground">
                Loading account details...
              </span>
            </div>
          )}

          {/* 🚨 Error State */}
          {error && !loading && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* 🚨 Content Renders ONLY when data is successfully loaded */}
          {!loading && !error && summaryData && (
            <>
              {/* Card Balance Tabs & Details */}
              <div className="space-y-4">
                {/* 🚨 Pass cardBalances array to Tabs so it can render the card list */}
                <CardBalanceTabs
                  activeCard={activeCard}
                  onCardChange={setActiveCard}
                  cardList={summaryData.cardBalances} // 👈 NEW PROP
                />
                {/* 🚨 Pass the fetched summaryData to the balance card */}
                <AccountBalanceCard
                  activeCard={activeCard}
                  summaryData={summaryData}
                />
                <AccountActions />
              </div>

              {/* Physical Card Banner */}
              <PhysicalCardBanner />

              {/* Recent Transactions */}
              {/* NOTE: If CardTransactions uses the activeCard, it's fine. 
                   If it needs the full card list, you may need to pass summaryData here too. */}
              <CardTransactions activeCard={activeCard} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
