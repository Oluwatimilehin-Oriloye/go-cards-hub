// import { useState } from "react";
// import { Sidebar } from "@/components/dashboard/Sidebar";
// import { TopNav } from "@/components/dashboard/TopNav";
// import { HeroSection } from "@/components/dashboard/HeroSection";
// import { StackedCardsCarousel } from "@/components/dashboard/StackedCardsCarousel";
// import { QuickActions } from "@/components/dashboard/QuickActions";
// import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
// import { CreateVirtualCardModal } from "@/components/modals/CreateVirtualCardModal";

// const Index = () => {
//   const [showCreateCardModal, setShowCreateCardModal] = useState(false);
//   const MAX_CARDS = 3;
//   const currentCardCount = 3; // Mock: User has 3 cards

//   return (
//     <div className="flex min-h-screen w-full bg-background">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 pl-64">
//         <TopNav />

//         <main className="p-6 space-y-8">
//           {/* Hero Section */}
//           <HeroSection />

//           {/* Stacked Cards Carousel */}
//           <StackedCardsCarousel
//             currentCardCount={currentCardCount}
//             maxCards={MAX_CARDS}
//             onCreateCard={() => setShowCreateCardModal(true)}
//           />

//           {/* Quick Actions */}
//           <QuickActions />

//           {/* Recent Transactions */}
//           <RecentTransactions />
//         </main>
//       </div>

//       {/* Create Card Modal */}
//       <CreateVirtualCardModal
//         isOpen={showCreateCardModal}
//         onClose={() => setShowCreateCardModal(false)}
//         currentCardCount={currentCardCount}
//         maxCards={MAX_CARDS}
//       />
//     </div>
//   );
// };

// export default Index;


import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { StackedCardsCarousel } from "@/components/dashboard/StackedCardsCarousel";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { CreateVirtualCardModal } from "@/components/modals/CreateVirtualCardModal";
import { getMyCards, Card } from "@/services/cardService";

const Index = () => {
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const MAX_CARDS = 3;

  // Fetch cards on mount
  const fetchCards = async () => {
    try {
      setLoading(true);
      const fetchedCards = await getMyCards();
      setCards(fetchedCards);
    } catch (error) {
      console.error("Failed to load cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // This function will be called after card creation
  const handleCardCreated = () => {
    fetchCards(); // Refetch cards to show the new one
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-64">
        <TopNav />

        <main className="p-6 space-y-8">
          {/* Hero Section */}
          <HeroSection 
            currentCardCount={cards.length}
            maxCards={MAX_CARDS}
            onOpenCreateModal={() => setShowCreateCardModal(true)}
          />

          {/* Stacked Cards Carousel */}
          <StackedCardsCarousel
            cards={cards}
            maxCards={MAX_CARDS}
            onCreateCard={() => setShowCreateCardModal(true)}
          />

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Transactions */}
          <RecentTransactions />
        </main>
      </div>

      {/* Single Create Card Modal - used by both HeroSection and StackedCardsCarousel */}
      <CreateVirtualCardModal
        isOpen={showCreateCardModal}
        onClose={() => setShowCreateCardModal(false)}
        currentCardCount={cards.length}
        maxCards={MAX_CARDS}
        onCardCreated={handleCardCreated}
      />
    </div>
  );
};

export default Index;