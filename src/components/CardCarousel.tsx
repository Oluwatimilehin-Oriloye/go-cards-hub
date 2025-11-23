import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const virtualCards = [
  {
    id: 1,
    name: "Timi Adebayo",
    number: "4532 **** **** 7891",
    type: "Visa",
    gradient: "from-primary to-primary-light",
  },
  {
    id: 2,
    name: "Ngozi Okonkwo",
    number: "5412 **** **** 3456",
    type: "Mastercard",
    gradient: "from-primary-dark to-primary",
  },
  {
    id: 3,
    name: "Yusuf Ibrahim",
    number: "5061 **** **** 9012",
    type: "Verve",
    gradient: "from-primary to-primary-dark",
  },
];

export const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % virtualCards.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + virtualCards.length) % virtualCards.length);
  };

  return (
    <section id="cards" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Cards, Your Style
          </h2>
          <p className="text-xl text-muted-foreground">
            Premium virtual cards with GTBank branding, ready for instant use
          </p>
        </div>

        <div className="relative max-w-md mx-auto">
          {/* Card Display */}
          <div className="relative h-56 mb-8">
            {virtualCards.map((card, index) => (
              <div
                key={card.id}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
              >
                <div
                  className={`w-full h-full bg-gradient-to-br ${card.gradient} rounded-2xl p-6 text-white shadow-card-hover flex flex-col justify-between`}
                >
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-semibold">GO CARDS</div>
                    <div className="text-xs bg-white/20 px-3 py-1 rounded-full">
                      {card.type}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-2xl font-mono tracking-wider">
                      {card.number}
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs opacity-80">Card Holder</div>
                        <div className="font-semibold">{card.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs opacity-80">Exp</div>
                        <div className="font-semibold">12/26</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full"
            >
              <ChevronLeft />
            </Button>
            
            <div className="flex gap-2">
              {virtualCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
