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

  // Load cards initially
  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      const fetched = await getMyCards();

      setCards(fetched);

      // auto-select if nothing is selected
      if (!selectedCardId && fetched.length > 0) {
        setSelectedCardId(fetched[0].id);
      }
    } catch (err) {
      toast.error("Failed to load cards");
    } finally {
      setLoading(false);
    }
  };

  const handleCardCreated = () => {
    loadCards();
  };

  // Optimistic local update util
  const updateCardLocal = (cardId: string, partial: Partial<Card>) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, ...partial } : c))
    );
  };

  // Freeze card with local mutation
  const handleFreeze = async (duration: string) => {
    try {
      await freezeCard(selectedCardId);
      updateCardLocal(selectedCardId, { status: "frozen" });
      toast.success(`Card frozen for ${duration}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to freeze card");
    }
  };

  const handleUnfreeze = async () => {
    const card = cards.find((c) => c.id === selectedCardId);

    try {
      await unfreezeCard(selectedCardId);
      updateCardLocal(selectedCardId, { status: "active" });
      toast.success(`${card?.cardName} unfrozen successfully`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to unfreeze card");
    }
  };

  const handleDelete = async (reason: string) => {
    const card = cards.find((c) => c.id === selectedCardId);

    try {
      await deleteCard(selectedCardId);

      // remove from list locally
      setCards((prev) => prev.filter((c) => c.id !== selectedCardId));

      toast.success(`${card?.cardName} deleted successfully`);

      // reset selection
      setSelectedCardId("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete card");
    }
  };

  const selectedCard = cards.find((c) => c.id === selectedCardId);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-64">
          <TopNav />
          <main className="p-6">
            <p className="text-center text-muted-foreground">Loading cards...</p>
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
              <VirtualCardCarousel
                cards={cards}
                selectedCardId={selectedCardId}
                onCardSelect={setSelectedCardId}
                maxCards={MAX_CARDS}
              />

              {selectedCard && (
                <CardActions
                  selectedCardId={selectedCardId}
                  cardName={selectedCard.cardName}
                  balance={selectedCard.balance}
                  status={selectedCard.status}
                  onFreeze={handleFreeze}
                  onUnfreeze={handleUnfreeze}
                  onDelete={handleDelete}
                  onRefresh={loadCards}
                />
              )}

              <CardTransactions selectedCardId={selectedCardId} />
            </>
          )}
        </main>
      </div>

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
