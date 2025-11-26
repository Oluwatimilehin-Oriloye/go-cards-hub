import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { CreateVirtualCardModal } from "@/components/modals/CreateVirtualCardModal";
import { getMyCards } from "@/services/cardService";
import { toast } from "@/components/ui/use-toast";


export function HeroSection() {
  const { t } = useTranslation();
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [currentCardCount, setCurrentCardCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const MAX_CARDS = 3;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cards = await getMyCards();
        setCurrentCardCount(cards.length);
      } catch (error) {
        console.error("Failed to load cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleOpenModal = () => {
    if (currentCardCount >= MAX_CARDS) {
      toast({
        variant: "destructive",
        title: "Card Limit Reached",
        description: `You can only create up to ${MAX_CARDS} virtual cards.`,
        duration: 1000, // 1 seconds
      });
      return;
    }
  
    setShowCreateCardModal(true);
  };
  

  return (
    <>
      <section className="rounded-xl bg-gradient-to-br from-background to-secondary p-8 shadow-sm border border-border">
        <div className="max-w-2xl">
          <h1 className="mb-3 text-4xl font-bold text-foreground">
            {t("dashboard.heroTitle")}
          </h1>

          <p className="mb-6 text-lg text-muted-foreground">
            {t("dashboard.heroSubtitle")}
          </p>

          <Button
            size="lg"
            className="gap-2 shadow-md hover:shadow-lg transition-all"
            aria-label="Create a new virtual card"
            onClick={handleOpenModal}
            disabled={loading}
          >
            {t("dashboard.createCardNow")}
            <ArrowRight className="h-5 w-5" />
          </Button>

          {!loading && (
            <p className="text-sm text-muted-foreground mt-3">
              {currentCardCount}/{MAX_CARDS} virtual cards active
            </p>
          )}
        </div>
      </section>

      <CreateVirtualCardModal
        isOpen={showCreateCardModal}
        onClose={() => setShowCreateCardModal(false)}
        currentCardCount={currentCardCount}
        maxCards={MAX_CARDS}
      />
    </>
  );
}
