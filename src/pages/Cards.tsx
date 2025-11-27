// import { useState } from "react";
// import { Sidebar } from "@/components/dashboard/Sidebar";
// import { TopNav } from "@/components/dashboard/TopNav";
// import { VirtualCardCarousel } from "@/components/cards/VirtualCardCarousel";
// import { CardActions } from "@/components/cards/CardActions";
// import { CardTransactions } from "@/components/cards/CardTransactions";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import { CreateVirtualCardModal } from "@/components/modals/CreateVirtualCardModal";

// export default function Cards() {
//   const [selectedCardId, setSelectedCardId] = useState("temu-card");
//   const [showCreateCardModal, setShowCreateCardModal] = useState(false);

//   // Mock cards data
//   const cards = [
//     { id: "temu-card", name: "Temu Card", balance: 45000 },
//     { id: "jumia-card", name: "Jumia Card", balance: 32000 },
//     { id: "konga-card", name: "Konga Card", balance: 18500 },
//   ];

//   const selectedCard = cards.find(card => card.id === selectedCardId) || cards[0];
//   const MAX_CARDS = 3;
//   const currentCardCount = cards.length;

//   return (
//     <div className="flex min-h-screen bg-background">
//       <Sidebar />

//       <div className="flex-1 ml-64">
//         <TopNav />

//         <main className="p-6 space-y-8">
//           {/* Page Title */}
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-foreground">Cards</h1>
//             <Button
//               onClick={() => setShowCreateCardModal(true)}
//               className="bg-primary hover:bg-primary/90"
//             >
//               <Plus className="mr-2 h-4 w-4" />
//               Create Virtual Card
//             </Button>
//           </div>

//           {/* Card Carousel */}
//           <VirtualCardCarousel
//             selectedCardId={selectedCardId}
//             onCardSelect={setSelectedCardId}
//           />

//           {/* Action Buttons */}
//           <CardActions
//             selectedCardId={selectedCardId}
//             cardName={selectedCard.name}
//             balance={selectedCard.balance}
//           />

//           {/* Recent Transactions */}
//           <CardTransactions selectedCardId={selectedCardId} />
//         </main>
//       </div>

//       {/* Modals */}
//       <CreateVirtualCardModal
//         isOpen={showCreateCardModal}
//         onClose={() => setShowCreateCardModal(false)}
//         currentCardCount={currentCardCount}
//         maxCards={MAX_CARDS}
//       />
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { VirtualCardCarousel } from "@/components/cards/VirtualCardCarousel";
import { CardActions } from "@/components/cards/CardActions";
import { CardTransactions } from "@/components/cards/CardTransactions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateVirtualCardModal } from "@/components/modals/CreateVirtualCardModal";
import { getMyCards, Card } from "@/services/cardService";
import { toast } from "sonner";

export default function Cards() {
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const MAX_CARDS = 3;

  // Fetch cards from API
  const fetchCards = async () => {
    try {
      setLoading(true);
      const fetchedCards = await getMyCards();
      setCards(fetchedCards);

      // Set first card as selected by default if none selected
      if (fetchedCards.length > 0 && !selectedCardId) {
        setSelectedCardId(fetchedCards[0].id);
      }
    } catch (error) {
      console.error("Failed to load cards:", error);
      toast.error("Failed to load cards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Refetch cards after creation
  const handleCardCreated = () => {
    fetchCards();
  };

  const selectedCard = cards.find((card) => card.id === selectedCardId);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-64">
          <TopNav />
          <main className="p-6">
            <p className="text-center text-muted-foreground">
              Loading cards...
            </p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 ml-64">
        <TopNav />

        <main className="p-6 space-y-8">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Cards</h1>
            <Button
              onClick={() => setShowCreateCardModal(true)}
              className="bg-primary hover:bg-primary/90"
              disabled={cards.length >= MAX_CARDS}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Virtual Card
            </Button>
          </div>

          {cards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-muted-foreground mb-4">
                You don't have any cards yet
              </p>
              <Button
                onClick={() => setShowCreateCardModal(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Card
              </Button>
            </div>
          ) : (
            <>
              {/* Card Carousel */}
              <VirtualCardCarousel
                cards={cards}
                selectedCardId={selectedCardId}
                onCardSelect={setSelectedCardId}
                maxCards={MAX_CARDS}
              />

              {/* Action Buttons */}
              {selectedCard && (
                <CardActions
                  selectedCardId={selectedCardId}
                  cardName={selectedCard.cardName}
                  balance={selectedCard.balance}
                />
              )}

              {/* Recent Transactions */}
              <CardTransactions selectedCardId={selectedCardId} />
            </>
          )}
        </main>
      </div>

      {/* Create Card Modal */}
      <CreateVirtualCardModal
        isOpen={showCreateCardModal}
        onClose={() => setShowCreateCardModal(false)}
        currentCardCount={cards.length}
        maxCards={MAX_CARDS}
        onCardCreated={handleCardCreated}
      />
    </div>
  );
}
