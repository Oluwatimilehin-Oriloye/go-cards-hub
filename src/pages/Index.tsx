import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { StackedCardsCarousel } from "@/components/dashboard/StackedCardsCarousel";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { CreateVirtualCardModal } from "@/components/modals/CreateVirtualCardModal";

const Index = () => {
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const MAX_CARDS = 3;
  const currentCardCount = 3; // Mock: User has 3 cards

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-64">
        <TopNav />

        <main className="p-6 space-y-8">
          {/* Hero Section */}
          <HeroSection />

          {/* Stacked Cards Carousel */}
          <StackedCardsCarousel 
            currentCardCount={currentCardCount}
            maxCards={MAX_CARDS}
            onCreateCard={() => setShowCreateCardModal(true)}
          />

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Transactions */}
          <RecentTransactions />
        </main>
      </div>

      {/* Create Card Modal */}
      <CreateVirtualCardModal
        isOpen={showCreateCardModal}
        onClose={() => setShowCreateCardModal(false)}
        currentCardCount={currentCardCount}
        maxCards={MAX_CARDS}
      />
    </div>
  );
};

export default Index;
