import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRight } from "lucide-react";
import { CreateCardModal } from "./modals/CreateCardModal";
import heroImage from "@/assets/hero-person.jpg";
import cardsStack from "@/assets/cards-stack.png";

interface HeroProps {
  content: {
    headline: string;
    subtext: string;
    cta: string;
  };
}

export const Hero = ({ content }: HeroProps) => {
  const [createCardOpen, setCreateCardOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-subtle" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-bl-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                Powered by GTBank
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {content.headline}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                {content.subtext}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-orange hover:opacity-90 text-lg px-8 shadow-orange-glow"
                  onClick={() => setCreateCardOpen(true)}
                >
                  <CreditCard className="mr-2" />
                  {content.cta}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                >
                  Learn More
                  <ArrowRight className="ml-2" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">₦2B+</div>
                  <div className="text-sm text-muted-foreground">Transacted</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Cards Max</div>
                </div>
              </div>
            </div>

            {/* Right Content - Images */}
            <div className="relative animate-fade-in-up">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Happy customer using GO CARDS"
                  className="rounded-3xl shadow-card-hover w-full"
                />
                
                {/* Floating Card Stack */}
                <div className="absolute -bottom-8 -left-8 bg-background p-4 rounded-2xl shadow-card-hover animate-float">
                  <img
                    src={cardsStack}
                    alt="GO CARDS virtual cards"
                    className="w-48 h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CreateCardModal open={createCardOpen} onOpenChange={setCreateCardOpen} />
    </>
  );
};
