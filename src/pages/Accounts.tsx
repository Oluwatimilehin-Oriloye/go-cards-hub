import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { CardBalanceTabs } from "@/components/accounts/CardBalanceTabs";
import { AccountBalanceCard } from "@/components/accounts/AccountBalanceCard";
import { AccountActions } from "@/components/accounts/AccountActions";
import { PhysicalCardBanner } from "@/components/accounts/PhysicalCardBanner";
import { CardTransactions } from "@/components/accounts/CardTransactions";
import { CreateVirtualCardModal } from "@/components/modals/CreateVirtualCardModal";
import { FundCardModal } from "@/components/modals/FundCardModal";
import { RequestPhysicalCardModal } from "@/components/modals/RequestPhysicalCardModal";
import {
  getAccountSummary,
  AccountSummaryData,
} from "@/services/accountService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

export default function Accounts() {
  const [activeCard, setActiveCard] = useState("account-balance");
  const [summaryData, setSummaryData] = useState<AccountSummaryData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [showFundCardModal, setShowFundCardModal] = useState(false);
  const [showRequestPhysicalCardModal, setShowRequestPhysicalCardModal] =
    useState(false);

  // NEW: selectedCard state used for modals that need cardId/cardName
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // 🚨 Data Fetching Logic
  const fetchAccountData = async () => {
    try {
      setLoading(true);
      const data = await getAccountSummary();
      setSummaryData(data);
      setError(null);
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError(
        err.message || "Failed to load account data. Please log in again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  // ✅ Refresh data after card creation
  const handleCardCreated = () => {
    console.log("Card created, refreshing data...");
    fetchAccountData();
  };

  // ✅ Refresh data after card funding
  const handleFundSuccess = () => {
    console.log("Card funded, refreshing data...");
    fetchAccountData();
  };

  // NEW: helper to open fund modal with correct cardId/cardName
  const openFundModal = () => {
    // If on the account-balance tab, pick first available virtual card
    if (activeCard === "account-balance") {
      const firstCard = summaryData?.cardBalances?.[0];
      if (!firstCard) {
        alert("Please create a virtual card first before funding.");
        return;
      }
      setSelectedCard({ id: firstCard.cardId, name: firstCard.cardName });
      setShowFundCardModal(true);
      return;
    }

    // If a specific card tab is active, find that card by cardId
    const card = summaryData?.cardBalances?.find(
      (c) => c.cardId === activeCard
    );
    if (!card) {
      alert("Selected card not found. Please try again.");
      return;
    }
    setSelectedCard({ id: card.cardId, name: card.cardName });
    setShowFundCardModal(true);
  };

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
                  cardList={summaryData.cardBalances}
                />
                {/* 🚨 Pass the fetched summaryData to the balance card */}
                <AccountBalanceCard
                  activeCard={activeCard}
                  summaryData={summaryData}
                />
                <AccountActions
                  onAddNewCard={() => setShowCreateCardModal(true)}
                  onFundCard={openFundModal} // <-- use helper that selects card
                />
              </div>

              {/* Physical Card Banner */}
              <PhysicalCardBanner
                onRequestCard={() => setShowRequestPhysicalCardModal(true)}
              />

              {/* Recent Transactions */}
              <CardTransactions activeCard={activeCard} />
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <CreateVirtualCardModal
        isOpen={showCreateCardModal}
        onClose={() => setShowCreateCardModal(false)}
        onCardCreated={handleCardCreated} // ✅ Added callback
        currentCardCount={summaryData?.cardBalances.length || 0}
        maxCards={3}
      />
      <FundCardModal
        isOpen={showFundCardModal}
        onClose={() => {
          setShowFundCardModal(false);
          setSelectedCard(null);
        }}
        onFundSuccess={handleFundSuccess} // ✅ Added callback
        // NEW: pass selected card id/name into modal
        cardId={selectedCard?.id}
        cardName={selectedCard?.name}
        summaryData={summaryData}
      />
      <RequestPhysicalCardModal
        isOpen={showRequestPhysicalCardModal}
        onClose={() => setShowRequestPhysicalCardModal(false)}
      />
    </div>
  );
}
