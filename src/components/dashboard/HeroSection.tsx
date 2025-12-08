import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";

interface HeroSectionProps {
  currentCardCount: number;
  maxCards: number;
  onOpenCreateModal: () => void;
}

export function HeroSection({
  currentCardCount,
  maxCards,
  onOpenCreateModal,
}: HeroSectionProps) {
  const { t } = useTranslation();

  const handleOpenModal = () => {
    if (currentCardCount >= maxCards) {
      toast({
        variant: "destructive",
        title: "Card Limit Reached",
        description: `You can only create up to ${maxCards} virtual cards.`,
        duration: 1000,
      });
      return;
    }

    onOpenCreateModal();
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
          >
            {t("dashboard.createCardNow")}
            <ArrowRight className="h-5 w-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            {currentCardCount}/{maxCards} virtual cards active
          </p>
        </div>
      </section>
    </>
  );
}
