/* eslint-disable @typescript-eslint/no-explicit-any */
//Timi code
// import { useState, useEffect } from "react";
// import { Sidebar } from "@/components/dashboard/Sidebar";
// import { TopNav } from "@/components/dashboard/TopNav";
// import { VirtualCardCarousel } from "@/components/cards/VirtualCardCarousel";
// import { CardActions } from "@/components/cards/CardActions";
// import { CardTransactions } from "@/components/cards/CardTransactions";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import { CreateVirtualCardModal } from "@/components/modals/CreateVirtualCardModal";
// import { getMyCards, Card } from "@/services/cardService";
// import { toast } from "sonner";

// export default function Cards() {
//   const [selectedCardId, setSelectedCardId] = useState<string>("");
//   const [showCreateCardModal, setShowCreateCardModal] = useState(false);
//   const [cards, setCards] = useState<Card[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [frozenCards, setFrozenCards] = useState<Record<string, boolean>>({});

//   const MAX_CARDS = 3;

//   // Fetch cards from API
//   const fetchCards = async () => {
//     try {
//       setLoading(true);
//       const fetchedCards = await getMyCards();
//       setCards(fetchedCards);

//       // Set first card as selected by default if none selected
//       if (fetchedCards.length > 0 && !selectedCardId) {
//         setSelectedCardId(fetchedCards[0].id);
//       }
//     } catch (error) {
//       console.error("Failed to load cards:", error);
//       toast.error("Failed to load cards");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCards();
//   }, []);

//   // Refetch cards after creation
//   const handleCardCreated = () => {
//     fetchCards();
//   };

//   // Freeze/Unfreeze handlers (from teammate's code)
//   const handleFreeze = (duration: string) => {
//     setFrozenCards((prev) => ({ ...prev, [selectedCardId]: true }));
//     // TODO: Add API call to freeze card
//     toast.success(`Card frozen for ${duration}`);
//   };

//   const handleUnfreeze = () => {
//     setFrozenCards((prev) => {
//       const updated = { ...prev };
//       delete updated[selectedCardId];
//       return updated;
//     });
//     // TODO: Add API call to unfreeze card
//     toast.success(`${selectedCard?.cardName} unfrozen successfully`);
//   };

//   const handleDelete = (reason: string) => {
//     console.log("Delete reason:", reason);
//     // TODO: Add API call to delete card
//     // After successful deletion, refetch cards
//   };

//   const selectedCard = cards.find((card) => card.id === selectedCardId);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen bg-background">
//         <Sidebar />
//         <div className="flex-1 ml-64">
//           <TopNav />
//           <main className="p-6">
//             <p className="text-center text-muted-foreground">
//               Loading cards...
//             </p>
//           </main>
//         </div>
//       </div>
//     );
//   }

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
//               disabled={cards.length >= MAX_CARDS}
//             >
//               <Plus className="mr-2 h-4 w-4" />
//               Create Virtual Card
//             </Button>
//           </div>

//           {cards.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-20">
//               <p className="text-muted-foreground mb-4">
//                 You don't have any cards yet
//               </p>
//               <Button
//                 onClick={() => setShowCreateCardModal(true)}
//                 className="bg-primary hover:bg-primary/90"
//               >
//                 <Plus className="mr-2 h-4 w-4" />
//                 Create Your First Card
//               </Button>
//             </div>
//           ) : (
//             <>
//               {/* Card Carousel */}
//               <VirtualCardCarousel
//                 cards={cards}
//                 selectedCardId={selectedCardId}
//                 onCardSelect={setSelectedCardId}
//                 maxCards={MAX_CARDS}
//                 frozenCards={frozenCards}
//               />

//               {/* Action Buttons */}
//               {selectedCard && (
//                 <CardActions
//                   selectedCardId={selectedCardId}
//                   cardName={selectedCard.cardName}
//                   balance={selectedCard.balance}
//                   isFrozen={frozenCards[selectedCardId] || false}
//                   onFreeze={handleFreeze}
//                   onUnfreeze={handleUnfreeze}
//                   onDelete={handleDelete}
//                 />
//               )}

//               {/* Recent Transactions */}
//               <CardTransactions selectedCardId={selectedCardId} />
//             </>
//           )}
//         </main>
//       </div>

//       {/* Create Card Modal */}
//       <CreateVirtualCardModal
//         isOpen={showCreateCardModal}
//         onClose={() => setShowCreateCardModal(false)}
//         currentCardCount={cards.length}
//         maxCards={MAX_CARDS}
//         onCardCreated={handleCardCreated}
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
import {
  getMyCards,
  freezeCard,
  unfreezeCard,
  deleteCard,
  Card,
} from "@/services/cardService";
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

  // Freeze handler - calls API
  const handleFreeze = async (duration: string) => {
    try {
      await freezeCard(selectedCardId);
      toast.success(`Card frozen for ${duration}`);
      // Refetch to get updated status
      await fetchCards();
    } catch (error: any) {
      console.error("Failed to freeze card:", error);
      toast.error(error.response?.data?.message || "Failed to freeze card");
    }
  };

  // Unfreeze handler - calls API
  const handleUnfreeze = async () => {
    const card = cards.find((c) => c.id === selectedCardId);
    try {
      await unfreezeCard(selectedCardId);
      toast.success(`${card?.cardName} unfrozen successfully`);
      // Refetch to get updated status
      await fetchCards();
    } catch (error: any) {
      console.error("Failed to unfreeze card:", error);
      toast.error(error.response?.data?.message || "Failed to unfreeze card");
    }
  };

  // Delete handler - calls API
  const handleDelete = async (reason: string) => {
    const card = cards.find((c) => c.id === selectedCardId);
    try {
      await deleteCard(selectedCardId);
      toast.success(`${card?.cardName} deleted successfully`);
      console.log("Delete reason:", reason);
      // Refetch to update list
      await fetchCards();
      // Reset selected card
      setSelectedCardId("");
    } catch (error: any) {
      console.error("Failed to delete card:", error);
      toast.error(error.response?.data?.message || "Failed to delete card");
    }
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
                  status={selectedCard.status}
                  onFreeze={handleFreeze}
                  onUnfreeze={handleUnfreeze}
                  onDelete={handleDelete}
                  onRefresh={fetchCards}
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
