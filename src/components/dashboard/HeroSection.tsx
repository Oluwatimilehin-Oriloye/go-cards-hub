import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <section className="rounded-xl bg-gradient-to-br from-background to-secondary p-8 shadow-sm border border-border">
      <div className="max-w-2xl">
        <h1 className="mb-3 text-4xl font-bold text-foreground">
          {t('dashboard.heroTitle')}
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          {t('dashboard.heroSubtitle')}
        </p>
        <Button 
          size="lg" 
          className="gap-2 shadow-md hover:shadow-lg transition-all"
          aria-label="Create a new virtual card"
        >
          {t('dashboard.createCardNow')}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}
