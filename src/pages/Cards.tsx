import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { VirtualCardCarousel } from "@/components/cards/VirtualCardCarousel";
import { CardActions } from "@/components/cards/CardActions";
import { CardTransactions } from "@/components/cards/CardTransactions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateVirtualCardModal } from "@/components/modals/CreateVirtualCardModal";

export default function Cards() {
  const [selectedCardId, setSelectedCardId] = useState("temu-card");
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);

  // Mock cards data
  const cards = [
    { id: "temu-card", name: "Temu Card", balance: 45000 },
    { id: "jumia-card", name: "Jumia Card", balance: 32000 },
    { id: "konga-card", name: "Konga Card", balance: 18500 },
  ];

  const selectedCard = cards.find(card => card.id === selectedCardId) || cards[0];
  const MAX_CARDS = 3;
  const currentCardCount = cards.length;

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
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Virtual Card
            </Button>
          </div>

          {/* Card Carousel */}
          <VirtualCardCarousel 
            selectedCardId={selectedCardId}
            onCardSelect={setSelectedCardId}
          />

          {/* Action Buttons */}
          <CardActions 
            selectedCardId={selectedCardId}
            cardName={selectedCard.name}
            balance={selectedCard.balance}
          />

          {/* Recent Transactions */}
          <CardTransactions selectedCardId={selectedCardId} />
        </main>
      </div>

      {/* Modals */}
      <CreateVirtualCardModal
        isOpen={showCreateCardModal}
        onClose={() => setShowCreateCardModal(false)}
        currentCardCount={currentCardCount}
        maxCards={MAX_CARDS}
      />
    </div>
  );
}
